
import React, { useState, useMemo } from 'react';
import { 
  Receipt, Plus, Filter, ArrowDownRight, 
  CheckCircle2, Clock, AlertCircle, Search,
  Calendar, Link as LinkIcon, X, DollarSign,
  FileText, Briefcase, Info, ArrowRight, ShieldCheck,
  Edit3, Trash2, AlertTriangle, Fingerprint, FileCode2
} from 'lucide-react';
import { Expense, EntryStatus, Contract } from '../types';
import { formatDate } from '../utils/dateUtils';
import { getMockExpenses, getMockContracts } from '../utils/mockData';

const ExpensesModule: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(getMockExpenses());
  const [contracts] = useState<Contract[]>(getMockContracts());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDetailExpense, setSelectedDetailExpense] = useState<Expense | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Expense>>({});

  const handleOpenForm = (expense?: Expense) => {
    setFormData(expense || {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      type: 'Fornecedores',
      amount: 0,
      limitDate: new Date().toISOString(),
      status: EntryStatus.A_VENCER,
      providerIdentifier: '',
      invoiceNumber: '',
      contractId: ''
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (expenses.find(e => e.id === formData.id)) {
      setExpenses(expenses.map(e => e.id === formData.id ? (formData as Expense) : e));
    } else {
      setExpenses([formData as Expense, ...expenses]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
    setIsDeleteConfirmOpen(null);
  };

  const filteredExpenses = expenses.filter(e => {
    if (filterStatus === 'all') return true;
    return e.status === filterStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Liquidação</h1>
          <p className="text-sm text-slate-500">Controle de Notas Fiscais e Documentos de Cobrança</p>
        </div>
        <button onClick={() => handleOpenForm()} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-100">
          <Plus size={18} /> Novo Documento
        </button>
      </header>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50 flex justify-between items-center">
           <div className="flex gap-2">
            {['all', 'A Vencer', 'Pago', 'Em Atraso'].map(status => (
              <button key={status} onClick={() => setFilterStatus(status)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === status ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}>
                {status === 'all' ? 'Todos' : status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b">
              <tr>
                <th className="px-6 py-4">Fornecedor / Identificador</th>
                <th className="px-6 py-4">Documento / Vínculo</th>
                <th className="px-6 py-4 text-right">Valor</th>
                <th className="px-6 py-4">Vencimento</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map(e => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{e.description}</p>
                    <p className="text-[10px] text-slate-400 font-mono tracking-tighter">{e.providerIdentifier || 'N/D'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <FileCode2 size={12} className="text-slate-400" />
                      <span>NF {e.invoiceNumber || 'Não informada'}</span>
                    </div>
                    {e.contractId && <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">Ref: {contracts.find(c => c.id === e.contractId)?.contractNumber}</p>}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">R$ {e.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">{formatDate(e.limitDate)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setSelectedDetailExpense(e)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg"><Info size={16} /></button>
                      <button onClick={() => handleOpenForm(e)} className="p-1.5 hover:bg-amber-50 text-amber-600 rounded-lg"><Edit3 size={16} /></button>
                      <button onClick={() => setIsDeleteConfirmOpen(e.id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">Lançamento de Despesa / Liquidação</h2>
              <button onClick={() => setIsFormOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Descrição da Despesa</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CNPJ / CPF do Favorecido</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-mono" value={formData.providerIdentifier} onChange={e => setFormData({...formData, providerIdentifier: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nº da Nota Fiscal (NF-e)</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold" value={formData.invoiceNumber} onChange={e => setFormData({...formData, invoiceNumber: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valor da Ordem (R$)</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm" value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prazo de Pagamento</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm" value={formData.limitDate?.split('T')[0]} onChange={e => setFormData({...formData, limitDate: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contrato Vinculado</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold" value={formData.contractId} onChange={e => {
                  const contract = contracts.find(c => c.id === e.target.value);
                  setFormData({
                    ...formData, 
                    contractId: e.target.value,
                    providerIdentifier: contract ? contract.providerIdentifier : formData.providerIdentifier
                  });
                }}>
                  <option value="">Sem vínculo contratual</option>
                  {contracts.map(c => <option key={c.id} value={c.id}>{c.contractNumber} - {c.provider}</option>)}
                </select>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 border-t flex justify-end gap-3">
              <button onClick={() => setIsFormOpen(false)} className="text-sm font-bold text-slate-500">Cancelar</button>
              <button onClick={handleSave} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-200">Confirmar Lançamento</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedDetailExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedDetailExpense(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
               <h2 className="text-lg font-bold flex items-center gap-2"><Fingerprint size={18} className="text-emerald-600" /> Detalhes Fiscais da Liquidação</h2>
               <button onClick={() => setSelectedDetailExpense(null)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-6">
               <div className="p-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identificação do Credor</p>
                        <p className="text-lg font-black text-slate-900 leading-tight">{selectedDetailExpense.description}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">{selectedDetailExpense.providerIdentifier || 'Não registrado'}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documento Hábil</p>
                        <p className="text-sm font-black text-slate-800">NF-e: {selectedDetailExpense.invoiceNumber || '---'}</p>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                   <p className="text-[10px] font-bold text-emerald-600 uppercase">Valor do Empenho</p>
                   <p className="text-2xl font-black text-emerald-900">R$ {selectedDetailExpense.amount.toLocaleString()}</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                    <ShieldCheck className="text-blue-600" size={24} />
                    <span className="text-[11px] font-bold text-slate-600">Documento em conformidade com as normas do TJPA e Lei de Responsabilidade Fiscal.</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesModule;
