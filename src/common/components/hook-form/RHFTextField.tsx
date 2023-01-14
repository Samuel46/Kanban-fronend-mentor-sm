// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField, TextFieldProps, useTheme } from "@mui/material";
import { pxToRem } from "src/theme/typography";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
	name: string;
};

export default function RHFTextField({ name, ...other }: Props) {
	const { control } = useFormContext();
	const theme = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					fullWidth
					value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
					error={!!error}
					helperText={error?.message}
					inputProps={{
						style: { fontSize: pxToRem(13), color: theme.palette.grey[500] },
					}}
					{...other}
				/>
			)}
		/>
	);
}
