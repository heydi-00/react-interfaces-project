import {
  Home,
  FileText,
  Bell,
  Bot,
  Settings,
  LogOut,
  Users,
  ClipboardList,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';



export default function Sidebar({
  activeView,
  onViewChange,
  onLogout,
  role,
  notificationCount = 3,
}) {
  const instructorMenuItems = [
    { id: 'unit', label: 'Mi Unidad', icon: Home },
    { id: 'new-report', label: 'Nuevo Informe', icon: FileText },
    { id: 'notifications', label: 'Notificaciones', icon: Bell, badge: notificationCount },
    { id: 'ai-assistant', label: 'Asistente IA', icon: Bot },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  const coordinatorMenuItems = [
    { id: 'unit', label: 'Mi Unidad', icon: Home },
    { id: 'report-management', label: 'Gestión de Informes', icon: FileText },
    { id: 'planillas', label: 'Planillas', icon: ClipboardList },
    { id: 'user-management', label: 'Gestión de Usuarios', icon: Users },
    { id: 'ai-assistant', label: 'Asistente IA', icon: Bot },
    { id: 'notifications', label: 'Notificaciones', icon: Bell, badge: notificationCount },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  const menuItems = role === 'instructor' ? instructorMenuItems : coordinatorMenuItems;

  return (
    <div className="w-72 bg-white border-r border-gray-100 h-screen flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#39A900] via-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-200">
            <FileText size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent">SITMI</h2>
            <p className="text-xs text-gray-500 capitalize font-medium">{role}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onViewChange(item.id)}
                className={`w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-[#39A900] hover:from-green-100 hover:to-emerald-100 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="bg-gradient-to-r from-[#39A900] to-green-600 text-white border-0 shadow-md">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start gap-3 h-12 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  );
}

