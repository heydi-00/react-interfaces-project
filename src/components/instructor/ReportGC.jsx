import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, Upload, FileText, AlertCircle, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const obligations = [
  { id: 1, title: 'Participar en procesos de inducción y reinducción', description: 'Asistir y participar activamente en las sesiones de inducción programadas' },
  { id: 2, title: 'Cumplir con el horario establecido', description: 'Cumplir con el horario de trabajo asignado según cronograma' },
  { id: 3, title: 'Ejecutar las actividades de formación', description: 'Desarrollar las actividades de formación según los programas establecidos' },
  { id: 4, title: 'Registrar seguimiento de aprendices', description: 'Llevar registro actualizado del seguimiento a cada aprendiz' },
  { id: 5, title: 'Evaluar aprendizaje de los aprendices', description: 'Realizar evaluaciones periódicas del proceso de aprendizaje' },
  { id: 6, title: 'Participar en reuniones del área', description: 'Asistir a las reuniones programadas por coordinación' },
  { id: 7, title: 'Aplicar metodologías de formación', description: 'Implementar las metodologías apropiadas para cada programa' },
  { id: 8, title: 'Mantener actualizado el LMS', description: 'Actualizar regularmente la plataforma de aprendizaje' },
  { id: 9, title: 'Elaborar material didáctico', description: 'Crear y actualizar material de apoyo para la formación' },
  { id: 10, title: 'Reportar novedades de aprendices', description: 'Informar oportunamente sobre las novedades de los aprendices' },
  { id: 11, title: 'Participar en proyectos institucionales', description: 'Colaborar en proyectos y actividades institucionales' },
  { id: 12, title: 'Diligenciar formatos institucionales', description: 'Completar los formatos y documentos requeridos' },
  { id: 13, title: 'Custodiar equipos y materiales', description: 'Cuidar y mantener en buen estado los recursos asignados' },
  { id: 14, title: 'Atender requerimientos de coordinación', description: 'Responder oportunamente a solicitudes de coordinación' },
  { id: 15, title: 'Mantener competencias actualizadas', description: 'Participar en actividades de actualización profesional' },
  { id: 16, title: 'Cumplir normatividad institucional', description: 'Acatar las normas y procedimientos establecidos' },
  { id: 17, title: 'Entregar informes mensuales', description: 'Presentar los informes requeridos dentro de los plazos establecidos' },
];

export default function ReportGC({ onBack }) {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('2024');
  const [obligationData, setObligationData] = useState({});

  const handleObligationChange = (id, field, value) => {
    setObligationData(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleFileChange = (id, files) => {
    if (files) {
      const fileArray = Array.from(files);
      handleObligationChange(id, 'files', fileArray);
      toast.success(`${fileArray.length} archivo(s) agregado(s) a la obligación ${id}`);
    }
  };

  const handleSubmit = () => {
    if (!month || !year) {
      toast.error('Por favor completa el mes y año del informe');
      return;
    }
    
    toast.success('Informe GC enviado exitosamente');
    onBack();
  };

  const handleSaveDraft = () => {
    toast.success('Borrador guardado correctamente');
  };

  return (
    <div className="p-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft size={18} className="mr-2" />
        Volver
      </Button>

      <div className="mb-8">
        <h1 className="mb-2">Informe de Gestión Contractual (GC)</h1>
        <p className="text-gray-600">
          Completa el informe con las evidencias de cada obligación
        </p>
      </div>

      {/* Instructions */}
      <Card className="p-4 mb-6 border-l-4 border-l-blue-500 bg-blue-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-blue-800">
            <p className="mb-2">Para cada obligación debes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Describir las actividades realizadas</li>
              <li>Adjuntar las evidencias correspondientes (fotos, documentos, etc.)</li>
              <li>Si no realizaste la actividad, marca la casilla y justifica el motivo</li>
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
              onChange={(e) => setMonth(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Selecciona un mes</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
          <div>
            <Label htmlFor="year">Año</Label>
            <Input
              id="year"
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2024"
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      {/* Obligations */}
      <Card className="p-6 mb-6">
        <h2 className="mb-4">Obligaciones Contractuales (17)</h2>
        
        <Accordion type="single" collapsible className="space-y-3">
          {obligations.map((obligation) => (
            <AccordionItem key={obligation.id} value={`obligation-${obligation.id}`} className="border rounded-lg px-4 bg-white">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#39A900]">{obligation.id}</span>
                  </div>
                  <div>
                    <div className="font-medium">{obligation.title}</div>
                    <div className="text-sm text-gray-500">{obligation.description}</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Checkbox
                      id={`not-done-${obligation.id}`}
                      checked={obligationData[obligation.id]?.notDone || false}
                      onCheckedChange={(checked) => 
                        handleObligationChange(obligation.id, 'notDone', checked)
                      }
                    />
                    <Label htmlFor={`not-done-${obligation.id}`} className="cursor-pointer">
                      Esta actividad no se realizó en este periodo
                    </Label>
                  </div>

                  {obligationData[obligation.id]?.notDone ? (
                    <div>
                      <Label>Justificación</Label>
                      <Textarea
                        placeholder="Explica por qué no se realizó esta actividad..."
                        value={obligationData[obligation.id]?.reason || ''}
                        onChange={(e) => handleObligationChange(obligation.id, 'reason', e.target.value)}
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label>Descripción de actividades realizadas</Label>
                        <Textarea
                          placeholder="Describe las actividades realizadas para cumplir con esta obligación..."
                          value={obligationData[obligation.id]?.description || ''}
                          onChange={(e) => handleObligationChange(obligation.id, 'description', e.target.value)}
                          className="mt-2"
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label>Evidencias (Fotos, documentos, etc.)</Label>
                        <div className="mt-2">
                          <label
                            htmlFor={`file-${obligation.id}`}
                            className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#39A900] hover:bg-green-50 transition-colors"
                          >
                            <div className="text-center">
                              <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                              <p className="text-sm text-gray-600">
                                Haz clic para subir archivos
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                PDF, DOC, JPG, PNG (máx. 10MB)
                              </p>
                            </div>
                            <input
                              id={`file-${obligation.id}`}
                              type="file"
                              multiple
                              className="hidden"
                              onChange={(e) => handleFileChange(obligation.id, e.target.files)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </label>
                          {obligationData[obligation.id]?.files?.length > 0 && (
                            <div className="mt-2 text-sm text-[#39A900]">
                              {obligationData[obligation.id].files.length} archivo(s) seleccionado(s)
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={handleSaveDraft} variant="outline" className="border-[#39A900] text-[#39A900] hover:bg-green-50">
          <Save size={18} className="mr-2" />
          Guardar Borrador
        </Button>
        <Button onClick={handleSubmit} className="bg-[#39A900] hover:bg-[#2d8400]">
          <FileText size={18} className="mr-2" />
          Enviar Informe
        </Button>
      </div>
    </div>
  );
}
