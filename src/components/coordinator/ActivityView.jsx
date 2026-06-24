import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  FileText,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Activity as ActivityIcon
} from "lucide-react";
export default function ActivityView() {
  const activities = [
    {
      id: 1,
      type: "approval",
      user: "Juan Pérez",
      action: "aprobó el",
      target: "Informe GC - Octubre 2024",
      time: "Hace 5 minutos",
      icon: CheckCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 2,
      type: "submission",
      user: "María García",
      action: "envió el",
      target: "Informe GF - Noviembre 2024",
      time: "Hace 15 minutos",
      icon: FileText,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 3,
      type: "correction",
      user: "Carlos López",
      action: "solicitó correcciones en",
      target: "Informe GC - Noviembre 2024",
      time: "Hace 1 hora",
      icon: AlertCircle,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: 4,
      type: "user",
      user: "Admin",
      action: "agregó al usuario",
      target: "Ana Martínez (Instructor)",
      time: "Hace 2 horas",
      icon: UserPlus,
      iconColor: "text-[#39A900]",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 5,
      type: "rejection",
      user: "Juan Pérez",
      action: "rechazó el",
      target: "Informe GF - Octubre 2024",
      time: "Hace 3 horas",
      icon: XCircle,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      id: 6,
      type: "approval",
      user: "María García",
      action: "aprobó el",
      target: "Informe GC - Septiembre 2024",
      time: "Hace 5 horas",
      icon: CheckCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 7,
      type: "submission",
      user: "Pedro Sánchez",
      action: "envió el",
      target: "Informe GF - Noviembre 2024",
      time: "Hace 1 día",
      icon: FileText,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }
  ];
  const stats = [
    {
      label: "Acciones Hoy",
      value: "24",
      icon: ActivityIcon,
      gradient: "from-[#39A900] to-green-600",
      lightBg: "from-green-50 to-green-100"
    },
    {
      label: "Informes Revisados",
      value: "12",
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50"
    },
    {
      label: "Pendientes",
      value: "8",
      icon: Clock,
      gradient: "from-orange-500 to-amber-600",
      lightBg: "from-orange-50 to-amber-50"
    },
    {
      label: "Tasa de Aprobación",
      value: "87%",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-600",
      lightBg: "from-blue-50 to-cyan-50"
    }
  ];
  return <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50/20 min-h-screen">
      {
    /* Header */
  }
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <ActivityIcon size={24} className="animate-pulse" />
            <p className="text-green-100">Monitoreo en Tiempo Real</p>
          </div>
          <h1 className="mb-2 text-white">Registro de Actividad</h1>
          <p className="text-green-100 text-lg">
            Todas las acciones realizadas en el sistema
          </p>
        </div>
      </div>

      {
    /* Stats */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
    const Icon = stat.icon;
    return <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="text-white" size={24} strokeWidth={2.5} />
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
    /* Activity Feed */
  }
      <Card className="p-8 border-0 shadow-lg">
        <div className="mb-6">
          <h2 className="mb-1 text-gray-900">Actividad Reciente</h2>
          <p className="text-sm text-gray-600">Historial de acciones en el sistema</p>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => {
    const Icon = activity.icon;
    return <div
      key={activity.id}
      className="flex items-start gap-4 p-5 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-2xl hover:shadow-md transition-all duration-200 border border-gray-100 relative"
    >
                {
      /* Timeline connector */
    }
                {index < activities.length - 1 && <div className="absolute left-10 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-transparent" />}
                
                {
      /* Icon */
    }
                <div className={`w-12 h-12 ${activity.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border ${activity.borderColor} relative z-10`}>
                  <Icon className={activity.iconColor} size={22} strokeWidth={2.5} />
                </div>

                {
      /* Content */
    }
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <p className="text-gray-900 flex-1">
                      <span className="font-medium">{activity.user}</span>
                      {" "}{activity.action}{" "}
                      <span className="font-medium text-[#39A900]">{activity.target}</span>
                    </p>
                    <Badge variant="outline" className="text-xs text-gray-500 border-gray-200 whitespace-nowrap">
                      {activity.time}
                    </Badge>
                  </div>
                </div>
              </div>;
  })}
        </div>

        {
    /* Load More */
  }
        <div className="mt-6 text-center">
          <button className="text-[#39A900] hover:text-green-700 font-medium hover:underline">
            Ver más actividad
          </button>
        </div>
      </Card>
    </div>;
}
