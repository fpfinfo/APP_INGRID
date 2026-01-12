
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileStack, Receipt, ShieldCheck, Settings, Menu, Bell, User } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ContractsModule from './components/ContractsModule';
import ExpensesModule from './components/ExpensesModule';
import ComplianceModule from './components/ComplianceModule';
import SettingsModule from './components/SettingsModule';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/contratos', label: 'Contratos', icon: <FileStack size={20} /> },
    { path: '/despesas', label: 'Despesas', icon: <Receipt size={20} /> },
    { path: '/compliance', label: 'Compliance', icon: <ShieldCheck size={20} /> },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 bg-slate-900 h-screen sticky top-0 text-slate-300">
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white italic">S</div>
          <span className="font-bold text-white tracking-tight text-lg">SGF-TJPA</span>
        </div>
      </div>
      
      <nav className="flex-1 mt-4 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-inner' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <Link 
          to="/settings" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            location.pathname === '/settings' 
              ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-inner' 
              : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Settings size={18} /> Configurações
        </Link>
      </div>
    </div>
  );
};

const TopBar = () => (
  <div className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-20">
    <div className="lg:hidden">
      <Menu className="text-slate-500" />
    </div>
    <div className="hidden md:flex flex-1 max-w-md ml-4">
      <input 
        type="text" 
        placeholder="Pesquisar contratos, empenhos..." 
        className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
    <div className="flex items-center gap-4">
      <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="h-8 w-px bg-slate-200 mx-1"></div>
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-slate-800">Dir. Financeiro</p>
          <p className="text-[10px] text-slate-400">Tribunal de Justiça</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 border flex items-center justify-center text-slate-500 group-hover:bg-slate-200 transition-colors">
          <User size={18} />
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contratos" element={<ContractsModule />} />
              <Route path="/despesas" element={<ExpensesModule />} />
              <Route path="/compliance" element={<ComplianceModule />} />
              <Route path="/settings" element={<SettingsModule />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
