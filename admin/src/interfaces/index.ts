export interface Section {
    id : number;
    name : string;
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

export interface CategoryCardProps {
    category: Category;
}

export interface SubcategoryCardProps {
    subcategory: Subcategory;
}

export interface ProductCardProps {
    product: Product;
}