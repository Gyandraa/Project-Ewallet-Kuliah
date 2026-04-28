import { Route } from "react-router";
import { Routes } from "react-router";
import Home from "../pages/Home";
import TransferPages from "../pages/transferPages";
import TopupPages from "../pages/topupPages";
import PaketData from "../pages/PaketData";
import ScanQrPages from "../pages/scanQrPages";
import InvestasiPages from "../pages/investasiPages";
export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/transfer" element={<TransferPages />}></Route>
        <Route path="/topup" element={<TopupPages />}></Route>
        <Route path="/paket-data" element={<PaketData />}></Route>
        <Route path="/scan" element={<ScanQrPages />}></Route>
        <Route path="/investasi" element={<InvestasiPages />}></Route>
      </Routes>
    </>
  );
}
