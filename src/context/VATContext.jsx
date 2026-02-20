import { createContext, useContext, useReducer } from 'react';

const VATContext = createContext(null);
const VATDispatchContext = createContext(null);

const initialState = {
  hmisUid: '',
  completionDate: new Date().toISOString().split('T')[0],
  answers: {},
  currentDomainIndex: 0,
};

function vatReducer(state, action) {
  switch (action.type) {
    case 'SET_CLIENT_INFO':
      return {
        ...state,
        hmisUid: action.hmisUid,
        completionDate: action.completionDate,
      };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      };
    case 'SET_DOMAIN_INDEX':
      return { ...state, currentDomainIndex: action.index };
    case 'RESET':
      return { ...initialState, completionDate: new Date().toISOString().split('T')[0] };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function VATProvider({ children }) {
  const [state, dispatch] = useReducer(vatReducer, initialState);

  return (
    <VATContext.Provider value={state}>
      <VATDispatchContext.Provider value={dispatch}>
        {children}
      </VATDispatchContext.Provider>
    </VATContext.Provider>
  );
}

export function useVAT() {
  const context = useContext(VATContext);
  if (!context) throw new Error('useVAT must be used within a VATProvider');
  return context;
}

export function useVATDispatch() {
  const context = useContext(VATDispatchContext);
  if (!context) throw new Error('useVATDispatch must be used within a VATProvider');
  return context;
}
