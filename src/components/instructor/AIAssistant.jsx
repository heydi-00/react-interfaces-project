import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Bot, Send, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente virtual del SITMI. ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre cómo completar informes, fechas de entrega, documentos requeridos y más.'
    }
  ]);

  const suggestions = [
    '¿Qué documentos necesito para el informe GC?',
    '¿Cuál es la fecha límite para entregar informes?',
    '¿Cómo adjunto evidencias a una obligación?',
    '¿Qué hago si no realicé una actividad?'
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = message;
    setConversation([...conversation, { role: 'user', content: userMessage }]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (userMessage.toLowerCase().includes('gc') || userMessage.toLowerCase().includes('contractual')) {
        response = 'Para el informe de Gestión Contractual (GC), necesitas completar las 17 obligaciones. Para cada una debes: 1) Describir las actividades realizadas, 2) Adjuntar evidencias (fotos, documentos), 3) Si no realizaste la actividad, marcar la casilla y justificar. ¿Necesitas ayuda con alguna obligación específica?';
      } else if (userMessage.toLowerCase().includes('fecha') || userMessage.toLowerCase().includes('límite')) {
        response = 'Los informes deben ser entregados entre el día 1 y el 28 de cada mes. Es importante que respetes estas fechas para evitar alertas en tu cumplimiento.';
      } else if (userMessage.toLowerCase().includes('evidencia')) {
        response = 'Para adjuntar evidencias: 1) Accede a la obligación correspondiente en el informe GC, 2) Haz clic en la zona de carga, 3) Selecciona tus archivos (PDF, JPG, PNG), 4) Los archivos se cargarán automáticamente. Puedes subir múltiples archivos por obligación.';
      } else {
        response = 'Entiendo tu pregunta. Para más información específica, puedes consultar la sección de configuración o contactar a tu coordinador. ¿Hay algo más en lo que pueda ayudarte?';
      }

      setConversation(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#39A900] to-[#2d8400] rounded-xl flex items-center justify-center">
            <Bot className="text-white" size={24} />
          </div>
          <h1>Asistente IA</h1>
        </div>
        <p className="text-gray-600">
          Tu ayudante inteligente para resolver dudas sobre el sistema
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-[#39A900] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot size={16} />
                      <span className="text-xs">Asistente SITMI</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Escribe tu pregunta aquí..."
                className="resize-none"
                rows={2}
              />
              <Button
                onClick={handleSend}
                className="bg-[#39A900] hover:bg-[#2d8400] self-end"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>

        {/* Suggestions Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-[#39A900]" size={20} />
              <h3>Sugerencias</h3>
            </div>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4 hover:border-[#39A900] hover:bg-green-50"
                  onClick={() => setMessage(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-green-50 border-[#39A900]">
            <h3 className="text-[#39A900] mb-2">Ayuda rápida</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• Pregunta sobre cualquier proceso</li>
              <li>• Obtén información de fechas</li>
              <li>• Consulta requisitos de informes</li>
              <li>• Resuelve dudas técnicas</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
