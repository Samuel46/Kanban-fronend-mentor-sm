import { useState } from "react";
import * as Yup from "yup";

// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// typography
import { pxToRem } from "src/theme/typography";
// @mui
import { MenuItem, Stack, Dialog, DialogContent, DialogTitle, FormControl, Box } from "@mui/material";
// components
import Label from "@common/components/label/Label";
import Button from "@common/components/button";
import FormProvider, { RHFSelect, RHFTextField } from "@common/components/hook-form";
import useResponsive from "@common/hooks/useResponsive";
import { createTask } from "@redux/slice/task";
import { dispatch, RootState, useSelector } from "@redux/store";
import SubTasksArray from "./SubTasksArray";
import Iconify from "@common/components/iconify/Iconify";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

type Subtasks = {
	title: string;
	complete: boolean;
};

type FormValuesProps = {
	title: string;
	description: string;
	subtasks: Subtasks[];
	status: string;
};

export default function AddNewTask() {
	const [open, setOpen] = useState(false);

	const router = useRouter();

	const {
		query: { id: currentBoardId },
	} = router;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const isPhone = useResponsive("down", "sm");

	const { boards } = useSelector((state: RootState) => state.board);

	const currentBoard = boards?.find((board) => board._id === currentBoardId);

	const AddTaskSchema = Yup.object().shape({
		title: Yup.string().required("Name is required"),
		description: Yup.string().required("Description is required"),
		status: Yup.string().required("Status is required"),
	});

	const defaultValues = {
		title: "",
		description: "",
		subtasks: [
			{
				title: "",
				complete: false,
			},
		],
		status: "",
	};

	const methods = useForm({
		resolver: yupResolver(AddTaskSchema),
		defaultValues,
	});

	const { reset, handleSubmit } = methods;

	const onSubmit = async (data: FormValuesProps) => {
		try {
			dispatch(createTask(data.title, data.description, data.subtasks, data.status));
			handleClose();
			reset();
		} catch (error) {
			console.error(error);

			reset();
		}
	};

	return (
		<div>
			<Button disabled={!currentBoardId} onClick={handleClickOpen}>
				{isPhone ? <img src="../icons/+.svg" alt="ss" /> : "+ Add New Task"}
			</Button>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
				<DialogTitle sx={{ mt: pxToRem(16) }}>Add New Task</DialogTitle>
				<DialogContent>
					<Stack spacing={3}>
						<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
							<FormControl variant="outlined" sx={{ width: "100%" }}>
								<Label htmlFor="title">Title</Label>
								<RHFTextField
									name="title"
									autoFocus
									margin="dense"
									id="title"
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

							<SubTasksArray />

							<FormControl variant="outlined" sx={{ width: "100%" }}>
								<Label htmlFor="status">Status</Label>
								<RHFSelect
									name="status"
									margin="dense"
									autoFocus
									id="status"
									placeholder="e.g. Drink coffee & smile"
									fullWidth
									variant="outlined"
									select
									SelectProps={{
										IconComponent: (props) => <Iconify icon={"ic:round-keyboard-arrow-down"} {...props} />,
									}}
								>
									{currentBoard?.columns?.map((column) => (
										<MenuItem
											key={column._id}
											sx={{ typography: "body1", fontWeight: "500" }}
											value={column._id}
										>
											{column.name}
										</MenuItem>
									))}
								</RHFSelect>
							</FormControl>
							<Box mb={pxToRem(32)} mt={pxToRem(24)}>
								<Button type="submit" fullWidth>
									Create task
								</Button>
							</Box>
						</FormProvider>
					</Stack>
				</DialogContent>
			</Dialog>
		</div>
	);
}
