import React from "react";
import { Link } from "react-router-dom";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav>
        {" "}
        <ul className="flex">
          {pageNumbers.map((page, id) => {
            return (
              <>
                <li
                  key={id}
                  className="border p-2 m-2 px-4 bg-green-400 text-white"
                >
                  <Link to="/" onClick={() => paginate(page)}>
                    {page}
                  </Link>
                </li>
              </>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
export default Pagination;
