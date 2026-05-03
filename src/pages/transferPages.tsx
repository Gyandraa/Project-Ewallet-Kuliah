import { useState, useEffect } from "react";
import { useWallet } from "../walletContext/walletContext";
import { useNavigate, useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TransferPages() {
  const [rekeningId, setRekeningId] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [nominal, setNominal] = useState("");
  const [bank, setBank] = useState("");
  const [showButtonConfirm, setShowButtonConfirm] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const { transfer, saldo } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setRekeningId(location.state.rekening || "");
      setBank(location.state.bank || "");
    }
  }, [location.state]);

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

    if (!bank) {
      newErrors.bank = "Pilih bank tujuan";
    }

    if (!nominal) {
      newErrors.nominal = "Nominal wajib diisi";
    } else if (getRawNumber(nominal) < 10000) {
      newErrors.nominal = "Minimal transfer 10.000";
    } else if (getRawNumber(nominal) > 5000000) {
      newErrors.nominal = "Maksimal transfer 5.000.000";
    } else if (getRawNumber(nominal) > saldo) {
      newErrors.nominal = `⚠️ Saldo anda tidak cukup, saldo anda saat ini Rp ${formatRupiah(
        saldo.toString(),
      )}, silahkan kurangi nominal transfer atau lakukan topup terlebih dahulu`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTransfer = () => {
    if (!validate()) return;
    setShowButtonConfirm(true);
  };

  const handleConfirmTransfer = () => {
    const result = transfer(getRawNumber(nominal), rekeningId, bank, deskripsi);

    if (!result.success) {
      notifyError();
      setShowButtonConfirm(false);
      return;
    }

    notifySuccess();

    setRekeningId("");
    setNominal("");
    setDeskripsi("");
    setBank("");
    setShowButtonConfirm(false);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const isFormValid =
    getRawRekening(rekeningId).length >= 10 &&
    bank &&
    getRawNumber(nominal) >= 10000 &&
    getRawNumber(nominal) <= saldo;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 border border-gray-100">
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
              className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 outline-none shadow-sm"
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
              <p className="text-red-500 text-xs mt-2 ml-1 italic">
                {errors.rekeningId}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">
              Bank Penerima
            </label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl p-4"
            >
              <option value="">Pilih Bank</option>
              <option value="bca">BCA</option>
              <option value="bri">BRI</option>
              <option value="bni">BNI</option>
            </select>
            {errors.bank && (
              <p className="text-red-500 text-xs mt-2 ml-1 italic">
                {errors.bank}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">
              Nominal Transfer
            </label>
            <input
              type="text"
              value={nominal}
              onChange={(e) => setNominal(formatRupiah(e.target.value))}
              className="w-full p-4 bg-gray-50 rounded-2xl"
              placeholder="0"
            />
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
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl"
              placeholder="Deskripsi (opsional)"
            />
          </div>

          <button
            onClick={handleTransfer}
            disabled={!isFormValid}
            className={`w-full py-4 mt-4 rounded-2xl text-white font-bold ${
              isFormValid ? "bg-blue-600" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Konfirmasi Transfer
          </button>
        </div>
      </div>

      {showButtonConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Transfer</h2>

            <p>Bank: {bank.toUpperCase()}</p>
            <p>Rekening: {rekeningId}</p>
            <p className="mb-4">Nominal: Rp {formatRupiah(nominal)}</p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowButtonConfirm(false)}
                className="flex-1 py-2 bg-gray-200 rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmTransfer}
                className="flex-1 py-2 bg-blue-600 text-white rounded-xl"
              >
                Ya, Kirim
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={2500} />
    </div>
  );
}
