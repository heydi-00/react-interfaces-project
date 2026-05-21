import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Bell, AlertCircle, CheckCircle, Info, FileText, UserPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Notifications() {
  const [filter, setFilter] = useState('all');
  
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Informes pendientes de revisión',
      message: 'Hay 5 informes esperando tu aprobación. Por favor revísalos antes del 10 de Noviembre',
      date: '2024-11-05',
      read: false,
      icon: AlertCircle,
      gradient: 'from-red-500 to-pink-600',
      lightBg: 'from-red-50 to-pink-50',
      borderColor: 'border-red-300'
    },
    {
      id: 2,
      type: 'success',
      title: 'Cumplimiento del 92%',
      message: 'La unidad ha alcanzado un cumplimiento del 92% este mes. ¡Excelente trabajo!',
      date: '2024-11-04',
      read: false,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-600',
      lightBg: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-300'
    },
    {
      id: 3,
      type: 'submission',
      title: 'Nuevo informe recibido',
      message: 'María González ha enviado su Informe GC de Noviembre 2024',
      date: '2024-11-03',
      read: false,
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-600',
      lightBg: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-300'
    },
    {
      id: 4,
      type: 'user',
      title: 'Nuevo instructor agregado',
      message: 'Pedro Sánchez ha sido agregado al sistema como instructor',
      date: '2024-11-02',
      read: true,
      icon: UserPlus,
      gradient: 'from-[#39A900] to-green-600',
      lightBg: 'from-green-50 to-green-100',
      borderColor: 'border-green-300'
    },
    {
      id: 5,
      type: 'info',
      title: 'Recordatorio de cierre mensual',
      message: 'El período de carga de informes cierra el 28 de Noviembre',
      date: '2024-11-01',
      read: true,
      icon: Info,
      gradient: 'from-orange-500 to-amber-600',
      lightBg: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-300'
    },
  ];

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'alerts') return notif.type === 'alert';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50/20 min-h-screen">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Bell size={24} className="animate-pulse" />
            <p className="text-green-100">Centro de Notificaciones</p>
          </div>
          <h1 className="mb-2 text-white">Notificaciones</h1>
          <p className="text-green-100 text-lg">
            Mantente al día con las últimas actualizaciones y alertas del sistema
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-8">
        <Button
          onClick={() => setFilter('all')}
          className={`rounded-xl ${
            filter === 'all'
              ? 'bg-gradient-to-r from-[#39A900] to-green-600 hover:from-green-700 hover:to-green-700 shadow-lg shadow-green-200'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Todas
        </Button>
        <Button
          onClick={() => setFilter('unread')}
          variant={filter === 'unread' ? 'default' : 'outline'}
          className={`rounded-xl ${
            filter === 'unread'
              ? 'bg-gradient-to-r from-[#39A900] to-green-600 hover:from-green-700 hover:to-green-700 shadow-lg shadow-green-200'
              : ''
          }`}
        >
          No leídas
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
              {unreadCount}
            </span>
          )}
        </Button>
        <Button
          onClick={() => setFilter('alerts')}
          variant={filter === 'alerts' ? 'default' : 'outline'}
          className={`rounded-xl ${
            filter === 'alerts'
              ? 'bg-gradient-to-r from-[#39A900] to-green-600 hover:from-green-700 hover:to-green-700 shadow-lg shadow-green-200'
              : ''
          }`}
        >
          Alertas
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <Card
              key={notification.id}
              className={`p-6 transition-all hover:shadow-xl border-0 shadow-lg relative overflow-hidden group ${
                !notification.read ? 'border-l-4 ' + notification.borderColor : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${notification.lightBg} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className={`w-14 h-14 bg-gradient-to-br ${notification.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className={`${!notification.read ? `bg-gradient-to-r ${notification.gradient} bg-clip-text text-transparent` : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 whitespace-nowrap">{notification.date}</span>
                      {!notification.read && (
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-[#39A900] to-green-600 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{notification.message}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    {!notification.read && (
                      <button className="text-sm text-[#39A900] hover:text-green-700 font-medium hover:underline">
                        Marcar como leída
                      </button>
                    )}
                    <button className="text-sm text-gray-500 hover:text-red-600 font-medium hover:underline flex items-center gap-1">
                      <Trash2 size={14} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <Card className="p-12 text-center border-0 shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="text-[#39A900]" size={32} />
          </div>
          <h3 className="text-gray-900 mb-2">No hay notificaciones</h3>
          <p className="text-gray-600">
            {filter === 'unread' ? 'Has leído todas tus notificaciones' : 'No tienes notificaciones aún'}
          </p>
        </Card>
      )}
    </div>
  );
}
