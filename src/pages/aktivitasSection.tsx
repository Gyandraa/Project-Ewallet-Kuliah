import { useWallet } from "../walletContext/walletContext";
import { useNavigate } from "react-router";
import BottomNavbar from "../components/layout/bottomNavbar";

export default function AktivitasSection() {
  const { transactions } = useWallet();
  const navigate = useNavigate();

  const handleClick = (trx: any) => {
    if (trx.type !== "transfer") return;

    navigate("/transfer", {
      state: {
        rekening: trx.rekening,
        bank: trx.bank,
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

              <p className="text-sm text-gray-500">
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
            <p className="text-sm text-gray-500 mt-1">Bank: {tsx.bank}</p>
          )}

          {tsx.rekening && (
            <p className="text-sm text-gray-500 mt-1">
              Rekening: {tsx.rekening.replace(/(\d{4})/g, "$1 ")}
            </p>
          )}

          {tsx.deskripsi && (
            <p className="text-sm text-gray-500 mt-1">
              Deskripsi: {tsx.deskripsi}
            </p>
          )}
        </div>
      ))}
      <BottomNavbar />
    </div>
  );
}
