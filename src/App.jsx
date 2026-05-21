import { useState } from 'react';
import Login from './components/Login';
import InstructorDashboard from './components/instructor/InstructorDashboard';
import CoordinatorDashboard from './components/coordinator/CoordinatorDashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [user, setUser] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [planillas, setPlanillas] = useState([]);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  const handleRegister = (userData) => {
    const newUser = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      fullName: userData.fullName,
      role: 'pending',
      status: 'active',
      registeredDate: new Date().toISOString().split('T')[0],
    };
    setPendingUsers([...pendingUsers, newUser]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/30">
      <Toaster position="top-right" />
      {!user ? (
        <Login onLogin={handleLogin} onRegister={handleRegister} />
      ) : user.role === 'instructor' ? (
        <InstructorDashboard user={user} onLogout={handleLogout} planillas={planillas} />
      ) : (
        <CoordinatorDashboard
          user={user}
          onLogout={handleLogout}
          pendingUsers={pendingUsers}
          setPendingUsers={setPendingUsers}
          planillas={planillas}
          setPlanillas={setPlanillas}
        />
      )}
    </div>
  );
}
