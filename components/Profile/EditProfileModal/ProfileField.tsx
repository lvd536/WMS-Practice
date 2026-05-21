import { InputHTMLAttributes } from "react";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError as RHFFieldError } from "react-hook-form";

interface Props {
    label: string;
    id: string;
    invalid?: boolean;
    error?: RHFFieldError;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export function ProfileField({ label, id, invalid, error, inputProps }: Props) {
    return (
        <Field data-invalid={invalid}>
            <Label htmlFor={id}>{label}</Label>

            <Input
                id={id}
                aria-invalid={invalid}
                autoComplete="off"
                {...inputProps}
            />

            {invalid && error && <FieldError errors={[error]} />}
        </Field>
    );
}
