import { FieldLabel } from "@keystar/ui/field";
import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";

// Display-only text field component conforming to keystatic requirements
export function PlainText({
	label,
}: {
	label: string;
}): BasicFormField<null> {
	return {
		kind: "form",
		Input: () => (
			<div
				style={{
					display: "inline-flex",
					alignSelf: "flex-start",
					flexDirection: "column",
					cursor: "default",
					gap: "1rem",
				}}
			>
				<FieldLabel>{label}</FieldLabel>
			</div>
		),
		defaultValue: () => null,
		parse: (value: FormFieldStoredValue) => null, // no parsing needed
		serialize: () => ({ value: undefined }), // serialize to undefined
		validate: () => null, // validation always passes
		reader: {
			parse: (value: FormFieldStoredValue) => null, // reader parse returns null
		},
		label: label, // use the provided label
	};
}
