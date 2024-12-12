import React, { useState } from "react";
import './navbar.css';
import { Link } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/cart";
import { useCart } from "./ContextReducer";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
</style>
export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  const handlelogout = () => {
    localStorage.removeItem("authToken");
  }
  const loadCart = () => {
    setCartView(true)
  }
  const items = useCart();
  return (
    <div>
      <nav className="navbar fixedtop navbar-expand-lg" >
        <div className="container-fluid">
          <Link className="navbar-brand fs-4" to="/" style={{ fontFamily: "Caveat,cursive" }}>
            Dude Wala
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {(localStorage.getItem("authToken")) ? (
                <>
                <li className="nav-item fs-5">
                  <Link className="nav-link active" aria-current="page" to="/orders">OrderNew</Link>
                </li>
                <li className="nav-item fs-5">
                <Link className="nav-link active" aria-current="page" to="/myorders">myOrders</Link>
              </li>
              <li className="nav-item fs-5">
                <Link className="nav-link active" aria-current="page" to="/defaultorder">DefaultOrders</Link>
              </li> 
              </>               
              ) : (" ")}

            </ul>
            {(!localStorage.getItem("authToken"))
              ? (
                <div>
                  <div className="nav-item d-flex me-3">
                    <Link className="btn btn-light fs-5 me-3" to="/signup">signup</Link>
                    <Link className="btn btn-light fs-5 " to="/login">Login</Link>
                  </div>
                </div>
              ) : (
                <div className="nav-item d-flex">
                  <div className="btn btn-light fs-5 me-3" onClick={loadCart} >
                    viewCart{" "}
                    <span className="badge text-bg-primary ">{items.length}</span>
                  </div>
                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                  <Link className="btn btn-light fs-5 me-3" to="/Profile">Profile</Link>
                  <Link className="btn btn-light fs-5 me-3" to="/login" onClick={handlelogout}>Logout</Link>
                </div>
              )}
          </div>
        </div>
      </nav>
    </div>
  );
}
