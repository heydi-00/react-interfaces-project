import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Trash2, RotateCcw, X, AlertTriangle, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function TrashView() {
  const deletedItems = [
    { id: 1, name: 'Borrador Informe GC - Octubre', date: '2024-10-15', type: 'Borrador' },
    { id: 2, name: 'Informe GF - Agosto', date: '2024-08-20', type: 'Informe' },
  ];

  const handleRestore = (name) => {
    toast.success(`${name} restaurado correctamente`);
  };

  const handleDelete = (name) => {
    toast.success(`${name} eliminado permanentemente`);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-red-50/20 min-h-screen">
      {/* Header with gradient */}
      <div className="mb-8 bg-gradient-to-r from-orange-600 via-red-600 to-pink-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Trash2 size={24} />
            <p className="text-orange-100">Gestión de Archivos</p>
          </div>
          <h1 className="mb-2 text-white">Papelera</h1>
          <p className="text-orange-100 text-lg">
            Documentos eliminados recientemente - Puedes restaurarlos o eliminarlos permanentemente
          </p>
        </div>
      </div>

      {deletedItems.length === 0 ? (
        <Card className="p-16 text-center border-0 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100/50 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center">
              <Trash2 className="text-gray-400" size={48} />
            </div>
            <h3 className="text-gray-500 mb-2">La papelera está vacía</h3>
            <p className="text-gray-400">
              Los documentos eliminados aparecerán aquí
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {deletedItems.map((item) => (
            <Card key={item.id} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1">{item.name}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-600">Eliminado el {item.date}</span>
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestore(item.name)}
                    className="border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 transition-all"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Restaurar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.name)}
                    className="border-2 border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600 transition-all"
                  >
                    <X size={16} className="mr-2" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Warning Card */}
      {deletedItems.length > 0 && (
        <Card className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-200/30 rounded-full -mr-24 -mt-24 blur-2xl" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="text-white" size={24} />
            </div>
            <div>
              <h3 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                Aviso Importante
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Los documentos en la papelera se eliminarán automáticamente después de 30 días. 
                Si deseas conservarlos, restáuralos antes de que expire el plazo.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}