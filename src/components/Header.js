import React from "react";
import { Link } from "react-router-dom";
class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="flex justify-between align-middle w-9/12 mx-auto">
          <h1 className="m-4 font-bold text-green-500 text-2xl cursor-pointer">
            <Link to="/" exact>
              conduit
            </Link>
          </h1>
          <nav>
            <ul className="flex cursor-pointer">
              {["Home", "Login", "Register"].map((nav) => {
                return (
                  <Link
                    to={nav === "Home" ? `/` : `/${nav.toLowerCase()}`}
                    exact
                  >
                    <li className="m-4 text-gray-400 hover:text-gray-700">
                      {nav}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>
        </div>
      </>
    );
  }
}
export default Header;
