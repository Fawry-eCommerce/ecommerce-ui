import { Cateogry } from "./Category";

export interface Product {
    id: number; 
    name: string;
    sku: string;
    code: string;
    price: number;
    imageURL: string;
    description: string;
    categoryModel: Cateogry;
    stockQuantity: number;
}