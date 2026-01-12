
import { parseISO, subDays, differenceInDays } from 'date-fns';
import { Alert, Contract, Expense, EntryStatus } from '../types';
import { adjustToBusinessDay } from '../utils/dateUtils';

/**
 * Calculates retroaction alerts for a given due date.
 * If due on 20th, alerts at 10, 15, and 19.
 */
export const calculateDeadlines = (entryDate: string, entityId: string, description: string): Alert[] => {
  const dueDate = parseISO(entryDate);
  const intervals = [10, 5, 1]; // Days before (20-10=10, 20-5=15, 20-1=19)
  
  return intervals.map(interval => {
    const rawAlertDate = subDays(dueDate, interval);
    const adjustedDate = adjustToBusinessDay(rawAlertDate);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Deadlines',
      severity: interval === 1 ? 'High' : (interval === 5 ? 'Medium' : 'Low'),
      message: `Alerta Antecipado: ${description} vence em ${interval} dias.`,
      date: adjustedDate.toISOString(),
      relatedEntityId: entityId
    };
  });
};

/**
 * Validates if an expense exceeds the remaining balance of a contract.
 */
export const validateCompliance = (expense: Expense, contract?: Contract): Alert | null => {
  if (!contract) return null;
  
  if (expense.amount > contract.balance) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Compliance',
      severity: 'High',
      message: `Risco de Compliance: Despesa de R$ ${expense.amount.toLocaleString()} excede o saldo do contrato ${contract.contractNumber} (Saldo: R$ ${contract.balance.toLocaleString()}).`,
      date: new Date().toISOString(),
      relatedEntityId: expense.id
    };
  }
  return null;
};

/**
 * Determines entry status based on current date.
 */
export const deriveStatus = (limitDate: string, isPaid: boolean): EntryStatus => {
  if (isPaid) return EntryStatus.PAGO;
  
  const today = new Date();
  const due = parseISO(limitDate);
  const diff = differenceInDays(due, today);
  
  if (diff < 0) return EntryStatus.EM_ATRASO;
  if (diff <= 2) return EntryStatus.CRITICO;
  return EntryStatus.A_VENCER;
};
