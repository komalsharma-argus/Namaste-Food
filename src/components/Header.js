import { LOGO_URL } from "../../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useOnlineStatus from "../../utils/useOnlineStatus";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const cartCount = useSelector((store) => store.cart.items.length);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>{onlineStatus ? "🟢" : "🔴"}</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/cart">Cart ({cartCount})</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;