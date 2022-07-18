import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/crypto_tracker" element={<Coins />} />
        <Route path="/crypto_tracker/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
