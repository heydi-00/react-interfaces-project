import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Settings, User, Bell, Palette, Download, Shield, Database, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
export default function SettingsView({ user }) {
  const userName = user.name;
  const userRole = user.role;
  const [selectedColor, setSelectedColor] = useState("#39A900");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reports: true,
    alerts: true
  });
  const colorOptions = [
    { name: "Verde SENA", value: "#39A900" },
    { name: "Azul", value: "#3B82F6" },
    { name: "Púrpura", value: "#8B5CF6" },
    { name: "Naranja", value: "#F97316" },
    { name: "Rosa", value: "#EC4899" }
  ];
  const handleSave = () => {
    toast.success("Configuración guardada exitosamente");
  };
  const handleExportReports = (format) => {
    toast.success(`Exportando reportes en formato ${format}...`);
  };
  return <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50/20 min-h-screen">
      {
    /* Header */
  }
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Settings size={28} strokeWidth={2.5} />
            <h1 className="text-white">Configuración</h1>
          </div>
          <p className="text-green-100 text-lg">
            Personaliza tu experiencia en el sistema STIMI
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {
    /* Profile Settings */
  }
        <Card className="p-8 border-0 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#39A900] to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-gray-900">Perfil de Usuario</h2>
              <p className="text-sm text-gray-600">Información personal</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
    id="name"
    defaultValue={userName}
    className="mt-2 h-11 border-gray-200 rounded-xl"
  />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
    id="email"
    type="email"
    defaultValue={user.email}
    className="mt-2 h-11 border-gray-200 rounded-xl"
  />
            </div>
            <div>
              <Label htmlFor="role">Rol</Label>
              <Input
    id="role"
    value={userRole === "coordinator" ? "Coordinador" : "Instructor"}
    disabled
    className="mt-2 h-11 border-gray-200 rounded-xl bg-gray-50"
  />
            </div>
            <div>
              <Label htmlFor="password">Cambiar Contraseña</Label>
              <Input
    id="password"
    type="password"
    placeholder="Nueva contraseña"
    className="mt-2 h-11 border-gray-200 rounded-xl"
  />
            </div>
          </div>

          <Button
    onClick={handleSave}
    className="w-full mt-6 bg-gradient-to-r from-[#39A900] to-green-600 hover:from-[#2d8400] hover:to-green-700 shadow-lg shadow-green-200 rounded-xl h-11"
  >
            Guardar Cambios
          </Button>
        </Card>

        {
    /* Notification Settings */
  }
        <Card className="p-8 border-0 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bell className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-gray-900">Notificaciones</h2>
              <p className="text-sm text-gray-600">Gestiona tus alertas</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Notificaciones por Email</div>
                <div className="text-sm text-gray-600">Recibe alertas en tu correo</div>
              </div>
              <Switch
    checked={notifications.email}
    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
  />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Notificaciones Push</div>
                <div className="text-sm text-gray-600">Alertas en tiempo real</div>
              </div>
              <Switch
    checked={notifications.push}
    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
  />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Nuevos Informes</div>
                <div className="text-sm text-gray-600">Cuando se envían informes</div>
              </div>
              <Switch
    checked={notifications.reports}
    onCheckedChange={(checked) => setNotifications({ ...notifications, reports: checked })}
  />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Alertas Urgentes</div>
                <div className="text-sm text-gray-600">Informes atrasados</div>
              </div>
              <Switch
    checked={notifications.alerts}
    onCheckedChange={(checked) => setNotifications({ ...notifications, alerts: checked })}
  />
            </div>
          </div>

          <Button
    onClick={handleSave}
    className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg rounded-xl h-11 text-white"
  >
            Guardar Preferencias
          </Button>
        </Card>

        {
    /* Theme Settings */
  }
        <Card className="p-8 border-0 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <Palette className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-gray-900">Tema y Apariencia</h2>
              <p className="text-sm text-gray-600">Personaliza los colores</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Color Principal</Label>
              <div className="grid grid-cols-5 gap-3 mt-3">
                {colorOptions.map((color) => <button
    key={color.value}
    onClick={() => setSelectedColor(color.value)}
    className={`w-full aspect-square rounded-xl transition-all ${selectedColor === color.value ? "ring-4 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"}`}
    style={{ backgroundColor: color.value }}
    title={color.name}
  />)}
              </div>
            </div>
            <div>
              <Label htmlFor="theme">Modo de Color</Label>
              <Select defaultValue="light">
                <SelectTrigger className="mt-2 h-11 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Selecciona un tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Oscuro</SelectItem>
                  <SelectItem value="auto">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
    onClick={handleSave}
    className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-lg rounded-xl h-11 text-white"
  >
            Aplicar Tema
          </Button>
        </Card>

        {
    /* Export Settings */
  }
        <Card className="p-8 border-0 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <Download className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-gray-900">Exportar Reportes</h2>
              <p className="text-sm text-gray-600">Descarga informes con filtros</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="export-period">Período</Label>
              <Select defaultValue="month">
                <SelectTrigger className="mt-2 h-11 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Selecciona período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mes</SelectItem>
                  <SelectItem value="quarter">Último trimestre</SelectItem>
                  <SelectItem value="year">Último año</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="export-area">Área</Label>
              <Select defaultValue="all">
                <SelectTrigger className="mt-2 h-11 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Selecciona área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las áreas</SelectItem>
                  <SelectItem value="tic">TIC</SelectItem>
                  <SelectItem value="pae">PAE</SelectItem>
                  <SelectItem value="ge">GE</SelectItem>
                  <SelectItem value="adso">ADSO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <Button
    onClick={() => handleExportReports("PDF")}
    variant="outline"
    className="h-11 rounded-xl border-2"
  >
              <FileText size={18} className="mr-2" />
              PDF
            </Button>
            <Button
    onClick={() => handleExportReports("Excel")}
    variant="outline"
    className="h-11 rounded-xl border-2"
  >
              <Database size={18} className="mr-2" />
              Excel
            </Button>
          </div>
        </Card>

        {
    /* Security Settings */
  }
        <Card className="p-8 border-0 shadow-lg lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-gray-900">Seguridad</h2>
              <p className="text-sm text-gray-600">Configuración de acceso y privacidad</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Autenticación de dos factores</div>
                <div className="text-sm text-gray-600">Mayor seguridad en tu cuenta</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Sesiones múltiples</div>
                <div className="text-sm text-gray-600">Permitir varios dispositivos</div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Button
    onClick={handleSave}
    className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-lg rounded-xl h-11 text-white"
  >
            Actualizar Seguridad
          </Button>
        </Card>
      </div>
    </div>;
}
