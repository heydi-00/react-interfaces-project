import { useState } from 'react';
import { toast } from 'sonner';
import { User, Lock, Eye, EyeOff, Mail, UserPlus, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';


export default function Login({ onLogin, onRegister }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    if (isRegistering) {
      if (!formData.email || !formData.fullName) {
        toast.error('Por favor completa todos los campos');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Las contraseñas no coinciden');
        return;
      }
      toast.success('¡Registro exitoso! Un coordinador debe asignar tu rol.');
      if (onRegister) {
        onRegister({ username: formData.username, email: formData.email, fullName: formData.fullName, role: 'pending', status: 'active' });
      }
      setIsRegistering(false);
      setFormData({ username: '', email: '', password: '', confirmPassword: '', fullName: '' });
      return;
    }
    if (formData.username.toLowerCase() === 'instructor' && formData.password === '123') {
      toast.success('¡Bienvenido Instructor!');
      onLogin({ name: 'Juan Instructor', role: 'instructor' });
    } else if (formData.username.toLowerCase() === 'coordinador' && formData.password === '123') {
      toast.success('¡Bienvenido Coordinador!');
      onLogin({ name: 'María Coordinadora', role: 'coordinator' });
    } else {
      toast.error('Credenciales incorrectas');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) { toast.error('Por favor ingresa tu correo electrónico'); return; }
    toast.success('Se ha enviado un correo con instrucciones para recuperar tu contraseña');
    setShowForgotPassword(false);
    setForgotPasswordEmail('');
  };

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setFormData({ username: '', email: '', password: '', confirmPassword: '', fullName: '' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6"
      style={{ background: '#07100a' }}>

      {/* ── Background glow layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large bottom-left green bloom */}
        <div className="absolute bottom-0 left-0 w-[70vw] h-[60vh]"
          style={{
            background: 'radial-gradient(ellipse at 20% 80%, rgba(57,169,0,0.28) 0%, transparent 65%)',
            filter: 'blur(8px)',
          }} />
        {/* Mid green wave */}
        <div className="absolute bottom-10 left-[5%] w-[55vw] h-[45vh]"
          style={{
            background: 'radial-gradient(ellipse at 30% 70%, rgba(57,169,0,0.18) 0%, transparent 60%)',
            transform: 'rotate(-18deg)',
            filter: 'blur(6px)',
          }} />
        {/* Thin bright streak top-left */}
        <div className="absolute top-[25%] left-[8%] w-[40vw] h-[20vh]"
          style={{
            background: 'radial-gradient(ellipse at 10% 50%, rgba(80,220,0,0.12) 0%, transparent 70%)',
            transform: 'rotate(-8deg)',
            filter: 'blur(10px)',
          }} />
        {/* Subtle center glow */}
        <div className="absolute top-1/2 left-1/3 w-[30vw] h-[30vh] -translate-y-1/2"
          style={{
            background: 'radial-gradient(ellipse, rgba(57,169,0,0.08) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }} />
        {/* Thin curving line effects */}
        <svg className="absolute bottom-0 left-0 w-[65%] h-[75%] opacity-25" viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50 450 Q 100 300 250 380 Q 400 460 550 320 Q 650 220 750 280" stroke="rgba(80,200,0,0.6)" strokeWidth="1.5" fill="none"/>
          <path d="M-80 480 Q 80 350 220 420 Q 370 490 520 360 Q 630 270 730 310" stroke="rgba(57,169,0,0.5)" strokeWidth="1" fill="none"/>
          <path d="M-30 410 Q 120 260 280 350 Q 440 440 600 290 Q 680 200 780 250" stroke="rgba(100,220,0,0.35)" strokeWidth="0.8" fill="none"/>
          <path d="M20 390 Q 150 240 300 330 Q 460 420 620 270" stroke="rgba(57,169,0,0.3)" strokeWidth="0.6" fill="none"/>
        </svg>
      </div>

      {/* ── Layout ── */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between gap-16">

        {/* Left branding */}
        <div className="hidden md:flex flex-col flex-1 max-w-sm">
          <p className="text-xs font-bold tracking-[0.25em] mb-5" style={{ color: '#39A900' }}>
            SISTEMA ACTIVO
          </p>
          <h1 className="text-8xl font-black leading-none mb-6" style={{ color: '#39A900', textShadow: '0 0 40px rgba(57,169,0,0.5)' }}>
            STIMI
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Sistema de Trazabilidad de Informes<br />Mensuales de Instructores
          </p>
        </div>

        {/* Right card */}
        <div className="w-full max-w-lg flex-shrink-0 rounded-2xl p-10"
          style={{
            background: 'rgba(15, 22, 15, 0.88)',
            backdropFilter: 'blur(28px)',
            border: '1px solid rgba(57,169,0,0.18)',
            boxShadow: '0 8px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(57,169,0,0.08)',
          }}>

          {/* Mobile logo */}
          <p className="text-xs font-bold tracking-widest mb-1 md:hidden" style={{ color: '#39A900' }}>SISTEMA ACTIVO</p>
          <h2 className="text-5xl font-black mb-6 md:hidden" style={{ color: '#39A900' }}>STIMI</h2>

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            {isRegistering ? 'Crear cuenta' : 'Bienvenido'}
          </h2>
          <p className="text-gray-500 text-base text-center mb-9">
            {isRegistering ? 'Completa el formulario para solicitar acceso' : 'Ingresa tus credenciales para continuar'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegistering && (
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full h-14 pl-11 pr-4 rounded-xl text-base text-white placeholder-gray-500 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(57,169,0,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            )}

            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder={isRegistering ? 'Nombre de usuario' : 'Instructor / Coordinador'}
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                className="w-full h-14 pl-11 pr-4 rounded-xl text-base text-white placeholder-gray-500 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(57,169,0,0.5)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>

            {isRegistering && (
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-14 pl-11 pr-4 rounded-xl text-base text-white placeholder-gray-500 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(57,169,0,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            )}

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-14 pl-11 pr-12 rounded-xl text-base text-white placeholder-gray-500 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(57,169,0,0.5)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {isRegistering && (
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full h-14 pl-11 pr-12 rounded-xl text-base text-white placeholder-gray-500 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(57,169,0,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-14 rounded-xl font-bold text-base tracking-widest transition-all duration-200 flex items-center justify-center gap-2 mt-1"
              style={{ background: '#39A900', color: '#fff', boxShadow: '0 0 28px rgba(57,169,0,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2d8400'; e.currentTarget.style.boxShadow = '0 0 44px rgba(57,169,0,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#39A900'; e.currentTarget.style.boxShadow = '0 0 28px rgba(57,169,0,0.4)'; }}
            >
              {isRegistering ? (
                <><UserPlus size={18} /> REGISTRARSE</>
              ) : (
                <><ArrowRight size={18} /> INGRESAR</>
              )}
            </button>
          </form>

          {/* Bottom links */}
          <div className="mt-5 flex flex-col items-center gap-3">
            {!isRegistering && (
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            )}
            <button
              type="button"
              onClick={switchMode}
              className="text-xs transition-colors"
              style={{ color: '#39A900' }}
              onMouseEnter={e => e.currentTarget.style.color = '#5ccc00'}
              onMouseLeave={e => e.currentTarget.style.color = '#39A900'}
            >
              {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
            {!isRegistering && (
              <p className="text-xs text-gray-600 mt-1">
                Demo: <span className="font-mono">instructor</span> o <span className="font-mono">coordinador</span> · pass <span className="font-mono">123</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md" style={{ background: '#0f160f', border: '1px solid rgba(57,169,0,0.2)', color: 'white' }}>
          <DialogHeader>
            <DialogTitle className="text-white">Recuperar Contraseña</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4 pt-2">
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="tu@correo.com"
                value={forgotPasswordEmail}
                onChange={e => setForgotPasswordEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowForgotPassword(false)}
                className="flex-1 h-10 rounded-xl text-sm text-gray-400 border border-gray-700 hover:border-gray-500 transition-colors">
                Cancelar
              </button>
              <button type="submit"
                className="flex-1 h-10 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: '#39A900' }}>
                <Mail size={15} /> Enviar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

