import { useParams } from "react-router";

function Coin() {
  const { coinId } = useParams();
  return <div>Coin: {coinId}</div>;
}

export default Coin;
