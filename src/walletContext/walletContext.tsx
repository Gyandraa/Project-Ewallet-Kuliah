import { createContext, useContext, useEffect, useState } from "react";

type Transaction = {
  id: number;
  type: "transfer" | "topup";
  nominal: number;
  bank?: string;
  rekening?: string;
  deskripsi?: string;
  tanggal: string;
};

type WalletType = {
  saldo: number;
  lastTransaction: number;
  transactions: Transaction[];
  transfer: (
    nominal: number,
    rekening: string,
    bank: string,
    deskripsi?: string,
  ) => { success: boolean; message: string };
  topup: (nominal: number) => { success: boolean; message: string };
};

type WalletStorage = {
  saldo: number;
  lastTransaction: number;
  transactions: Transaction[];
};

const WalletContext = createContext<WalletType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [saldo, setSaldo] = useState<number>(0);
  const [lastTransaction, setLastTransaction] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem("wallet");

      if (data) {
        const parsed: WalletStorage = JSON.parse(data);

        setSaldo(parsed.saldo ?? 1500000);
        setLastTransaction(parsed.lastTransaction ?? 0);
        setTransactions(parsed.transactions ?? []);
      } else {
        setSaldo(1500000);
        setLastTransaction(0);
        setTransactions([]);
      }
    } catch (error) {
      console.error("Gagal membaca localStorage:", error);
      setSaldo(1500000);
      setLastTransaction(0);
      setTransactions([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const data: WalletStorage = {
      saldo,
      lastTransaction,
      transactions,
    };

    localStorage.setItem("wallet", JSON.stringify(data));
  }, [saldo, lastTransaction, transactions, isLoaded]);

  const transfer = (
    nominal: number,
    rekening: string,
    bank: string,
    deskripsi?: string,
  ) => {
    if (nominal < 10000) {
      return { success: false, message: "Minimal transfer 10.000" };
    }

    if (saldo < nominal) {
      return { success: false, message: "Saldo tidak cukup" };
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type: "transfer",
      nominal,
      bank,
      rekening,
      deskripsi,
      tanggal: new Date().toISOString(),
    };

    setSaldo((prev) => prev - nominal);
    setLastTransaction(-nominal);
    setTransactions((prev) => [newTransaction, ...prev]);

    return { success: true, message: "Transfer berhasil" };
  };

  const topup = (nominal: number) => {
    if (nominal < 5000) {
      return { success: false, message: "Minimal topup 5.000" };
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type: "topup",
      nominal,
      tanggal: new Date().toISOString(),
    };

    setSaldo((prev) => prev + nominal);
    setLastTransaction(nominal);
    setTransactions((prev) => [newTransaction, ...prev]);

    return { success: true, message: "Topup berhasil" };
  };

  return (
    <WalletContext.Provider
      value={{ saldo, lastTransaction, transactions, transfer, topup }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet harus digunakan di dalam WalletProvider");
  }
  return context;
};
