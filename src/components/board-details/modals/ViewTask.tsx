import * as React from "react";
// @mui
import {
	Stack,
	Dialog,
	DialogContent,
	DialogTitle,
	useTheme,
	Typography,
	Card,
	FormControl,
	TextField,
	MenuItem,
	Box,
} from "@mui/material";

// typography
import { pxToRem } from "src/theme/typography";
// components
import Label from "@common/components/label/Label";
import Iconify from "@common/components/iconify/Iconify";
import { CheckBoxInput } from "@common/components/checkbox-input";
import { RootState, useSelector } from "@redux/store";
import { useRouter } from "next/router";
import DeleteTask from "./DeleteTask";
import { MenuNav } from "@common/components/menu";
import EditTask from "./EditTask";

type Subtasks = {
	title: string;
	complete: boolean;
	_id?: string;
};

type Task = {
	title: string;
	description: string;
	subtasks: Subtasks[];
	status: string;
	_id?: string;
};

type Props = {
	task: Task;
	index: number;
};

export default function ViewTask({ task, index }: Props) {
	const [openTask, setOpenTask] = React.useState(false);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);

	const router = useRouter();

	const completeSubtask = task.subtasks.filter((subtask) => subtask.complete === true);

	console.log(completeSubtask, "completeSubtask");

	const {
		query: { id: currentBoardId },
	} = router;

	const theme = useTheme();

	const handleClickOpen = () => {
		setOpenTask(true);
	};

	const handleClose = () => {
		setOpenTask(false);
	};

	const { boards } = useSelector((state: RootState) => state.board);

	const currentBoard = boards?.find((board) => board._id === currentBoardId);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Card
				onClick={handleClickOpen}
				sx={{
					p: 2,
					borderRadius: pxToRem(8),
					bgcolor: "background.paper",
					transition: theme.transitions.create("all"),
					cursor: "pointer",
					boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545);",
					"&:hover": {
						transform: "scale(.97)",
						color: theme.palette.primary.main,
					},

					"&:last-child": {
						mb: 5,
					},
				}}
				key={task._id}
			>
				<Typography variant="body1" fontWeight="600" mb={2}>
					{task.title}
				</Typography>
				<Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
					{completeSubtask.length} of {task.subtasks.length} substasks
				</Typography>
			</Card>

			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<Dialog open={openTask} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle sx={{ mt: pxToRem(20) }}>{task?.title}</DialogTitle>
				<DialogContent>
					<Stack spacing={3} mb={pxToRem(32)}>
						<Typography
							fontSize={pxToRem(13)}
							lineHeight={pxToRem(23)}
							fontWeight="500"
							color={theme.palette.grey[500]}
						>
							{task?.description}
						</Typography>

						<Stack spacing={pxToRem(25)}>
							<Typography variant="body1" sx={{ color: theme.palette.grey[500], mb: -1 }}>
								Subtasks ({completeSubtask.length} of {task.subtasks.length})
							</Typography>

							{/* Menu section */}
							<Box sx={{ position: "absolute", top: 0, right: 0 }}>
								<MenuNav
									handleClick={handleClick}
									handleClosee={handleCloseMenu}
									anchorEl={anchorEl}
									openn={openMenu}
								>
									<EditTask currentTask={task} handleCloseMenu={handleCloseMenu} />
									<DeleteTask id={task?._id} handleCloseMenu={handleCloseMenu} />
								</MenuNav>
							</Box>

							<form>
								{task.subtasks.map((sub) => (
									<CheckBoxInput
										label={sub.title}
										complete={sub.complete}
										key={sub?._id}
										subTaskId={sub._id}
										taskId={task._id}
									/>
								))}

								<FormControl variant="outlined" sx={{ width: "100%", mt: pxToRem(15) }}>
									<Label htmlFor="status">Current status</Label>
									<TextField
										name="status"
										margin="dense"
										autoFocus
										id="status"
										placeholder="e.g. Drink coffee & smile"
										fullWidth
										variant="outlined"
										defaultValue={task.status}
										select
										SelectProps={{
											IconComponent: (props) => (
												<Iconify icon={"ic:round-keyboard-arrow-down"} {...props} />
											),
										}}
									>
										{currentBoard?.columns.map((column) => (
											<MenuItem
												key={column._id}
												sx={{ typography: "body1", fontWeight: "500" }}
												value={column._id}
											>
												{column.name}
											</MenuItem>
										))}
									</TextField>
								</FormControl>
							</form>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
}
