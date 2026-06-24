import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Trash2,
  RotateCcw,
  AlertTriangle,
  FileText,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";
const initialItems = [
  { id: 1, name: "Borrador Informe GC - Octubre 2024", deletedAt: "2024-10-15", type: "Borrador GC", month: "Octubre 2024" },
  { id: 2, name: "Informe GF - Agosto 2024", deletedAt: "2024-08-20", type: "Informe GF", month: "Agosto 2024" },
  { id: 3, name: "Borrador Informe GF - Julio 2024", deletedAt: "2024-07-31", type: "Borrador GF", month: "Julio 2024" }
];
const typeColor = {
  "Borrador GC": "bg-blue-100 text-blue-700",
  "Borrador GF": "bg-purple-100 text-purple-700",
  "Informe GC": "bg-green-100 text-green-700",
  "Informe GF": "bg-amber-100 text-amber-700",
  "Planilla": "bg-gray-100 text-gray-600"
};
export default function TrashView() {
  const [items, setItems] = useState(initialItems);
  const restore = (item) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    toast.success(`"${item.name}" restaurado correctamente`);
  };
  const deletePermanently = (item) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    toast.success(`"${item.name}" eliminado permanentemente`);
  };
  const emptyTrash = () => {
    setItems([]);
    toast.success("Papelera vaciada");
  };
  const restoreAll = () => {
    setItems([]);
    toast.success("Todos los elementos restaurados");
  };
  return <div className="p-8 bg-gradient-to-br from-gray-50 to-red-50/20 min-h-screen">

      {
    /* Header */
  }
      <div className="mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Trash2 size={24} />
              <p className="text-orange-100">Gestión de Archivos</p>
            </div>
            <h1 className="mb-2 text-white">Papelera</h1>
            <p className="text-orange-100 text-lg">
              Documentos eliminados — puedes restaurarlos o eliminarlos permanentemente
            </p>
          </div>
          {items.length > 0 && <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
              <div className="text-3xl font-bold">{items.length}</div>
              <div className="text-orange-100 text-sm">elemento{items.length !== 1 ? "s" : ""}</div>
            </div>}
        </div>
      </div>

      {
    /* Toolbar */
  }
      {items.length > 0 && <div className="flex justify-end gap-3 mb-6">
          <Button
    variant="outline"
    onClick={restoreAll}
    className="border-[#39A900] text-[#39A900] hover:bg-green-50 gap-2"
  >
            <RotateCcw size={16} />
            Restaurar todos
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-red-400 text-red-600 hover:bg-red-50 gap-2">
                <Trash2 size={16} />
                Vaciar papelera
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Vaciar la papelera?</AlertDialogTitle>
                <AlertDialogDescription>
                  Se eliminarán permanentemente los {items.length} elemento{items.length !== 1 ? "s" : ""}.
                  Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={emptyTrash} className="bg-red-600 hover:bg-red-700">
                  Vaciar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>}

      {
    /* Empty state */
  }
      {items.length === 0 ? <Card className="p-16 text-center border-0 shadow-xl">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
            <Trash2 className="text-gray-400" size={48} />
          </div>
          <h3 className="text-gray-500 mb-2">La papelera está vacía</h3>
          <p className="text-gray-400 text-sm">Los documentos eliminados aparecerán aquí</p>
        </Card> : <>
          <div className="space-y-3 mb-6">
            {items.map((item) => <Card
    key={item.id}
    className="p-5 border-0 shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
  >
                <div className="absolute inset-0 bg-gradient-to-r from-red-50/40 to-orange-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-between relative z-10 gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg grayscale group-hover:grayscale-0 transition-all">
                      <FileText className="text-white" size={22} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-700 truncate line-through">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColor[item.type]}`}>
                          {item.type}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={11} />
                          Eliminado el {item.deletedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Button
    size="sm"
    variant="outline"
    onClick={() => restore(item)}
    className="border-2 border-[#39A900] text-[#39A900] hover:bg-green-50 gap-1.5"
  >
                      <RotateCcw size={14} />
                      Restaurar
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
    size="sm"
    variant="outline"
    className="border-2 border-red-400 text-red-600 hover:bg-red-50 gap-1.5"
  >
                          <Trash2 size={14} />
                          Eliminar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar permanentemente?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Se eliminará "{item.name}" de forma permanente. Esta acción no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
    onClick={() => deletePermanently(item)}
    className="bg-red-600 hover:bg-red-700"
  >
                            Eliminar permanentemente
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>)}
          </div>

          {
    /* Warning */
  }
          <Card className="p-5 bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                <AlertTriangle className="text-white" size={20} />
              </div>
              <div>
                <p className="font-semibold text-orange-800 mb-1">Aviso Importante</p>
                <p className="text-sm text-orange-700 leading-relaxed">
                  Los documentos en la papelera se eliminarán automáticamente después de <strong>30 días</strong>.
                  Restáuralos antes de que expire el plazo si deseas conservarlos.
                </p>
              </div>
            </div>
          </Card>
        </>}
    </div>;
}
