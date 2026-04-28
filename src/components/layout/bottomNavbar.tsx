import { FaHome, FaUser } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { MdQrCodeScanner } from "react-icons/md";

export default function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-700 text-white rounded-t-3xl shadow-lg">
      <div className="flex justify-around items-center py-3 relative">
        <div className="flex flex-col items-center text-sm">
          <FaHome className="text-2xl" />
          <p>Beranda</p>
        </div>

        <div className="flex flex-col items-center text-sm opacity-70">
          <MdOutlineHistory className="text-2xl" />
          <p>Aktivitas</p>
        </div>

        <div className="absolute -top-8 flex flex-col items-center">
          <div className="bg-cyan-400 p-4 rounded-full shadow-lg">
            <MdQrCodeScanner className="text-2xl text-white" />
          </div>
          <p className="text-xs mt-1">QRIS</p>
        </div>

        <div className="flex flex-col items-center text-sm opacity-70">
          <AiOutlineStar className="text-2xl" />
          <p>Untukmu</p>
        </div>

        <div className="flex flex-col items-center text-sm opacity-70">
          <FaUser className="text-2xl" />
          <p>Akun</p>
        </div>
      </div>
    </div>
  );
}
