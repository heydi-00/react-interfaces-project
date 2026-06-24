import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FileText, Search, CheckCircle, XCircle, Clock, Eye, FileSignature } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
const initialReports = [
  { id: 1, instructor: "María González", type: "GC", month: "Noviembre", date: "2024-11-05", status: "pending" },
  { id: 2, instructor: "Carlos Rodríguez", type: "GF", month: "Noviembre", date: "2024-11-04", status: "pending" },
  { id: 3, instructor: "Ana Martínez", type: "GC", month: "Octubre", date: "2024-10-28", status: "approved" },
  { id: 4, instructor: "Pedro Sánchez", type: "GF", month: "Octubre", date: "2024-10-27", status: "correcting" },
  { id: 5, instructor: "Laura Jiménez", type: "GC", month: "Octubre", date: "2024-10-26", status: "approved" },
  { id: 6, instructor: "Miguel Torres", type: "GF", month: "Octubre", date: "2024-10-25", status: "approved" }
];
export default function ReportManagement() {
  const [reports, setReports] = useState(initialReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState("");
  const [openDialogId, setOpenDialogId] = useState(null);
  const updateStatus = (report, status) => {
    setReports((prev) => prev.map((r) => r.id === report.id ? { ...r, status } : r));
  };
  const handleApprove = (report) => {
    updateStatus(report, "approved");
    toast.success(`Informe de ${report.instructor} aprobado y firmado`);
    setOpenDialogId(null);
    setFeedback("");
  };
  const handleReject = (report) => {
    if (!feedback.trim()) {
      toast.error("Por favor ingresa una retroalimentación");
      return;
    }
    updateStatus(report, "correcting");
    toast.info(`Informe de ${report.instructor} marcado para corrección`);
    setOpenDialogId(null);
    setFeedback("");
  };
  const handlePending = (report) => {
    updateStatus(report, "pending");
    toast.info(`Informe de ${report.instructor} marcado como pendiente`);
    setOpenDialogId(null);
    setFeedback("");
  };
  const filteredReports = reports.filter(
    (report) => report.instructor.toLowerCase().includes(searchTerm.toLowerCase()) || report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pendingReports = filteredReports.filter((r) => r.status === "pending");
  const approvedReports = filteredReports.filter((r) => r.status === "approved");
  const correctingReports = filteredReports.filter((r) => r.status === "correcting");
  const ReportCard = ({ report }) => <div className="p-5 border-2 rounded-2xl transition-all hover:shadow-lg bg-gradient-to-r from-gray-50/50 to-blue-50/50 border-gray-200 hover:border-blue-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${report.status === "approved" ? "bg-gradient-to-br from-green-500 to-emerald-600" : report.status === "correcting" ? "bg-gradient-to-br from-orange-500 to-amber-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}>
            <FileText className="text-white" size={24} />
          </div>
          <div>
            <div className="font-medium text-gray-900">{report.instructor}</div>
            <div className="text-sm text-gray-600">
              Informe {report.type} - {report.month} 2024
            </div>
            <div className="text-xs text-gray-500">{report.date}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl text-xs font-medium shadow-sm ${report.status === "approved" ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700" : report.status === "correcting" ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700" : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"}`}>
            {report.status === "approved" ? "Aprobado" : report.status === "correcting" ? "A Corregir" : "Pendiente"}
          </div>
          
          <Dialog open={openDialogId === report.id} onOpenChange={(open) => {
    setOpenDialogId(open ? report.id : null);
    if (!open) setFeedback("");
  }}>
            <DialogTrigger asChild>
              <Button
    size="sm"
    onClick={() => setOpenDialogId(report.id)}
    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
  >
                <Eye size={16} className="mr-2" />
                Revisar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Revisión de Informe - {report.instructor}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Instructor</p>
                    <p className="font-medium text-gray-900">{report.instructor}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Tipo de Informe</p>
                    <p className="font-medium text-gray-900">Gestión {report.type === "GC" ? "Contractual" : "Financiera"}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Periodo</p>
                    <p className="font-medium text-gray-900">{report.month} 2024</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Fecha de Entrega</p>
                    <p className="font-medium text-gray-900">{report.date}</p>
                  </div>
                </div>

                <div className="border-t-2 pt-4">
                  <h4 className="font-medium mb-3 text-gray-900">Vista Previa del Documento</h4>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
                    <FileText className="mx-auto mb-3 text-blue-600" size={48} />
                    <p className="text-gray-700">
                      {report.type === "GC" ? "Informe de Gestión Contractual con 17 obligaciones documentadas" : "Informe de Gestión Financiera con todos los comprobantes"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-900">Retroalimentación (opcional)</label>
                  <Textarea
    value={feedback}
    onChange={(e) => setFeedback(e.target.value)}
    placeholder="Agrega comentarios o sugerencias para el instructor..."
    rows={3}
    className="border-2 focus:border-blue-500"
  />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4">
                  <Button
    onClick={() => handleApprove(report)}
    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
  >
                    <FileSignature size={18} className="mr-2" />
                    Aprobar
                  </Button>
                  <Button
    onClick={() => handlePending(report)}
    variant="outline"
    className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
  >
                    <Clock size={18} className="mr-2" />
                    Pendiente
                  </Button>
                  <Button
    onClick={() => handleReject(report)}
    variant="outline"
    className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
  >
                    <XCircle size={18} className="mr-2" />
                    A Corregir
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>;
  return <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50/20 min-h-screen">
      {
    /* Header with gradient */
  }
      <div className="mb-8 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <FileSignature size={24} />
            <p className="text-green-100">Validación de Documentos</p>
          </div>
          <h1 className="mb-2 text-white">Gestión de Informes</h1>
          <p className="text-green-100 text-lg">
            Revisa, aprueba o solicita correcciones en los informes de instructores
          </p>
        </div>
      </div>

      {
    /* Search */
  }
      <Card className="p-4 mb-6 border-0 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Buscar por instructor o tipo de informe..."
    className="pl-10 border-2 focus:border-green-500 transition-colors"
  />
        </div>
      </Card>

      {
    /* Tabs */
  }
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3 h-12 bg-gradient-to-r from-gray-100 to-blue-100 p-1 rounded-2xl">
          <TabsTrigger
    value="pending"
    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
  >
            Pendientes ({pendingReports.length})
          </TabsTrigger>
          <TabsTrigger
    value="approved"
    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
  >
            Aprobados ({approvedReports.length})
          </TabsTrigger>
          <TabsTrigger
    value="correcting"
    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-amber-600 data-[state=active]:text-white"
  >
            A Corregir ({correctingReports.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3">
          {pendingReports.length === 0 ? <Card className="p-16 text-center border-0 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/30 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center">
                  <CheckCircle className="text-white" size={48} />
                </div>
                <h3 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">No hay informes pendientes</h3>
                <p className="text-gray-600">Todos los informes han sido revisados</p>
              </div>
            </Card> : pendingReports.map((report) => <ReportCard key={report.id} report={report} />)}
        </TabsContent>

        <TabsContent value="approved" className="space-y-3">
          {approvedReports.map((report) => <ReportCard key={report.id} report={report} />)}
        </TabsContent>

        <TabsContent value="correcting" className="space-y-3">
          {correctingReports.length === 0 ? <Card className="p-16 text-center border-0 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/30 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center">
                  <CheckCircle className="text-white" size={48} />
                </div>
                <h3 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">No hay informes en corrección</h3>
              </div>
            </Card> : correctingReports.map((report) => <ReportCard key={report.id} report={report} />)}
        </TabsContent>
      </Tabs>
    </div>;
}
