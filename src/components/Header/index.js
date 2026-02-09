import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = ({cartCount, restautantName}) => (
  <nav className="nav-container">
    <h1 className="nav-heading">{restautantName}</h1>
    <div className="cart-container">
      <p>My Orders</p>
      <div className="cart-icon-container">
        <IoCartOutline className="cart-img" />
        <span className="cart-count">{cartCount}</span>
      </div>
    </div>
  </nav>
)
export default Header
