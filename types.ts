
export enum TaxType {
  DARF = 'DARF',
  GPS = 'GPS',
  ISS = 'ISS',
  PIS_COFINS = 'PIS/COFINS',
  INSS = 'INSS'
}

export enum IndexType {
  IPCA = 'IPCA',
  IGPM = 'IGPM',
  SELIC = 'SELIC'
}

export enum EntryStatus {
  A_VENCER = 'A Vencer',
  PAGO = 'Pago',
  EM_ATRASO = 'Em Atraso',
  CRITICO = 'Crítico'
}

export interface Contract {
  id: string;
  contractNumber: string;
  provider: string;
  providerIdentifier: string; // CNPJ or CPF
  object: string;
  globalValue: number;
  balance: number;
  startDate: string;
  endDate: string;
  readjustmentDate: string;
  index: IndexType;
  category: string; // Ex: TI, Limpeza, Obras
  fiscalName?: string; // Fiscal do Contrato no TJPA
}

export interface TaxObligation {
  id: string;
  type: TaxType;
  periodicity: 'Mensal' | 'Anual' | 'Trimestral';
  fixedDueDate: string;
  revenueCode: string;
  status: EntryStatus;
  amount?: number;
}

export interface Expense {
  id: string;
  type: 'Fornecedores' | 'Folha' | 'Diárias';
  liquidationDate: string;
  limitDate: string;
  contractId?: string; 
  amount: number;
  description: string;
  status: EntryStatus;
  providerIdentifier?: string; // CNPJ/CPF
  invoiceNumber?: string; // Número da Nota Fiscal
}

export interface Alert {
  id: string;
  type: 'Deadlines' | 'Compliance' | 'Risk';
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  date: string;
  relatedEntityId: string;
}
