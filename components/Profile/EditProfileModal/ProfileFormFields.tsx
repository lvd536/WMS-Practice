import { Controller, Control } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { ProfileField } from "./ProfileField";
import { ProfileFileField } from "./ProfileFileField";
import { EditProfileFormValues } from "@/schemas/profile-form-schema";
import { Label } from "@/components/ui/label";

type Props = {
    control: Control<EditProfileFormValues>;
};

export function ProfileFormFields({ control }: Props) {
    return (
        <FieldGroup>
            <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                    <ProfileField
                        label="Name"
                        id="name"
                        inputProps={{
                            type: "text",
                            placeholder: "John Doe",
                            ...field,
                        }}
                        invalid={fieldState.invalid}
                        error={fieldState.error}
                    />
                )}
            />

            <Controller
                name="about"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <Label htmlFor="about">About</Label>
                        <InputGroup>
                            <InputGroupTextarea
                                {...field}
                                id="about"
                                placeholder="Warehouse manager."
                                rows={6}
                                className="min-h-24 resize-none"
                                aria-invalid={fieldState.invalid}
                            />
                            {field.value && (
                                <InputGroupAddon align="block-end">
                                    <InputGroupText className="tabular-nums">
                                        {field.value.length}/100 characters
                                    </InputGroupText>
                                </InputGroupAddon>
                            )}
                        </InputGroup>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                    <ProfileField
                        label="Phone"
                        id="phone"
                        invalid={fieldState.invalid}
                        error={fieldState.error}
                        inputProps={{
                            type: "tel",
                            placeholder: "+79991118989",
                            ...field,
                        }}
                    />
                )}
            />

            <Controller
                name="avatar"
                control={control}
                render={({ field, fieldState }) => (
                    <ProfileFileField
                        label="Avatar"
                        id="avatar"
                        invalid={fieldState.invalid}
                        error={fieldState.error}
                        onChange={(file) => field.onChange(file)}
                    />
                )}
            />

            <Controller
                name="background"
                control={control}
                render={({ field, fieldState }) => (
                    <ProfileFileField
                        label="Background"
                        id="background"
                        invalid={fieldState.invalid}
                        error={fieldState.error}
                        onChange={(file) => field.onChange(file)}
                    />
                )}
            />
        </FieldGroup>
    );
}
