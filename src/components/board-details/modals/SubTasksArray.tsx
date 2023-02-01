import Button from "@common/components/button/Button";
import { RHFTextField } from "@common/components/hook-form";
import Label from "@common/components/label/Label";
import { Box, FormControl, IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { pxToRem } from "src/theme/typography";

export default function SubTasksArray() {
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "subtasks",
	});

	const handleAdd = () => {
		append({
			name: "",
			complete: false,
		});
	};

	const handleRemove = (index: number) => {
		remove(index);
	};

	return (
		<>
			{fields.map((item, index) => (
				<FormControl variant="outlined" sx={{ width: "100%" }} key={item.id}>
					{index === 0 && <Label htmlFor="column">Subtasks</Label>}

					<Box display="flex" alignItems="center" gap={pxToRem(10)}>
						<RHFTextField
							margin="dense"
							name={`subtasks[${index}].title`}
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
			))}
			<Button sx={{ alignSelf: "center", marginTop: 1.2 }} fullWidth buttonType="secondary" onClick={handleAdd}>
				+ Add New Subtask
			</Button>
		</>
	);
}
