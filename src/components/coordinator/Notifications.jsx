import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Bell, AlertCircle, CheckCircle, Info, FileText, UserPlus, Trash2, CheckCheck, RotateCcw, Inbox } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const initialNotifications = [
  {
    id: 1,
    type: "alert",
    title: "Informes pendientes de revisión",
    message: "Hay 5 informes esperando tu aprobación. Por favor revísalos antes del 10 de Noviembre",
    date: "2024-11-05",
    read: false,
    icon: AlertCircle,
    gradient: "from-red-500 to-pink-600",
    lightBg: "from-red-50 to-pink-50",
    borderColor: "border-red-300"
  },
  {
    id: 2,
    type: "success",
    title: "Cumplimiento del 92%",
    message: "La unidad ha alcanzado un cumplimiento del 92% este mes. ¡Excelente trabajo!",
    date: "2024-11-04",
    read: false,
    icon: CheckCircle,
    gradient: "from-green-500 to-emerald-600",
    lightBg: "from-green-50 to-emerald-50",
    borderColor: "border-green-300"
  },
  {
    id: 3,
    type: "submission",
    title: "Nuevo informe recibido",
    message: "María González ha enviado su Informe GC de Noviembre 2024",
    date: "2024-11-03",
    read: false,
    icon: FileText,
    gradient: "from-blue-500 to-cyan-600",
    lightBg: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-300"
  },
  {
    id: 4,
    type: "user",
    title: "Nuevo instructor agregado",
    message: "Pedro Sánchez ha sido agregado al sistema como instructor",
    date: "2024-11-02",
    read: true,
    icon: UserPlus,
    gradient: "from-[#39A900] to-green-600",
    lightBg: "from-green-50 to-green-100",
    borderColor: "border-green-300"
  },
  {
    id: 5,
    type: "info",
    title: "Recordatorio de cierre mensual",
    message: "El período de carga de informes cierra el 28 de Noviembre",
    date: "2024-11-01",
    read: true,
    icon: Info,
    gradient: "from-orange-500 to-amber-600",
    lightBg: "from-orange-50 to-amber-50",
    borderColor: "border-orange-300"
  }
];
export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [trash, setTrash] = useState([]);
  const [view, setView] = useState("inbox");
  const [filter, setFilter] = useState("all");
  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
    toast.success("Notificación marcada como leída");
  };
  const moveToTrash = (id) => {
    const notif = notifications.find((n) => n.id === id);
    if (!notif) return;
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setTrash((prev) => [notif, ...prev]);
    toast("Notificación movida a la papelera", {
      action: { label: "Deshacer", onClick: () => restore(id, notif) }
    });
  };
  const moveAllToTrash = () => {
    setTrash((prev) => [...notifications, ...prev]);
    setNotifications([]);
    toast.success("Todas las notificaciones movidas a la papelera");
  };
  const restore = (id, notif) => {
    const target = notif || trash.find((n) => n.id === id);
    if (!target) return;
    setTrash((prev) => prev.filter((n) => n.id !== id));
    setNotifications((prev) => [target, ...prev]);
    toast.success("Notificación restaurada");
  };
  const restoreAll = () => {
    setNotifications((prev) => [...trash, ...prev]);
    setTrash([]);
    toast.success("Todas las notificaciones restauradas");
  };
  const deletePermanently = (id) => {
    setTrash((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notificación eliminada permanentemente");
  };
  const emptyTrash = () => {
    setTrash([]);
    toast.success("Papelera vaciada");
  };
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("Todas las notificaciones marcadas como leídas");
  };
  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "alerts") return notif.type === "alert";
    return true;
  });
  const unreadCount = notifications.filter((n) => !n.read).length;
  return <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50/20 min-h-screen">
      {
    /* Header */
  }
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Bell size={24} className="animate-pulse" />
                <p className="text-green-100">Centro de Notificaciones</p>
              </div>
              <h1 className="mb-2 text-white">Notificaciones</h1>
              <p className="text-green-100 text-lg">
                Mantente al día con las últimas actualizaciones y alertas del sistema
              </p>
            </div>
            <div className="flex gap-3">
              {unreadCount > 0 && view === "inbox" && <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
                  <div className="text-3xl font-bold">{unreadCount}</div>
                  <div className="text-green-100 text-sm">sin leer</div>
                </div>}
              {trash.length > 0 && <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
                  <div className="text-3xl font-bold">{trash.length}</div>
                  <div className="text-green-100 text-sm">en papelera</div>
                </div>}
            </div>
          </div>
        </div>
      </div>

      {
    /* View tabs */
  }
      <div className="flex gap-2 mb-6">
        <button
    onClick={() => setView("inbox")}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${view === "inbox" ? "bg-[#39A900] text-white shadow-lg shadow-green-200" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
  >
          <Inbox size={16} />
          Bandeja
          {notifications.length > 0 && <span className={`px-1.5 py-0.5 rounded-full text-xs ${view === "inbox" ? "bg-white/20" : "bg-gray-100"}`}>
              {notifications.length}
            </span>}
        </button>
        <button
    onClick={() => setView("trash")}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${view === "trash" ? "bg-red-500 text-white shadow-lg shadow-red-200" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
  >
          <Trash2 size={16} />
          Papelera
          {trash.length > 0 && <span className={`px-1.5 py-0.5 rounded-full text-xs ${view === "trash" ? "bg-white/20" : "bg-red-100 text-red-600"}`}>
              {trash.length}
            </span>}
        </button>
      </div>

      {
    /* ── INBOX ── */
  }
      {view === "inbox" && <>
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex gap-3">
              {["all", "unread", "alerts"].map((f) => <Button
    key={f}
    onClick={() => setFilter(f)}
    variant={filter === f ? "default" : "outline"}
    className={`rounded-xl ${filter === f ? "bg-gradient-to-r from-[#39A900] to-green-600 hover:from-green-700 hover:to-green-700 shadow-lg shadow-green-200" : ""}`}
  >
                  {f === "all" && `Todas (${notifications.length})`}
                  {f === "unread" && <>
                      No leídas
                      {unreadCount > 0 && <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                          {unreadCount}
                        </span>}
                    </>}
                  {f === "alerts" && "Alertas"}
                </Button>)}
            </div>

            {notifications.length > 0 && <div className="flex gap-2">
                {unreadCount > 0 && <Button
    variant="outline"
    onClick={markAllAsRead}
    className="rounded-xl border-[#39A900] text-[#39A900] hover:bg-green-50 gap-2"
  >
                    <CheckCheck size={16} />
                    Marcar todas como leídas
                  </Button>}
                <Button
    variant="outline"
    onClick={moveAllToTrash}
    className="rounded-xl border-red-300 text-red-500 hover:bg-red-50 gap-2"
  >
                  <Trash2 size={16} />
                  Eliminar todas
                </Button>
              </div>}
          </div>

          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
    const Icon = notification.icon;
    return <Card
      key={notification.id}
      className={`p-6 transition-all hover:shadow-xl border-0 shadow-lg relative overflow-hidden group ${!notification.read ? "border-l-4 " + notification.borderColor : ""}`}
    >
                  <div className={`absolute inset-0 bg-gradient-to-r ${notification.lightBg} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${notification.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="text-white" size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className={!notification.read ? `bg-gradient-to-r ${notification.gradient} bg-clip-text text-transparent` : "text-gray-900"}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 whitespace-nowrap">{notification.date}</span>
                          {!notification.read && <div className="w-2.5 h-2.5 bg-[#39A900] rounded-full animate-pulse flex-shrink-0" />}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{notification.message}</p>
                      <div className="flex items-center gap-4 mt-4">
                        {!notification.read ? <button
      onClick={() => markAsRead(notification.id)}
      className="text-sm text-[#39A900] hover:text-green-700 font-medium flex items-center gap-1.5 transition-colors"
    >
                            <CheckCheck size={14} />
                            Marcar como leída
                          </button> : <span className="text-xs text-gray-400 flex items-center gap-1">
                            <CheckCheck size={13} />
                            Leída
                          </span>}
                        <button
      onClick={() => moveToTrash(notification.id)}
      className="text-sm text-gray-400 hover:text-red-600 font-medium flex items-center gap-1.5 transition-colors ml-auto"
    >
                          <Trash2 size={14} />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>;
  })}
          </div>

          {filteredNotifications.length === 0 && <Card className="p-12 text-center border-0 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="text-[#39A900]" size={32} />
              </div>
              <h3 className="text-gray-900 mb-2">No hay notificaciones</h3>
              <p className="text-gray-600">
                {filter === "unread" ? "Has leído todas tus notificaciones" : filter === "alerts" ? "No tienes alertas activas" : "No tienes notificaciones aún"}
              </p>
            </Card>}
        </>}

      {
    /* ── PAPELERA ── */
  }
      {view === "trash" && <>
          {trash.length > 0 && <div className="flex justify-end gap-2 mb-6">
              <Button
    variant="outline"
    onClick={restoreAll}
    className="rounded-xl border-[#39A900] text-[#39A900] hover:bg-green-50 gap-2"
  >
                <RotateCcw size={16} />
                Restaurar todas
              </Button>
              <Button
    variant="outline"
    onClick={emptyTrash}
    className="rounded-xl border-red-400 text-red-600 hover:bg-red-50 gap-2"
  >
                <Trash2 size={16} />
                Vaciar papelera
              </Button>
            </div>}

          <div className="space-y-4">
            {trash.map((notification) => {
    const Icon = notification.icon;
    return <Card
      key={notification.id}
      className="p-6 border-0 shadow-lg relative overflow-hidden opacity-75 hover:opacity-100 transition-all"
    >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${notification.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg grayscale`}>
                      <Icon className="text-white" size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-gray-500 line-through">{notification.title}</h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{notification.date}</span>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-sm line-clamp-2">{notification.message}</p>
                      <div className="flex items-center gap-3 mt-4">
                        <button
      onClick={() => restore(notification.id)}
      className="text-sm text-[#39A900] hover:text-green-700 font-medium flex items-center gap-1.5 transition-colors"
    >
                          <RotateCcw size={14} />
                          Restaurar
                        </button>
                        <button
      onClick={() => deletePermanently(notification.id)}
      className="text-sm text-red-400 hover:text-red-600 font-medium flex items-center gap-1.5 transition-colors ml-auto"
    >
                          <Trash2 size={14} />
                          Eliminar permanentemente
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>;
  })}
          </div>

          {trash.length === 0 && <Card className="p-12 text-center border-0 shadow-lg border-dashed border-2">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-gray-400" size={32} />
              </div>
              <h3 className="text-gray-500 mb-2">Papelera vacía</h3>
              <p className="text-gray-400 text-sm">Las notificaciones eliminadas aparecerán aquí</p>
            </Card>}
        </>}
    </div>;
}
