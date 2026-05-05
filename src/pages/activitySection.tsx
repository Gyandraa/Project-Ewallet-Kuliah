import { useWallet } from "../walletContext/walletContext";
import { useNavigate } from "react-router";
import BottomNavbar from "../components/layout/bottomNavbar";
import { useState } from "react";

export default function AktivitasSection() {
  const [showButtonConfirm, setShowButtonConfirm] = useState(false);
  const [selectedTrx, setSelectedTrx] = useState<any>(null);

  const { transactions } = useWallet();
  const navigate = useNavigate();

  const handleClick = (trx: any) => {
    if (trx.type !== "transfer") return;

    setSelectedTrx(trx);
    setShowButtonConfirm(true);
  };

  const handleClickConfirm = () => {
    if (!selectedTrx) return;

    navigate("/transfer", {
      state: {
        rekening: selectedTrx.rekening,
        bank: selectedTrx.bank,
      },
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center text-black font-semibold py-10">
        Belum ada transaksi
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl text-center mt-5 font-bold mb-4">
        Aktivitas Terbaru
      </h1>

      {transactions.map((tsx) => (
        <div
          key={tsx.id}
          onClick={() => handleClick(tsx)}
          className={`p-4 border-b border-gray-200 transition ${
            tsx.type === "transfer" ? "cursor-pointer hover:bg-gray-200" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">
                {tsx.type === "transfer"
                  ? `Transfer ke ${tsx.bank}`
                  : "Topup Saldo"}
              </p>

              <p className="text-sm text-gray-800">
                {new Date(tsx.tanggal).toLocaleString("id-ID")}
              </p>
            </div>

            <p
              className={`font-bold ${
                tsx.type === "transfer" ? "text-red-500" : "text-green-500"
              }`}
            >
              {tsx.type === "transfer" ? "-" : "+"} Rp{" "}
              {tsx.nominal.toLocaleString("id-ID")}
            </p>
          </div>

          {tsx.bank && (
            <p className="text-sm text-gray-800 mt-1">Bank: {tsx.bank}</p>
          )}

          {tsx.rekening && (
            <p className="text-sm text-gray-800 mt-1">
              Rekening: {tsx.rekening.replace(/(\d{4})/g, "$1 ")}
            </p>
          )}

          {tsx.deskripsi && (
            <p className="text-sm text-gray-800 mt-1">
              Deskripsi: {tsx.deskripsi}
            </p>
          )}
        </div>
      ))}

      {showButtonConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">Transfer Ulang</h2>

            <p className="text-gray-700 mb-4">
              Apakah anda yakin ingin transfer ulang ke rekening ini?
            </p>

            {selectedTrx && (
              <div className="mb-4 text-sm text-gray-600">
                <p>
                  Bank: <b>{selectedTrx.bank}</b>
                </p>
                <p>
                  Rekening:{" "}
                  <b>{selectedTrx.rekening.replace(/(\d{4})/g, "$1 ")}</b>
                </p>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowButtonConfirm(false);
                  setSelectedTrx(null);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-colors duration-200"
              >
                Tidak
              </button>

              <button
                onClick={handleClickConfirm}
                className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors duration-200"
              >
                Ya, Transfer Ulang
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavbar />
    </div>
  );
}
