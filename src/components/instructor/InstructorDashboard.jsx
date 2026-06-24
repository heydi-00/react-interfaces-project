import { useState } from "react";
import Sidebar from "../Sidebar";
import UnitView from "./UnitView";
import NewReport from "./NewReport";
import Notifications from "./Notifications";
import AIAssistant from "./AIAssistant";
import SettingsView from "./SettingsView";
import TrashView from "./TrashView";
export default function InstructorDashboard({ user, onLogout, planillas }) {
  const [activeView, setActiveView] = useState("unit");
  const renderView = () => {
    switch (activeView) {
      case "unit":
        return <UnitView userName={user.name} onNavigate={setActiveView} />;
      case "new-report":
        return <NewReport planillas={planillas} />;
      case "notifications":
        return <Notifications />;
      case "ai-assistant":
        return <AIAssistant />;
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
    role="instructor"
  />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>;
}
