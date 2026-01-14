import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { DiagnosisPage } from './pages/DiagnosisPage';
import { SourcingPage } from './pages/SourcingPage';
import { MarketPage } from './pages/MarketPage';
import { StrategyPage } from './pages/StrategyPage';
import { SchemesPage } from './pages/SchemesPage';
import Scene from './components/3d/Scene';
import AgentHUD from './components/ui/AgentHUD';

export default function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen overflow-hidden bg-cyber-black text-cyber-text font-ui selection:bg-cyber-green/30">
        <Scene />
        <div className="relative z-10 w-full h-full">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/diagnosis" element={<DiagnosisPage />} />
              <Route path="/sourcing" element={<SourcingPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/strategy" element={<StrategyPage />} />
              <Route path="/schemes" element={<SchemesPage />} />
            </Routes>
          </Layout>
          {/* Simulated Agent Status - defaults to Triage for now */}
          <AgentHUD activeAgent="triage" />
        </div>
      </div>
    </Router>
  );
}
