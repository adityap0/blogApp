import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import Loader from "./Loader"
class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      articleInfo: null,
    };
  }
  componentDidMount() {
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          articleInfo: data.article,
        })
      );
  }
  render() {
    return (
      <>
        <Header />
        <div className="border bg-gray-700 p-4">
          <div className="w-9/12 mx-auto">
            <h1 className="text-white text-5xl font-bold p-2 my-6">
              {this.state.articleInfo
                ? this.state.articleInfo.title
                : <Loader/>}
            </h1>
            <div className="flex align-middle">
              <div className="rounded-full h-8 w-8 flex items-center justify-center mr-2">
                <img
                  src={
                    this.state.articleInfo
                      ? this.state.articleInfo.author.image
                      : "?"
                  }
                  alt="avatar"
                  className="w-full rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-green-400">
                  {this.state.articleInfo
                    ? this.state.articleInfo.author.username
                    : <Loader/>}
                </h1>
                <span className="text-gray-400 text-xs">
                  {" "}
                  {this.state.articleInfo
                    ? this.state.articleInfo.createdAt
                    : <Loader/>}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b w-9/12 mx-auto p-4 text-xl leading-2">
          <p className="m-4">
            {this.state.articleInfo ? this.state.articleInfo.body : <Loader/>}
          </p>
          <nav>
            <ul className="text-xs flex">
              {this.state.articleInfo
                ? this.state.articleInfo.tagList.map((tag) => {
                    return (
                      <li className="border-2 rounded-full px-2 py-1 m-1 text-gray-600">
                        {tag}
                      </li>
                    );
                  })
                : <Loader/>}
            </ul>
          </nav>
        </div>
        <div className="border my-10 w-5/12 mx-auto p-2">
          <p className="text-sm">
            <Link to="/login" exact className="text-green-400">
              Sing in{" "}
            </Link>
            or{" "}
            <Link to="/register" exact className="text-green-400">
              Sing up
            </Link>{" "}
            to add comments on this article.
          </p>
          <div>
            <ul className="my-4">
              <li className="border my-4">
                <p className="p-4">Xyz</p>
                <div className="border bg-gray-200 p-4 flex">
                  <div className="rounded-full h-6 w-6 flex items-center justify-center border-black border">
                    <img
                      src="/logo512.png"
                      alt="avatar"
                      className="w-full rounded-full border"
                    />
                  </div>
                  <span className="mx-2 text-green-400">adi</span>
                  <span className="text-gray-400">date</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
export default Article;
