import { useNavigate } from 'react-router-dom';
import { useVAT } from '../context/VATContext';
import {
  getTotalScore,
  getRiskLevel,
  getDomainBreakdown,
  getNarrativeResponses,
} from '../utils/scoring';
import { getTotalMaxScore } from '../data/questions';

function ScoreBadge({ score, maxScore }) {
  if (score === null || score === undefined) return null;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
      {score}{maxScore !== undefined ? `/${maxScore}` : ''}
    </span>
  );
}

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

export default function DESCMiniVAT() {
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

  const riskColorClasses = {
    green: 'border-green-500 bg-green-50',
    yellow: 'border-yellow-500 bg-yellow-50',
    orange: 'border-orange-500 bg-orange-50',
    red: 'border-red-500 bg-red-50',
  };

  return (
    <div>
      {/* Print / Action bar */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button
          onClick={() => navigate('/format-selection')}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          &larr; Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/output/ccs')}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Switch to CCS Simple VAT
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
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 print:shadow-none print:border-none">
        {/* Header */}
        <div className="border-b px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                DESC Mini VAT
              </h1>
              <p className="text-sm text-gray-500">
                Vulnerability Assessment Tool &mdash; Extended Scoring
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="text-gray-500">
                HMIS UID:{' '}
                <span className="font-semibold text-gray-900">
                  {state.hmisUid}
                </span>
              </p>
              <p className="text-gray-500">
                Date:{' '}
                <span className="font-semibold text-gray-900">
                  {state.completionDate}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className={`mx-8 my-6 p-4 border-l-4 rounded-r-lg ${riskColorClasses[risk.color]}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Vulnerability Score
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {totalScore}
                <span className="text-lg font-normal text-gray-400">
                  {' '}/ {maxScore}
                </span>
              </p>
            </div>
            <div className="text-right">
              <RiskBadge level={risk.level} color={risk.color} />
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                {risk.description}
              </p>
            </div>
          </div>
        </div>

        {/* Domain Score Summary */}
        <div className="px-8 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Domain Score Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {breakdown.map((domain) => (
              <div
                key={domain.id}
                className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100"
              >
                <p className="text-xs text-gray-500 font-medium mb-1">
                  {domain.shortName}
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {domain.score}
                  <span className="text-sm font-normal text-gray-400">
                    /{domain.maxScore}
                  </span>
                </p>
                <RiskBadge level={domain.risk.level} color={domain.risk.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Domain Breakdown */}
        <div className="px-8 pb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Detailed Domain Breakdown
          </h2>

          {breakdown.map((domain) => (
            <div key={domain.id} className="mb-8 last:mb-0">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">{domain.name}</h3>
                <div className="flex items-center gap-2">
                  <ScoreBadge score={domain.score} maxScore={domain.maxScore} />
                  <RiskBadge
                    level={domain.risk.level}
                    color={domain.risk.color}
                  />
                </div>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wide">
                    <th className="pb-2 pr-2 w-12">ID</th>
                    <th className="pb-2 pr-2">Question</th>
                    <th className="pb-2 pr-2 w-48">Response</th>
                    <th className="pb-2 w-16 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {domain.questions.map((q) => (
                    <tr key={q.id} className="align-top">
                      <td className="py-2 pr-2 text-gray-400 font-mono text-xs">
                        {q.id}
                      </td>
                      <td className="py-2 pr-2 text-gray-700">
                        {q.text}
                        {q.followUp && q.followUp.answer && (
                          <div className="mt-2 ml-4 pl-3 border-l-2 border-indigo-200 text-xs">
                            <p className="text-gray-500 italic">
                              {q.followUp.text}
                            </p>
                            <p className="text-gray-700 mt-0.5">
                              {q.followUp.answerLabel || q.followUp.answer}
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="py-2 pr-2 text-gray-600">
                        {q.type === 'narrative' ? (
                          <span className="italic text-gray-400">
                            {q.answerLabel || '(no response)'}
                          </span>
                        ) : (
                          q.answerLabel || '-'
                        )}
                      </td>
                      <td className="py-2 text-right font-mono">
                        {q.score !== null && q.score !== undefined ? (
                          q.score
                        ) : (
                          <span className="text-gray-300">&mdash;</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-300">
                    <td colSpan={3} className="py-2 text-right font-semibold text-gray-700 pr-2">
                      Domain Total:
                    </td>
                    <td className="py-2 text-right font-bold text-gray-900 font-mono">
                      {domain.score}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </div>

        {/* Narrative Responses Summary */}
        {narratives.length > 0 && (
          <div className="px-8 pb-8 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Narrative Responses
            </h2>
            <div className="space-y-4">
              {narratives.map((n) => (
                <div key={n.questionId} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-indigo-600 font-medium mb-1">
                    {n.domainName} &mdash; {n.questionId}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{n.text}</p>
                  <p className="text-sm text-gray-900">{n.response}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t px-8 py-4 text-xs text-gray-400 flex justify-between">
          <span>DESC Mini VAT &mdash; Extended Scoring</span>
          <span>Generated by Universal VAT</span>
        </div>
      </div>
    </div>
  );
}
