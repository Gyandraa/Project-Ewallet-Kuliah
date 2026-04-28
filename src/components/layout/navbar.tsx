import { CiSettings } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { Wallet } from "lucide-react";
import { Link } from "react-router";
export default function Navbar() {
  return (
    <>
      <div className=" bg-white flex justify-between mx-5 mt-2 items-center">
        <Link to="/">
          <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
            <Wallet className="text-blue-500" />
            Walletku
          </h2>
        </Link>

        <div className="flex items-center gap-4">
          <CiSettings className="text-3xl cursor-pointer" />
          <IoExitOutline className="text-3xl cursor-pointer" />
        </div>
      </div>
      <div>
        <p className="text-xs mx-6 mt-2  font-semibold">
          HALO, GYANDRA NAUFAL PRATTAMA
        </p>
        <hr className="border-gray-300 mt-2" />
      </div>
    </>
  );
}

 