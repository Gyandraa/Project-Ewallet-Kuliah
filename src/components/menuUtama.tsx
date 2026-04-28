import { FaLocationArrow, FaWallet, FaChartLine } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { BsFillPhoneFill } from "react-icons/bs";
import { RiMenuSearchFill } from "react-icons/ri";
import { Link } from "react-router";

export default function MenuUtama() {
  const menus = [
    { icon: <FaLocationArrow />, label: "Transfer", path: "/transfer" },
    { icon: <FaWallet />, label: "Top Up", path: "/topup" },
    { icon: <MdQrCodeScanner />, label: "scan", path: "/scan" },
    { icon: <BsFillPhoneFill />, label: "Paket Data", path: "/paket-data" },
    { icon: <FaChartLine />, label: "investasi", path: "/investasi" },
    { icon: <RiMenuSearchFill />, label: "Lainnya", path: "/lainnya" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4 mt-5">
      {menus.map((item, index) => (
        <Link to={item.path} key={index}>
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-gray-200 shadow-xl hover:shadow-md hover:scale-105 transition duration-200 cursor-pointer">
            <div className="text-blue-500 text-3xl mb-2">{item.icon}</div>
            <p className="text-sm font-medium text-gray-700">{item.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
