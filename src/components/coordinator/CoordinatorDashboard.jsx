import { useState } from "react";
import Sidebar from "../Sidebar";
import UnitView from "./UnitView";
import ReportManagement from "./ReportManagement";
import UserManagement from "./UserManagement";
import AIAssistant from "../instructor/AIAssistant";
import Notifications from "./Notifications";
import SettingsView from "./SettingsView";
import PlanillasView from "./PlanillasView";
import TrashView from "./TrashView";
export default function CoordinatorDashboard({
  user,
  onLogout,
  registeredUsers,
  setRegisteredUsers,
  planillas,
  setPlanillas
}) {
  const [activeView, setActiveView] = useState("unit");
  const renderView = () => {
    switch (activeView) {
      case "unit":
        return <UnitView userName={user.name} onNavigate={setActiveView} />;
      case "report-management":
        return <ReportManagement />;
      case "planillas":
        return <PlanillasView planillas={planillas} setPlanillas={setPlanillas} />;
      case "user-management":
        return <UserManagement registeredUsers={registeredUsers} setRegisteredUsers={setRegisteredUsers} />;
      case "ai-assistant":
        return <AIAssistant />;
      case "notifications":
        return <Notifications />;
      case "trash":
        return <TrashView />;
      case "settings":
        return <SettingsView user={user} />;
      default:
        return <UnitView userName={user.name} onNavigate={setActiveView} />;
    }
  };
  return <div className="flex h-screen overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50/20">
      <Sidebar
    activeView={activeView}
    onViewChange={setActiveView}
    onLogout={onLogout}
    role="coordinator"
  />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>;
}
