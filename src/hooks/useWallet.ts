import { useState, useEffect } from 'react';
import { walletService, WalletBalance, Transaction } from '../services/WalletService';

export function useWallet() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [distribution, setDistribution] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWalletData() {
      try {
        const [balanceData, txData, distributionData] = await Promise.all([
          walletService.getBalance(),
          walletService.getTransactions(),
          walletService.getDistributionData()
        ]);

        setBalance(balanceData);
        setTransactions(txData);
        setDistribution(distributionData);
      } catch (error) {
        console.error('Failed to fetch wallet data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWalletData();
  }, []);

  return { balance, transactions, distribution, loading };
}