import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/style.css";
import Aos from "aos";
import { useEffect } from "react";
import NotFoundPage from "./views/404";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import { PrivateRoutes } from "./lib/hoc/PrivateRoutes";
import { Provider } from 'react-redux';

import "./i18n";
import store from "./lib/redux/Store";
import Tour from "./views/Tours";
import Dashboard from "./views/Dashboard";
import GenerateModel from "./views/GenerateModel";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path="/">

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/tours" element={<Tour />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/generate-model" element={<GenerateModel />} />
            
            <Route path="/404" element={<NotFoundPage />} />

            {/* <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
            <Route path="/logout" element={<PrivateRoutes><Logout /></PrivateRoutes>} /> */}

          </Route>
        </Routes>

        {/* <ScrollTopBehaviour /> */}
      </BrowserRouter>
    </Provider>
  );
}


const Logout = () => {
  localStorage.removeItem('auth_token')

  window.location.href = '/'

}

export default App;
