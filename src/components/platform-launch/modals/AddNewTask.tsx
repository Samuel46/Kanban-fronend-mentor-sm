import { useState } from "react";
import * as Yup from "yup";

// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// typography
import { pxToRem } from "src/theme/typography";
// @mui
import { MenuItem, Stack, Dialog, DialogContent, DialogTitle, useTheme, FormControl, Box } from "@mui/material";
// components
import Label from "@common/components/label/Label";
import Button from "@common/components/button";
import Iconify from "@common/components/iconify/Iconify";
import FormProvider, { RHFSelect, RHFTextField } from "@common/components/hook-form";

// ----------------------------------------------------------------------

// type FormValuesProps = {
// 	name: string;
// 	description: string;
// };

export default function AddNewTask() {
	const [open, setOpen] = useState(false);

	const theme = useTheme();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// react-hook-form

	const AddTaskSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		description: Yup.string().required("Description is required"),
	});

	const defaultValues = {
		name: "",
		description: "",
	};

	const methods = useForm({
		resolver: yupResolver(AddTaskSchema),
		defaultValues,
	});

	return (
		<div>
			<Button onClick={handleClickOpen}>+ Add New Task</Button>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
				<DialogTitle sx={{ mt: pxToRem(16) }}>Add New Task</DialogTitle>
				<DialogContent>
					<Stack spacing={3}>
						{/*
						 *react-form shoould be used here
						 */}
						<FormProvider methods={methods} onSubmit={() => console.log("ssss")}>
							<FormControl variant="outlined" sx={{ width: "100%" }}>
								<Label htmlFor="name">Name</Label>
								<RHFTextField
									name="name"
									autoFocus
									margin="dense"
									id="name"
									placeholder="e.g. Take coffee break"
									fullWidth
								/>
							</FormControl>

							<FormControl variant="outlined" sx={{ width: "100%" }}>
								<Label htmlFor="description">Description</Label>
								<RHFTextField
									autoFocus
									name="description"
									margin="dense"
									id="description"
									placeholder="e.g. It’s always good to take a break. This 15 minute break will 
              recharge the batteries a little."
									fullWidth
									variant="outlined"
									multiline
									rows={4}
								/>
							</FormControl>

							<FormControl variant="outlined" sx={{ width: "100%" }}>
								<Label htmlFor="subtasks">Subtasks</Label>
								<Stack spacing={2}>
									<RHFTextField
										margin="dense"
										name="subtasks"
										autoFocus
										id="subtasks"
										placeholder="e.g. Make coffee"
										fullWidth
										variant="outlined"
									/>
									<RHFTextField
										autoFocus
										name="subtasks"
										id="subtasks"
										placeholder="e.g. Drink coffee & smile"
										fullWidth
										variant="outlined"
									/>
									<Button onClick={handleClose} sx={{ alignSelf: "center" }} buttonType="secondary">
										+ Add New Subtask
									</Button>
								</Stack>
							</FormControl>

							<FormControl variant="outlined" sx={{ width: "100%" }}>
								<Label htmlFor="subtasks">Status</Label>
								<RHFSelect
									name="status"
									margin="dense"
									autoFocus
									id="subtasks"
									placeholder="e.g. Drink coffee & smile"
									fullWidth
									variant="outlined"
									select
									SelectProps={{
										IconComponent: (props) => <Iconify icon={"ic:round-keyboard-arrow-down"} {...props} />,
									}}
								>
									<MenuItem sx={{ typography: "body1", fontWeight: "500" }} value="Doing">
										Doing
									</MenuItem>
									<MenuItem sx={{ typography: "body1", fontWeight: "500" }} value="Todo">
										Todo
									</MenuItem>
									<MenuItem sx={{ typography: "body1", fontWeight: "500" }} value="Done">
										Done
									</MenuItem>
								</RHFSelect>
							</FormControl>
						</FormProvider>
					</Stack>

					<Box mb={pxToRem(32)} mt={pxToRem(24)}>
						<Button onClick={handleClose} fullWidth>
							Create task
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
