import { useState } from "react";
import { useWallet } from "../walletContext/walletContext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TopupPages() {
  const [nominal, setNominal] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [showButtonConfirm, setShowButtonConfirm] = useState(false);

  const { topup } = useWallet();

  const navigate = useNavigate();

  const notifyError = () =>
    toast.error("Terjadi kesalahan saat topup, silahkan coba lagi");

  const notifySuccess = () =>
    toast.success("Topup berhasil, saldo anda telah bertambah");

  const formatRupiah = (value: string) => {
    const number = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(Number(number));
  };

  const getRawNumber = (value: string) => {
    return Number(value.replace(/\./g, ""));
  };

  const validate = () => {
    let newErrors: any = {};

    if (!nominal) {
      newErrors.nominal = "Nominal wajib diisi";
    } else if (getRawNumber(nominal) < 10000) {
      newErrors.nominal = "Minimal topup 10000";
    } else if (getRawNumber(nominal) > 5000000) {
      newErrors.nominal = "Maksimal topup 5.000.000";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTopup = () => {
    if (!validate()) return;
    setShowButtonConfirm(true);
  };

  const handleConfirmTopup = () => {
    if (!validate()) return;

    const result = topup(getRawNumber(nominal));

    if (!result.success) {
      notifyError();
      return;
    }

    notifySuccess();

    setNominal("");
    setShowButtonConfirm(false);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const isFormValid =
    getRawNumber(nominal) >= 10000 && getRawNumber(nominal) <= 5000000;

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-3xl  p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Topup Saldo
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Topup saldo anda disini
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">
                Nominal Topup
              </label>
              <input
                type="text"
                value={nominal}
                onChange={(e) => setNominal(formatRupiah(e.target.value))}
                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 outline-none placeholder:text-gray-400 shadow-sm"
                placeholder="Rp 0"
              />
              {nominal && getRawNumber(nominal) < 10000 && (
                <div className="mt-2 flex items-center gap-1.5 text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
                  <span className="text-[10px]">●</span>
                  <p className="text-[11px] font-medium">
                    Minimal topup Rp 10.000
                  </p>
                </div>
              )}
              {nominal && getRawNumber(nominal) > 5000000 && (
                <div className="mt-2 flex items-center gap-1.5 text-red-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
                  <span className="text-[10px]">●</span>
                  <p className="text-[11px] font-medium">
                    Maksimal topup Rp 5.000.000
                  </p>
                </div>
              )}
              {errors.nominal && (
                <p className="text-red-500 text-xs mt-2 ml-1 flex items-center italic">
                  {errors.nominal}
                </p>
              )}
            </div>

            <button
              onClick={handleTopup}
              disabled={!isFormValid}
              className={`w-full py-4 mt-4 rounded-2xl text-white font-bold tracking-wide shadow-lg transform transition-all duration-200 active:scale-95 ${
                isFormValid
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-200"
                  : "bg-gray-300 cursor-not-allowed shadow-none"
              }`}
            >
              Konfirmasi Topup
            </button>
          </div>
        </div>
      </div>

      {showButtonConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Topup</h2>
            <p className="text-gray-700 mb-6">
              Apakah anda yakin ingin melakukan topup sebesar
              <span className="font-semibold">Rp {formatRupiah(nominal)}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowButtonConfirm(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmTopup}
                className="px-6 py-3 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-700 transition-colors duration-200"
              >
                Ya, Topup
              </button>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}
