import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVAT, useVATDispatch } from '../context/VATContext';

export default function ClientInfo() {
  const state = useVAT();
  const dispatch = useVATDispatch();
  const navigate = useNavigate();

  const [hmisUid, setHmisUid] = useState(state.hmisUid);
  const [completionDate, setCompletionDate] = useState(state.completionDate);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!hmisUid.trim()) {
      setError('HMIS UID is required.');
      return;
    }
    if (!completionDate) {
      setError('Completion date is required.');
      return;
    }
    dispatch({ type: 'SET_CLIENT_INFO', hmisUid: hmisUid.trim(), completionDate });
    dispatch({ type: 'SET_DOMAIN_INDEX', index: 0 });
    navigate('/questionnaire');
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Client Information
      </h2>
      <p className="text-gray-500 mb-6">
        Enter the client identifier and the date of this assessment.
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
        <div>
          <label
            htmlFor="hmisUid"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            HMIS UID <span className="text-red-500">*</span>
          </label>
          <input
            id="hmisUid"
            type="text"
            value={hmisUid}
            onChange={(e) => {
              setHmisUid(e.target.value);
              setError('');
            }}
            placeholder="Enter HMIS Unique Identifier"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="completionDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Assessment <span className="text-red-500">*</span>
          </label>
          <input
            id="completionDate"
            type="date"
            value={completionDate}
            onChange={(e) => {
              setCompletionDate(e.target.value);
              setError('');
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
