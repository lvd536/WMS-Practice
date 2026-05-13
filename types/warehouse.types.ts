export interface IWarehouse {
    id: string;
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
    id: string;
    warehouse_id: string;
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    quanity: number;
    category_id: number;
    product_categories: ICategory;
    created_at: string;
    updated_at?: string | null;
}
