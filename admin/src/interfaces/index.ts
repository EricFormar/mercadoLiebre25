export interface Section {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    image?: string;
}
export interface Subcategory {
    id: number;
    name: string;
    image: string;
    category: Category;
}

export interface Brand {
    id: number;
    name: string;
    image?: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    discount: number;
    description: string;
    images: string[];
    category: Category;
    subcategory: Subcategory;
    section: Section;
    brand: Brand;
}

export interface Pagination {
    totalItems: number,
    currentPage: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    nextPage: number,
    previousPage: number
}

export interface ModelProductResponse {
    success: boolean;
    message: string;
    data: {
        products: Product[];
        pagination : Pagination;
    }

}
