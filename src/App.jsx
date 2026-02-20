import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VATProvider } from './context/VATContext';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import ClientInfo from './pages/ClientInfo';
import Questionnaire from './pages/Questionnaire';
import FormatSelection from './pages/FormatSelection';
import DESCMiniVAT from './pages/DESCMiniVAT';
import CCSSimpleVAT from './pages/CCSSimpleVAT';

export default function App() {
  return (
    <VATProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/client-info" element={<ClientInfo />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/format-selection" element={<FormatSelection />} />
            <Route path="/output/desc" element={<DESCMiniVAT />} />
            <Route path="/output/ccs" element={<CCSSimpleVAT />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </VATProvider>
  );
}
