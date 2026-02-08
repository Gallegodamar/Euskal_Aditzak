import React, { useEffect } from "react";
import { supabase } from "../supabase";

const AuthCallback: React.FC = () => {
  useEffect(() => {
    let isDone = false;

    const finish = (path: string) => {
      if (isDone) return;
      isDone = true;
      window.location.replace(path); // mejor que href (evita volver atrás al callback)
    };

    // 1) Nos suscribimos al cambio de sesión
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) finish("/");
    });

    // 2) Fallback: comprobamos sesión y reintentamos un momento
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) return finish("/");

      // pequeño delay por si el callback aún está asentando la sesión
      setTimeout(async () => {
        const { data: data2 } = await supabase.auth.getSession();
        if (data2.session) finish("/");
        else finish("/login");
      }, 400);
    })();

    return () => {
      sub?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spinner mb-4"></div>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
        Saioa egiaztatzen...
      </p>
    </div>
  );
};

export default AuthCallback;
