interface IProps {
    params: Promise<{ warehouseId: string }>;
}

export default async function Warehouse({ params }: IProps) {
    const { warehouseId } = await params;
    return (
        <section id="warehouse" className="">
            Warehouse: {warehouseId}
        </section>
    );
}
