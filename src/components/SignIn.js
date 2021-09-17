import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
class Signin extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <>
        <Header />
        <div className="w-5/12 mx-auto my-14">
          <h1 className="text-center text-5xl">Log In</h1>
          <Link to="/register" exact>
            <span className="text-green-400 block text-center my-4 hover:underline">
              Need an account?
            </span>
          </Link>
          <form action="" method="POST" className="flex flex-col relative">
            <input
              type="email"
              name="email"
              id=""
              className="border rounded w-full my-2 p-4"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              id=""
              className="border rounded w-full my-2 p-4"
              placeholder="Password"
            />
            <button type="submit" className="bg-green-400 w-2/12 p-4 rounded text-white absolute -bottom-16 right-0">
                Log in
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Signin;
