import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardClient from "./pages/dashboardclient/DashboardClient";

function App() {
  return (
    // Adicionado: O BrowserRouter é necessário para que as rotas e links funcionem.
    <BrowserRouter>
      <Routes>
        {/* Adicionado: A sua dashboard agora está em uma rota, como deve ser. */}
        <Route path="/dashboard" element={<DashboardClient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
