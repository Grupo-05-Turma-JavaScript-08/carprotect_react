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
import FormCar from './components/car/formcar/FormCar';
import DeletarCar from './components/car/deletarcar/DeletarCar';
import Footer from './components/footer/Footer';
import ListaCar from './components/car/listacar/ListaCar';
import DashboardAdmin from './pages/dashboardadmin/DashBoardAdmin';

import FormInsurance from './components/insurance/forminsurance/FormInsurance';
import DeleteInsurance from './components/insurance/deleteinsurance/DeleteInsurance';
import SupportTeamCard from './pages/suporte/Suporte';

function App() {
  return (
   
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
      <Navbar />
      <div> 
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path='/logar'element={<AuthPage />} />
          <Route path="/quem-somos" element={<Sobre />} />
          <Route path='/contato' element={<Contato />} />
          <Route path="/dashboardcliente" element={<DashboardClient />} />
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route path='/carros' element={<ListaCar />} />
          <Route path='/cadastrarcarro' element={<FormCar />} />
          <Route path='/editarcarro/:id' element={<FormCar />} />
          <Route path='/deletarcarro/:id' element={<DeletarCar />} />
          <Route path='/cadastrarseguro' element={<FormInsurance />} />
          <Route path='/editarseguro/:id' element={<FormInsurance />} />
          <Route path='/deletarseguro/:id' element={<DeleteInsurance />} />
          <Route path='/suporte' element={<SupportTeamCard />} />

        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
