import { useState } from "react";
import Login from "./components/Login";
import InstructorDashboard from "./components/instructor/InstructorDashboard";
import CoordinatorDashboard from "./components/coordinator/CoordinatorDashboard";
import { Toaster } from "./components/ui/sonner";
const demoUsers = [
  {
    id: 1,
    fullName: "Juan Instructor",
    email: "instructor@sena.edu.co",
    password: "123",
    role: "instructor",
    status: "active",
    registeredDate: "2024-01-15",
    contractNumber: "12345678",
    siifCommitment: "SIIF-2025-001",
    arl: "Positiva",
    area: "ADSO",
    compliance: 95,
    lastReport: "2024-11-05"
  },
  {
    id: 2,
    fullName: "María Coordinadora",
    email: "coordinador@sena.edu.co",
    password: "123",
    role: "coordinator",
    status: "active",
    registeredDate: "2024-01-10",
    contractNumber: "87654321",
    siifCommitment: "SIIF-2025-002",
    arl: "Sura",
    area: "Coordinación",
    compliance: 100,
    lastReport: "2024-11-05"
  }
];
export default function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState(demoUsers);
  const [planillas, setPlanillas] = useState([]);
  const handleLogin = (email, password) => {
    const found = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return "invalid";
    if (found.role === "pending") return "pending";
    if (found.status === "inactive") return "invalid";
    setLoggedUser({
      id: found.id,
      name: found.fullName,
      email: found.email,
      role: found.role,
      contractNumber: found.contractNumber,
      siifCommitment: found.siifCommitment,
      arl: found.arl,
      area: found.area
    });
    return "ok";
  };
  const handleLogout = () => setLoggedUser(null);
  const handleRegister = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      role: "pending",
      status: "active",
      registeredDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      compliance: 0,
      lastReport: "—"
    };
    setRegisteredUsers((prev) => [...prev, newUser]);
  };
  return <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/30">
      <Toaster position="top-right" />
      {!loggedUser ? <Login
    onLogin={handleLogin}
    onRegister={handleRegister}
    registeredUsers={registeredUsers}
  /> : loggedUser.role === "instructor" ? <InstructorDashboard
    user={loggedUser}
    onLogout={handleLogout}
    planillas={planillas}
  /> : <CoordinatorDashboard
    user={loggedUser}
    onLogout={handleLogout}
    registeredUsers={registeredUsers}
    setRegisteredUsers={setRegisteredUsers}
    planillas={planillas}
    setPlanillas={setPlanillas}
  />}
    </div>;
}
