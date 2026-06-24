import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  ArrowLeft,
  DollarSign,
  Upload,
  FileText,
  Download,
  Save,
  ClipboardList,
  AlertCircle,
  ScrollText
} from "lucide-react";
import { toast } from "sonner";
import ReportGF from "./ReportGF";
import ReportGC from "./ReportGC";
function PlanillaReport({ planilla, onBack }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState((/* @__PURE__ */ new Date()).getFullYear().toString());
  const handleSubmit = () => {
    if (!month || !year) {
      toast.error("Por favor completa el mes y año del informe");
      return;
    }
    if (!uploadedFile) {
      toast.error("Por favor adjunta la planilla diligenciada");
      return;
    }
    toast.success("Planilla enviada exitosamente");
    onBack();
  };
  return <div className="p-8">
      <Button variant="ghost" onClick={onBack} className="mb-6 -ml-2">
        <ArrowLeft size={18} className="mr-2" />Volver
      </Button>
      <div className="mb-8">
        <h1 className="mb-2">{planilla.name}</h1>
        {planilla.description && <p className="text-gray-600">{planilla.description}</p>}
      </div>
      {planilla.fileName && <div className="p-4 mb-6 rounded-xl border-l-4 border-l-[#39A900] bg-green-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-[#39A900]" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-800">Plantilla disponible</p>
              <p className="text-xs text-gray-500">{planilla.fileName}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.info("Descargando...")} className="border-[#39A900] text-[#39A900] hover:bg-green-100 gap-2">
            <Download size={15} />Descargar
          </Button>
        </div>}
      <div className="p-4 mb-6 rounded-xl border-l-4 border-l-blue-500 bg-blue-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
            <li>Descarga la plantilla, diligénciala completamente y súbela de vuelta</li>
            <li>El archivo debe estar en formato PDF, DOC o DOCX</li>
            <li>Verifica que todos los campos estén completos antes de enviar</li>
          </ul>
        </div>
      </div>
      <div className="p-6 mb-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="mb-4">Información General</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Mes del informe</Label>
            <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-lg">
              <option value="">Selecciona un mes</option>
              {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((m, i) => <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>)}
            </select>
          </div>
          <div>
            <Label>Año</Label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="p-6 mb-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="mb-4">Planilla Diligenciada</h2>
        <label htmlFor="planilla-upload" className="flex items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#39A900] hover:bg-green-50 transition-colors">
          <div className="text-center">
            <Upload className="mx-auto mb-3 text-gray-400" size={36} />
            <p className="text-sm text-gray-600">{uploadedFile ? uploadedFile.name : "Haz clic para subir la planilla diligenciada"}</p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (máx. 10MB)</p>
          </div>
          <input id="planilla-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => {
    const f = e.target.files?.[0];
    if (f) {
      setUploadedFile(f);
      toast.success("Archivo cargado: " + f.name);
    }
  }} />
        </label>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => toast.success("Borrador guardado")} className="border-[#39A900] text-[#39A900] hover:bg-green-50">
          <Save size={16} className="mr-2" />Guardar Borrador
        </Button>
        <Button onClick={handleSubmit} className="bg-[#39A900] hover:bg-[#2d8400]">
          <FileText size={16} className="mr-2" />Enviar Planilla
        </Button>
      </div>
    </div>;
}
export default function NewReport({ planillas }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPlanilla, setSelectedPlanilla] = useState(null);
  if (selectedType === "gc") return <ReportGC onBack={() => setSelectedType(null)} />;
  if (selectedType === "gf") return <ReportGF onBack={() => setSelectedType(null)} />;
  if (selectedType === "planilla" && selectedPlanilla) {
    return <PlanillaReport planilla={selectedPlanilla} onBack={() => {
      setSelectedType(null);
      setSelectedPlanilla(null);
    }} />;
  }
  return <div className="p-8">
      <h1 className="mb-2 text-gray-800">Selecciona el tipo de informe que deseas crear</h1>

      <div className="p-4 mb-8 rounded-xl border border-blue-200 bg-blue-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
            <li>Los informes deben ser entregados entre el día 1 y 28 de cada mes</li>
            <li>Asegúrate de completar todos los campos obligatorios</li>
            <li>Adjunta todas las evidencias requeridas</li>
            <li>Puedes guardar tu progreso y continuar después</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {
    /* GC */
  }
        <div className="bg-white border-2 border-gray-200 hover:border-[#39A900] hover:shadow-lg transition-all rounded-2xl p-8 flex flex-col">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
              <ScrollText className="text-gray-500" size={32} />
            </div>
          </div>
          <h2 className="text-center text-[#39A900] font-bold text-lg mb-1">Gestión Contractual (GC)</h2>
          <p className="text-center text-sm text-gray-500 mb-5">
            Informe de gestión contractual con evidencias de las 17 obligaciones establecidas
          </p>
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Documentos requeridos</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start gap-1.5"><span className="text-[#39A900] mt-0.5">•</span>Guía de trabajo</li>
              <li className="flex items-start gap-1.5"><span className="text-[#39A900] mt-0.5">•</span>Evidencias de cada obligación</li>
              <li className="flex items-start gap-1.5"><span className="text-[#39A900] mt-0.5">•</span>Descripción de actividades realizadas</li>
              <li className="flex items-start gap-1.5"><span className="text-[#39A900] mt-0.5">•</span>Justificación de actividades no realizadas</li>
            </ul>
          </div>
          <Button onClick={() => setSelectedType("gc")} className="mt-auto w-full bg-[#39A900] hover:bg-[#2d8400] h-11">
            Crear Informe GC
          </Button>
        </div>

        {
    /* GF */
  }
        <div className="bg-white border-2 border-gray-200 hover:border-[#39A900] hover:shadow-lg transition-all rounded-2xl p-8 flex flex-col">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
              <DollarSign className="text-amber-500" size={32} />
            </div>
          </div>
          <h2 className="text-center text-[#39A900] font-bold text-lg mb-1">Gestión Financiera (GF)</h2>
          <p className="text-center text-sm text-gray-500 mb-5">
            Informe de gestión financiera con planillas de pago y comprobantes
          </p>
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Documentos requeridos</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start gap-1.5"><span className="text-[#39A900] mt-0.5">•</span>Planilla de seguridad social</li>
              <li className="flex items-start gap-1.5"><span className="text-[#39A900] mt-0.5">•</span>Planilla de salud y pensión</li>
              <li className="flex items-start gap-1.5"><span className="text-[#39A900] mt-0.5">•</span>Comprobante de pago</li>
              <li className="flex items-start gap-1.5"><span className="text-[#39A900] mt-0.5">•</span>Dependientes (si aplica)</li>
              <li className="flex items-start gap-1.5"><span className="text-[#39A900] mt-0.5">•</span>Planilla si es contratista</li>
            </ul>
          </div>
          <Button onClick={() => setSelectedType("gf")} className="mt-auto w-full bg-[#39A900] hover:bg-[#2d8400] h-11">
            Crear Informe GF
          </Button>
        </div>
      </div>

      {planillas.length > 0 && <div>
          <h2 className="mb-4 text-gray-700">Planillas GC disponibles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {planillas.map((p) => <div key={p.id} className="bg-white border-2 border-gray-200 hover:border-[#39A900] hover:shadow-md transition-all rounded-xl p-5 flex items-center gap-4 cursor-pointer" onClick={() => {
    setSelectedPlanilla(p);
    setSelectedType("planilla");
  }}>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="text-[#39A900]" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                  {p.description && <p className="text-xs text-gray-500 truncate mt-0.5">{p.description}</p>}
                  <p className="text-xs text-gray-400 mt-0.5">Publicada: {p.createdAt}</p>
                </div>
                <Button size="sm" className="bg-[#39A900] hover:bg-[#2d8400] flex-shrink-0">Diligenciar</Button>
              </div>)}
          </div>
        </div>}
    </div>;
}
