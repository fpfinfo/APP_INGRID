
import React, { useState, useEffect } from 'react';
import { 
  FileStack, Search, Plus, Filter, 
  ArrowUpRight, Clock, ShieldCheck, FileText, X,
  Calendar, Info, ChevronLeft, ChevronRight,
  Edit3, Trash2, AlertTriangle, Building2, UserCheck, Tag
} from 'lucide-react';
import { Contract, IndexType } from '../types';
import { formatDate } from '../utils/dateUtils';
import { getMockContracts } from '../utils/mockData';

const ITEMS_PER_PAGE = 10;

const ContractsModule: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>(getMockContracts());
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState<Partial<Contract>>({});

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredContracts = contracts.filter(c => 
    c.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.providerIdentifier?.includes(searchTerm)
  );

  const paginatedContracts = filteredContracts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredContracts.length / ITEMS_PER_PAGE);

  const handleOpenForm = (contract?: Contract) => {
    setFormData(contract || {
      id: Math.random().toString(36).substr(2, 9),
      contractNumber: '',
      provider: '',
      providerIdentifier: '',
      object: '',
      globalValue: 0,
      balance: 0,
      category: 'Serviços Gerais',
      index: IndexType.IPCA,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      readjustmentDate: new Date().toISOString().split('T')[0]
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (contracts.find(c => c.id === formData.id)) {
      setContracts(contracts.map(c => c.id === formData.id ? (formData as Contract) : c));
    } else {
      setContracts([formData as Contract, ...contracts]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setContracts(contracts.filter(c => c.id !== id));
    setIsDeleteConfirmOpen(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Contratos</h1>
          <p className="text-sm text-slate-500">Módulo de Transparência e Execução Contratual</p>
        </div>
        <button onClick={() => handleOpenForm()} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-800 shadow-lg shadow-blue-100">
          <Plus size={18} /> Novo Contrato
        </button>
      </header>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por Fornecedor ou CNPJ..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Nº Contrato / Categoria</th>
                <th className="px-6 py-4">Fornecedor / Identificação</th>
                <th className="px-6 py-4 text-right">Saldo</th>
                <th className="px-6 py-4">Vigência</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedContracts.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-blue-900">{c.contractNumber}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{c.category}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-700 font-bold">{c.provider}</p>
                    <p className="text-[10px] text-slate-400 font-mono tracking-tighter">{c.providerIdentifier}</p>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">R$ {c.balance.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">{formatDate(c.endDate)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => setSelectedContract(c)} className="p-1.5 text-slate-400 hover:text-blue-600"><Info size={16} /></button>
                      <button onClick={() => handleOpenForm(c)} className="p-1.5 text-slate-400 hover:text-amber-600"><Edit3 size={16} /></button>
                      <button onClick={() => setIsDeleteConfirmOpen(c.id)} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
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
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">Configuração de Contrato</h2>
              <button onClick={() => setIsFormOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Número do Contrato</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" value={formData.contractNumber} onChange={e => setFormData({...formData, contractNumber: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Categoria de Despesa</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>Tecnologia da Informação</option>
                  <option>Manutenção Predial</option>
                  <option>Serviços Gerais</option>
                  <option>Obras</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Fornecedor (Razão Social)</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">CNPJ / CPF do Fornecedor</label>
                <input type="text" placeholder="00.000.000/0000-00" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono" value={formData.providerIdentifier} onChange={e => setFormData({...formData, providerIdentifier: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Valor Global</label>
                <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" value={formData.globalValue} onChange={e => setFormData({...formData, globalValue: Number(e.target.value)})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Fiscal Responsável (TJPA)</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" value={formData.fiscalName} onChange={e => setFormData({...formData, fiscalName: e.target.value})} />
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 border-t flex justify-end gap-3">
              <button onClick={() => setIsFormOpen(false)} className="text-sm font-bold text-slate-500">Cancelar</button>
              <button onClick={handleSave} className="bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold">Salvar Contrato</button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedContract(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
               <h2 className="text-lg font-bold">Dossiê de Transparência Contratual</h2>
               <button onClick={() => setSelectedContract(null)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                     <Building2 className="text-slate-400" size={24} />
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Fornecedor</p>
                        <p className="text-sm font-bold text-slate-800 leading-tight">{selectedContract.provider}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{selectedContract.providerIdentifier}</p>
                     </div>
                  </div>
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3">
                     <Tag className="text-blue-600" size={24} />
                     <div>
                        <p className="text-[10px] font-bold text-blue-400 uppercase">Categoria</p>
                        <p className="text-sm font-bold text-blue-900">{selectedContract.category}</p>
                     </div>
                  </div>
               </div>
               <div className="bg-white border p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Objeto Social / Contratual</p>
                  <p className="text-sm italic text-slate-700 leading-relaxed">"{selectedContract.object}"</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border flex items-center gap-3">
                    <UserCheck className="text-emerald-600" size={20} />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Fiscal do Contrato</p>
                      <p className="text-sm font-bold text-slate-800">{selectedContract.fiscalName || 'Não designado'}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border flex items-center gap-3">
                    <Calendar className="text-orange-600" size={20} />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Reajuste ({selectedContract.index})</p>
                      <p className="text-sm font-bold text-slate-800">{formatDate(selectedContract.readjustmentDate)}</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsDeleteConfirmOpen(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle size={32} /></div>
            <h3 className="text-lg font-bold mb-2">Confirmar Exclusão?</h3>
            <p className="text-sm text-slate-500 mb-6">Esta ação removerá todos os registros fiscais deste contrato.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteConfirmOpen(null)} className="flex-1 py-2 text-sm font-bold bg-slate-50 rounded-xl">Cancelar</button>
              <button onClick={() => handleDelete(isDeleteConfirmOpen)} className="flex-1 py-2 text-sm font-bold text-white bg-red-600 rounded-xl shadow-lg shadow-red-100">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractsModule;
