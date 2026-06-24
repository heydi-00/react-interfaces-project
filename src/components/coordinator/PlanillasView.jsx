import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Plus,
  FileText,
  Upload,
  Pencil,
  Trash2,
  X,
  Save,
  Download,
  ClipboardList
} from "lucide-react";
import { toast } from "sonner";
const emptyForm = { name: "", description: "", file: null };
export default function PlanillasView({ planillas, setPlanillas }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };
  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description, file: null });
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };
  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("El nombre de la planilla es obligatorio");
      return;
    }
    if (editingId !== null) {
      setPlanillas(
        planillas.map(
          (p) => p.id === editingId ? {
            ...p,
            name: form.name.trim(),
            description: form.description.trim(),
            fileName: form.file ? form.file.name : p.fileName
          } : p
        )
      );
      toast.success("Planilla actualizada correctamente");
    } else {
      const newPlanilla = {
        id: Date.now(),
        name: form.name.trim(),
        description: form.description.trim(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        fileName: form.file ? form.file.name : void 0
      };
      setPlanillas([...planillas, newPlanilla]);
      toast.success("Planilla creada y disponible para instructores");
    }
    closeForm();
  };
  const handleDelete = (id, name) => {
    setPlanillas(planillas.filter((p) => p.id !== id));
    toast.success(`Planilla "${name}" eliminada`);
  };
  return <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">Planillas GC</h1>
          <p className="text-gray-600">
            Crea y gestiona las planillas que los instructores deben diligenciar
          </p>
        </div>
        <Button onClick={openCreate} className="bg-[#39A900] hover:bg-[#2d8400] gap-2">
          <Plus size={18} />
          Nueva Planilla
        </Button>
      </div>

      {
    /* Form panel */
  }
      {showForm && <Card className="p-6 mb-8 border-2 border-[#39A900]/30 bg-green-50/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#39A900]">
              {editingId !== null ? "Editar Planilla" : "Nueva Planilla"}
            </h2>
            <Button variant="ghost" size="sm" onClick={closeForm}>
              <X size={18} />
            </Button>
          </div>

          <div className="space-y-5">
            <div>
              <Label htmlFor="planilla-name">
                Nombre de la planilla <span className="text-red-500">*</span>
              </Label>
              <Input
    id="planilla-name"
    value={form.name}
    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
    placeholder="Ej. Planilla de seguimiento aprendices — Mayo 2025"
    className="mt-2"
  />
            </div>

            <div>
              <Label htmlFor="planilla-desc">Descripción / instrucciones</Label>
              <Textarea
    id="planilla-desc"
    value={form.description}
    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
    placeholder="Indica cómo debe diligenciarse esta planilla..."
    className="mt-2"
    rows={3}
  />
            </div>

            <div>
              <Label>Archivo de plantilla (opcional)</Label>
              <label
    htmlFor="planilla-file"
    className="mt-2 flex items-center justify-center w-full p-5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#39A900] hover:bg-green-50 transition-colors"
  >
                <div className="text-center">
                  <Upload className="mx-auto mb-2 text-gray-400" size={28} />
                  <p className="text-sm text-gray-600">
                    {form.file ? form.file.name : "Haz clic para subir la plantilla"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, XLS, XLSX</p>
                </div>
                <input
    id="planilla-file"
    type="file"
    className="hidden"
    accept=".pdf,.doc,.docx,.xls,.xlsx"
    onChange={(e) => {
      const f = e.target.files?.[0];
      if (f) setForm((prev) => ({ ...prev, file: f }));
    }}
  />
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} className="bg-[#39A900] hover:bg-[#2d8400] gap-2">
                <Save size={16} />
                {editingId !== null ? "Guardar cambios" : "Crear planilla"}
              </Button>
              <Button variant="outline" onClick={closeForm}>
                Cancelar
              </Button>
            </div>
          </div>
        </Card>}

      {
    /* Empty state */
  }
      {planillas.length === 0 && !showForm && <Card className="p-12 text-center border-dashed border-2">
          <ClipboardList className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-gray-500 mb-2">No hay planillas creadas</h3>
          <p className="text-sm text-gray-400 mb-6">
            Crea la primera planilla para que los instructores puedan diligenciarla
          </p>
          <Button onClick={openCreate} className="bg-[#39A900] hover:bg-[#2d8400] gap-2">
            <Plus size={18} />
            Crear primera planilla
          </Button>
        </Card>}

      {
    /* Planillas list */
  }
      {planillas.length > 0 && <div className="grid gap-4">
          {planillas.map((p) => <Card key={p.id} className="p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="text-[#39A900]" size={24} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{p.name}</h3>
                {p.description && <p className="text-sm text-gray-500 mb-2 line-clamp-2">{p.description}</p>}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Creada: {p.createdAt}</span>
                  {p.fileName && <span className="flex items-center gap-1">
                      <FileText size={11} />
                      {p.fileName}
                    </span>}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {p.fileName && <Button
    variant="outline"
    size="sm"
    onClick={() => toast.info(`Descargando ${p.fileName}...`)}
    className="border-[#39A900] text-[#39A900] hover:bg-green-50"
  >
                    <Download size={15} />
                  </Button>}
                <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                  <Pencil size={15} />
                </Button>
                <Button
    variant="outline"
    size="sm"
    onClick={() => handleDelete(p.id, p.name)}
    className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
  >
                  <Trash2 size={15} />
                </Button>
              </div>
            </Card>)}
        </div>}
    </div>;
}
