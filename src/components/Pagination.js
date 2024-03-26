import React from "react";
import _ from "lodash";

function Pagination({ songs, pageSize, currentPage, onPageChange }) {
  const pageCount = Math.ceil(songs.length / pageSize);
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example" className="navbar">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
