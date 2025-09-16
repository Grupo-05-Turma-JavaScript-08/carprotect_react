import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardClient from "./pages/dashboardclient/DashboardClient";
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import AuthPage from './pages/authpages/AuthPages';
import Sobre from './pages/sobre/sobre';
import Contato from './pages/contato/Contato';
import FormCar from './components/formcar/FormCar';
import DeletarCar from './components/deletarcar/DeletarCar';
import Footer from './components/footer/Footer';

function App() {
  return (
    // Adicionado: O BrowserRouter é necessário para que as rotas e links funcionem.
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          {/* Adicionado: A sua dashboard agora está em uma rota, como deve ser. */}
          <Route path="/" element={<Home />} />
          <Route path='/login'element={<AuthPage />} />
          <Route path="/quem-somos" element={<Sobre />} />
          <Route path='/contato' element={<Contato />} />
          <Route path="/dashboardcliente" element={<DashboardClient />} />
          <Route path="/dashboardseguradora"  />
          <Route path='/cadastrarcarro' element={<FormCar />} />
          <Route path='/editarcarro/:id' element={<FormCar />} />
          <Route path='/deletarcarro/:id' element={<DeletarCar />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
