import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import AccountPage from './pages/AccountPage';
import ExplorePage from './pages/ExplorePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import PlaceDetailsPage from './pages/PlaceDetailsPage';
import PlannerPage from './pages/PlannerPage';
import PlannerResultPage from './pages/PlannerResultPage';
import RegisterPage from './pages/RegisterPage';
import RidePage from './pages/RidePage';
import TripsPage from './pages/TripsPage';

export default function App() {
  const location = useLocation();
  const isAuth = ['/login', '/register'].includes(location.pathname);
  return (
    <div className="min-h-screen bg-white text-ink dark:bg-[#080b14] dark:text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/places/:id" element={<PlaceDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/planner" element={<ProtectedRoute><PlannerPage /></ProtectedRoute>} />
          <Route path="/planner/result" element={<ProtectedRoute><PlannerResultPage /></ProtectedRoute>} />
          <Route path="/ride" element={<ProtectedRoute><RidePage /></ProtectedRoute>} />
          <Route path="/trips" element={<ProtectedRoute><TripsPage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAuth && <Footer />}
    </div>
  );
}
