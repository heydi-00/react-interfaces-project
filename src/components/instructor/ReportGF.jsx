import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArrowLeft, Upload, FileText, Download, AlertCircle, Save } from "lucide-react";
import { toast } from "sonner";
const documents = [
  {
    id: "security",
    name: "Planilla de Pago de Seguridad Social",
    description: "Documento que certifica el pago de aportes a seguridad social",
    required: true
  },
  {
    id: "health",
    name: "Planilla de Pago de Salud y Pensión",
    description: "Comprobante de pago de aportes a salud y pensión",
    required: true
  },
  {
    id: "payment",
    name: "Comprobante de Pago",
    description: "Soporte del pago realizado en el periodo",
    required: true
  },
  {
    id: "dependents",
    name: "Dependientes",
    description: "Registro de personas a cargo (si aplica)",
    required: false
  },
  {
    id: "contractor",
    name: "Planilla si es Contratista",
    description: "Documentación adicional requerida para contratistas",
    required: false
  }
];
export default function ReportGF({ onBack }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2025");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [extraDocName, setExtraDocName] = useState("");
  const [extraDocFile, setExtraDocFile] = useState(null);
  const handleFileUpload = (docId, files) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles((prev) => ({ ...prev, [docId]: fileArray }));
      toast.success(`Archivo(s) cargado(s) para ${documents.find((d) => d.id === docId)?.name}`);
    }
  };
  const handleSubmit = () => {
    if (!month || !year) {
      toast.error("Por favor completa el mes y año del informe");
      return;
    }
    const requiredDocs = documents.filter((d) => d.required);
    const missingDocs = requiredDocs.filter((d) => !uploadedFiles[d.id]?.length);
    if (missingDocs.length > 0) {
      toast.error("Por favor carga todos los documentos obligatorios");
      return;
    }
    toast.success("Informe GF enviado exitosamente");
    onBack();
  };
  return <div className="p-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft size={18} className="mr-2" />
        Volver
      </Button>

      <div className="mb-8">
        <h1 className="mb-2">Informe de Gestión Financiera (GF)</h1>
        <p className="text-gray-600">Adjunta los comprobantes y planillas de pago correspondientes</p>
      </div>

      <Card className="p-4 mb-6 border-l-4 border-l-blue-500 bg-blue-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-blue-800">
            <p className="mb-2">Instrucciones importantes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Todos los documentos marcados como "Obligatorio" deben ser adjuntados</li>
              <li>Los archivos deben estar en formato PDF o imagen (JPG, PNG)</li>
              <li>Puedes descargar las plantillas oficiales haciendo clic en el botón correspondiente</li>
              <li>Verifica que todos los datos sean legibles antes de enviar</li>
            </ul>
          </div>
        </div>
      </Card>

      {
    /* General Info */
  }
      <Card className="p-6 mb-6">
        <h2 className="mb-4">Información General</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="month">Mes del informe</Label>
            <select
    id="month"
    value={month}
    onChange={(e) => setMonth(e.target.value)}
    className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
  >
              <option value="">Selecciona un mes</option>
              {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((m, i) => <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="year">Año</Label>
            <Input
    id="year"
    type="text"
    value={year}
    onChange={(e) => setYear(e.target.value)}
    placeholder="2025"
    className="mt-2"
  />
          </div>
        </div>
      </Card>

      {
    /* Documents Upload */
  }
      <Card className="p-6 mb-6">
        <h2 className="mb-4">Documentos Requeridos</h2>
        <div className="space-y-4">
          {documents.map((doc) => <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#39A900] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#39A900]">{doc.name}</h3>
                    {doc.required ? <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Obligatorio</span> : <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">Opcional</span>}
                  </div>
                  <p className="text-sm text-gray-600">{doc.description}</p>
                </div>
                <Button
    variant="outline"
    size="sm"
    onClick={() => toast.info(`Descargando plantilla de ${doc.name}...`)}
    className="ml-4 flex-shrink-0 border-[#39A900] text-[#39A900] hover:bg-green-50"
  >
                  <Download size={16} className="mr-2" />
                  Plantilla
                </Button>
              </div>

              <label
    htmlFor={`file-${doc.id}`}
    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#39A900] hover:bg-green-50 transition-colors"
  >
                <div className="text-center">
                  <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-sm text-gray-600">Haz clic para subir archivo</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (máx. 10MB)</p>
                </div>
                <input
    id={`file-${doc.id}`}
    type="file"
    multiple
    className="hidden"
    onChange={(e) => handleFileUpload(doc.id, e.target.files)}
    accept=".pdf,.jpg,.jpeg,.png"
  />
              </label>
              {uploadedFiles[doc.id]?.length > 0 && <div className="mt-2 flex items-center gap-2 text-sm text-[#39A900]">
                  <FileText size={16} />
                  <span>{uploadedFiles[doc.id].length} archivo(s) cargado(s)</span>
                </div>}
            </div>)}

          {
    /* Documento adicional opcional sin nombre predefinido */
  }
          <div className="border border-dashed border-gray-300 rounded-lg p-4 hover:border-[#39A900] transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-gray-700">Documento Adicional</h3>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">Opcional</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Si te solicitaron un documento adicional específico, indícalo aquí.
            </p>

            <div className="mb-4">
              <Label htmlFor="extra-doc-name">Nombre del documento</Label>
              <Input
    id="extra-doc-name"
    value={extraDocName}
    onChange={(e) => setExtraDocName(e.target.value)}
    placeholder="Ej. Certificado de ingresos, Carta laboral..."
    className="mt-2"
  />
            </div>

            <label
    htmlFor="file-extra"
    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#39A900] hover:bg-green-50 transition-colors"
  >
              <div className="text-center">
                <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                <p className="text-sm text-gray-600">
                  {extraDocFile ? extraDocFile.name : "Haz clic para subir archivo"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (máx. 10MB)</p>
              </div>
              <input
    id="file-extra"
    type="file"
    className="hidden"
    onChange={(e) => {
      const f = e.target.files?.[0];
      if (f) {
        setExtraDocFile(f);
        toast.success(`Archivo cargado: ${f.name}`);
      }
    }}
    accept=".pdf,.jpg,.jpeg,.png"
  />
            </label>
            {extraDocFile && <div className="mt-2 flex items-center gap-2 text-sm text-[#39A900]">
                <FileText size={16} />
                <span>{extraDocFile.name}</span>
              </div>}
          </div>
        </div>
      </Card>

      {
    /* Action Buttons */
  }
      <div className="flex gap-4">
        <Button
    variant="outline"
    onClick={() => toast.success("Borrador guardado correctamente")}
    className="border-[#39A900] text-[#39A900] hover:bg-green-50"
  >
          <Save size={18} className="mr-2" />
          Guardar Borrador
        </Button>
        <Button onClick={handleSubmit} className="bg-[#39A900] hover:bg-[#2d8400]">
          <FileText size={18} className="mr-2" />
          Enviar Informe
        </Button>
      </div>
    </div>;
}
