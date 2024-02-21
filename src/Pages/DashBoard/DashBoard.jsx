

import {
  FaBahai,
  FaBars,
  FaBook,
  FaCalendarAlt,
  FaFileContract,
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
  FaWallet
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Admin from '../Hooks/Admin';
import useCart from '../Hooks/useCart';

const DashBoard = () => {
  const [cart]= useCart();
    const [isAdmin] = Admin();
    return (
        <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-row items-start justify-center">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button mt-8 lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-[#e2ae5f] p-4 w-80 min-h-full text-base-content uppercase">
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="adminhome">
                  <FaHome></FaHome>Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="addbook">
                  <FaBook></FaBook> Add Book
                </NavLink>
              </li>
              <li>
                <NavLink to="managebook">
                 <FaBook></FaBook> Manage Book
                </NavLink>
              </li>
              <li>
                <NavLink to="homeSlider">
                 <FaBook></FaBook> Add Home Slider
                </NavLink>
              </li>
              <li>
                <NavLink to="allusers">
                 <FaUser></FaUser> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="userhome">
                  <FaHome></FaHome>User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="booking">
                  <FaCalendarAlt></FaCalendarAlt>Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="payment">
                  <FaWallet></FaWallet>Payment Histry
                </NavLink>
              </li>
              <li>
                <NavLink to="mycart">
                  <FaShoppingCart></FaShoppingCart>My Cart
                  <span className="badge badge-secondary">
                    +{cart.length || 0}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="review">
                  <FaBahai></FaBahai> Add Review
                </NavLink>
              </li>
              <li>
                <NavLink to="booking">
                  <FaBook></FaBook> My Booking
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaBars></FaBars>Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/mycart">
              <FaShoppingBag></FaShoppingBag>Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaFileContract></FaFileContract>Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    );
};

export default DashBoard;