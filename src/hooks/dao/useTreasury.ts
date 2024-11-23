import { useState, useEffect } from 'react';
import { treasuryService, TreasuryStats, TreasuryTransaction } from '../../services/dao/TreasuryService';

export function useTreasury() {
  const [stats, setStats] = useState<TreasuryStats | null>(null);
  const [transactions, setTransactions] = useState<TreasuryTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, txData] = await Promise.all([
          treasuryService.getTreasuryStats(),
          treasuryService.getTransactions()
        ]);

        setStats(statsData);
        setTransactions(txData);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch treasury data:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Subscribe to events
    const unsubscribeTransaction = treasuryService.onTransactionCreated((transaction) => {
      setTransactions(prev => [...prev, transaction]);
    });

    const unsubscribeDistribution = treasuryService.onDistributionUpdated((distribution) => {
      setStats(prev => prev ? { ...prev, distribution } : null);
    });

    return () => {
      unsubscribeTransaction();
      unsubscribeDistribution();
    };
  }, []);

  const createTransaction = async (
    type: 'inflow' | 'outflow',
    amount: string,
    category: keyof TreasuryStats['distribution'],
    description: string
  ) => {
    try {
      const transaction = await treasuryService.createTransaction(
        type,
        amount,
        category,
        description
      );
      return transaction;
    } catch (error) {
      console.error('Failed to create transaction:', error);
      throw error;
    }
  };

  const updateDistribution = async (newDistribution: TreasuryStats['distribution']) => {
    try {
      await treasuryService.updateDistribution(newDistribution);
    } catch (error) {
      console.error('Failed to update distribution:', error);
      throw error;
    }
  };

  return {
    stats,
    transactions,
    loading,
    error,
    createTransaction,
    updateDistribution
  };
}

export default useTreasury;