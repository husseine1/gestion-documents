import React from "react";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxPagesToShow = 5, // nombre max de pages à afficher dans la barre
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];

    // Si nombre total de pages est inférieur à maxPagesToShow, on affiche tout
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Toujours afficher 1 et totalPages
    const leftSide = Math.max(2, currentPage - 1);
    const rightSide = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);

    if (leftSide > 2) {
      pages.push("left-ellipsis");
    }

    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }

    if (rightSide < totalPages - 1) {
      pages.push("right-ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center">
        {/* Bouton Précédent */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Précédent"
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {pages.map((page, idx) => {
          if (page === "left-ellipsis" || page === "right-ellipsis") {
            return (
              <li key={idx} className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            );
          }

          return (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Bouton Suivant */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Suivant"
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
