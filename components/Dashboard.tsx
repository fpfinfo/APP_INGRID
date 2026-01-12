
import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  TrendingUp, 
  Users, 
  AlertCircle,
  ChevronRight,
  Filter,
  ShieldAlert,
  X,
  DollarSign,
  Info,
  ArrowUpRight,
  FileStack
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Contract, Expense, EntryStatus } from '../types';
import { formatDate } from '../utils/dateUtils';
import { getMockContracts, getMockExpenses, getMockAlerts } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  
  const contracts = useMemo(() => getMockContracts(), []);
  const expenses = useMemo(() => getMockExpenses(), []);
  const alerts = useMemo(() => getMockAlerts(), []);

  const closeModal = () => setSelectedContract(null);

  const expiringSoonCount = contracts.filter(c => {
    const diff = new Date(c.endDate).getTime() - new Date().getTime();
    return diff > 0 && diff < (60 * 24 * 60 * 60 * 1000);
  }).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Painel do Diretor Financeiro</h1>
          <p className="text-slate-500">Gestão de Recursos e Conformidade - TJPA</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            <Filter size={16} /> Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium">
            Novo Lançamento
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total empenhado" value="R$ 12.4M" change="+4.5%" icon={<FileText size={20} />} status="default" />
        <KPICard title="Contratos a Vencer" value={expiringSoonCount.toString().padStart(2, '0')} description="Próximos 60 dias" icon={<Clock size={20} />} status="warning" />
        <KPICard title="Obrigações Tributárias" value="R$ 1.2M" description="Vencimento esta semana" icon={<TrendingUp size={20} />} status="success" />
        <KPICard title="Alertas Críticos" value={alerts.filter(a => a.severity === 'High').length.toString().padStart(2, '0')} status="critical" icon={<AlertTriangle size={20} />} />
      </div>

      <div className="bento-grid">
        <div className="col-span-12 bg-white border rounded-xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-blue-600" />
              <h3 className="font-semibold text-slate-800 text-lg">Timeline de Prazos (Próximos 30 dias)</h3>
            </div>
            <span className="text-xs font-medium text-slate-400">MAIO 2024</span>
          </div>
          <div className="relative h-24 flex items-center bg-slate-50 rounded-lg p-4">
             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2"></div>
             {[5, 12, 18, 20, 25, 28].map((day) => (
                <div 
                  key={day} 
                  className={`absolute -translate-y-1/2 flex flex-col items-center group cursor-pointer`}
                  style={{ left: `${(day / 30) * 100}%` }}
                >
                  <div className={`w-4 h-4 rounded-full border-2 border-white ${day < 10 ? 'bg-red-500' : day < 20 ? 'bg-yellow-500' : 'bg-blue-500'} shadow-md transition-transform group-hover:scale-125`}></div>
                  <span className="text-[10px] mt-2 font-bold text-slate-600">{day}/05</span>
                  <div className="hidden group-hover:block absolute bottom-full mb-2 w-32 p-2 bg-slate-900 text-white text-[10px] rounded shadow-lg z-10">
                    Vencimento: {day < 10 ? 'DARF' : day < 20 ? 'Telecom' : 'Contrato Limpeza'}
                  </div>
                </div>
             ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-500" />
              Obrigações da Semana
            </h3>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{expenses.filter(e => e.status !== EntryStatus.PAGO).length} Pendentes</span>
          </div>
          <div className="space-y-3">
            {expenses.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                <div className={`mt-1 h-5 w-5 rounded-md border flex items-center justify-center ${item.status === EntryStatus.EM_ATRASO ? 'border-red-200 bg-red-50' : 'border-slate-300'}`}>
                  {item.status === EntryStatus.EM_ATRASO && <AlertCircle size={12} className="text-red-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate">{item.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-slate-400">Limite: {formatDate(item.limitDate)}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      item.status === EntryStatus.EM_ATRASO ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                    }`}>{item.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">R$ {item.amount > 1000 ? `${(item.amount / 1000).toFixed(1)}k` : item.amount}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1">
            Ver todas <ChevronRight size={14} />
          </button>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white border rounded-xl p-5 shadow-sm border-l-4 border-l-orange-400">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <AlertTriangle size={18} className="text-orange-500" />
                Intelligence Engine
              </h3>
              <span className="animate-pulse w-2 h-2 rounded-full bg-orange-500"></span>
           </div>
           <div className="space-y-4">
             {alerts.slice(0, 2).map(alert => (
               <div key={alert.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 relative group overflow-hidden">
                  <div className={`absolute top-0 left-0 bottom-0 w-1 ${alert.severity === 'High' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                  <p className="text-xs text-slate-700 leading-relaxed pl-2">{alert.message}</p>
                  <div className="flex justify-between items-center mt-2 pl-2">
                    <span className="text-[10px] text-slate-400 font-medium">Detector de Prazos • {formatDate(alert.date)}</span>
                    <button className="text-[10px] font-bold text-blue-600 hover:underline">Resolver</button>
                  </div>
               </div>
             ))}
             <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
               <h4 className="text-xs font-bold text-blue-800 mb-1">Dica de Gestão</h4>
               <p className="text-[11px] text-blue-700 leading-tight">
                 O IPCA acumulado do último mês indica uma possível necessidade de suplementação em contratos de TI em breve.
               </p>
             </div>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white border rounded-xl p-5 shadow-sm">
           <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Users size={18} className="text-blue-500" />
              Execução Orçamentária
           </h3>
           <div className="h-[200px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[{n: 'Contratos', v: 4.2}, {n: 'Pessoal', v: 8.1}, {n: 'Custeio', v: 2.5}]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="v" radius={[4, 4, 0, 0]} barSize={32}>
                    <Cell fill="#3b82f6" />
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                  </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
           <p className="text-[10px] text-center text-slate-400 mt-2 italic">Valores em Milhões (R$)</p>
        </div>

        <div className="col-span-12 bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Contratos Próximos do Fim (60/90 dias)</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Ver Todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3 border-b">Nº Contrato</th>
                  <th className="px-6 py-3 border-b">Fornecedor</th>
                  <th className="px-6 py-3 border-b">Saldo Remanescente</th>
                  <th className="px-6 py-3 border-b">Vigência Final</th>
                  <th className="px-6 py-3 border-b">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contracts.slice(0, 5).map(contract => (
                  <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-900">{contract.contractNumber}</td>
                    <td className="px-6 py-4 text-slate-600">{contract.provider}</td>
                    <td className="px-6 py-4 font-medium">R$ {contract.balance.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${new Date(contract.endDate).getTime() - new Date().getTime() < (30 * 24 * 60 * 60 * 1000) ? 'bg-red-400' : 'bg-orange-400'}`}></span>
                        {formatDate(contract.endDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedContract(contract)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition-colors"
                      >
                        Analisar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <FileStack size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">Detalhamento de Contrato</h2>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{selectedContract.contractNumber}</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Objeto do Contrato</label>
                    <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                      "{selectedContract.object}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <Users size={18} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Fornecedor</label>
                      <p className="text-sm font-semibold text-slate-900">{selectedContract.provider}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <DollarSign size={12} className="text-blue-500" />
                      Valor Global
                    </label>
                    <p className="text-xl font-black text-slate-900">R$ {selectedContract.globalValue.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <ArrowUpRight size={12} />
                      Saldo Atualizado
                    </label>
                    <p className="text-xl font-black text-emerald-700">R$ {selectedContract.balance.toLocaleString()}</p>
                    <div className="mt-2 h-1.5 w-full bg-emerald-200/50 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-emerald-500" 
                         style={{ width: `${(selectedContract.balance / selectedContract.globalValue) * 100}%` }}
                       ></div>
                    </div>
                    <span className="text-[10px] text-emerald-600 mt-1 block font-medium">
                      {((selectedContract.balance / selectedContract.globalValue) * 100).toFixed(1)}% disponível
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Início</label>
                      <p className="text-xs font-bold text-slate-700">{formatDate(selectedContract.startDate)}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Vigência</label>
                      <p className="text-xs font-bold text-slate-700">{formatDate(selectedContract.endDate)}</p>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex justify-between items-start mb-2">
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar size={12} />
                        Reajuste Anual
                      </label>
                      <span className="bg-orange-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black">{selectedContract.index}</span>
                    </div>
                    <p className="text-sm font-bold text-orange-900">{formatDate(selectedContract.readjustmentDate)}</p>
                    <p className="text-[10px] text-orange-700 mt-1 leading-tight">
                      Próxima atualização do valor base baseada no índice {selectedContract.index}.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t flex justify-end gap-3">
              <button 
                onClick={closeModal}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95 flex items-center gap-2">
                <Info size={16} /> Emitir Relatório
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  description?: string;
  status?: 'default' | 'success' | 'warning' | 'critical';
  icon: React.ReactNode;
}

const KPICard = ({ title, value, change, description, status = 'default', icon }: KPICardProps) => {
  const statusConfig = {
    default: {
      card: 'bg-white border-slate-200',
      iconBg: 'bg-slate-50 text-blue-600',
      value: 'text-slate-900',
      badge: 'bg-slate-100 text-slate-600'
    },
    success: {
      card: 'bg-white border-emerald-100',
      iconBg: 'bg-emerald-50 text-emerald-600',
      value: 'text-slate-900',
      badge: 'bg-emerald-100 text-emerald-700'
    },
    warning: {
      card: 'bg-white border-orange-100',
      iconBg: 'bg-orange-50 text-orange-600',
      value: 'text-slate-900',
      badge: 'bg-orange-100 text-orange-700'
    },
    critical: {
      card: 'bg-red-50/30 border-red-200 ring-1 ring-red-100',
      iconBg: 'bg-red-100 text-red-600',
      value: 'text-red-900',
      badge: 'bg-red-600 text-white animate-pulse shadow-sm shadow-red-200'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`border rounded-xl p-5 shadow-sm relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${config.card}`}>
      {status === 'critical' && (
        <div className="absolute top-0 right-0 p-2">
          <ShieldAlert size={16} className="text-red-500 opacity-50" />
        </div>
      )}
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
          <h4 className={`text-2xl font-black mt-1 tracking-tight ${config.value}`}>{value}</h4>
        </div>
        <div className={`p-2.5 rounded-xl transition-colors ${config.iconBg}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 relative z-10">
        {change && (
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
            {change}
          </span>
        )}
        {description && (
          <span className="text-[11px] text-slate-400 font-medium truncate">
            {description}
          </span>
        )}
        {status === 'critical' && (
          <span className={`text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter ${config.badge}`}>
            Ação Crítica
          </span>
        )}
        {status === 'warning' && !description && (
          <span className={`text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter ${config.badge}`}>
            Atenção
          </span>
        )}
      </div>

      {status === 'critical' && (
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-100/20 rounded-full blur-2xl"></div>
      )}
    </div>
  );
};

export default Dashboard;
