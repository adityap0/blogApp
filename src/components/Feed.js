import React from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import Loader from "./Loader";
class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: null,
      articles: null,
      currentPage: 1,
      singleTag: null,
      totalArticles: null,
    };
  }
  paginate = (pageNumber) => {
    this.setState((prevState) => {
      return {
        currentPage: pageNumber,
      };
    });
  };
  handleTag = (singleTag) => {
    this.setState(
      (prevState) => {
        return {
          singleTag,
        };
      },
      () => {
        fetch(
          `https://mighty-oasis-08080.herokuapp.com/api/articles/?tag=${this.state.singleTag}`
        )
          .then((res) => res.json())
          .then((data) => {
            this.setState((prevState) => {
              return {
                articles: data.articles,
                totalArticles: data.articles.length,
              };
            });
          });
      }
    );
  };
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (!this.state.singleTag) {
      fetch("https://mighty-oasis-08080.herokuapp.com/api/articles/")
        .then((res) => res.json())
        .then((data) => {
          this.setState((prevState) => {
            return {
              totalArticles: data.articles.length,
              articles: data.articles.slice(
                this.state.currentPage * 10 - 10,
                this.state.currentPage * 10
              ),
            };
          });
        });
    }
  }
  componentDidMount() {
    //Tag Section
    fetch("https://mighty-oasis-08080.herokuapp.com/api/tags")
      .then((res) => res.json())
      .then((tags) =>
        this.setState((prevState) => {
          return {
            tags: tags.tags,
          };
        })
      );
    //Articles
    fetch("https://mighty-oasis-08080.herokuapp.com/api/articles/")
      .then((res) => res.json())
      .then((data) => {
        this.setState((prevState) => {
          return {
            totalArticles: data.articles.length,
            articles: data.articles.slice(
              this.state.currentPage * 10 - 10,
              this.state.currentPage * 10
            ),
          };
        });
      });
  }

  render() {
    return (
      <>
        <div className="w-10/12 mx-auto p-4 flex justify-between">
          <div className="w-8/12 p-2">
            <div className="flex">
              <h1
                className={
                  this.state.singleTag
                    ? "text-gray-400 inline-block text-xl p-3"
                    : "text-green-600 inline-block text-xl p-3 border-b-2 border-green-600"
                }
              >
                <Link
                  to="/"
                  onClick={() => {
                    this.setState({
                      singleTag: null,
                    });
                  }}
                >
                  Global Feed
                </Link>
              </h1>
              <h1 className="text-green-600 inline-block text-xl p-3 border-b-2 border-green-600">
                {this.state.singleTag ? `#${this.state.singleTag}` : ""}
              </h1>
            </div>
            {this.state.articles ? (
              this.state.articles.map((art, id) => {
                return (
                  <article
                    className="border-b border-t p-4 cursor-pointer"
                    key={id}
                  >
                    <div className="flex justify-between">
                      <div className="flex align-middle">
                        <div
                          className="rounded-full h-10 w-10 flex items-center justify-center mr-2"
                          key={id * 7}
                        >
                          <img
                            src={art.author.image}
                            alt="avatar"
                            className="w-full rounded-full"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-green-400">
                            {art.author.username}
                          </h1>
                          <span className="text-gray-400 text-xs">
                            {art.createdAt}
                          </span>
                        </div>
                      </div>
                      <div className="border px-1 text-xl text-green-700 border-green-400 rounded cursor-pointer hover:bg-green-400 hover:text-white flex my-auto">
                        ❤ {art.favoritesCount}
                      </div>
                    </div>
                    <div className="my-4">
                      <h1 className="text-xl font-bold">{art.title}</h1>
                      <p className="text-gray-400 my-2">{art.description}</p>
                      <div className="my-4 flex align-middle justify-between">
                        <h1 className="text-xs">
                          <Link to={`/article/${art.slug}`}>Read More...</Link>
                        </h1>
                        <ul className="flex">
                          {art.tagList.map((tag) => {
                            return (
                              <li className="mx-1 text-xs rounded-xl px-1 text-gray-400 border">
                                {tag}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <Loader />
            )}

            <Pagination
              postsPerPage={10}
              totalPosts={this.state.articles ? this.state.totalArticles : ""}
              paginate={this.paginate}
              key={5}
            />
          </div>
          <div className="w-3/12 p-2 bg-gray-200 h-1/6">
            <span className="text-xl"> Popular Tags</span>
            <ul className="flex flex-wrap justify-evenly align-middle">
              {this.state.tags
                ? this.state.tags.map((tag, tagId) => {
                    return (
                      <li
                        className="flex rounded-xl px-2 m-1 cursor-pointer bg-gray-400 text-white hover:bg-gray-500"
                        key={tagId + 1}
                        onClick={() => {
                          this.handleTag(tag);
                        }}
                      >
                        {tag.trim()}
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>
        </div>
      </>
    );
  }
}
export default Feed;
