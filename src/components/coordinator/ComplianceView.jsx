import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, TrendingUp, Users, Award, Target, Calendar } from "lucide-react";
import { Progress } from "../ui/progress";
export default function ComplianceView() {
  const areas = [
    { name: "TIC", compliance: 95, instructors: 12, gradient: "from-[#39A900] to-green-600" },
    { name: "PAE", compliance: 88, instructors: 8, gradient: "from-emerald-500 to-teal-600" },
    { name: "GE", compliance: 92, instructors: 10, gradient: "from-green-600 to-emerald-700" },
    { name: "ADSO", compliance: 85, instructors: 15, gradient: "from-teal-500 to-cyan-600" }
  ];
  const monthlyData = [
    { month: "Noviembre 2024", compliance: 89, status: "current" },
    { month: "Octubre 2024", compliance: 92, status: "completed" },
    { month: "Septiembre 2024", compliance: 87, status: "completed" },
    { month: "Agosto 2024", compliance: 90, status: "completed" }
  ];
  return <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50/20 min-h-screen">
      {
    /* Header */
  }
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle size={28} strokeWidth={2.5} />
            <h1 className="text-white">Cumplimiento General</h1>
          </div>
          <p className="text-green-100 text-lg">
            Seguimiento del rendimiento de todos los instructores
          </p>
        </div>
      </div>

      {
    /* Overall Stats */
  }
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-[#39A900] to-green-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Target size={28} strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-4xl mb-2">89%</div>
            <div className="text-green-100">Cumplimiento Global</div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Users size={28} strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-4xl mb-2">45</div>
            <div className="text-emerald-100">Total Instructores</div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-green-600 to-emerald-700 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Award size={28} strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-4xl mb-2">38</div>
            <div className="text-green-100">Informes al Día</div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {
    /* Compliance by Area */
  }
        <Card className="p-8 border-0 shadow-lg">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Cumplimiento por Área</h2>
            <p className="text-sm text-gray-600">Rendimiento de cada área técnica</p>
          </div>

          <div className="space-y-6">
            {areas.map((area) => <div key={area.name}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{area.name}</div>
                    <div className="text-sm text-gray-600">{area.instructors} instructores</div>
                  </div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${area.gradient} bg-clip-text text-transparent`}>
                    {area.compliance}%
                  </div>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${area.gradient} rounded-full transition-all duration-500`}
    style={{ width: `${area.compliance}%` }}
  />
                </div>
              </div>)}
          </div>

          <Button className="w-full mt-8 bg-gradient-to-r from-[#39A900] to-green-600 hover:from-[#2d8400] hover:to-green-700 shadow-lg shadow-green-200 rounded-xl h-11">
            <TrendingUp size={18} className="mr-2" />
            Ver Detalles Completos
          </Button>
        </Card>

        {
    /* Monthly Progress */
  }
        <Card className="p-8 border-0 shadow-lg">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Evolución Mensual</h2>
            <p className="text-sm text-gray-600">Histórico de cumplimiento</p>
          </div>

          <div className="space-y-5">
            {monthlyData.map((data) => <div
    key={data.month}
    className={`p-5 rounded-xl border-2 ${data.status === "current" ? "border-[#39A900] bg-gradient-to-r from-green-50 to-emerald-50" : "border-gray-100 bg-white"}`}
  >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
    className={`w-12 h-12 rounded-xl flex items-center justify-center ${data.status === "current" ? "bg-gradient-to-br from-[#39A900] to-green-600 text-white shadow-lg" : "bg-gray-100 text-gray-600"}`}
  >
                      <Calendar size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{data.month}</div>
                      {data.status === "current" && <div className="text-xs text-[#39A900] font-medium">Mes actual</div>}
                    </div>
                  </div>
                  <div
    className={`text-2xl font-bold ${data.status === "current" ? "bg-gradient-to-r from-[#39A900] to-green-600 bg-clip-text text-transparent" : "text-gray-700"}`}
  >
                    {data.compliance}%
                  </div>
                </div>
                <Progress value={data.compliance} className="h-2" />
              </div>)}
          </div>

          <Button className="w-full mt-8 bg-gradient-to-r from-[#39A900] to-green-600 hover:from-[#2d8400] hover:to-green-700 shadow-lg shadow-green-200 rounded-xl h-11">
            <Calendar size={18} className="mr-2" />
            Ver Historial Completo
          </Button>
        </Card>
      </div>
    </div>;
}
