import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ConfirmEmail() {
    return (
        <section
            id="confirm-email"
            className="w-full h-[90vh] flex items-center justify-center"
        >
            <Card className="max-w-md w-full">
                <CardHeader className="flex flex-col items-center justify-center">
                    <CardTitle className="font-bold text-2xl leading-[150%] tracking-[-0.03em] text-[#3525cd]">
                        WMS
                    </CardTitle>
                    <CardDescription>Email confirmation</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    Please, confirm your email to continue
                </CardContent>
            </Card>
        </section>
    );
}
