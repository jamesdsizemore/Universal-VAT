import { useNavigate } from 'react-router-dom';
import { useVATDispatch } from '../context/VATContext';

export default function Welcome() {
  const navigate = useNavigate();
  const dispatch = useVATDispatch();

  function handleStart() {
    dispatch({ type: 'RESET' });
    navigate('/client-info');
  }

  return (
    <div className="text-center py-12">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-6">
          <svg
            className="w-10 h-10 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Universal VAT
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
          Vulnerability Assessment Tool
        </p>
        <p className="text-gray-500 max-w-2xl mx-auto">
          This tool guides you through 23 questions across 9 domains &mdash;
          Survival Skills, Organization &amp; Orientation, Medical Risks, Substance Use,
          Basic Needs, Social Behaviors, Mental Health, Communication, and Homelessness
          &mdash; plus a CCS screening checklist. Upon completion, generate either a{' '}
          <strong>DESC Mini VAT</strong> with extended scoring or a{' '}
          <strong>CCS/CCA High Acuity Shelter Referral</strong> with a compact score
          for submission to your service provider.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 text-left">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">
            DESC Mini VAT
          </h3>
          <p className="text-sm text-gray-500">
            Extended scoring (0&ndash;48) with detailed domain-by-domain breakdown,
            individual question scores, risk levels per domain, and all narrative
            responses.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">
            CCS Simple VAT
          </h3>
          <p className="text-sm text-gray-500">
            Compact score (0&ndash;21) with qualifying history domains, CCS screening
            checklist, overall risk level, and key findings for high acuity shelter
            referral.
          </p>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors"
      >
        Begin Assessment
        <svg
          className="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
    </div>
  );
}
