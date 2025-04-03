const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const paginator = (items = [], page = 1, perPage = 10) => {
    // Validate and sanitize inputs
    const validItems = Array.isArray(items) ? items : [];
    const validPage = Math.max(1, parseInt(page) || 1);
    const validPerPage = Math.max(1, parseInt(perPage) || 10);

    const totalItems = validItems.length;
    const totalPages = Math.ceil(totalItems / validPerPage);
    const currentPage = Math.min(validPage, totalPages || 1);
    
    const start = (currentPage - 1) * validPerPage;
    const end = start + validPerPage;

    return {
        items: validItems.slice(start, end),
        total: totalPages,
        currentPage,
        perPage: validPerPage,
        totalItems,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
    }
}

module.exports = {
    toThousand,
    paginator
}