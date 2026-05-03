import { Route } from "react-router";
import { Routes } from "react-router";
import Home from "../pages/Home";
import TransferPages from "../pages/transferPages";
import TopupPages from "../pages/topupPages";
import ScanQrPages from "../pages/scanQrPages";
import InvestasiPages from "../pages/investasiPages";
import AktivitasSection from "../pages/aktivitasSection";
import PaketData from "../pages/paketData";
export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/transfer" element={<TransferPages />}></Route>
        <Route path="/topup" element={<TopupPages />}></Route>
        <Route path="/scan" element={<ScanQrPages />}></Route>
        <Route path="/investasi" element={<InvestasiPages />}></Route>
        <Route path="/activity" element={<AktivitasSection />}></Route>
        <Route path="/paket-data" element={<PaketData />}></Route>
      </Routes>
    </>
  );
}
