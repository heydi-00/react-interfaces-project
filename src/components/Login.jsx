import { useState } from "react";
import { toast } from "sonner";
import { User as UserIcon, Lock, Eye, EyeOff, Mail, UserPlus, ArrowRight, FileText, Shield, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
const inputBase = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)"
};
export default function Login({ onLogin, onRegister, registeredUsers }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contractNumber: "",
    siifCommitment: "",
    arl: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const set = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  const emailError = formData.email !== "" && !isValidEmail(formData.email);
  const passwordMismatch = isRegistering && formData.confirmPassword !== "" && formData.confirmPassword !== formData.password;
  const focusStyle = (hasError) => (e) => {
    e.currentTarget.style.borderColor = hasError ? "rgba(239,68,68,0.8)" : "rgba(57,169,0,0.5)";
  };
  const blurStyle = (hasError) => (e) => {
    e.currentTarget.style.borderColor = hasError ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.08)";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Ingresa un correo electrónico válido");
      return;
    }
    if (isRegistering) {
      if (!formData.fullName.trim()) {
        toast.error("Ingresa tu nombre completo");
        return;
      }
      if (!formData.contractNumber.trim()) {
        toast.error("Ingresa tu número de contrato");
        return;
      }
      if (!formData.siifCommitment.trim()) {
        toast.error("Ingresa tu compromiso SIIF");
        return;
      }
      if (!formData.arl.trim()) {
        toast.error("Ingresa tu ARL");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      const emailExists = registeredUsers.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
      );
      if (emailExists) {
        toast.error("Ya existe una cuenta con ese correo electrónico");
        return;
      }
      onRegister({
        fullName: formData.fullName.trim(),
        contractNumber: formData.contractNumber.trim(),
        siifCommitment: formData.siifCommitment.trim(),
        arl: formData.arl.trim(),
        email: formData.email.trim(),
        password: formData.password,
        area: ""
      });
      toast.success("¡Cuenta creada! Espera a que el coordinador apruebe tu acceso.");
      setIsRegistering(false);
      setFormData({ fullName: "", contractNumber: "", siifCommitment: "", arl: "", email: "", password: "", confirmPassword: "" });
      return;
    }
    const result = onLogin(formData.email.trim(), formData.password);
    if (result === "ok") {
      toast.success("¡Bienvenido!");
    } else if (result === "pending") {
      toast.warning("Tu cuenta está pendiente de aprobación por el coordinador");
    } else {
      toast.error("Correo o contraseña incorrectos");
    }
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Ingresa tu correo electrónico");
      return;
    }
    if (!isValidEmail(forgotEmail)) {
      toast.error("Ingresa un correo electrónico válido");
      return;
    }
    toast.success("Se enviaron instrucciones a tu correo");
    setShowForgotPassword(false);
    setForgotEmail("");
  };
  const switchMode = () => {
    setIsRegistering((v) => !v);
    setFormData({ fullName: "", contractNumber: "", siifCommitment: "", arl: "", email: "", password: "", confirmPassword: "" });
  };
  return <div
    className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-10"
    style={{ background: "#07100a" }}
  >
      {
    /* Background glow */
  }
      <div className="absolute inset-0 pointer-events-none">
        <div
    className="absolute bottom-0 left-0 w-[70vw] h-[60vh]"
    style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(57,169,0,0.28) 0%, transparent 65%)", filter: "blur(8px)" }}
  />
        <div
    className="absolute bottom-10 left-[5%] w-[55vw] h-[45vh]"
    style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(57,169,0,0.18) 0%, transparent 60%)", transform: "rotate(-18deg)", filter: "blur(6px)" }}
  />
        <div
    className="absolute top-[25%] left-[8%] w-[40vw] h-[20vh]"
    style={{ background: "radial-gradient(ellipse at 10% 50%, rgba(80,220,0,0.12) 0%, transparent 70%)", transform: "rotate(-8deg)", filter: "blur(10px)" }}
  />
        <svg className="absolute bottom-0 left-0 w-[65%] h-[75%] opacity-25" viewBox="0 0 700 500" fill="none">
          <path d="M-50 450 Q 100 300 250 380 Q 400 460 550 320 Q 650 220 750 280" stroke="rgba(80,200,0,0.6)" strokeWidth="1.5" fill="none" />
          <path d="M-80 480 Q 80 350 220 420 Q 370 490 520 360 Q 630 270 730 310" stroke="rgba(57,169,0,0.5)" strokeWidth="1" fill="none" />
          <path d="M-30 410 Q 120 260 280 350 Q 440 440 600 290 Q 680 200 780 250" stroke="rgba(100,220,0,0.35)" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {
    /* Layout */
  }
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between gap-16">

        {
    /* Left branding */
  }
        <div className="hidden md:flex flex-col flex-1 max-w-sm">
          <p className="text-xs font-bold tracking-[0.25em] mb-5" style={{ color: "#39A900" }}>SISTEMA ACTIVO</p>
          <h1 className="text-8xl font-black leading-none mb-6" style={{ color: "#39A900", textShadow: "0 0 40px rgba(57,169,0,0.5)" }}>
            STIMI
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Sistema de Trazabilidad de Informes<br />Mensuales de Instructores
          </p>
        </div>

        {
    /* Card */
  }
        <div
    className="w-full max-w-lg flex-shrink-0 rounded-2xl"
    style={{
      background: "rgba(15,22,15,0.88)",
      backdropFilter: "blur(28px)",
      border: "1px solid rgba(57,169,0,0.18)",
      boxShadow: "0 8px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(57,169,0,0.08)"
    }}
  >
          <div className="p-10 max-h-[90vh] overflow-y-auto">
            {
    /* Mobile logo */
  }
            <p className="text-xs font-bold tracking-widest mb-1 md:hidden" style={{ color: "#39A900" }}>SISTEMA ACTIVO</p>
            <h2 className="text-5xl font-black mb-6 md:hidden" style={{ color: "#39A900" }}>STIMI</h2>

            <h2 className="text-3xl font-bold text-white text-center mb-2">
              {isRegistering ? "Crear Cuenta" : "Bienvenido"}
            </h2>
            <p className="text-gray-500 text-sm text-center mb-8">
              {isRegistering ? "Completa el formulario para registrarte" : "Ingresa tus credenciales para continuar"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {
    /* ── Campos extra del registro ── */
  }
              {isRegistering && <>
                  <Field icon={<UserIcon size={16} />}>
                    <input
    type="text"
    placeholder="Nombre Completo"
    value={formData.fullName}
    onChange={set("fullName")}
    className="w-full h-13 pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
    style={inputBase}
    onFocus={focusStyle(false)}
    onBlur={blurStyle(false)}
  />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field icon={<FileText size={15} />}>
                      <input
    type="text"
    placeholder="Número de Contrato"
    value={formData.contractNumber}
    onChange={set("contractNumber")}
    className="w-full h-13 pl-10 pr-3 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
    style={inputBase}
    onFocus={focusStyle(false)}
    onBlur={blurStyle(false)}
  />
                    </Field>
                    <Field icon={<Shield size={15} />}>
                      <input
    type="text"
    placeholder="Compromiso SIIF"
    value={formData.siifCommitment}
    onChange={set("siifCommitment")}
    className="w-full h-13 pl-10 pr-3 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
    style={inputBase}
    onFocus={focusStyle(false)}
    onBlur={blurStyle(false)}
  />
                    </Field>
                  </div>

                  <Field icon={<Building2 size={16} />}>
                    <input
    type="text"
    placeholder="ARL (Positiva, Sura, Bolívar, etc.)"
    value={formData.arl}
    onChange={set("arl")}
    className="w-full h-13 pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
    style={inputBase}
    onFocus={focusStyle(false)}
    onBlur={blurStyle(false)}
  />
                  </Field>
                </>}

              {
    /* Correo */
  }
              <div>
                <Field icon={<Mail size={16} />}>
                  <input
    type="email"
    placeholder="Correo Electrónico"
    value={formData.email}
    onChange={set("email")}
    className="w-full h-13 pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
    style={{ ...inputBase, borderColor: emailError ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.08)" }}
    onFocus={focusStyle(emailError)}
    onBlur={blurStyle(emailError)}
  />
                </Field>
                {emailError && <p className="mt-1.5 ml-1 text-xs text-red-400">Ingresa un correo válido (ej. nombre@sena.edu.co)</p>}
              </div>

              {
    /* Contraseña */
  }
              <Field icon={<Lock size={16} />} right={<button
    type="button"
    onClick={() => setShowPassword((v) => !v)}
    className="text-gray-500 hover:text-gray-300"
  >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>}>
                <input
    type={showPassword ? "text" : "password"}
    placeholder="Contraseña"
    value={formData.password}
    onChange={set("password")}
    className="w-full h-13 pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
    style={inputBase}
    onFocus={focusStyle(false)}
    onBlur={blurStyle(false)}
  />
              </Field>

              {
    /* Confirmar contraseña */
  }
              {isRegistering && <div>
                  <Field icon={<Lock size={16} />} right={<button
    type="button"
    onClick={() => setShowConfirmPassword((v) => !v)}
    className="text-gray-500 hover:text-gray-300"
  >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>}>
                    <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirmar Contraseña"
    value={formData.confirmPassword}
    onChange={set("confirmPassword")}
    className="w-full h-13 pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
    style={{ ...inputBase, borderColor: passwordMismatch ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.08)" }}
    onFocus={focusStyle(passwordMismatch)}
    onBlur={blurStyle(passwordMismatch)}
  />
                  </Field>
                  {passwordMismatch && <p className="mt-1.5 ml-1 text-xs text-red-400">Las contraseñas no coinciden</p>}
                </div>}

              <button
    type="submit"
    className="w-full h-14 rounded-xl font-bold text-base tracking-widest transition-all duration-200 flex items-center justify-center gap-2 mt-1"
    style={{ background: "#39A900", color: "#fff", boxShadow: "0 0 28px rgba(57,169,0,0.4)" }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#2d8400";
      e.currentTarget.style.boxShadow = "0 0 44px rgba(57,169,0,0.55)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#39A900";
      e.currentTarget.style.boxShadow = "0 0 28px rgba(57,169,0,0.4)";
    }}
  >
                {isRegistering ? <><UserPlus size={18} />CREAR CUENTA</> : <><ArrowRight size={18} />INGRESAR</>}
              </button>
            </form>

            <div className="mt-5 flex flex-col items-center gap-3">
              {!isRegistering && <button
    type="button"
    onClick={() => setShowForgotPassword(true)}
    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
  >
                  ¿Olvidaste tu contraseña?
                </button>}
              <button
    type="button"
    onClick={switchMode}
    className="text-xs transition-colors"
    style={{ color: "#39A900" }}
    onMouseEnter={(e) => e.currentTarget.style.color = "#5ccc00"}
    onMouseLeave={(e) => e.currentTarget.style.color = "#39A900"}
  >
                {isRegistering ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
              </button>
              {!isRegistering && <p className="text-xs text-gray-600 mt-1 text-center leading-relaxed">
                  Demo instructor: <span className="font-mono text-gray-500">instructor@sena.edu.co</span><br />
                  Demo coordinador: <span className="font-mono text-gray-500">coordinador@sena.edu.co</span><br />
                  Contraseña: <span className="font-mono text-gray-500">123</span>
                </p>}
            </div>
          </div>
        </div>
      </div>

      {
    /* Forgot Password Dialog */
  }
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md" style={{ background: "#0f160f", border: "1px solid rgba(57,169,0,0.2)", color: "white" }}>
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
    value={forgotEmail}
    onChange={(e) => setForgotEmail(e.target.value)}
    className="w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
  />
            </div>
            <div className="flex gap-3 pt-1">
              <button
    type="button"
    onClick={() => setShowForgotPassword(false)}
    className="flex-1 h-10 rounded-xl text-sm text-gray-400 border border-gray-700 hover:border-gray-500 transition-colors"
  >
                Cancelar
              </button>
              <button
    type="submit"
    className="flex-1 h-10 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
    style={{ background: "#39A900" }}
  >
                <Mail size={15} /> Enviar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>;
}
function Field({
  icon,
  right,
  children
}) {
  return <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        {icon}
      </span>
      {children}
      {right && <span className="absolute right-4 top-1/2 -translate-y-1/2">{right}</span>}
    </div>;
}
