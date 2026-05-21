import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Users, Search, Mail, CheckCircle, AlertCircle, UserPlus, Trash2, UserCog, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { toast } from 'sonner';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');

  const instructors = [
    { id: 1, name: 'María González', email: 'maria.gonzalez@sena.edu.co', compliance: 100, status: 'active', lastReport: '2024-11-05', role: 'Instructor', area: 'ADSO' },
    { id: 2, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@sena.edu.co', compliance: 95, status: 'active', lastReport: '2024-11-04', role: 'Instructor', area: 'Redes' },
    { id: 3, name: 'Ana Martínez', email: 'ana.martinez@sena.edu.co', compliance: 100, status: 'active', lastReport: '2024-11-03', role: 'Instructor', area: 'Barismo' },
    { id: 4, name: 'Pedro Sánchez', email: 'pedro.sanchez@sena.edu.co', compliance: 88, status: 'active', lastReport: '2024-11-02', role: 'Instructor', area: 'Construcción' },
    { id: 5, name: 'Laura Jiménez', email: 'laura.jimenez@sena.edu.co', compliance: 98, status: 'active', lastReport: '2024-11-05', role: 'Instructor', area: 'Cocina' },
    { id: 6, name: 'Miguel Torres', email: 'miguel.torres@sena.edu.co', compliance: 96, status: 'active', lastReport: '2024-11-04', role: 'Instructor', area: 'TIC' },
    { id: 7, name: 'Juan Pérez', email: 'juan.perez@sena.edu.co', compliance: 75, status: 'warning', lastReport: '2024-10-28', role: 'Instructor', area: 'PAE' },
    { id: 8, name: 'Sofia Ramírez', email: 'sofia.ramirez@sena.edu.co', compliance: 80, status: 'warning', lastReport: '2024-10-29', role: 'Instructor', area: 'GE' },
  ];

  const handleSendNotificationAll = () => {
    if (!notification.trim()) {
      toast.error('Por favor escribe un mensaje');
      return;
    }
    toast.success(`Notificación enviada a ${instructors.length} instructores`);
    setNotification('');
  };

  const handleSendNotificationOne = (instructor) => {
    toast.success(`Notificación enviada a ${instructor.name}`);
  };

  const handleDeleteUser = (instructor) => {
    toast.success(`Usuario ${instructor.name} eliminado correctamente`);
  };

  const handleChangeRole = (instructor, newRole) => {
    toast.success(`Rol de ${instructor.name} cambiado a ${newRole}`);
  };

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50/20 min-h-screen">
      {/* Header with gradient */}
      <div className="mb-8 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Users size={24} />
                <p className="text-cyan-100">Administración de Personal</p>
              </div>
              <h1 className="mb-2 text-white">Gestión de Usuarios</h1>
              <p className="text-cyan-100 text-lg">
                Administra instructores y envía notificaciones
              </p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
              <UserPlus size={18} className="mr-2" />
              Agregar Instructor
            </Button>
          </div>
        </div>
      </div>

      {/* Send Notification to All */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-200/30 rounded-full -mr-24 -mt-24 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Mail className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">Enviar Notificación Masiva</h3>
              <Textarea
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
                placeholder="Escribe aquí el mensaje que deseas enviar a todos los instructores..."
                rows={3}
                className="mb-3 bg-white border-2 focus:border-green-500 transition-colors"
              />
              <Button onClick={handleSendNotificationAll} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                <Mail size={18} className="mr-2" />
                Enviar a Todos ({instructors.length} instructores)
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4 mb-6 border-0 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar instructor por nombre o correo..."
            className="pl-10 border-2 focus:border-blue-500 transition-colors"
          />
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Users className="text-white" size={28} />
            </div>
            <div className="text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">{instructors.length}</div>
            <div className="text-sm text-gray-600">Total Instructores</div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <CheckCircle className="text-white" size={28} />
            </div>
            <div className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
              {instructors.filter(i => i.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Activos</div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <AlertCircle className="text-white" size={28} />
            </div>
            <div className="text-3xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-1">
              {instructors.filter(i => i.status === 'warning').length}
            </div>
            <div className="text-sm text-gray-600">Con Alertas</div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-[#39A900] to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <CheckCircle className="text-white" size={28} />
            </div>
            <div className="text-3xl bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent mb-1">89%</div>
            <div className="text-sm text-gray-600">Cumplimiento Promedio</div>
          </div>
        </Card>
      </div>

      {/* Instructors List */}
      <Card className="p-6 border-0 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full -ml-48 -mt-48 blur-3xl" />
        <div className="relative z-10">
          <h2 className="mb-6">Lista de Instructores</h2>
          <div className="space-y-3">
            {filteredInstructors.map((instructor) => (
              <div
                key={instructor.id}
                className={`p-5 border-2 rounded-2xl transition-all hover:shadow-lg ${
                  instructor.status === 'warning'
                    ? 'border-orange-200 bg-gradient-to-r from-orange-50/50 to-amber-50/50'
                    : 'border-gray-200 bg-gradient-to-r from-gray-50/50 to-blue-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#39A900] to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      {instructor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{instructor.name}</div>
                      <div className="text-sm text-gray-600">{instructor.email}</div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span>Área: {instructor.area}</span>
                        <span>•</span>
                        <span>Último informe: {instructor.lastReport}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-2xl ${
                        instructor.compliance >= 90 ? 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent' :
                        instructor.compliance >= 80 ? 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent' :
                        'bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'
                      }`}>
                        {instructor.compliance}%
                      </div>
                      <div className="text-xs text-gray-500">Cumplimiento</div>
                    </div>

                    <div className="flex gap-2">
                      {/* Change Role */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-[#39A900] text-[#39A900] hover:bg-green-50 transition-all"
                          >
                            <UserCog size={16} className="mr-2" />
                            Rol
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cambiar Rol - {instructor.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="block mb-2 text-sm font-medium">Nuevo Rol</label>
                              <Select defaultValue={instructor.role}>
                                <SelectTrigger className="border-2 focus:border-[#39A900]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Instructor">Instructor</SelectItem>
                                  <SelectItem value="Coordinador">Coordinador</SelectItem>
                                  <SelectItem value="Administrador">Administrador</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              onClick={() => handleChangeRole(instructor, 'Coordinador')}
                              className="w-full bg-gradient-to-r from-[#39A900] to-green-600 hover:from-green-700 hover:to-green-700"
                            >
                              <Shield size={18} className="mr-2" />
                              Cambiar Rol
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Notify */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-all"
                          >
                            <Mail size={16} className="mr-2" />
                            Notificar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Enviar Notificación a {instructor.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <Textarea
                              placeholder="Escribe tu mensaje aquí..."
                              rows={4}
                              className="border-2 focus:border-blue-500"
                            />
                            <Button 
                              onClick={() => handleSendNotificationOne(instructor)}
                              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                              <Mail size={18} className="mr-2" />
                              Enviar Notificación
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-red-500 text-red-600 hover:bg-red-50 transition-all"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Eliminar
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción eliminará permanentemente al usuario {instructor.name} y todos sus datos asociados. 
                              Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(instructor)}
                              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                            >
                              Eliminar Usuario
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}