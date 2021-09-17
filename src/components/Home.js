import React from "react";
import Header from "./Header";
import Feed from "./Feed";
import Hero from "./Hero"
class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <>
        <Header />
        <Hero/>
        <Feed />
      </>
    );
  }
}
export default Home;
