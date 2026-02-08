
import React, { useState } from 'react';
import { supabase } from '../supabase';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Login error:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 p-10 border border-white flex flex-col items-center animate-in fade-in zoom-in duration-700">
        <div className="bg-emerald-600 p-4 rounded-3xl shadow-lg shadow-emerald-200 mb-8 transform transition hover:scale-110">
          <i className="fas fa-language text-white text-4xl"></i>
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 basque-font tracking-tight text-center mb-3">
          Euskal<span className="text-emerald-600">Aditzak</span>
        </h1>
        
        <p className="text-slate-500 text-center text-sm font-medium leading-relaxed mb-10 max-w-[280px]">
          Menderatu euskal aditzak modu erraz eta dibertigarrian.
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full group relative flex items-center justify-center gap-4 bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl font-bold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 shadow-sm active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spinner"></div>
          ) : (
            <>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              <span>Jarraitu Google-rekin</span>
            </>
          )}
        </button>

        <div className="mt-12 flex items-center gap-2 opacity-30">
          <div className="w-8 h-px bg-slate-400"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Aditz Masterra</span>
          <div className="w-8 h-px bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
