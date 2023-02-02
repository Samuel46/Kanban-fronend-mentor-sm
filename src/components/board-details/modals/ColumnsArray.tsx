import Button from "@common/components/button/Button";
import { RHFRadioGroup, RHFTextField } from "@common/components/hook-form";
import Label from "@common/components/label/Label";
import { Box, FormControl, IconButton, Stack } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { pxToRem } from "src/theme/typography";

const PRIORITIZES_OPTIONS = [
	{ value: "low", label: "Low", color: "info" },
	{ value: "medium", label: "Medium", color: "warning" },
	{ value: "high", label: "High", color: "error" },
	{ value: "critical", label: "Critical", color: "primary" },
] as const;

export default function ColumnsArray() {
	const { control, watch } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "columns",
	});

	const handleAdd = () => {
		append({
			name: "",
			prioritize: "low",
		});
	};

	const value = watch();
	console.log(value.columns);

	const handleRemove = (index: number) => {
		remove(index);
	};

	return (
		<>
			{fields.map((item, index) => (
				<Stack key={item.id}>
					<FormControl variant="outlined" sx={{ width: "100%" }}>
						{index === 0 && <Label htmlFor="column">Columns</Label>}
						<Box display="flex" alignItems="center" gap={pxToRem(10)}>
							<RHFTextField
								margin="dense"
								name={`columns[${index}].name`}
								autoFocus
								id="column"
								placeholder="e.g. Drink coffee & smile"
								fullWidth
								variant="outlined"
							/>
							<IconButton onClick={() => handleRemove(index)}>
								<img src="../icons/x.svg" alt="remove column" />
							</IconButton>
						</Box>
					</FormControl>

					<RHFRadioGroup name={`columns[${index}].prioritize`} options={PRIORITIZES_OPTIONS} />
				</Stack>
			))}
			<Button sx={{ alignSelf: "center", marginTop: 2 }} fullWidth buttonType="secondary" onClick={handleAdd}>
				+ Add New Column
			</Button>
		</>
	);
}
