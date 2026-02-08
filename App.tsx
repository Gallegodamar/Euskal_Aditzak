
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import StudyMode from './components/StudyMode';
import GameMode from './components/GameMode';
import ConjugatorMode from './components/ConjugatorMode';
import Login from './components/Login';
import AuthCallback from './components/AuthCallback';
import { supabase } from './supabase';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'study' | 'play' | 'conjugate'>('play');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Router simple basado en pathname
  const path = window.location.pathname;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-emerald-50 border-t-emerald-600 rounded-full animate-spinner"></div>
      </div>
    );
  }

  // Si estamos en el callback, mostrar el componente de callback
  if (path === '/auth/callback') {
    return <AuthCallback />;
  }

  // Si no hay sesión, mostrar Login (excepto en callback)
  if (!session) {
    return <Login />;
  }

  // Aplicación principal para usuarios autenticados
  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="py-4">
        {activeTab === 'study' ? (
          <StudyMode />
        ) : activeTab === 'conjugate' ? (
          <ConjugatorMode />
        ) : (
          <GameMode />
        )}
      </div>
      
      {/* Botón de Logout flotante para pruebas (opcional) */}
      <button 
        onClick={() => supabase.auth.signOut()}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white shadow-lg border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
        title="Saioa itxi"
      >
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </Layout>
  );
};

export default App;
