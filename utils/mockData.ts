
import { addDays, subDays } from 'date-fns';
import { Contract, Expense, TaxObligation, Alert, EntryStatus, IndexType, TaxType } from '../types';

export const getMockContracts = (): Contract[] => [
  { 
    id: '1', 
    contractNumber: 'PE-045/2023', 
    provider: 'Tech Solutions LTDA', 
    providerIdentifier: '45.123.456/0001-89',
    object: 'Manutenção de Datacenter e Infraestrutura de Rede Core', 
    globalValue: 1200000, 
    balance: 450000, 
    startDate: '2023-01-01', 
    endDate: addDays(new Date(), 15).toISOString(), 
    readjustmentDate: '2024-01-01', 
    index: IndexType.IPCA,
    category: 'Tecnologia da Informação',
    fiscalName: 'Dr. Roberto Santos'
  },
  { 
    id: '2', 
    contractNumber: 'DL-012/2024', 
    provider: 'CleanServices Gestão Ambiental', 
    providerIdentifier: '12.888.777/0001-22',
    object: 'Serviços de Limpeza, Conservação e Higienização Predial', 
    globalValue: 800000, 
    balance: 780000, 
    startDate: '2024-02-01', 
    endDate: addDays(new Date(), 365).toISOString(), 
    readjustmentDate: addDays(new Date(), 365).toISOString(), 
    index: IndexType.IGPM,
    category: 'Manutenção Predial',
    fiscalName: 'Dra. Márcia Oliveira'
  }
];

export const getMockExpenses = (): Expense[] => [
  { 
    id: 'e1', 
    type: 'Fornecedores', 
    amount: 45000, 
    description: 'Fatura Telecom Jan/24 - Operadora OI', 
    limitDate: addDays(new Date(), 5).toISOString(), 
    liquidationDate: subDays(new Date(), 2).toISOString(), 
    status: EntryStatus.A_VENCER, 
    contractId: '1',
    providerIdentifier: '45.123.456/0001-89',
    invoiceNumber: '202400102'
  },
  { 
    id: 'e2', 
    type: 'Folha', 
    amount: 2500000, 
    description: 'Folha Mensal - Servidores Administrativos', 
    limitDate: addDays(new Date(), 10).toISOString(), 
    liquidationDate: subDays(new Date(), 3).toISOString(), 
    status: EntryStatus.A_VENCER,
    providerIdentifier: '00.000.000/0001-91'
  }
];

export const getMockTaxObligations = (): TaxObligation[] => [
  {
    id: 't1',
    type: TaxType.DARF,
    periodicity: 'Mensal',
    fixedDueDate: addDays(new Date(), 20).toISOString(),
    revenueCode: '0561',
    status: EntryStatus.A_VENCER,
    amount: 125000
  }
];

export const getMockAlerts = (): Alert[] => [
  { 
    id: 'a1', 
    type: 'Deadlines', 
    severity: 'High', 
    message: 'Prazo Fatal: O contrato PE-045/2023 expira em 15 dias.', 
    date: new Date().toISOString(), 
    relatedEntityId: '1' 
  }
];
