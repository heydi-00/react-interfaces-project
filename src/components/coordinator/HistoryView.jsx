import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { History, FileText, CheckCircle, XCircle, Clock, Search, Download } from "lucide-react";
import { Badge } from "../ui/badge";
export default function HistoryView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const historyItems = [
    {
      id: 1,
      instructor: "María González",
      action: "Informe aprobado",
      report: "Informe GC - Noviembre",
      date: "2024-11-10",
      time: "14:30",
      status: "approved"
    },
    {
      id: 2,
      instructor: "Carlos Rodríguez",
      action: "Informe rechazado",
      report: "Informe GF - Noviembre",
      date: "2024-11-10",
      time: "12:15",
      status: "rejected"
    },
    {
      id: 3,
      instructor: "Ana Martínez",
      action: "Informe enviado",
      report: "Informe GC - Noviembre",
      date: "2024-11-09",
      time: "16:45",
      status: "submitted"
    },
    {
      id: 4,
      instructor: "Pedro Sánchez",
      action: "Informe aprobado",
      report: "Informe GF - Octubre",
      date: "2024-11-08",
      time: "09:20",
      status: "approved"
    },
    {
      id: 5,
      instructor: "Laura Torres",
      action: "Informe en revisión",
      report: "Informe GC - Noviembre",
      date: "2024-11-08",
      time: "11:30",
      status: "reviewing"
    }
  ];
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="text-green-600" size={20} />;
      case "rejected":
        return <XCircle className="text-red-600" size={20} />;
      case "submitted":
        return <FileText className="text-blue-600" size={20} />;
      case "reviewing":
        return <Clock className="text-orange-600" size={20} />;
      default:
        return <FileText className="text-gray-600" size={20} />;
    }
  };
  const getStatusBadge = (status) => {
    const badges = {
      approved: { text: "Aprobado", className: "bg-green-100 text-green-700 border-green-200" },
      rejected: { text: "Rechazado", className: "bg-red-100 text-red-700 border-red-200" },
      submitted: { text: "Enviado", className: "bg-blue-100 text-blue-700 border-blue-200" },
      reviewing: { text: "En Revisión", className: "bg-orange-100 text-orange-700 border-orange-200" }
    };
    const badge = badges[status] || badges.submitted;
    return <Badge className={`${badge.className} border`}>{badge.text}</Badge>;
  };
  const filteredItems = historyItems.filter((item) => {
    const matchesSearch = item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) || item.report.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  return <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50/20 min-h-screen">
      {
    /* Header */
  }
      <div className="mb-8 bg-gradient-to-r from-[#39A900] via-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <History size={28} strokeWidth={2.5} />
            <h1 className="text-white">Historial de Actividad</h1>
          </div>
          <p className="text-green-100 text-lg">
            Registro completo de todas las acciones realizadas en el sistema
          </p>
        </div>
      </div>

      {
    /* Filters */
  }
      <Card className="p-6 mb-6 border-0 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
    type="text"
    placeholder="Buscar por instructor o informe..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="pl-10 h-12 border-gray-200 rounded-xl"
  />
          </div>
          <div className="flex gap-3">
            <Button
    variant={filterStatus === "all" ? "default" : "outline"}
    onClick={() => setFilterStatus("all")}
    className={filterStatus === "all" ? "bg-gradient-to-r from-[#39A900] to-green-600 text-white h-12 rounded-xl" : "h-12 rounded-xl"}
  >
              Todos
            </Button>
            <Button
    variant={filterStatus === "approved" ? "default" : "outline"}
    onClick={() => setFilterStatus("approved")}
    className={filterStatus === "approved" ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white h-12 rounded-xl" : "h-12 rounded-xl"}
  >
              Aprobados
            </Button>
            <Button
    variant={filterStatus === "rejected" ? "default" : "outline"}
    onClick={() => setFilterStatus("rejected")}
    className={filterStatus === "rejected" ? "bg-gradient-to-r from-red-500 to-pink-600 text-white h-12 rounded-xl" : "h-12 rounded-xl"}
  >
              Rechazados
            </Button>
            <Button className="bg-gradient-to-r from-[#39A900] to-green-600 hover:from-[#2d8400] hover:to-green-700 text-white h-12 rounded-xl">
              <Download size={18} className="mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </Card>

      {
    /* History List */
  }
      <Card className="p-6 border-0 shadow-lg">
        <div className="space-y-4">
          {filteredItems.map((item) => <div
    key={item.id}
    className="p-5 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all"
  >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#39A900] to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    {getStatusIcon(item.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-gray-900">{item.instructor}</span>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{item.action}</div>
                    <div className="text-sm text-gray-500">{item.report}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{item.date}</div>
                  <div className="text-xs text-gray-500">{item.time}</div>
                </div>
              </div>
            </div>)}
        </div>
      </Card>
    </div>;
}
