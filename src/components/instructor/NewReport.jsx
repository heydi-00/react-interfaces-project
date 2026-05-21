import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  ArrowLeft,
  DollarSign,
  Upload,
  FileText,
  Download,
  Save,
  ClipboardList,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import ReportGF from './ReportGF';

// Sub-view: fill and submit a single planilla
function PlanillaReport({ planilla, onBack }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const handleSubmit = () => {
    if (!month || !year) {
      toast.error('Por favor completa el mes y año del informe');
      return;
    }
    if (!uploadedFile) {
      toast.error('Por favor adjunta la planilla diligenciada');
      return;
    }
    toast.success('Planilla enviada exitosamente');
    onBack();
  };

  return (
    <div className="p-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft size={18} className="mr-2" />
        Volver
      </Button>

      <div className="mb-8">
        <h1 className="mb-2">{planilla.name}</h1>
        {planilla.description && (
          <p className="text-gray-600">{planilla.description}</p>
        )}
      </div>

      {planilla.fileName && (
        <Card className="p-4 mb-6 border-l-4 border-l-[#39A900] bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-[#39A900]" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-800">Plantilla disponible</p>
                <p className="text-xs text-gray-500">{planilla.fileName}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info(`Descargando ${planilla.fileName}...`)}
              className="border-[#39A900] text-[#39A900] hover:bg-green-100 gap-2"
            >
              <Download size={15} />
              Descargar
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-4 mb-6 border-l-4 border-l-blue-500 bg-blue-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-blue-800">
            <p className="mb-1 font-medium">Instrucciones</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Descarga la plantilla, diligénciala completamente y súbela de vuelta</li>
              <li>El archivo debe estar en formato PDF, DOC o DOCX</li>
              <li>Verifica que todos los campos estén completos antes de enviar</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="mb-4">Información General</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="month">Mes del informe</Label>
            <select
              id="month"
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Selecciona un mes</option>
              {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map((m, i) => (
                <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="year">Año</Label>
            <input
              id="year"
              type="text"
              value={year}
              onChange={e => setYear(e.target.value)}
              placeholder={new Date().getFullYear().toString()}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="mb-4">Planilla Diligenciada</h2>
        <label
          htmlFor="planilla-upload"
          className="flex items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#39A900] hover:bg-green-50 transition-colors"
        >
          <div className="text-center">
            <Upload className="mx-auto mb-3 text-gray-400" size={36} />
            <p className="text-sm text-gray-600">
              {uploadedFile ? uploadedFile.name : 'Haz clic para subir la planilla diligenciada'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (máx. 10MB)</p>
          </div>
          <input
            id="planilla-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={e => {
              const f = e.target.files?.[0];
              if (f) {
                setUploadedFile(f);
                toast.success(`Archivo cargado: ${f.name}`);
              }
            }}
          />
        </label>
        {uploadedFile && (
          <div className="mt-3 flex items-center gap-2 text-sm text-[#39A900]">
            <FileText size={16} />
            <span>{uploadedFile.name} — listo para enviar</span>
          </div>
        )}
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => toast.success('Borrador guardado correctamente')}
          className="border-[#39A900] text-[#39A900] hover:bg-green-50"
        >
          <Save size={18} className="mr-2" />
          Guardar Borrador
        </Button>
        <Button onClick={handleSubmit} className="bg-[#39A900] hover:bg-[#2d8400]">
          <FileText size={18} className="mr-2" />
          Enviar Planilla
        </Button>
      </div>
    </div>
  );
}

export default function NewReport({ planillas }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPlanilla, setSelectedPlanilla] = useState(null);

  if (selectedType === 'planilla' && selectedPlanilla) {
    return (
      <PlanillaReport
        planilla={selectedPlanilla}
        onBack={() => { setSelectedType(null); setSelectedPlanilla(null); }}
      />
    );
  }

  if (selectedType === 'gf') {
    return <ReportGF onBack={() => setSelectedType(null)} />;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Nuevo Informe</h1>
        <p className="text-gray-600">Selecciona el tipo de informe que deseas crear</p>
      </div>

      <Card className="p-4 mb-8 border-l-4 border-l-blue-500 bg-blue-50">
        <h3 className="text-blue-900 mb-2">Instrucciones</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Los informes deben ser entregados entre el día 1 y 28 de cada mes</li>
          <li>Asegúrate de completar todos los campos obligatorios</li>
          <li>Adjunta todas las evidencias requeridas</li>
          <li>Puedes guardar tu progreso y continuar después</li>
        </ul>
      </Card>

      <div className="space-y-10">
        {/* GC Planillas */}
        <div>
          <h2 className="mb-4 text-gray-700">Gestión Contractual (GC)</h2>

          {planillas.length === 0 ? (
            <Card className="p-10 text-center border-dashed border-2 max-w-lg">
              <ClipboardList className="mx-auto mb-3 text-gray-300" size={40} />
              <p className="text-gray-500 font-medium mb-1">Sin planillas disponibles</p>
              <p className="text-sm text-gray-400">
                El coordinador aún no ha publicado planillas GC para diligenciar
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
              {planillas.map(p => (
                <Card
                  key={p.id}
                  className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-[#39A900]"
                  onClick={() => { setSelectedPlanilla(p); setSelectedType('planilla'); }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                      <ClipboardList className="text-[#39A900]" size={28} />
                    </div>
                    <h3 className="mb-2 text-[#39A900] font-semibold leading-snug">{p.name}</h3>
                    {p.description && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mb-4">Publicada: {p.createdAt}</p>
                    <Button className="w-full bg-[#39A900] hover:bg-[#2d8400]">
                      Diligenciar Planilla
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* GF */}
        <div>
          <h2 className="mb-4 text-gray-700">Gestión Financiera (GF)</h2>
          <div className="max-w-xs">
            <Card
              className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-[#39A900]"
              onClick={() => setSelectedType('gf')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                  <DollarSign className="text-[#39A900]" size={28} />
                </div>
                <h3 className="mb-2 text-[#39A900] font-semibold">Gestión Financiera</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Planillas de pago, comprobantes y documentos financieros
                </p>
                <Button className="w-full bg-[#39A900] hover:bg-[#2d8400]">
                  Crear Informe GF
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
