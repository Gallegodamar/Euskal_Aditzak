
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'study' | 'play' | 'conjugate';
  setActiveTab: (tab: 'study' | 'play' | 'conjugate') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-0 sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 p-2 rounded-lg shadow-sm">
              <i className="fas fa-language text-white text-lg sm:text-xl"></i>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 basque-font tracking-tight">
              Euskal<span className="text-emerald-600">Aditzak</span>
            </h1>
          </div>

          {/* Navigation Tabs - No horizontal scroll on mobile */}
          <nav className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto sm:min-w-[400px]">
            <button
              onClick={() => setActiveTab('study')}
              className={`flex items-center justify-center px-2 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'study'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-book-open mr-1.5 sm:mr-2"></i>
              Ikasi
            </button>
            <button
              onClick={() => setActiveTab('conjugate')}
              className={`flex items-center justify-center px-2 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'conjugate'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-sliders-h mr-1.5 sm:mr-2"></i>
              Jokagailua
            </button>
            <button
              onClick={() => setActiveTab('play')}
              className={`flex items-center justify-center px-2 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'play'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-gamepad mr-1.5 sm:mr-2"></i>
              Jolastu
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-6 sm:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} EuskalAditzak - Euskara ikasteko tresna
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
