import { LoginPage } from '../../pages/Login';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/Home';
import { NotFoundPage } from '../../pages/NotFound';
import { RegisterPage } from '../../pages/Register';
import { RestorePasswordPage } from '../../pages/RestorePassword';
import { Layout } from '../Layout';
import { RequreAuth } from '../RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/restore-password" element={<RestorePasswordPage />} />

        {/* Private routes */}
        <Route element={<RequreAuth />}> 
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Catch path */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      
    </Routes>
  )
}

export default App;
