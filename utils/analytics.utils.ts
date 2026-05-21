import { IMovementDataPoint } from "@/types/analytics.types";
import {
    IInventoryMovement,
    IProductInventoryMovement,
    IDetailedInventoryMovement,
} from "@/types/warehouse.types";
import { formatProductDate } from "./product-date.utils";

type MovementDataType =
    | IInventoryMovement[]
    | IDetailedInventoryMovement[]
    | IProductInventoryMovement[];

export function getMovementDataPoint(
    data: MovementDataType,
): IMovementDataPoint[] {
    const getReceive = (data: MovementDataType) =>
        data.filter((movement) => movement.movement_type === "receive")
            .length ?? 0;

    const getAdjustment = (data: MovementDataType) =>
        data.filter((movement) => movement.movement_type === "adjustment")
            .length ?? 0;

    const getMove = (data: MovementDataType) =>
        data.filter((movement) => movement.movement_type === "move").length ??
        0;

    const getWrittenOff = (data: MovementDataType) =>
        data.filter((movement) => movement.movement_type === "writeoff")
            .length ?? 0;

    const dates: Record<string, MovementDataType[number][]> = {};

    data.forEach((movement) => {
        const dateKey = movement.created_at;
        if (!dates[dateKey]) {
            dates[dateKey] = [];
        }
        dates[dateKey].push(movement);
    });
    return Object.entries(dates).map(([date, movementsByDate]) => ({
        date: formatProductDate(date),
        receive: getReceive(movementsByDate),
        move: getMove(movementsByDate),
        adjustment: getAdjustment(movementsByDate),
        writeoff: getWrittenOff(movementsByDate),
    })) as unknown as IMovementDataPoint[];
}
