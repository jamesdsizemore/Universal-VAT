import { useNavigate } from 'react-router-dom';
import { useVAT } from '../context/VATContext';
import {
  getTotalScore,
  getRiskLevel,
  getDomainBreakdown,
  getNarrativeResponses,
} from '../utils/scoring';
import { getTotalMaxScore } from '../data/questions';

function RiskBadge({ level, color }) {
  const classes = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-600',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${classes[color] || classes.gray}`}
    >
      {level}
    </span>
  );
}

export default function CCSSimpleVAT() {
  const state = useVAT();
  const navigate = useNavigate();

  if (!state.hmisUid) {
    navigate('/client-info');
    return null;
  }

  const totalScore = getTotalScore(state.answers);
  const maxScore = getTotalMaxScore();
  const risk = getRiskLevel(totalScore);
  const breakdown = getDomainBreakdown(state.answers);
  const narratives = getNarrativeResponses(state.answers);

  const riskBgClasses = {
    green: 'bg-green-600',
    yellow: 'bg-yellow-500',
    orange: 'bg-orange-500',
    red: 'bg-red-600',
  };

  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div>
      {/* Action bar */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button
          onClick={() => navigate('/format-selection')}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          &larr; Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/output/desc')}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Switch to DESC Mini VAT
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Document */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 print:shadow-none print:border-none max-w-2xl mx-auto">
        {/* Header */}
        <div className="border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">CCS Simple VAT</h1>
          <p className="text-sm text-gray-500">
            Vulnerability Assessment Tool &mdash; Compact Score
          </p>
        </div>

        {/* Client Info */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                HMIS UID
              </p>
              <p className="font-semibold text-gray-900">{state.hmisUid}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Date of Assessment
              </p>
              <p className="font-semibold text-gray-900">
                {state.completionDate}
              </p>
            </div>
          </div>
        </div>

        {/* Composite Score */}
        <div className="px-8 py-8 text-center border-b border-gray-200">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            Composite Vulnerability Score
          </p>
          <div className="inline-flex items-center gap-4">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={
                    risk.color === 'green'
                      ? '#16a34a'
                      : risk.color === 'yellow'
                        ? '#eab308'
                        : risk.color === 'orange'
                          ? '#f97316'
                          : '#dc2626'
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 264} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">
                  {totalScore}
                </span>
                <span className="text-xs text-gray-400">of {maxScore}</span>
              </div>
            </div>
            <div className="text-left">
              <RiskBadge level={risk.level} color={risk.color} />
              <p className="text-xs text-gray-500 mt-2 max-w-[200px]">
                {risk.description}
              </p>
            </div>
          </div>
        </div>

        {/* Domain Summary */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
            Domain Summary
          </h2>
          <div className="space-y-3">
            {breakdown.map((domain) => {
              const pct =
                domain.maxScore > 0
                  ? Math.round((domain.score / domain.maxScore) * 100)
                  : 0;
              return (
                <div key={domain.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">
                      {domain.shortName}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-600">
                        {domain.score}/{domain.maxScore}
                      </span>
                      <RiskBadge
                        level={domain.risk.level}
                        color={domain.risk.color}
                      />
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${riskBgClasses[domain.risk.color] || 'bg-gray-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Findings */}
        {narratives.length > 0 && (
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Key Findings
            </h2>
            <div className="space-y-2">
              {narratives.map((n) => (
                <div
                  key={n.questionId}
                  className="text-sm border-l-2 border-gray-300 pl-3 py-1"
                >
                  <span className="text-gray-500">{n.domainName}:</span>{' '}
                  <span className="text-gray-700">{n.response}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-8 py-4 text-xs text-gray-400 flex justify-between">
          <span>CCS Simple VAT &mdash; Compact Score</span>
          <span>Generated by Universal VAT</span>
        </div>
      </div>
    </div>
  );
}
