import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { User, Bell, Lock, Globe, Palette, Zap, HelpCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
export default function SettingsView({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSave = () => {
    toast.success("Configuración guardada correctamente");
  };
  const handleChangePassword = () => {
    if (!currentPassword) {
      toast.error("Ingresa tu contraseña actual");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    toast.success("Contraseña actualizada correctamente");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50/20 min-h-screen">
      {
    /* Header with gradient */
  }
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={24} />
            <p className="text-green-100">Personalización de Cuenta</p>
          </div>
          <h1 className="mb-2 text-white">Configuración</h1>
          <p className="text-green-100 text-lg">
            Administra tus preferencias y configuración de cuenta
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {
    /* Profile Settings */
  }
          <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#39A900] to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="text-white" size={24} />
                </div>
                <h2 className="bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent">Información Personal</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 border-2 focus:border-[#39A900] transition-colors" />
                </div>
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 border-2 focus:border-[#39A900] transition-colors" />
                </div>
                {user.contractNumber && <div>
                    <Label>Número de Contrato</Label>
                    <Input value={user.contractNumber} disabled className="mt-2 border-2 bg-gray-50 text-gray-500" />
                  </div>}
                {user.siifCommitment && <div>
                    <Label>Compromiso SIIF</Label>
                    <Input value={user.siifCommitment} disabled className="mt-2 border-2 bg-gray-50 text-gray-500" />
                  </div>}
                {user.arl && <div>
                    <Label>ARL</Label>
                    <Input value={user.arl} disabled className="mt-2 border-2 bg-gray-50 text-gray-500" />
                  </div>}
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" defaultValue="+57 300 123 4567" className="mt-2 border-2 focus:border-[#39A900] transition-colors" />
                </div>
              </div>
            </div>
          </Card>

          {
    /* Notifications */
  }
          <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bell className="text-white" size={24} />
                </div>
                <h2 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Notificaciones</h2>
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div>
                    <div className="font-medium text-gray-900">Notificaciones por email</div>
                    <div className="text-sm text-gray-600">Recibe alertas por correo electrónico</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div>
                    <div className="font-medium text-gray-900">Recordatorios de informes</div>
                    <div className="text-sm text-gray-600">Alertas antes de la fecha límite</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div>
                    <div className="font-medium text-gray-900">Actualizaciones del sistema</div>
                    <div className="text-sm text-gray-600">Novedades y mejoras</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </Card>

          {
    /* Security */
  }
          <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Lock className="text-white" size={24} />
                </div>
                <h2 className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Seguridad</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Contraseña actual</Label>
                  <Input
    id="current-password"
    type="password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
    className="mt-2 border-2 focus:border-pink-500 transition-colors"
  />
                </div>
                <div>
                  <Label htmlFor="new-password">Nueva contraseña</Label>
                  <Input
    id="new-password"
    type="password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="mt-2 border-2 focus:border-pink-500 transition-colors"
  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                  <Input
    id="confirm-password"
    type="password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="mt-2 border-2 focus:border-pink-500 transition-colors"
  />
                </div>
                <Button
    onClick={handleChangePassword}
    variant="outline"
    className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50"
  >
                  Cambiar Contraseña
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {
    /* Sidebar Info */
  }
        <div className="space-y-6">
          {
    /* Help Card */
  }
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <HelpCircle className="text-white" size={24} />
              </div>
              <h3 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">Información de Ayuda</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white/60 p-3 rounded-xl">
                  <div className="font-medium mb-1 text-gray-900">Soporte técnico</div>
                  <div className="text-gray-700">soporte@sena.edu.co</div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl">
                  <div className="font-medium mb-1 text-gray-900">Coordinador</div>
                  <div className="text-gray-700">coordinador@sena.edu.co</div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl">
                  <div className="font-medium mb-1 text-gray-900">Teléfono</div>
                  <div className="text-gray-700">(601) 5461500</div>
                </div>
              </div>
            </div>
          </Card>

          {
    /* Language Card */
  }
          <Card className="p-6 border-0 shadow-xl relative overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#39A900] to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="text-white" size={20} />
              </div>
              <h3 className="bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent">Idioma y región</h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="language">Idioma</Label>
                <select id="language" className="w-full mt-2 p-2 border-2 border-gray-200 rounded-xl focus:border-[#39A900] transition-colors">
                  <option>Español</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <Label htmlFor="timezone">Zona horaria</Label>
                <select id="timezone" className="w-full mt-2 p-2 border-2 border-gray-200 rounded-xl focus:border-[#39A900] transition-colors">
                  <option>Colombia (GMT-5)</option>
                </select>
              </div>
            </div>
          </Card>

          {
    /* Theme Card */
  }
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-200/30 rounded-full -ml-16 -mb-16 blur-2xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-[#39A900] to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Palette className="text-white" size={24} />
              </div>
              <h3 className="bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent mb-3">Apariencia</h3>
              <p className="text-sm text-gray-700 mb-4">
                Personaliza la apariencia de tu interfaz
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Modo Oscuro</span>
                <Switch />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleSave} className="bg-gradient-to-r from-[#39A900] to-green-600 hover:from-green-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all">
          <Zap size={18} className="mr-2" />
          Guardar Cambios
        </Button>
      </div>
    </div>;
}
