import { Cateogry } from "./Category";

export interface Product {
    id: number; 
    name: string;
    sku: string;
    code: string;
    price: number;
    imageUrl: string;
    description: string;
    categpruModel: Cateogry;
}