import { useNavigate } from 'react-router-dom';
import { useVAT } from '../context/VATContext';
import { getDescTotalScore, getDescRiskLevel, getCCSTotalScore, getCCSRiskLevel } from '../utils/scoring';
import { getDescTotalMax, getCCSTotalMax } from '../data/questions';

export default function FormatSelection() {
  const state = useVAT();
  const navigate = useNavigate();

  if (!state.hmisUid) {
    navigate('/client-info');
    return null;
  }

  const descScore = getDescTotalScore(state.answers);
  const descMax = getDescTotalMax();
  const descRisk = getDescRiskLevel(descScore);

  const ccsScore = getCCSTotalScore(state.answers);
  const ccsMax = getCCSTotalMax();
  const ccsRisk = getCCSRiskLevel(ccsScore);

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

      {/* Client info summary */}
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
      </div>

      {/* Format selection */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Select Output Format
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* DESC card */}
        <button
          onClick={() => navigate('/output/desc')}
          className="bg-white shadow rounded-lg p-6 border-2 border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all text-left group"
        >
          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-600">
            DESC Mini VAT
          </h4>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
            Extended Scoring (0&ndash;{descMax})
          </p>

          {/* Score preview */}
          <div className="bg-gray-50 rounded-md p-3 mb-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">
                {descScore}
                <span className="text-sm font-normal text-gray-400"> / {descMax}</span>
              </p>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${riskColorClasses[descRisk.color]}`}
              >
                {descRisk.level}
              </span>
            </div>
          </div>

          <ul className="text-sm text-gray-500 space-y-1">
            <li>- 9 domain score breakdown</li>
            <li>- Individual question scores</li>
            <li>- Risk level per domain</li>
            <li>- All narrative responses</li>
            <li>- Detailed vulnerability profile</li>
          </ul>
        </button>

        {/* CCS card */}
        <button
          onClick={() => navigate('/output/ccs')}
          className="bg-white shadow rounded-lg p-6 border-2 border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all text-left group"
        >
          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-600">
            CCS Simple VAT
          </h4>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
            Compact Score (0&ndash;{ccsMax})
          </p>

          {/* Score preview */}
          <div className="bg-gray-50 rounded-md p-3 mb-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">
                {ccsScore}
                <span className="text-sm font-normal text-gray-400"> / {ccsMax}</span>
              </p>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${riskColorClasses[ccsRisk.color]}`}
              >
                {ccsRisk.level}
              </span>
            </div>
          </div>

          <ul className="text-sm text-gray-500 space-y-1">
            <li>- Single composite score</li>
            <li>- Qualifying history domains</li>
            <li>- CCS screening checklist</li>
            <li>- Key findings overview</li>
            <li>- Compact referral format</li>
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
