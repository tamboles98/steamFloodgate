import "./HomeBeacon.css";
import { AiOutlineHome } from "react-icons/ai";

export const HomeBeacon = () => {
  return (
    <span className="homeBeaconContainer">
      <a id="homeBeacon" href="/">
        <AiOutlineHome size={24} />
      </a>
    </span>
  );
};
