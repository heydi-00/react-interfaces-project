import { useState } from 'react';
import Sidebar from '../Sidebar';
import UnitView from './UnitView';
import ReportManagement from './ReportManagement';
import UserManagement from './UserManagement';
import AIAssistant from '../instructor/AIAssistant';
import Notifications from './Notifications';
import SettingsView from './SettingsView';
import PlanillasView from './PlanillasView';
import ActivityView from './ActivityView';
import ComplianceView from './ComplianceView';
import HistoryView from './HistoryView';
import Reports from './Reports';

export default function CoordinatorDashboard({
  user,
  onLogout,
  pendingUsers,
  setPendingUsers,
  planillas,
  setPlanillas,
}) {
  const [activeView, setActiveView] = useState('unit');

  const renderView = () => {
    switch (activeView) {
      case 'unit':
        return <UnitView userName={user.name} />;
      case 'report-management':
        return <ReportManagement />;
      case 'planillas':
        return <PlanillasView planillas={planillas} setPlanillas={setPlanillas} />;
      case 'user-management':
        return <UserManagement pendingUsers={pendingUsers} setPendingUsers={setPendingUsers} />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <SettingsView userName={user.name} userRole={user.role} />;
      case 'activity':
        return <ActivityView />;
      case 'compliance':
        return <ComplianceView />;
      case 'history':
        return <HistoryView />;
      case 'reports':
        return <Reports />;
      default:
        return <UnitView userName={user.name} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50/20">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
        role="coordinator"
      />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}
