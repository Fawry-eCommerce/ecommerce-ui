import { ConsumptionType } from "./consumption-type";

export interface StoreHistory {
    id: number;
    productId: number;
    storeId: number;
    quantityChanged: number;
    consumerEmail: string;
    consumptionType: ConsumptionType;
    createdAt: string;
}
