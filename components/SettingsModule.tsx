
import React, { useState } from 'react';
import { 
  Settings, User, Bell, Shield, Calendar, 
  Save, Sliders, Globe, Mail, Lock, 
  HelpCircle, ChevronRight, AlertCircle,
  Clock, Info
} from 'lucide-react';

const SettingsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'geral' | 'notificacoes' | 'seguranca' | 'fiscal'>('geral');

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <header className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="text-slate-400" />
            Configurações do Sistema
          </h1>
          <p className="text-sm text-slate-500">Gerencie parâmetros, usuários e regras de conformidade</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 active:scale-95">
          <Save size={18} /> Salvar Alterações
        </button>
      </header>

      {/* Tabs Menu */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-8">
        {[
          { id: 'geral', label: 'Geral & Perfil', icon: <User size={18} /> },
          { id: 'notificacoes', label: 'Alertas & Notificações', icon: <Bell size={18} /> },
          { id: 'fiscal', label: 'Parâmetros Fiscais', icon: <Calendar size={18} /> },
          { id: 'seguranca', label: 'Segurança & Auditoria', icon: <Shield size={18} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 py-4 px-1 text-sm font-semibold transition-all border-b-2 ${
              activeTab === tab.id 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Configuration Content */}
        <div className="md:col-span-8 space-y-8">
          
          {activeTab === 'geral' && (
            <section className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                  <User size={16} className="text-blue-500" /> Informações do Diretor
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">Nome Completo</label>
                    <input type="text" defaultValue="Diretor Financeiro TJPA" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">Email Institucional</label>
                    <input type="email" defaultValue="direcao.financas@tjpa.jus.br" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold text-slate-500">Departamento</label>
                    <input type="text" defaultValue="Secretaria de Planejamento, Coordenação e Finanças" disabled className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-400 cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-blue-500" /> Regionalização e Idioma
                </h3>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white">🇧🇷</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Idioma do Sistema</p>
                          <p className="text-[11px] text-slate-500">Português (Brasil)</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300" />
                   </div>
                   <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white"><Clock size={16} className="text-slate-500" /></div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Fuso Horário</p>
                          <p className="text-[11px] text-slate-500">Brasília (GMT-3)</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300" />
                   </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'notificacoes' && (
            <section className="space-y-6 animate-in fade-in duration-300">
               <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-4">Canais de Comunicação</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Alertas do Sistema', desc: 'Notificações no painel Intelligence Engine', icon: <Bell />, active: true },
                    { label: 'E-mail diário', desc: 'Resumo de vencimentos matinal', icon: <Mail />, active: true },
                    { label: 'Relatórios Mensais', desc: 'Envio automático de PDFs de conformidade', icon: <Info />, active: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="text-slate-400">{item.icon}</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.label}</p>
                          <p className="text-[11px] text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.active ? 'bg-blue-600' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.active ? 'left-6' : 'left-1'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-6 shadow-sm border-l-4 border-l-orange-400">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={18} className="text-orange-500" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Parametrização de Riscos</h3>
                </div>
                <p className="text-[11px] text-slate-500 mb-6">Defina a antecedência dos alertas do motor de inteligência.</p>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase">Risco Alto (Vencimento Fatal)</label>
                      <span className="text-xs font-black text-blue-600">01 dia</span>
                    </div>
                    <input type="range" min="1" max="5" defaultValue="1" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase">Risco Médio (Preparação)</label>
                      <span className="text-xs font-black text-blue-600">05 dias</span>
                    </div>
                    <input type="range" min="3" max="10" defaultValue="5" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'fiscal' && (
            <section className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Calendário de Feriados TJPA 2024</h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <Plus size={14} /> Adicionar Ponto Facultativo
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { date: '01/01/2024', name: 'Confraternização Universal' },
                    { date: '01/05/2024', name: 'Dia do Trabalhador' },
                    { date: '07/09/2024', name: 'Independência do Brasil' },
                    { date: '12/10/2024', name: 'Nossa Sra. Aparecida' },
                    { date: '28/10/2024', name: 'Dia do Servidor Público (Facultativo)', accent: true },
                    { date: '25/12/2024', name: 'Natal' },
                  ].map((holiday, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${holiday.accent ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                      <span className="text-xs font-black text-slate-900">{holiday.date}</span>
                      <span className="text-xs text-slate-600">{holiday.name}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-slate-400 italic">
                  * O sistema antecipa automaticamente vencimentos que coincidem com estas datas para o dia útil anterior.
                </p>
              </div>
            </section>
          )}

        </div>

        {/* Sidebar Help/Info */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <h4 className="font-bold flex items-center gap-2 mb-4">
              <HelpCircle size={18} className="text-blue-400" />
              Central de Ajuda
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Precisa de ajuda para parametrizar o motor de inteligência ou integrar novos contratos?
            </p>
            <div className="space-y-3">
              <button className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10 text-left">
                Manual de Compliance
              </button>
              <button className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10 text-left">
                Suporte de TI
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Informações do Sistema</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Versão</span>
                <span className="text-xs font-bold text-slate-900">2.5.0-Stable</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Último Backup</span>
                <span className="text-xs font-bold text-slate-900">Hoje, 04:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Status Database</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   Operacional
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsModule;
const Plus = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
