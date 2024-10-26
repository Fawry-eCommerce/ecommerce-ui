import { ConsumptionType } from "./consumption-type";

export interface StoreHistory {
    id: number;
    productId: number;
    storeId: number;
    quantityChanged: number;
    consumerEmail: string;
    actionType: ConsumptionType;
    createdAt: string;
}
