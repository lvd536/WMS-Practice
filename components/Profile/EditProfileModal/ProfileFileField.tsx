import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError as RHFFieldError } from "react-hook-form";

interface Props {
    label: string;
    id: string;
    invalid?: boolean;
    error?: RHFFieldError;
    onChange: (file: File | null) => void;
}

export function ProfileFileField({
    label,
    id,
    invalid,
    error,
    onChange,
}: Props) {
    return (
        <Field data-invalid={invalid}>
            <Label htmlFor={id}>{label}</Label>

            <Input
                id={id}
                type="file"
                accept="image/*"
                aria-invalid={invalid}
                autoComplete="off"
                onChange={(e) => {
                    onChange(e.target.files?.[0] ?? null);
                }}
            />

            {invalid && error && <FieldError errors={[error]} />}
        </Field>
    );
}
