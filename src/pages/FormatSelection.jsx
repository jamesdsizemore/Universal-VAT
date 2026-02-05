import { useNavigate } from 'react-router-dom';
import { useVAT } from '../context/VATContext';
import { getTotalScore, getRiskLevel } from '../utils/scoring';
import { getTotalMaxScore } from '../data/questions';

export default function FormatSelection() {
  const state = useVAT();
  const navigate = useNavigate();

  if (!state.hmisUid) {
    navigate('/client-info');
    return null;
  }

  const totalScore = getTotalScore(state.answers);
  const maxScore = getTotalMaxScore();
  const risk = getRiskLevel(totalScore);

  const riskColorClasses = {
    green: 'bg-green-100 text-green-800 border-green-300',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    orange: 'bg-orange-100 text-orange-800 border-orange-300',
    red: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Assessment Complete
      </h2>
      <p className="text-gray-500 mb-6">
        All questions have been answered. Review the preliminary results below,
        then select an output format.
      </p>

      {/* Summary card */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">HMIS UID</p>
            <p className="font-semibold text-gray-900">{state.hmisUid}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
            <p className="font-semibold text-gray-900">{state.completionDate}</p>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Total Vulnerability Score
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {totalScore}{' '}
                <span className="text-lg font-normal text-gray-400">
                  / {maxScore}
                </span>
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold border ${riskColorClasses[risk.color]}`}
            >
              {risk.level} Vulnerability
            </span>
          </div>
        </div>
      </div>

      {/* Format selection */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Select Output Format
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => navigate('/output/desc')}
          className="bg-white shadow rounded-lg p-6 border-2 border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all text-left group"
        >
          <h4 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600">
            DESC Mini VAT
          </h4>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
            Extended Scoring
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>- Domain-by-domain score breakdown</li>
            <li>- Individual question scores</li>
            <li>- Risk level per domain</li>
            <li>- All narrative responses</li>
            <li>- Detailed vulnerability profile</li>
          </ul>
        </button>

        <button
          onClick={() => navigate('/output/ccs')}
          className="bg-white shadow rounded-lg p-6 border-2 border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all text-left group"
        >
          <h4 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600">
            CCS Simple VAT
          </h4>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
            Compact Score
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>- Single composite score</li>
            <li>- Overall risk level</li>
            <li>- Domain summary scores</li>
            <li>- Key findings overview</li>
            <li>- Compact, one-page format</li>
          </ul>
        </button>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate('/questionnaire')}
          className="px-5 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          &larr; Back to Questions
        </button>
      </div>
    </div>
  );
}
