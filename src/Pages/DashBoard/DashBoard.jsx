import React from 'react';

import {
    FaAccusoft,
    FaBahai,
    FaBars,
    FaBook,
    FaCalendarAlt,
    FaFileContract,
    FaHome,
    FaShoppingBag,
    FaShoppingCart,
    FaUser,
    FaUtensils,
    FaWallet,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
    const isAdmin=true;
    return (
        <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-[D1A054] p-4 w-80 min-h-full bg-base-200 text-base-content uppercase">
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
                  <FaUtensils></FaUtensils> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="manageitem">
                 <FaAccusoft></FaAccusoft> Manage Item
                </NavLink>
              </li>
              <li>
                <NavLink to="booking">
                 <FaBook></FaBook> Manage Booking
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
                    {/* +{cart.length || 0} */}0
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
            <NavLink to="/menu">
              <FaBars></FaBars>Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order">
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