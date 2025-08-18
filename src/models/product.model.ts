import { User } from "./user.model";

export interface Product {
    id: string;
    name?: string;
    barkod?: string;
    class?: string;
    consumerPrice?: number;
    importerPrice?: number;
    quantity?: number;
    user?: User|null;
    date?: Date|null;
}