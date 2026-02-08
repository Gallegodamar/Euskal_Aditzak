
import React, { useEffect } from 'react';
import { supabase } from '../supabase';

const AuthCallback: React.FC = () => {
  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        window.location.href = "/"; 
      } else {
        console.error("Auth error:", error);
        window.location.href = "/login";
      }
    };
    handleAuth();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spinner mb-4"></div>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Saioa egiaztatzen...</p>
    </div>
  );
};

export default AuthCallback;
