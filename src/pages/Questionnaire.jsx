import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVAT, useVATDispatch } from '../context/VATContext';
import { domains, ccsScreeningQuestions } from '../data/questions';

// Total sections = DESC domains + 1 CCS screening section
const TOTAL_SECTIONS = domains.length + 1;
const CCS_SECTION_INDEX = domains.length;

function QuestionInput({ question, value, onChange }) {
  if (question.type === 'multiple_choice') {
    return (
      <div className="space-y-2">
        {question.options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start p-3 rounded-md border cursor-pointer transition-colors ${
              value === option.value
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(question.id, option.value)}
              className="mt-0.5 mr-3 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">
              <span className="font-medium mr-1">{option.value}.</span>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === 'narrative') {
    return (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(question.id, e.target.value)}
        rows={4}
        placeholder="Enter observations or narrative here..."
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    );
  }

  return null;
}

function YesNoInput({ id, value, onChange }) {
  return (
    <div className="flex gap-4">
      {['yes', 'no'].map((opt) => (
        <label
          key={opt}
          className={`flex items-center px-6 py-3 rounded-md border cursor-pointer transition-colors ${
            value === opt
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name={id}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(id, opt)}
            className="mr-2 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700 capitalize">{opt}</span>
        </label>
      ))}
    </div>
  );
}

export default function Questionnaire() {
  const state = useVAT();
  const dispatch = useVATDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState([]);

  const sectionIndex = state.currentDomainIndex;
  const isCCSSection = sectionIndex === CCS_SECTION_INDEX;
  const isFirst = sectionIndex === 0;
  const isLast = sectionIndex === TOTAL_SECTIONS - 1;
  const progress = ((sectionIndex + 1) / TOTAL_SECTIONS) * 100;

  if (!state.hmisUid) {
    navigate('/client-info');
    return null;
  }

  function handleAnswer(questionId, value) {
    dispatch({ type: 'SET_ANSWER', questionId, value });
    setValidationErrors((prev) => prev.filter((id) => id !== questionId));
  }

  function shouldShowQuestion(question) {
    if (!question.showWhen) return true;
    const parentAnswer = state.answers[question.showWhen.questionId];
    return parentAnswer && parentAnswer !== question.showWhen.notValue;
  }

  function validateSection() {
    const errors = [];
    if (isCCSSection) {
      for (const q of ccsScreeningQuestions) {
        if (!state.answers[q.id]) errors.push(q.id);
      }
    } else {
      const domain = domains[sectionIndex];
      for (const q of domain.questions) {
        if (q.type === 'multiple_choice' && shouldShowQuestion(q) && !state.answers[q.id]) {
          errors.push(q.id);
        }
      }
    }
    return errors;
  }

  function handleNext() {
    const errors = validateSection();
    if (errors.length > 0) {
      setValidationErrors(errors);
      const el = document.getElementById(`question-${errors[0]}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (isLast) {
      navigate('/format-selection');
    } else {
      dispatch({ type: 'SET_DOMAIN_INDEX', index: sectionIndex + 1 });
      setValidationErrors([]);
      window.scrollTo(0, 0);
    }
  }

  function handlePrevious() {
    if (isFirst) {
      navigate('/client-info');
    } else {
      dispatch({ type: 'SET_DOMAIN_INDEX', index: sectionIndex - 1 });
      setValidationErrors([]);
      window.scrollTo(0, 0);
    }
  }

  // Section labels for nav tabs
  const sectionLabels = [...domains.map((d) => d.name), 'CCS Screening'];

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Section {sectionIndex + 1} of {TOTAL_SECTIONS}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {sectionLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => { dispatch({ type: 'SET_DOMAIN_INDEX', index: i }); setValidationErrors([]); window.scrollTo(0, 0); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              i === sectionIndex ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Section header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {isCCSSection ? 'CCS Screening Checklist' : domains[sectionIndex].name}
        </h2>
        {isCCSSection && (
          <p className="text-gray-500 text-sm mt-1">
            These yes/no items are included in the CCS/CCA High Acuity Shelter Referral output.
          </p>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {isCCSSection
          ? ccsScreeningQuestions.map((q) => {
              const hasError = validationErrors.includes(q.id);
              return (
                <div
                  key={q.id}
                  id={`question-${q.id}`}
                  className={`bg-white shadow rounded-lg p-5 border ${hasError ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-100'}`}
                >
                  <p className="text-sm font-medium text-gray-800 mb-3">
                    {q.text} <span className="text-red-500">*</span>
                  </p>
                  <YesNoInput id={q.id} value={state.answers[q.id]} onChange={handleAnswer} />
                  {hasError && <p className="text-red-500 text-xs mt-2">This question requires an answer.</p>}
                </div>
              );
            })
          : domains[sectionIndex].questions.map((question) => {
              if (!shouldShowQuestion(question)) return null;
              const hasError = validationErrors.includes(question.id);
              return (
                <div
                  key={question.id}
                  id={`question-${question.id}`}
                  className={`bg-white shadow rounded-lg p-5 border ${hasError ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-100'}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex-shrink-0">
                      {question.id.replace('Q', '')}
                    </span>
                    <p className="text-sm font-medium text-gray-800">
                      {question.text}
                      {question.type === 'multiple_choice' && <span className="text-red-500 ml-1">*</span>}
                    </p>
                  </div>
                  <div className="ml-10">
                    <QuestionInput question={question} value={state.answers[question.id]} onChange={handleAnswer} />
                    {hasError && <p className="text-red-500 text-xs mt-2">This question requires an answer.</p>}
                  </div>
                </div>
              );
            })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          className="px-5 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          &larr; {isFirst ? 'Client Info' : 'Previous Section'}
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition-colors"
        >
          {isLast ? 'Review & Select Output' : 'Next Section'} &rarr;
        </button>
      </div>
    </div>
  );
}
