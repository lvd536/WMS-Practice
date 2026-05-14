export interface IWarehouse {
    id: number;
    organization_id: string;
    name: string;
    address: string;
    max_capacity: number;
    created_at: string;
    updated_at?: string | null;
}

export interface ICategory {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at?: string | null;
}

export interface IWarehouseProduct {
    id: number;
    warehouse_id: number;
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    quantity: number;
    category_id: number;
    created_at: string;
    updated_at?: string | null;
}
