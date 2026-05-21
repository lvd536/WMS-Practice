/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IWarehouse {
    id: number;
    organization_id: number;
    name: string;
    address?: string | null;
    max_capacity: number;
    created_at: string;
    updated_at?: string | null;
}

export interface IWarehouseWithStats extends IWarehouse {
    racks_count?: number;
    occupied_racks_count?: number;
    products_count?: number;
    occupancy_percent?: number;
}

export interface IWarehouseRack {
    id: number;
    warehouse_id: number;
    name: string;
    code: string;
    description?: string | null;
    max_weight: number;
    max_volume: number;
    current_weight?: number;
    current_volume?: number;
    deleted_at?: string | null;
    created_at: string;
    updated_at?: string | null;
}

export interface IRackWithStats extends IWarehouseRack {
    products_count?: number;
    weight_usage_percent?: number;
    volume_usage_percent?: number;
}

export interface ICategory {
    id: number;
    name: string;
    description?: string | null;
    created_at: string;
    updated_at?: string | null;
}

export interface IProduct {
    id: number;
    warehouse_id: number;
    quantity: number;

    organization_id?: number | null;
    category_id?: number | null;
    rack_id?: number | null;

    name: string;
    sku?: string | null;
    barcode?: string | null;

    length: number;
    width: number;
    height: number;
    weight: number;

    deleted_at?: string | null;
    created_at: string;
    updated_at?: string | null;
}

export interface IRackProduct extends IProduct {
    placement_id: number;
    placement_quantity: number;
}

export interface IProductPlacement {
    id: number;
    product_id: number;
    rack_id: number;
    quantity: number;
    created_at: string;
    updated_at?: string | null;
}

export interface IProductPlacementWithRelations extends IProductPlacement {
    product?: IProduct | null;
    rack?: IWarehouseRack | null;
}

export interface IProductCreateData {
    name: string;
    category_id?: number | null;
    sku?: string | null;
    barcode?: string | null;
    length: number;
    width: number;
    height: number;
    weight: number;
}

export interface IProductPlacementCreateData {
    product_id: number;
    rack_id: number;
    quantity: number;
}

export interface IMoveProductData {
    product_id: number;
    from_rack_id: number;
    to_rack_id: number;
    quantity: number;
}

export type InventoryMovementType =
    | "receive"
    | "move"
    | "writeoff"
    | "adjustment";

export interface IInventoryMovement {
    id: number;
    product_id: number;
    from_rack_id?: number | null;
    to_rack_id?: number | null;
    quantity: number;
    movement_type: InventoryMovementType;
    created_by?: string | null;
    note?: string | null;
    created_at: string;
}

export interface IProductInventoryMovement extends IInventoryMovement {
    from_rack_name?: string | null;
    to_rack_name?: string | null;
}

export interface IDetailedInventoryMovement extends IProductInventoryMovement {
    product_name: string;
    product_sku: string;
}

export type NotificationType =
    | "info"
    | "success"
    | "warning"
    | "error"
    | "invite"
    | "system"
    | "inventory";

export interface INotification {
    id: number;
    user_id: string;
    title: string;
    message: string;
    type: string;
    entity_type: string;
    entity_id?: number;
    metadata?: object;
    is_read: boolean;
    read_at?: string;
    created_at: string;
}

export interface IAuditLog {
    id: number;
    actor_id?: string | null;
    action: string;
    table_name: string;
    record_id?: string | null;
    details?: Record<string, any> | null;
    created_at: string;
}

export interface IMember {
    id: number;
    role: "owner" | "admin" | "member";
    profiles: {
        id: string;
        name: string;
        avatar_path?: string | null;
    };
    created_at: string;
}
