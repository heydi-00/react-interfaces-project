import { Card } from "../ui/card";
import { CheckCircle, Clock, AlertCircle, TrendingUp, Award, Target, Calendar } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
export default function Compliance() {
  const monthlyData = [
    { month: "Enero", gc: 100, gf: 100, overall: 100, status: "completed" },
    { month: "Febrero", gc: 100, gf: 100, overall: 100, status: "completed" },
    { month: "Marzo", gc: 100, gf: 100, overall: 100, status: "completed" },
    { month: "Abril", gc: 100, gf: 100, overall: 100, status: "completed" },
    { month: "Mayo", gc: 100, gf: 100, overall: 100, status: "completed" },
    { month: "Junio", gc: 100, gf: 100, overall: 100, status: "completed" },
    { month: "Julio", gc: 100, gf: 100, overall: 100, status: "completed" },
    { month: "Agosto", gc: 100, gf: 100, overall: 100, status: "completed" },
    { month: "Septiembre", gc: 85, gf: 100, overall: 92, status: "partial" },
    { month: "Octubre", gc: 100, gf: 100, overall: 100, status: "completed" },
    { month: "Noviembre", gc: 0, gf: 0, overall: 0, status: "pending" },
    { month: "Diciembre", gc: 0, gf: 0, overall: 0, status: "pending" }
  ];
  const chartData = monthlyData.filter((d) => d.status !== "pending").map((d) => ({
    month: d.month.substring(0, 3),
    "Gestión Contractual": d.gc,
    "Gestión Financiera": d.gf
  }));
  const stats = [
    {
      label: "Cumplimiento Anual",
      value: "92%",
      icon: Target,
      gradient: "from-[#39A900] to-green-600",
      lightBg: "from-green-50 to-green-100"
    },
    {
      label: "Informes Completos",
      value: "20",
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50"
    },
    {
      label: "Pendientes",
      value: "2",
      icon: Clock,
      gradient: "from-orange-500 to-amber-600",
      lightBg: "from-orange-50 to-amber-50"
    },
    {
      label: "Con Observaciones",
      value: "1",
      icon: AlertCircle,
      gradient: "from-red-500 to-pink-600",
      lightBg: "from-red-50 to-pink-50"
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
            <TrendingUp size={24} />
            <p className="text-green-100">Análisis de Desempeño</p>
          </div>
          <h1 className="mb-2 text-white">Mi Cumplimiento</h1>
          <p className="text-green-100 text-lg">
            Seguimiento de tu desempeño y entregas durante el año
          </p>
        </div>
      </div>

      {
    /* Congratulations Card */
  }
      <Card className="p-8 mb-8 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border-0 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-200/30 rounded-full -mr-24 -mt-24 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/20 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="flex items-start gap-6 relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl">
            <Award className="text-white" size={40} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h2 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              ¡Excelente Trabajo!
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Mantienes un nivel de cumplimiento del <strong className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">92%</strong> durante el año. 
              Tu compromiso y dedicación son ejemplares. ¡Sigue así!
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl">
                <CheckCircle size={18} className="text-green-600" />
                <span className="text-gray-700">Nivel de satisfacción: <strong>Excelente</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl">
                <Calendar size={18} className="text-green-600" />
                <span className="text-gray-700">10 meses completados</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {
    /* Stats */
  }
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
    const Icon = stat.icon;
    return <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="text-white" size={28} strokeWidth={2.5} />
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
    /* Chart with better styling */
  }
      <Card className="p-8 mb-8 border-0 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 mb-2">Gráfico de Cumplimiento</h2>
              <p className="text-sm text-gray-600">Comparativa entre Gestión Contractual y Gestión Financiera</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorGC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39A900" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2d8400" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorGF" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
    dataKey="month"
    stroke="#6b7280"
    style={{ fontSize: "12px" }}
  />
              <YAxis
    stroke="#6b7280"
    style={{ fontSize: "12px" }}
  />
              <Tooltip
    contentStyle={{
      backgroundColor: "white",
      border: "none",
      borderRadius: "16px",
      boxShadow: "0 10px 40px -10px rgb(0 0 0 / 0.2)",
      padding: "12px"
    }}
  />
              <Legend
    wrapperStyle={{ paddingTop: "20px" }}
  />
              <Area
    type="monotone"
    dataKey="Gestión Contractual"
    stroke="#39A900"
    strokeWidth={3}
    fill="url(#colorGC)"
  />
              <Area
    type="monotone"
    dataKey="Gestión Financiera"
    stroke="#10b981"
    strokeWidth={3}
    fill="url(#colorGF)"
  />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {
    /* Monthly Compliance - Grid Format */
  }
      <Card className="p-8 border-0 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full -ml-48 -mt-48 blur-3xl" />
        <div className="relative z-10">
          <h2 className="mb-6 text-gray-900">Cumplimiento Mensual - 2024</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {monthlyData.map((data) => <div
    key={data.month}
    className={`border-2 rounded-2xl p-5 hover:shadow-lg transition-all duration-200 relative overflow-hidden group ${data.status === "completed" ? "border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/50" : data.status === "partial" ? "border-orange-200 bg-gradient-to-br from-orange-50/50 to-amber-50/50" : "border-gray-200 bg-gray-50/50"}`}
  >
                {
    /* Status icon in corner */
  }
                <div className="absolute top-3 right-3">
                  {data.status === "completed" && <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>}
                  {data.status === "partial" && <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                      <AlertCircle size={16} className="text-white" />
                    </div>}
                  {data.status === "pending" && <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Clock size={16} className="text-gray-600" />
                    </div>}
                </div>

                <div className="mb-4">
                  <div className="text-gray-900 mb-1">{data.month}</div>
                  <div className={`text-2xl mb-1 ${data.status === "completed" ? "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent" : data.status === "partial" ? "bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent" : "text-gray-400"}`}>
                    {data.overall}%
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-600">GC</span>
                      <span className="font-medium text-[#39A900]">{data.gc}%</span>
                    </div>
                    <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#39A900] to-green-600 rounded-full transition-all duration-500"
    style={{ width: `${data.gc}%` }}
  />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-600">GF</span>
                      <span className="font-medium text-green-600">{data.gf}%</span>
                    </div>
                    <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
    style={{ width: `${data.gf}%` }}
  />
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </Card>
    </div>;
}
