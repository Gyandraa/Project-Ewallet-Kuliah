import { BrowserRouter } from "react-router";
import Router from "./router/router";
import { WalletProvider } from "./walletContext/walletContext";
export default function App() {
  return (
    <>
      <WalletProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </WalletProvider>
    </>
  );
}
