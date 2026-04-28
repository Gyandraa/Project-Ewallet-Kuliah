import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import MenuUtama from "../components/menuUtama";
import { useWallet } from "../walletContext/walletContext";
import BottomNavbar from "../components/layout/bottomNavbar";
import Navbar from "../components/layout/navbar";

export default function Home() {
  const { saldo, lastTransaction } = useWallet();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white rounded-2xl mx-5 mt-10 shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4">
          <p className="text-sm font-semibold">WALLET ID</p>
          <p className="font-semibold text-lg">Rekening: 623-123-8892</p>
        </div>

        <div className="p-6">
          <h2 className="text-gray-500 text-sm">Saldo Aktif</h2>

          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {isVisible ? `IDR ${saldo.toLocaleString("id-ID")}` : "••••••••"}
            </p>

            <button onClick={toggleVisibility}>
              {isVisible ? <Eye size={25} /> : <EyeOff size={25} />}
            </button>
          </div>

          {lastTransaction !== 0 && (
            <p
              className={`text-sm mt-3 font-semibold ${
                lastTransaction < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {lastTransaction < 0 ? "-" : "+"} Rp{" "}
              {Math.abs(lastTransaction).toLocaleString("id-ID")}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-4 mt-10 rounded-tl-2xl rounded-tr-2xl">
          <h2>Menu Utama</h2>
        </div>
        <MenuUtama />
      </div>
      <BottomNavbar />
    </>
  );
}
