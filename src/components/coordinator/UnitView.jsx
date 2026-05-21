import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Users, AlertCircle, CheckCircle, Clock, TrendingUp, Award, Target, Sparkles } from 'lucide-react';
import { Progress } from '../ui/progress';

export default function UnitView({ userName }) {
  const stats = [
    { 
      label: 'Total Instructores', 
      value: '45', 
      icon: Users, 
      gradient: 'from-[#39A900] to-green-600',
      lightGradient: 'from-green-50 to-emerald-50',
      textColor: 'text-[#39A900]',
    },
    { 
      label: 'Informes Aprobados', 
      value: '38', 
      icon: CheckCircle, 
      gradient: 'from-emerald-500 to-teal-600',
      lightGradient: 'from-emerald-50 to-teal-50',
      textColor: 'text-emerald-700',
    },
    { 
      label: 'Pendientes de Revisión', 
      value: '5', 
      icon: Clock, 
      gradient: 'from-orange-500 to-amber-600',
      lightGradient: 'from-orange-50 to-amber-50',
      textColor: 'text-orange-700',
    },
    { 
      label: 'Con Alertas', 
      value: '2', 
      icon: AlertCircle, 
      gradient: 'from-red-500 to-pink-600',
      lightGradient: 'from-red-50 to-pink-50',
      textColor: 'text-red-700',
    },
  ];

  const alerts = [
    { id: 1, instructor: 'María González', message: 'Informe GC - Noviembre sin enviar', type: 'urgent', date: '2024-11-05' },
    { id: 2, instructor: 'Pedro Sánchez', message: 'Informe GF - Noviembre requiere corrección', type: 'warning', date: '2024-11-02' },
  ];

  const pendingReports = [
    { id: 1, instructor: 'Carlos Rodríguez', report: 'Informe GF - Noviembre', date: '2024-11-04', urgent: false },
    { id: 2, instructor: 'Ana Martínez', report: 'Informe GC - Noviembre', date: '2024-11-03', urgent: false },
    { id: 3, instructor: 'Luis Fernández', report: 'Informe GC - Octubre', date: '2024-10-28', urgent: true },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50/20 min-h-screen">
      {/* Header with gradient and congratulations */}
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-emerald-300 rounded-full animate-pulse" />
            <p className="text-green-100">Panel de Control - Coordinador</p>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-yellow-300" size={28} />
            <h1 className="text-white">¡Excelente Trabajo, {userName}!</h1>
          </div>
          <p className="text-green-100 text-lg">
            Tu gestión mantiene un alto nivel de cumplimiento en la unidad
          </p>
          <div className="flex items-center gap-2 mt-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 w-fit">
            <Award className="text-yellow-300" size={20} />
            <span className="text-sm">89% de cumplimiento general</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="text-white" size={28} strokeWidth={2.5} />
                  </div>
                </div>
                <div className={`text-3xl mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Alerts Section */}
        <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-white to-red-50/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <AlertCircle className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-gray-900">Alertas</h2>
              <p className="text-sm text-gray-600">Requieren atención inmediata</p>
            </div>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border-2 ${
                  alert.type === 'urgent'
                    ? 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50'
                    : 'border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle 
                    className={alert.type === 'urgent' ? 'text-red-600' : 'text-orange-600'} 
                    size={20} 
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">{alert.instructor}</div>
                    <div className="text-sm text-gray-600">{alert.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{alert.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-lg rounded-xl h-10 text-white">
            Ver Todas las Alertas
          </Button>
        </Card>

        {/* Pending Reports */}
        <Card className="lg:col-span-2 p-8 border-0 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-1 text-gray-900">Informes Pendientes de Revisión</h2>
              <p className="text-sm text-gray-600">Requieren tu aprobación</p>
            </div>
            <Button className="bg-gradient-to-r from-[#39A900] to-green-600 hover:from-[#2d8400] hover:to-green-700 shadow-lg shadow-green-200 rounded-xl h-11 text-white">
              Ver Todos
            </Button>
          </div>

          <div className="space-y-3">
            {pendingReports.map((report) => (
              <div
                key={report.id}
                className={`p-5 rounded-2xl border-2 transition-all duration-200 ${
                  report.urgent
                    ? 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50 shadow-md'
                    : 'border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                      <FileText className="text-[#39A900]" size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-gray-900 mb-0.5">{report.instructor}</div>
                      <div className="text-sm text-gray-600">{report.report}</div>
                      <div className="text-xs text-gray-500 mt-1">{report.date}</div>
                    </div>
                  </div>
                  {report.urgent && (
                    <div className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-sm font-medium shadow-lg">
                      Urgente
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Unit Compliance Section */}
      <Card className="mt-6 p-8 border-0 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 blur-2xl" />
        
        <div className="relative z-10">
          <h2 className="mb-8 text-gray-900">Cumplimiento de la Unidad</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.89)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#39A900" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent">89%</div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-4">Cumplimiento general</div>
            </div>

            <div className="md:col-span-3 space-y-5">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-700">Noviembre 2024</span>
                  <span className="font-medium bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent">85%</span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#39A900] to-green-600 rounded-full transition-all duration-500"
                    style={{ width: '85%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-700">Octubre 2024</span>
                  <span className="font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">92%</span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
                    style={{ width: '92%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-700">Septiembre 2024</span>
                  <span className="font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">90%</span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: '90%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full mt-8 bg-gradient-to-r from-[#39A900] to-green-600 hover:from-[#2d8400] hover:to-green-700 shadow-lg shadow-green-200 rounded-xl h-11 text-white">
            <TrendingUp size={18} className="mr-2" />
            Ver Estadísticas Completas
          </Button>
        </div>
      </Card>
    </div>
  );
}
