import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FileText, AlertCircle, CheckCircle, Clock, Award, Target, ArrowUp } from "lucide-react";
export default function UnitView({ userName, onNavigate }) {
  const stats = [
    {
      label: "Cumplimiento General",
      value: "95%",
      change: "+5%",
      icon: Target,
      gradient: "from-green-500 to-emerald-600",
      lightGradient: "from-green-50 to-emerald-50",
      textColor: "text-green-700",
      badge: "+5%"
    },
    {
      label: "Informes Aprobados",
      value: "10/12",
      change: "83%",
      icon: CheckCircle,
      gradient: "from-blue-500 to-cyan-600",
      lightGradient: "from-blue-50 to-cyan-50",
      textColor: "text-blue-700",
      badge: "83%"
    },
    {
      label: "Entregas a Tiempo",
      value: "11/12",
      change: "92%",
      icon: Clock,
      gradient: "from-[#39A900] to-green-600",
      lightGradient: "from-green-50 to-green-100",
      textColor: "text-[#39A900]",
      badge: "92%"
    },
    {
      label: "Promedio Calidad",
      value: "4.7/5",
      change: "+0.3",
      icon: Award,
      gradient: "from-orange-500 to-amber-600",
      lightGradient: "from-orange-50 to-amber-50",
      textColor: "text-orange-700",
      badge: "+0.3"
    }
  ];
  const recentReports = [
    { id: 1, name: "Informe GC - Octubre 2024", status: "Aprobado", date: "2024-10-28", statusColor: "bg-green-100 text-green-700 border border-green-200" },
    { id: 2, name: "Informe GF - Octubre 2024", status: "Aprobado", date: "2024-10-28", statusColor: "bg-green-100 text-green-700 border border-green-200" },
    { id: 3, name: "Informe GC - Septiembre 2024", status: "Aprobado", date: "2024-09-29", statusColor: "bg-green-100 text-green-700 border border-green-200" },
    { id: 4, name: "Informe GF - Septiembre 2024", status: "A Corregir", date: "2024-09-29", statusColor: "bg-orange-100 text-orange-700 border border-orange-200" }
  ];
  return <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50/20 min-h-screen">
      {
    /* Header with gradient */
  }
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <p className="text-green-100">Panel de Control</p>
          </div>
          <h1 className="mb-2 text-white">Mi Cumplimiento</h1>
          <p className="text-green-100 text-lg">
            Análisis detallado de tu desempeño
          </p>
        </div>
      </div>

      {
    /* Info Alert */
  }
      <Card className="p-5 mb-8 border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-br from-[#39A900] to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <AlertCircle className="text-white" size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-gray-900 mb-1">Período de Carga de Informes</h3>
            <p className="text-gray-600 leading-relaxed">
              La plataforma estará habilitada para subir informes del <strong>1 al 28 de cada mes</strong>. 
              Asegúrate de entregar tus informes a tiempo.
            </p>
          </div>
        </div>
      </Card>

      {
    /* Stats Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
    const Icon = stat.icon;
    return <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="text-white" size={28} strokeWidth={2.5} />
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${stat.lightGradient} ${stat.textColor}`}>
                    <ArrowUp size={14} strokeWidth={3} />
                    <span className="text-sm">{stat.badge}</span>
                  </div>
                </div>
                <div className={`text-3xl mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </Card>;
  })}
      </div>

      {
    /* Recent Reports */
  }
      <Card className="p-8 mb-8 border-0 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="mb-1 text-gray-900">Informes Recientes</h2>
            <p className="text-sm text-gray-600">Últimos informes entregados y su estado</p>
          </div>
          <Button
    onClick={() => onNavigate?.("new-report")}
    className="bg-gradient-to-r from-[#39A900] to-green-600 hover:from-green-700 hover:to-green-700 shadow-lg shadow-green-200 rounded-xl h-11"
  >
            <FileText size={18} className="mr-2" />
            Nuevo Informe
          </Button>
        </div>

        <div className="space-y-3">
          {recentReports.map((report) => <div
    key={report.id}
    className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-2xl hover:shadow-md transition-all duration-200 border border-gray-100"
  >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                  <FileText className="text-[#39A900]" size={22} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">{report.name}</div>
                  <div className="text-sm text-gray-500">{report.date}</div>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl text-sm font-medium ${report.statusColor}`}>
                {report.status}
              </div>
            </div>)}
        </div>
      </Card>

      {
    /* Cumplimiento Progress */
  }
      <Card className="p-8 border-0 shadow-lg">
        <h2 className="mb-6 text-gray-900">Cumplimiento Mensual</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-700">Noviembre 2024</span>
              <span className="font-medium bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent">85%</span>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#39A900] to-green-600 rounded-full transition-all duration-500"
    style={{ width: "85%" }}
  />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-700">Octubre 2024</span>
              <span className="font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">100%</span>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
    style={{ width: "100%" }}
  />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-700">Septiembre 2024</span>
              <span className="font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">92%</span>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full transition-all duration-500"
    style={{ width: "92%" }}
  />
            </div>
          </div>
        </div>
      </Card>
    </div>;
}
