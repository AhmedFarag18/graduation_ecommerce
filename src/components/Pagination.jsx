const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination flex gap-3">
                {pageNumbers.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className="my-6"
                    >
                        <button
                            className={`w-10 h-10 rounded-full ${pageNumber === currentPage ? "bg-main-color text-white" : "bg-gray-100"}`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;