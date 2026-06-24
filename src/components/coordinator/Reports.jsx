import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { BarChart3, Download, TrendingUp, TrendingDown, Users, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
export default function Reports() {
  const monthlyStats = [
    { month: "Ene", gc: 95, gf: 100, total: 97 },
    { month: "Feb", gc: 92, gf: 98, total: 95 },
    { month: "Mar", gc: 98, gf: 95, total: 96 },
    { month: "Abr", gc: 90, gf: 92, total: 91 },
    { month: "May", gc: 94, gf: 96, total: 95 },
    { month: "Jun", gc: 88, gf: 90, total: 89 },
    { month: "Jul", gc: 92, gf: 94, total: 93 },
    { month: "Ago", gc: 96, gf: 98, total: 97 },
    { month: "Sep", gc: 90, gf: 88, total: 89 },
    { month: "Oct", gc: 94, gf: 96, total: 95 }
  ];
  const areaStats = [
    { name: "ADSO", value: 95, color: "#39A900" },
    { name: "Redes", value: 92, color: "#10b981" },
    { name: "Barismo", value: 88, color: "#059669" },
    { name: "Construcción", value: 90, color: "#84cc16" },
    { name: "Cocina", value: 94, color: "#22c55e" }
  ];
  const COLORS = ["#39A900", "#10b981", "#059669", "#84cc16", "#22c55e"];
  const topInstructors = [
    { name: "María González", compliance: 100, reports: 20, level: "Excelente", area: "ADSO" },
    { name: "Ana Martínez", compliance: 100, reports: 20, level: "Excelente", area: "Redes" },
    { name: "Laura Jiménez", compliance: 98, reports: 20, level: "Excelente", area: "Barismo" },
    { name: "Miguel Torres", compliance: 96, reports: 20, level: "Muy Bueno", area: "Cocina" },
    { name: "Carlos Rodríguez", compliance: 94, reports: 20, level: "Muy Bueno", area: "Construcción" }
  ];
  return <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50/20 min-h-screen">
      {
    /* Header with gradient */
  }
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 size={24} />
                <p className="text-green-100">Análisis y Estadísticas</p>
              </div>
              <h1 className="mb-2 text-white">Reportes y Estadísticas</h1>
              <p className="text-green-100 text-lg">
                Visualiza el desempeño general de tu unidad
              </p>
            </div>
            <Button className="bg-white text-[#39A900] hover:bg-green-50 shadow-lg">
              <Download size={18} className="mr-2" />
              Exportar Reporte
            </Button>
          </div>
        </div>
      </div>

      {
    /* Filters */
  }
      <Card className="p-6 mb-6 border-0 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-100/30 rounded-full -mr-24 -mt-24 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-[#39A900]" size={20} />
            <h3 className="bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent">Filtros de Búsqueda</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select defaultValue="2024">
              <SelectTrigger className="border-2 focus:border-[#39A900]">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-months">
              <SelectTrigger className="border-2 focus:border-[#39A900]">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-months">Todos los meses</SelectItem>
                <SelectItem value="enero">Enero</SelectItem>
                <SelectItem value="febrero">Febrero</SelectItem>
                <SelectItem value="marzo">Marzo</SelectItem>
                <SelectItem value="abril">Abril</SelectItem>
                <SelectItem value="mayo">Mayo</SelectItem>
                <SelectItem value="junio">Junio</SelectItem>
                <SelectItem value="julio">Julio</SelectItem>
                <SelectItem value="agosto">Agosto</SelectItem>
                <SelectItem value="septiembre">Septiembre</SelectItem>
                <SelectItem value="octubre">Octubre</SelectItem>
                <SelectItem value="noviembre">Noviembre</SelectItem>
                <SelectItem value="diciembre">Diciembre</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-areas">
              <SelectTrigger className="border-2 focus:border-[#39A900]">
                <SelectValue placeholder="Área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-areas">Todas las áreas</SelectItem>
                <SelectItem value="tic">TIC</SelectItem>
                <SelectItem value="pae">PAE</SelectItem>
                <SelectItem value="ge">GE</SelectItem>
                <SelectItem value="adso">ADSO</SelectItem>
                <SelectItem value="redes">Redes</SelectItem>
                <SelectItem value="barismo">Barismo</SelectItem>
                <SelectItem value="construccion">Construcción</SelectItem>
                <SelectItem value="cocina">Cocina</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="border-2 focus:border-[#39A900]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="gc">GC</SelectItem>
                <SelectItem value="gf">GF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {
    /* Overview Stats */
  }
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="text-white" size={28} />
              </div>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <div className="text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">45</div>
            <div className="text-sm text-gray-600">Total Instructores</div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="text-white" size={28} />
              </div>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <div className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">89%</div>
            <div className="text-sm text-gray-600">Cumplimiento General</div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="text-white" size={28} />
              </div>
              <TrendingDown className="text-red-600" size={20} />
            </div>
            <div className="text-3xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-1">5</div>
            <div className="text-sm text-gray-600">Informes Pendientes</div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingDown className="text-white" size={28} />
              </div>
            </div>
            <div className="text-3xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-1">2</div>
            <div className="text-sm text-gray-600">Con Alertas</div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {
    /* Chart */
  }
        <Card className="lg:col-span-2 p-6 border-0 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="mb-1">Cumplimiento Mensual 2024</h2>
              <p className="text-sm text-gray-600">Comparativa GC vs GF por mes</p>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyStats}>
                <defs>
                  <linearGradient id="colorGC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#39A900" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#2d8400" stopOpacity={0.9} />
                  </linearGradient>
                  <linearGradient id="colorGF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.9} />
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
      borderRadius: "12px",
      boxShadow: "0 10px 40px -10px rgb(0 0 0 / 0.2)"
    }}
  />
                <Legend />
                <Bar dataKey="gc" name="GC" fill="url(#colorGC)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="gf" name="GF" fill="url(#colorGF)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {
    /* Area Performance Chart */
  }
        <Card className="p-6 border-0 shadow-xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100/20 rounded-full -ml-32 -mb-32 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="mb-1">Cumplimiento por Área</h2>
              <p className="text-sm text-gray-600">Desempeño por programa</p>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
    data={areaStats}
    cx="50%"
    cy="50%"
    innerRadius={60}
    outerRadius={90}
    paddingAngle={5}
    dataKey="value"
  >
                  {areaStats.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip
    contentStyle={{
      backgroundColor: "white",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 10px 40px -10px rgb(0 0 0 / 0.2)"
    }}
  />
              </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {areaStats.map((area, index) => <div key={index} className="flex items-center gap-2">
                  <div
    className="w-3 h-3 rounded-full"
    style={{ backgroundColor: area.color }}
  />
                  <span className="text-xs text-gray-600">{area.name}: {area.value}%</span>
                </div>)}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {
    /* Top Instructors */
  }
        <Card className="p-6 border-0 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/20 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <h2 className="mb-6">Mejores Instructores</h2>
            <div className="space-y-3">
              {topInstructors.map((instructor, index) => <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl hover:shadow-md transition-all">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${index === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" : index === 2 ? "bg-gradient-to-br from-orange-400 to-orange-600" : "bg-gradient-to-br from-green-400 to-green-600"}`}>
                    <span className="text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{instructor.name}</div>
                    <div className="text-xs text-gray-600">{instructor.area} • {instructor.level}</div>
                  </div>
                  <div className="text-sm bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{instructor.compliance}%</div>
                </div>)}
            </div>
          </div>
        </Card>
      </div>
    </div>;
}
