import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Explore from './pages/Explore';
import PlaceDetail from './pages/PlaceDetail';
import RideBooking from './pages/RideBooking';
import Trips from './pages/Trips';
import MyAccount from './pages/MyAccount';
import AIPlanner from './pages/AIPlanner';
import PlanResult from './pages/PlanResult';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:id" element={<PlaceDetail />} />
          <Route path="/ride" element={<RideBooking />} />
          <Route path="/ai-planner" element={<AIPlanner />} />
          <Route path="/ai-planner/result" element={<PlanResult />} />
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <Trips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
