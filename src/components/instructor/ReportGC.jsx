import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { ArrowLeft, FileText, AlertCircle, Save, ChevronDown, ChevronUp, FolderOpen } from "lucide-react";
import { toast } from "sonner";
const DEFAULT_JUSTIFICATION = "Esta actividad no se realizó en el presente periodo debido a que no se presentaron las condiciones necesarias para su ejecución.";
const obligations = [
  {
    id: 1,
    title: "Ejecutar la Formación Profesional Integral",
    description: "Ejecutar formación profesional integral en el área contratada, en modalidad presencial y/o virtual, en diferentes jornadas (diurna, nocturna, fin de semana), siguiendo el sistema SIGA del SENA."
  },
  {
    id: 2,
    title: "Emitir juicio valorativo",
    description: "Emitir juicios valorativos sobre el logro de resultados de aprendizaje dentro de los 8 días calendario siguientes a la finalización de cada resultado de aprendizaje."
  },
  {
    id: 3,
    title: "Reportar novedades académicas y disciplinarias",
    description: "Reportar oportunamente las novedades académicas y disciplinarias de los aprendices, incluyendo retiros, traslados, aplazamientos y deserciones con la documentación de soporte correspondiente."
  },
  {
    id: 4,
    title: "Realizar actividades de investigación, innovación y desarrollo tecnológico",
    description: "Desarrollar actividades de investigación, innovación y desarrollo tecnológico dentro de los procesos de formación, siguiendo los lineamientos del grupo de investigación."
  },
  {
    id: 5,
    title: "Liderar y/o apoyar la inducción institucional",
    description: "Liderar o apoyar la inducción institucional de aprendices trimestralmente o según requerimiento de coordinación académica, aplicando los procedimientos y formatos establecidos."
  },
  {
    id: 6,
    title: "Realizar seguimiento y evaluación de la etapa productiva",
    description: "Realizar seguimiento y evaluación de la etapa productiva (pasantía) cuando sea asignado, utilizando las plataformas y formatos vigentes."
  },
  {
    id: 7,
    title: "Participar en reuniones de equipo ejecutor",
    description: "Asistir a las reuniones del equipo ejecutor programadas por coordinación académica y entregar la documentación requerida (actas de inducción, entrega de materiales, informes de avance, etc.)."
  },
  {
    id: 8,
    title: "Participar en actividades de apoyo a la formación",
    description: "Participar activamente en actividades de apoyo al aprendiz incluyendo bienestar, competitividad, emprendimiento, promoción de oferta regular y especial, y eventos técnicos o estratégicos."
  },
  {
    id: 9,
    title: "Participar en procesos de autoevaluación y registro calificado",
    description: "Participar en los procesos de acreditación y autoevaluación para programas de nivel tecnológico."
  },
  {
    id: 10,
    title: "Reportar cambios en horarios o ambientes de formación",
    description: "Notificar con anticipación al supervisor del contrato y a coordinación académica cualquier cambio en horarios o ambientes de formación."
  },
  {
    id: 11,
    title: "Apoyar gestión documental",
    description: "Mantener actualizado el portafolio del instructor con los formatos vigentes, planes de trabajo, guías de aprendizaje, instrumentos de evaluación, materiales de apoyo, planes de mejoramiento y registros de etapa productiva."
  },
  {
    id: 12,
    title: "Participar en acciones de acompañamiento técnico pedagógico",
    description: "Participar activamente en acciones de acompañamiento técnico y pedagógico orientadas al mejoramiento continuo del rol instructor."
  },
  {
    id: 13,
    title: "Aplicar y participar en certificación de competencia",
    description: 'Obtener o actualizar certificación en la norma de competencia "Orientar formación presencial de acuerdo con procedimientos técnicos y normativa vigente".'
  },
  {
    id: 14,
    title: "Vigilar, custodiar y salvaguardar bienes del SENA",
    description: "Vigilar, custodiar y salvaguardar bienes del SENA o de terceros, mantener control de inventario y reportar problemas de infraestructura, equipos o mantenimiento."
  },
  {
    id: 15,
    title: "Participar en formulación y ejecución de proyectos formativos",
    description: "Participar en la formulación y ejecución de proyectos formativos y/o técnicos según requerimiento del área de especialidad y la programación académica."
  },
  {
    id: 16,
    title: "Apoyar estructuración de especificaciones técnicas",
    description: "Apoyar la estructuración de especificaciones técnicas, participar en la evaluación de propuestas dentro de procesos de contratación y brindar apoyo en supervisión de contratos cuando sea necesario."
  },
  {
    id: 17,
    title: "Presentar informe mensual",
    description: "Entregar informe mensual sobre el avance en la ejecución del contrato, cumplimiento de metas, acciones de mejora e informe anual de gestión al término del contrato."
  }
];
export default function ReportGC({ onBack }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState((/* @__PURE__ */ new Date()).getFullYear().toString());
  const [openId, setOpenId] = useState(1);
  const [data, setData] = useState({});
  const get = (id) => data[id] ?? { notDone: false, description: "", justification: DEFAULT_JUSTIFICATION, files: [] };
  const update = (id, patch) => setData((prev) => ({ ...prev, [id]: { ...get(id), ...patch } }));
  const handleFileChange = (id, files) => {
    if (!files) return;
    const arr = Array.from(files);
    update(id, { files: [...get(id).files, ...arr] });
    toast.success(`${arr.length} archivo(s) agregado(s)`);
  };
  const removeFile = (id, idx) => {
    const files = get(id).files.filter((_, i) => i !== idx);
    update(id, { files });
  };
  const handleSubmit = () => {
    if (!month || !year) {
      toast.error("Por favor completa el mes y año del informe");
      return;
    }
    toast.success("Informe GC enviado exitosamente");
    onBack();
  };
  return <div className="p-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
        <ArrowLeft size={18} className="mr-2" />
        Volver
      </Button>

      {
    /* Instructions banner */
  }
      <div className="mb-6 p-4 rounded-xl border border-blue-200 bg-blue-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Para cada obligación debes:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Describir las actividades realizadas</li>
              <li>Adjuntar las evidencias correspondientes (fotos, documentos, etc.)</li>
              <li>Si no realizaste la actividad, marca la casilla y justifica el motivo</li>
            </ul>
          </div>
        </div>
      </div>

      {
    /* Información General */
  }
      <div className="mb-6 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Información General</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="month" className="text-sm font-medium text-gray-700">Mes del informe</Label>
            <select
    id="month"
    value={month}
    onChange={(e) => setMonth(e.target.value)}
    className="w-full mt-1.5 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900]"
  >
              <option value="">Selecciona un mes</option>
              {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((m, i) => <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="year" className="text-sm font-medium text-gray-700">Año</Label>
            <Input
    id="year"
    value={year}
    onChange={(e) => setYear(e.target.value)}
    className="mt-1.5 focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900]"
  />
          </div>
        </div>
      </div>

      {
    /* Obligations */
  }
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Obligaciones Contractuales ({obligations.length})
        </h2>

        <div className="space-y-2">
          {obligations.map((ob) => {
    const state = get(ob.id);
    const isOpen = openId === ob.id;
    return <div
      key={ob.id}
      className={`rounded-xl border overflow-hidden transition-all ${isOpen ? "border-[#39A900] shadow-md" : "border-gray-200 bg-white"}`}
    >
                {
      /* Header */
    }
                <button
      type="button"
      onClick={() => setOpenId(isOpen ? null : ob.id)}
      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${isOpen ? "bg-[#39A900] text-white" : "bg-white hover:bg-gray-50"}`}
    >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isOpen ? "bg-white text-[#39A900]" : "bg-[#39A900]/10 text-[#39A900]"}`}>
                      {ob.id}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold leading-snug ${isOpen ? "text-white" : "text-gray-800"}`}>
                        {ob.title}
                      </p>
                      {!isOpen && <p className="text-xs text-gray-400 truncate mt-0.5">{ob.description}</p>}
                      {isOpen && <p className="text-xs text-green-100 mt-0.5 leading-snug">{ob.description}</p>}
                    </div>
                  </div>
                  {isOpen ? <ChevronUp size={18} className="text-white flex-shrink-0 ml-2" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0 ml-2" />}
                </button>

                {
      /* Content */
    }
                {isOpen && <div className="px-5 py-4 bg-white space-y-4">
                    {
      /* Checkbox no realizado */
    }
                    <div className="flex items-center gap-2.5">
                      <Checkbox
      id={`notdone-${ob.id}`}
      checked={state.notDone}
      onCheckedChange={(v) => update(ob.id, { notDone: !!v })}
      className="border-gray-400 data-[state=checked]:bg-[#39A900] data-[state=checked]:border-[#39A900]"
    />
                      <label
      htmlFor={`notdone-${ob.id}`}
      className="text-sm text-gray-700 cursor-pointer select-none"
    >
                        Esta actividad no se realizó en este periodo
                      </label>
                    </div>

                    {state.notDone ? (
      /* Justificación */
      <div>
                        <Label className="text-sm font-medium text-gray-700">Justificación</Label>
                        <Textarea
        value={state.justification}
        onChange={(e) => update(ob.id, { justification: e.target.value })}
        rows={3}
        className="mt-1.5 text-sm resize-none focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900]"
      />
                      </div>
    ) : <>
                        {
      /* Descripción */
    }
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Descripción de actividades realizadas
                          </Label>
                          <Textarea
      placeholder="Describe las actividades realizadas para cumplir con esta obligación..."
      value={state.description}
      onChange={(e) => update(ob.id, { description: e.target.value })}
      rows={3}
      className="mt-1.5 text-sm resize-none focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900]"
    />
                        </div>

                        {
      /* Evidencias */
    }
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Evidencias (Fotos, documentos, etc.)
                          </Label>
                          <label
      htmlFor={`file-${ob.id}`}
      className="mt-1.5 flex flex-col items-center justify-center w-full p-5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#39A900] hover:bg-green-50/40 transition-colors"
    >
                            <FolderOpen className="mb-2 text-amber-400" size={32} />
                            <p className="text-sm text-gray-500">Haz clic para subir archivos</p>
                            <p className="text-xs text-gray-400 mt-0.5">PDF, DOC, JPG, PNG (máx. 10MB)</p>
                            <input
      id={`file-${ob.id}`}
      type="file"
      multiple
      className="hidden"
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      onChange={(e) => handleFileChange(ob.id, e.target.files)}
    />
                          </label>

                          {state.files.length > 0 && <div className="mt-2 space-y-1">
                              {state.files.map((f, i) => <div key={i} className="flex items-center justify-between px-3 py-1.5 bg-green-50 rounded-lg">
                                  <div className="flex items-center gap-2 text-sm text-[#39A900] min-w-0">
                                    <FileText size={14} className="flex-shrink-0" />
                                    <span className="truncate">{f.name}</span>
                                  </div>
                                  <button
      type="button"
      onClick={() => removeFile(ob.id, i)}
      className="text-xs text-red-400 hover:text-red-600 ml-2 flex-shrink-0"
    >
                                    ✕
                                  </button>
                                </div>)}
                            </div>}
                        </div>
                      </>}
                  </div>}
              </div>;
  })}
        </div>
      </div>

      {
    /* Actions */
  }
      <div className="flex gap-3 pb-6">
        <Button
    variant="outline"
    onClick={() => toast.success("Borrador guardado correctamente")}
    className="border-[#39A900] text-[#39A900] hover:bg-green-50"
  >
          <Save size={16} className="mr-2" />
          Guardar Borrador
        </Button>
        <Button onClick={handleSubmit} className="bg-[#39A900] hover:bg-[#2d8400]">
          <FileText size={16} className="mr-2" />
          Enviar Informe GC
        </Button>
      </div>
    </div>;
}
