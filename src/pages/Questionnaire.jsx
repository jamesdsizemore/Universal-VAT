import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVAT, useVATDispatch } from '../context/VATContext';
import { domains } from '../data/questions';

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
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === 'yes_no') {
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
              name={question.id}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(question.id, opt)}
              className="mr-2 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700 capitalize">
              {opt}
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
        placeholder="Enter response here..."
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    );
  }

  return null;
}

function FollowUpQuestion({ followUp, parentAnswer, value, onChange }) {
  if (!followUp) return null;
  if (parentAnswer !== 'yes') return null;

  return (
    <div className="ml-6 mt-3 pl-4 border-l-2 border-indigo-200">
      <p className="text-sm font-medium text-gray-700 mb-2">{followUp.text}</p>
      <QuestionInput question={followUp} value={value} onChange={onChange} />
    </div>
  );
}

export default function Questionnaire() {
  const state = useVAT();
  const dispatch = useVATDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState([]);

  const domainIndex = state.currentDomainIndex;
  const domain = domains[domainIndex];
  const isFirst = domainIndex === 0;
  const isLast = domainIndex === domains.length - 1;
  const progress = ((domainIndex + 1) / domains.length) * 100;

  if (!state.hmisUid) {
    navigate('/client-info');
    return null;
  }

  function handleAnswer(questionId, value) {
    dispatch({ type: 'SET_ANSWER', questionId, value });
    setValidationErrors((prev) => prev.filter((id) => id !== questionId));
  }

  function validateDomain() {
    const errors = [];
    for (const q of domain.questions) {
      if (q.type !== 'narrative' && !state.answers[q.id]) {
        errors.push(q.id);
      }
      if (
        q.followUp &&
        q.followUp.type === 'multiple_choice' &&
        state.answers[q.id] === 'yes' &&
        !state.answers[q.followUp.id]
      ) {
        errors.push(q.followUp.id);
      }
    }
    return errors;
  }

  function handleNext() {
    const errors = validateDomain();
    if (errors.length > 0) {
      setValidationErrors(errors);
      const firstError = document.getElementById(`question-${errors[0]}`);
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (isLast) {
      navigate('/format-selection');
    } else {
      dispatch({ type: 'SET_DOMAIN_INDEX', index: domainIndex + 1 });
      setValidationErrors([]);
      window.scrollTo(0, 0);
    }
  }

  function handlePrevious() {
    if (isFirst) {
      navigate('/client-info');
    } else {
      dispatch({ type: 'SET_DOMAIN_INDEX', index: domainIndex - 1 });
      setValidationErrors([]);
      window.scrollTo(0, 0);
    }
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>
            Section {domainIndex + 1} of {domains.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Domain navigation tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {domains.map((d, i) => (
          <button
            key={d.id}
            onClick={() => {
              dispatch({ type: 'SET_DOMAIN_INDEX', index: i });
              setValidationErrors([]);
              window.scrollTo(0, 0);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              i === domainIndex
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {d.shortName}
          </button>
        ))}
      </div>

      {/* Domain header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">{domain.name}</h2>
        <p className="text-gray-500 text-sm mt-1">{domain.description}</p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {domain.questions.map((question, qIndex) => {
          const hasError = validationErrors.includes(question.id);
          const hasFollowUpError =
            question.followUp && validationErrors.includes(question.followUp.id);

          return (
            <div
              key={question.id}
              id={`question-${question.id}`}
              className={`bg-white shadow rounded-lg p-5 border ${
                hasError ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex-shrink-0">
                  {question.id}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {question.text}
                    {question.type !== 'narrative' && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="ml-10">
                <QuestionInput
                  question={question}
                  value={state.answers[question.id]}
                  onChange={handleAnswer}
                />
                {hasError && (
                  <p className="text-red-500 text-xs mt-2">
                    This question requires an answer.
                  </p>
                )}

                {question.followUp && (
                  <div>
                    <FollowUpQuestion
                      followUp={question.followUp}
                      parentAnswer={state.answers[question.id]}
                      value={state.answers[question.followUp.id]}
                      onChange={handleAnswer}
                    />
                    {hasFollowUpError && (
                      <p className="text-red-500 text-xs mt-2 ml-6">
                        This follow-up question requires an answer.
                      </p>
                    )}
                  </div>
                )}
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
