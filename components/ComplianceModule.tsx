
import React from 'react';
import { 
  ShieldCheck, AlertTriangle, ShieldAlert, 
  CheckCircle, ArrowRight, History, 
  FileSearch, Scale, Fingerprint
} from 'lucide-react';
import { Alert } from '../types';
import { formatDate } from '../utils/dateUtils';

const MOCK_ALERTS: Alert[] = [
  { id: 'a1', type: 'Deadlines', severity: 'High', message: 'Prazo Fatal: O contrato PE-045/2023 expira em 15 dias. Processo de renovação não identificado no sistema.', date: '2024-05-15', relatedEntityId: '1' },
  { id: 'a2', type: 'Compliance', severity: 'High', message: 'Inconsistência de Saldo: Empenho 455/2024 bloqueado por saldo insuficiente no elemento de despesa 33.90.39.', date: '2024-05-16', relatedEntityId: 'e1' },
  { id: 'a3', type: 'Risk', severity: 'Medium', message: 'Aviso de Reajuste: O índice IPCA registrou alta de 0.45%. Necessária revisão de equilíbrio econômico-financeiro para contrato DL-012.', date: '2024-05-17', relatedEntityId: '2' },
];

const ComplianceModule: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="text-blue-700" />
            Compliance & Auditoria
          </h1>
          <p className="text-sm text-slate-500">Inteligência financeira aplicada ao rigor fiscal do TJPA</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg flex items-center gap-3">
          <CheckCircle className="text-emerald-500" size={18} />
          <span className="text-xs font-bold text-emerald-800 tracking-tight">Status do Tribunal: Conformidade Plena</span>
        </div>
      </header>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="col-span-1 bg-white border rounded-xl p-5 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Riscos de Alta Severidade</p>
              <p className="text-3xl font-black text-red-600 mt-1">02</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">Bloqueios orçamentários imediatos</p>
            </div>
         </div>
         <div className="col-span-1 bg-white border rounded-xl p-5 shadow-sm overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auditoria em Tempo Real</p>
              <div className="mt-4 flex flex-col gap-2">
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[94%]"></div>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-blue-600">94% CONFORMIDADE</span>
                    <span className="text-slate-400">06% INVESTIGAÇÃO</span>
                 </div>
              </div>
            </div>
         </div>
         <div className="col-span-1 bg-white border rounded-xl p-5 shadow-sm overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assinaturas Digitais</p>
              <p className="text-3xl font-black text-slate-900 mt-1">128</p>
              <p className="text-xs text-emerald-600 mt-2 font-bold flex items-center gap-1">
                <ShieldCheck size={14} /> Todas Validadas
              </p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Alerts Feed */}
        <div className="lg:col-span-8 space-y-4">
           <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <AlertTriangle size={20} className="text-orange-500" />
                Alertas da Inteligência Financeira
              </h3>
              <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                <History size={14} /> Histórico de Alertas
              </button>
           </div>
           
           {MOCK_ALERTS.map(alert => (
             <div key={alert.id} className={`p-5 rounded-xl border bg-white shadow-sm transition-all hover:shadow-md border-l-4 ${
               alert.severity === 'High' ? 'border-l-red-500' : 'border-l-orange-400'
             }`}>
                <div className="flex items-start justify-between">
                   <div className="flex gap-4">
                      <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center ${
                        alert.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                         {alert.severity === 'High' ? <ShieldAlert size={20} /> : <AlertTriangle size={20} />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${
                            alert.severity === 'High' ? 'bg-red-600 text-white' : 'bg-orange-100 text-orange-800'
                          }`}>{alert.severity} Risk</span>
                          <span className="text-[10px] text-slate-400 font-bold">{formatDate(alert.date)}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 leading-tight pr-4">{alert.message}</p>
                        <div className="flex items-center gap-3 mt-3">
                           <button className="text-[11px] font-black text-blue-700 hover:text-blue-900 uppercase tracking-tighter flex items-center gap-1">
                             Visualizar Causa Raiz <ArrowRight size={12} />
                           </button>
                           <button className="text-[11px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-tighter">Ignorar Alerta</button>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Audit Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-blue-600 rounded-lg">
                    <Fingerprint size={20} />
                 </div>
                 <h3 className="font-bold">Protocolo de Auditoria</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { label: 'Integridade de Dados', icon: <CheckCircle size={14} className="text-emerald-400" /> },
                   { label: 'Consistência de SIAFE', icon: <CheckCircle size={14} className="text-emerald-400" /> },
                   { label: 'Leis de Responsabilidade Fiscal', icon: <Scale size={14} className="text-blue-400" /> },
                   { label: 'Prazos de Reajuste', icon: <AlertTriangle size={14} className="text-orange-400" /> }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                      <span className="text-xs text-slate-300">{item.label}</span>
                      {item.icon}
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-2">
                <FileSearch size={16} /> Gerar Relatório Anual
              </button>
           </div>

           <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-tighter">Inteligência Preditiva</h4>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                "Detectamos um padrão de aumento de 15% nos empenhos de pessoal no último trimestre. Recomendamos revisão da dotação orçamentária Q3."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceModule;
