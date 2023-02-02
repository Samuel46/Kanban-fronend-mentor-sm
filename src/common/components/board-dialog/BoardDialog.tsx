import { useMemo, useState } from "react";
import * as Yup from "yup";

// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import Label from "@common/components/label/Label";
import Button from "@common/components/button";
// @mui
import { Stack, Dialog, DialogContent, DialogTitle, FormControl, Box, Button as MuiButton, MenuItem } from "@mui/material";
import { pxToRem } from "src/theme/typography";
import { RHFTextField } from "@common/components/hook-form";
import FormProvider from "@common/components/hook-form/FormProvider";
import ColumnsArray from "@component/board-details/modals/ColumnsArray";
import { dispatch, RootState, useSelector } from "@redux/store";
import { createBoard, updateBoard } from "@redux/slice/board";
import { useRouter } from "next/router";

type Column = {
	name: string;
	_id?: string;
	prioritize: string;
};

type FormValuesProps = {
	name: string;
	columns: Column[];
};

type Props = {
	name: string;
	columns: Column[];
	_id: string;
};

type BoardProps = {
	open: boolean;
	handleClose: () => void;
	buttonTxt: string;
	title: string;
	edit?: boolean;
};

export default function BoardDialog({ open, handleClose, buttonTxt, title, edit = false }: BoardProps) {
	const router = useRouter();

	const {
		query: { id: currentBoardId },
	} = router;

	const { boards } = useSelector((state: RootState) => state.board);

	const currentBoard = boards?.find((board) => board._id === currentBoardId) as unknown as Props;

	const AddBoardSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		columns: Yup.array().of(
			Yup.object().shape({
				name: Yup.string().required("Column name is required"),
			})
		),
	});

	const defaultValues = {
		name: "",
		columns: [
			{
				name: "",
				prioritize: "low",
			},
		],
	};

	const method = useForm({
		resolver: yupResolver(AddBoardSchema),
		defaultValues,
	});

	const { reset, handleSubmit, setValue } = method;

	useMemo(() => {
		if (edit) {
			setValue("name", currentBoard?.name);
			setValue("columns", currentBoard?.columns);
		}
	}, [currentBoard, setValue, edit]);

	const onSubmit = async (data: FormValuesProps) => {
		try {
			if (edit) {
				dispatch(updateBoard(data.name, data.columns, currentBoard._id));
			} else {
				dispatch(createBoard(data.name, data.columns));
			}

			handleClose();
			reset();
		} catch (error) {
			console.error(error);

			reset();
		}
	};

	return (
		<div>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
				<DialogTitle sx={{ mt: pxToRem(16) }}>{title}</DialogTitle>
				<DialogContent>
					<FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
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

							<div>
								<ColumnsArray />
							</div>
						</Stack>
						<Box mb={pxToRem(32)} mt={pxToRem(24)}>
							<Button type="submit" fullWidth>
								{buttonTxt}
							</Button>
						</Box>
					</FormProvider>
				</DialogContent>
			</Dialog>
		</div>
	);
}
