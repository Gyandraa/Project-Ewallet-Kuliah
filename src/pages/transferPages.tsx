import { useState } from "react";
import { useWallet } from "../walletContext/walletContext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TransferPages() {
  const [rekeningId, setRekeningId] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [nominal, setNominal] = useState("");
  const [bank, setBank] = useState("");

  const [errors, setErrors] = useState<any>({});

  const { transfer, saldo } = useWallet();
  const navigate = useNavigate();

  const notifyError = () =>
    toast.error("Terjadi kesalahan saat transfer, silahkan coba lagi");

  const notifySuccess = () =>
    toast.success("Transfer berhasil, saldo anda telah berkurang");

  const formatRupiah = (value: string) => {
    const number = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(Number(number));
  };

  const getRawNumber = (value: string) => {
    return Number(value.replace(/\./g, ""));
  };

  const getRawRekening = (value: string) => {
    return value.replace(/\s/g, "");
  };

  const validate = () => {
    let newErrors: any = {};

    if (!rekeningId) {
      newErrors.rekeningId = "Rekening tujuan wajib diisi";
    } else if (getRawRekening(rekeningId).length < 10) {
      newErrors.rekeningId = "Rekening tujuan harus minimal 10 digit";
    }
    if (!bank) newErrors.bank = "Pilih bank tujuan";

    if (saldo === 0 || saldo < getRawNumber(nominal)) {
      newErrors.nominal = `⚠️ Saldo anda tidak cukup, saldo anda saat ini Rp ${formatRupiah(saldo.toString())}, silahkan kurangi nominal transfer atau lakukan topup terlebih dahulu`;
    }

    if (!nominal) {
      newErrors.nominal = "Nominal wajib diisi";
    } else if (getRawNumber(nominal) < 10000) {
      newErrors.nominal = "Minimal transfer 10.000";
    } else if (getRawNumber(nominal) > 5000000) {
      newErrors.nominal = "Maksimal transfer 5.000.000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTransfer = () => {
    if (!validate()) return;

    const result = transfer(getRawNumber(nominal));

    if (!result.success) {
      notifyError();
      return;
    }

    notifySuccess();

    setRekeningId("");
    setNominal("");
    setDeskripsi("");
    setBank("");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const isFormValid =
    getRawRekening(rekeningId).length >= 10 &&
    bank &&
    getRawNumber(nominal) >= 10000;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl  p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Transfer Uang
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Kirim saldo dengan cepat dan mudah yang pasti hanya disini😉👌
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">
              Rekening Tujuan
            </label>
            <input
              type="number"
              value={rekeningId}
              onChange={(e) => setRekeningId(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 outline-none placeholder:text-gray-400 shadow-sm"
              placeholder="0000 0000 0000"
            />
            {rekeningId && getRawRekening(rekeningId).length < 10 && (
              <div className="mt-2 flex items-center gap-1.5 text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
                <span className="text-[10px]">●</span>
                <p className="text-[11px] font-medium">
                  Minimal 10 digit angka untuk rekening tujuan
                </p>
              </div>
            )}
            {errors.rekeningId && (
              <p className="text-red-500 text-xs mt-2 ml-1 flex items-center italic">
                {errors.rekeningId}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">
              Bank Penerima
            </label>
            <div className="relative">
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full bg-gray-50 border-none appearance-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 outline-none shadow-sm cursor-pointer"
              >
                <option value="">Pilih Bank</option>
                <option value="bca">BCA</option>
                <option value="bri">BRI</option>
                <option value="bni">BNI</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.bank && (
              <p className="text-red-500 text-xs mt-2 ml-1 italic">
                ⚠ {errors.bank}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">
              Nominal Transfer
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-blue-600 transition-colors group-focus-within:text-blue-500">
                Rp
              </div>
              <input
                type="text"
                value={nominal}
                onChange={(e) => setNominal(formatRupiah(e.target.value))}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-lg font-semibold focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 outline-none shadow-sm"
                placeholder="0"
              />
            </div>

            {nominal && getRawNumber(nominal) < 10000 && (
              <div className="mt-2 flex items-center gap-1.5 text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
                <span className="text-[10px]">●</span>
                <p className="text-[11px] font-medium">
                  Minimal transfer Rp 10.000
                </p>
              </div>
            )}
            {nominal && getRawNumber(nominal) > 5000000 && (
              <div className="mt-2 flex items-center gap-1.5 text-red-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
                <span className="text-[10px]">●</span>
                <p className="text-[11px] font-medium">
                  Maksimal transfer Rp 5.000.000
                </p>
              </div>
            )}
            {errors.nominal && (
              <p className="text-red-500 text-xs mt-2 ml-1 italic">
                {errors.nominal}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">
              Deskripsi{" "}
              <span className="text-gray-500 font-semibold font-normal">
                (opsional)
              </span>
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 outline-none shadow-sm resize-none"
              placeholder="Contoh: Beli mobil porsche"
            />
          </div>

          <button
            onClick={handleTransfer}
            disabled={!isFormValid}
            className={`w-full py-4 mt-4 rounded-2xl text-white font-bold tracking-wide shadow-lg transform transition-all duration-200 active:scale-95 ${
              isFormValid
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-200"
                : "bg-gray-300 cursor-not-allowed shadow-none"
            }`}
          >
            Konfirmasi Transfer
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
