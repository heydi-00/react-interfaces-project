import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Users,
  Search,
  Mail,
  CheckCircle,
  UserPlus,
  Trash2,
  UserCog,
  Shield,
  X,
  Clock,
  UserCheck,
  FileText,
  Building2
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { toast } from "sonner";
export default function UserManagement({ registeredUsers, setRegisteredUsers }) {
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: "", email: "", password: "", area: "", contractNumber: "", siifCommitment: "", arl: "" });
  const [roleSelections, setRoleSelections] = useState({});
  const activeUsers = registeredUsers.filter((u) => u.role !== "pending");
  const pendingUsers = registeredUsers.filter((u) => u.role === "pending");
  const filteredActive = activeUsers.filter(
    (u) => u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPending = pendingUsers.filter(
    (u) => u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const updateUser = (id, patch) => setRegisteredUsers(registeredUsers.map((u) => u.id === id ? { ...u, ...patch } : u));
  const handleApproveUser = (user, role) => {
    updateUser(user.id, { role, status: "active" });
    toast.success(`${user.fullName} aprobado como ${role === "instructor" ? "Instructor" : "Coordinador"}`);
  };
  const handleRejectPending = (user) => {
    setRegisteredUsers(registeredUsers.filter((u) => u.id !== user.id));
    toast.success(`Solicitud de ${user.fullName} rechazada`);
  };
  const handleChangeRole = (user) => {
    const newRole = roleSelections[user.id] || user.role;
    updateUser(user.id, { role: newRole });
    toast.success(`Rol de ${user.fullName} cambiado a ${newRole}`);
  };
  const handleDeleteUser = (user) => {
    setRegisteredUsers(registeredUsers.filter((u) => u.id !== user.id));
    toast.success(`Usuario ${user.fullName} eliminado`);
  };
  const handleSendNotificationAll = () => {
    if (!notification.trim()) {
      toast.error("Por favor escribe un mensaje");
      return;
    }
    toast.success(`Notificación enviada a ${activeUsers.length} usuarios`);
    setNotification("");
  };
  const handleAddUser = () => {
    if (!newUser.fullName.trim() || !newUser.email.trim() || !newUser.password.trim()) {
      toast.error("Nombre, correo y contraseña son obligatorios");
      return;
    }
    const exists = registeredUsers.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (exists) {
      toast.error("Ya existe un usuario con ese correo");
      return;
    }
    const added = {
      id: Date.now(),
      fullName: newUser.fullName.trim(),
      email: newUser.email.trim(),
      password: newUser.password.trim(),
      role: "instructor",
      status: "active",
      registeredDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      contractNumber: newUser.contractNumber.trim(),
      siifCommitment: newUser.siifCommitment.trim(),
      arl: newUser.arl.trim(),
      area: newUser.area.trim() || "Sin área",
      compliance: 0,
      lastReport: "—"
    };
    setRegisteredUsers([...registeredUsers, added]);
    toast.success(`Instructor ${added.fullName} agregado correctamente`);
    setNewUser({ fullName: "", email: "", password: "", area: "", contractNumber: "", siifCommitment: "", arl: "" });
    setShowAddDialog(false);
  };
  const avgCompliance = activeUsers.length ? Math.round(activeUsers.reduce((s, u) => s + u.compliance, 0) / activeUsers.length) : 0;
  return <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50/20 min-h-screen">

      {
    /* Header */
  }
      <div className="mb-8 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Users size={24} />
              <p className="text-cyan-100">Administración de Personal</p>
            </div>
            <h1 className="mb-2 text-white">Gestión de Usuarios</h1>
            <p className="text-cyan-100 text-lg">Administra instructores, aprueba solicitudes y envía notificaciones</p>
          </div>
          <Button onClick={() => setShowAddDialog(true)} className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
            <UserPlus size={18} className="mr-2" />
            Agregar Usuario
          </Button>
        </div>
      </div>

      {
    /* Add User Dialog */
  }
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Instructor</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div>
              <Label>Nombre completo *</Label>
              <Input value={newUser.fullName} onChange={(e) => setNewUser((p) => ({ ...p, fullName: e.target.value }))} placeholder="Juan Pérez González" className="mt-1 border-2 focus:border-[#39A900]" />
            </div>
            <div>
              <Label>Correo electrónico *</Label>
              <Input type="email" value={newUser.email} onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))} placeholder="nombre@sena.edu.co" className="mt-1 border-2 focus:border-[#39A900]" />
            </div>
            <div>
              <Label>Contraseña inicial *</Label>
              <Input type="password" value={newUser.password} onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))} placeholder="Mínimo 6 caracteres" className="mt-1 border-2 focus:border-[#39A900]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>N° Contrato</Label>
                <Input value={newUser.contractNumber} onChange={(e) => setNewUser((p) => ({ ...p, contractNumber: e.target.value }))} placeholder="12345678" className="mt-1 border-2 focus:border-[#39A900]" />
              </div>
              <div>
                <Label>Compromiso SIIF</Label>
                <Input value={newUser.siifCommitment} onChange={(e) => setNewUser((p) => ({ ...p, siifCommitment: e.target.value }))} placeholder="SIIF-2025-001" className="mt-1 border-2 focus:border-[#39A900]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>ARL</Label>
                <Input value={newUser.arl} onChange={(e) => setNewUser((p) => ({ ...p, arl: e.target.value }))} placeholder="Positiva, Sura..." className="mt-1 border-2 focus:border-[#39A900]" />
              </div>
              <div>
                <Label>Área</Label>
                <Input value={newUser.area} onChange={(e) => setNewUser((p) => ({ ...p, area: e.target.value }))} placeholder="ADSO, TIC..." className="mt-1 border-2 focus:border-[#39A900]" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleAddUser} className="flex-1 bg-[#39A900] hover:bg-[#2d8400]">
                <UserPlus size={16} className="mr-2" />Agregar
              </Button>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}><X size={16} /></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {
    /* Stats */
  }
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
    { label: "Total usuarios", value: registeredUsers.filter((u) => u.role !== "pending").length, gradient: "from-blue-500 to-indigo-600", bg: "from-blue-50 to-indigo-50", icon: Users },
    { label: "Activos", value: activeUsers.filter((u) => u.status === "active").length, gradient: "from-green-500 to-emerald-600", bg: "from-green-50 to-emerald-50", icon: CheckCircle },
    { label: "Pendientes", value: pendingUsers.length, gradient: "from-orange-500 to-amber-600", bg: "from-orange-50 to-amber-50", icon: Clock },
    { label: "Cumpl. promedio", value: `${avgCompliance}%`, gradient: "from-[#39A900] to-green-600", bg: "from-green-50 to-green-100", icon: CheckCircle }
  ].map(({ label, value, gradient, bg, icon: Icon }) => <Card key={label} className="p-5 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${bg} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10">
              <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-3 shadow-lg`}>
                <Icon className="text-white" size={22} />
              </div>
              <div className={`text-2xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1`}>{value}</div>
              <div className="text-xs text-gray-600">{label}</div>
            </div>
          </Card>)}
      </div>

      {
    /* Notification masiva */
  }
      <Card className="p-5 mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <Mail className="text-white" size={22} />
          </div>
          <div className="flex-1">
            <h3 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Notificación Masiva</h3>
            <Textarea value={notification} onChange={(e) => setNotification(e.target.value)} placeholder="Escribe el mensaje para todos los usuarios activos..." rows={2} className="mb-2 bg-white border-2 focus:border-green-500" />
            <Button onClick={handleSendNotificationAll} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Mail size={16} className="mr-2" />Enviar a todos ({activeUsers.length} usuarios)
            </Button>
          </div>
        </div>
      </Card>

      {
    /* Tabs Activos / Pendientes */
  }
      <div className="flex gap-2 mb-4">
        <button
    onClick={() => setActiveTab("active")}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === "active" ? "bg-[#39A900] text-white shadow-lg" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
  >
          <UserCheck size={16} />
          Usuarios activos
          <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === "active" ? "bg-white/20" : "bg-gray-100"}`}>{activeUsers.length}</span>
        </button>
        <button
    onClick={() => setActiveTab("pending")}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === "pending" ? "bg-orange-500 text-white shadow-lg" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
  >
          <Clock size={16} />
          Solicitudes pendientes
          {pendingUsers.length > 0 && <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${activeTab === "pending" ? "bg-white/20" : "bg-orange-100 text-orange-600"}`}>{pendingUsers.length}</span>}
        </button>
      </div>

      {
    /* Search */
  }
      <Card className="p-4 mb-4 border-0 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por nombre o correo..." className="pl-10 border-2 focus:border-blue-400" />
        </div>
      </Card>

      {
    /* ── USUARIOS ACTIVOS ── */
  }
      {activeTab === "active" && <Card className="p-6 border-0 shadow-xl">
          <h2 className="mb-5">Lista de Usuarios</h2>
          {filteredActive.length === 0 ? <p className="text-center py-10 text-gray-400">No se encontraron usuarios</p> : <div className="space-y-3">
              {filteredActive.map((user) => <ActiveUserRow
    key={user.id}
    user={user}
    roleSelection={roleSelections[user.id] || user.role}
    onRoleSelectionChange={(role) => setRoleSelections((p) => ({ ...p, [user.id]: role }))}
    onChangeRole={() => handleChangeRole(user)}
    onDelete={() => handleDeleteUser(user)}
  />)}
            </div>}
        </Card>}

      {
    /* ── PENDIENTES ── */
  }
      {activeTab === "pending" && <Card className="p-6 border-0 shadow-xl">
          <h2 className="mb-5">Solicitudes de Registro</h2>
          {filteredPending.length === 0 ? <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserCheck className="text-[#39A900]" size={28} />
              </div>
              <p className="text-gray-500">No hay solicitudes pendientes</p>
            </div> : <div className="space-y-4">
              {filteredPending.map((user) => <PendingUserRow
    key={user.id}
    user={user}
    onApprove={(role) => handleApproveUser(user, role)}
    onReject={() => handleRejectPending(user)}
  />)}
            </div>}
        </Card>}
    </div>;
}
function ActiveUserRow({
  user,
  roleSelection,
  onRoleSelectionChange,
  onChangeRole,
  onDelete
}) {
  const [notifyMsg, setNotifyMsg] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const roleLabel = user.role === "coordinator" ? "Coordinador" : "Instructor";
  return <div className={`p-5 border-2 rounded-2xl transition-all hover:shadow-lg ${user.compliance < 80 ? "border-orange-200 bg-orange-50/30" : "border-gray-200 bg-gray-50/30"}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-[#39A900] to-green-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
            {user.fullName.split(" ").slice(0, 2).map((n) => n[0]).join("")}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-gray-900 truncate">{user.fullName}</div>
            <div className="text-sm text-gray-500 truncate">{user.email}</div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-0.5">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{roleLabel}</span>
              {user.area && <span>Área: {user.area}</span>}
              {user.contractNumber && <span>Contrato: {user.contractNumber}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className={`text-xl font-bold ${user.compliance >= 90 ? "text-[#39A900]" : user.compliance >= 75 ? "text-orange-500" : "text-red-500"}`}>
              {user.compliance}%
            </div>
            <div className="text-xs text-gray-400">Cumpl.</div>
          </div>

          <div className="flex gap-2">
            {
    /* Cambiar rol */
  }
            <Dialog open={roleOpen} onOpenChange={setRoleOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="border-2 border-[#39A900] text-[#39A900] hover:bg-green-50">
                  <UserCog size={15} className="mr-1" />Rol
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Cambiar Rol — {user.fullName}</DialogTitle></DialogHeader>
                <div className="space-y-4 mt-4">
                  <Select value={roleSelection} onValueChange={onRoleSelectionChange}>
                    <SelectTrigger className="border-2 focus:border-[#39A900]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="coordinator">Coordinador</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => {
    onChangeRole();
    setRoleOpen(false);
  }} className="w-full bg-[#39A900] hover:bg-[#2d8400]">
                    <Shield size={16} className="mr-2" />Confirmar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {
    /* Notificar */
  }
            <Dialog open={notifyOpen} onOpenChange={setNotifyOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50">
                  <Mail size={15} className="mr-1" />Notificar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Notificar a {user.fullName}</DialogTitle></DialogHeader>
                <div className="space-y-4 mt-4">
                  <Textarea value={notifyMsg} onChange={(e) => setNotifyMsg(e.target.value)} placeholder="Escribe tu mensaje..." rows={4} className="border-2 focus:border-blue-400" />
                  <Button onClick={() => {
    if (!notifyMsg.trim()) {
      toast.error("Escribe un mensaje");
      return;
    }
    toast.success(`Notificación enviada a ${user.fullName}`);
    setNotifyMsg("");
    setNotifyOpen(false);
  }} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Mail size={16} className="mr-2" />Enviar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {
    /* Eliminar */
  }
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="border-2 border-red-400 text-red-500 hover:bg-red-50">
                  <Trash2 size={15} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Se eliminará permanentemente a {user.fullName} y no podrá iniciar sesión.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>;
}
function PendingUserRow({
  user,
  onApprove,
  onReject
}) {
  const [selectedRole, setSelectedRole] = useState("instructor");
  const [approveOpen, setApproveOpen] = useState(false);
  return <div className="p-5 border-2 border-orange-200 rounded-2xl bg-gradient-to-r from-orange-50/60 to-amber-50/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
            {user.fullName.split(" ").slice(0, 2).map((n) => n[0]).join("")}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-gray-900">{user.fullName}</span>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">Pendiente</span>
            </div>
            <div className="text-sm text-gray-500 mb-2">{user.email}</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-500">
              {user.contractNumber && <span className="flex items-center gap-1"><FileText size={11} />Contrato: {user.contractNumber}</span>}
              {user.siifCommitment && <span className="flex items-center gap-1"><Shield size={11} />SIIF: {user.siifCommitment}</span>}
              {user.arl && <span className="flex items-center gap-1"><Building2 size={11} />ARL: {user.arl}</span>}
              <span className="flex items-center gap-1"><Clock size={11} />Registro: {user.registeredDate}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {
    /* Aprobar con selección de rol */
  }
          <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#39A900] hover:bg-[#2d8400]">
                <UserCheck size={15} className="mr-1" />Aprobar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Aprobar a {user.fullName}</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <p className="text-sm text-gray-600">Selecciona el rol que tendrá este usuario en el sistema:</p>
                <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v)}>
                  <SelectTrigger className="border-2 focus:border-[#39A900]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="coordinator">Coordinador</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => {
    onApprove(selectedRole);
    setApproveOpen(false);
  }} className="w-full bg-[#39A900] hover:bg-[#2d8400]">
                  <CheckCircle size={16} className="mr-2" />Confirmar aprobación
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {
    /* Rechazar */
  }
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline" className="border-2 border-red-400 text-red-500 hover:bg-red-50">
                <X size={15} className="mr-1" />Rechazar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Rechazar solicitud?</AlertDialogTitle>
                <AlertDialogDescription>
                  Se eliminará la solicitud de {user.fullName}. No podrá iniciar sesión a menos que se registre de nuevo.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onReject} className="bg-red-600 hover:bg-red-700">Rechazar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>;
}
