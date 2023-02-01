import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "src/utils/axios";
import { enqueueSnackbarAction } from "./notifications";

type Column = {
	name: string;
	_id?: string;
	prioritize: string;
};

type Board = {
	name: string;
	columns: Column[];
	_id?: string;
	createdAt: number;
};

interface BoardState {
	name: string;
	columns: string[];
	isLoading: boolean;
	boards: Board[];
	error: string | null;
	board: Board | null;
	columnsOrder: string[];
}

const initialState: BoardState = {
	name: "",
	columns: [],
	columnsOrder: [],
	isLoading: false,
	boards: [],
	board: null,
	error: null,
};

const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		// START LOADING
		startLoading(state) {
			state.isLoading = true;
		},

		// HAS ERROR
		hasError(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},

		// CREATE BOARD SUCCESS
		createBoardSuccess(state, action) {
			state.isLoading = false;

			state.board = action.payload;
			state.boards?.push(action.payload);
		},

		persistColumn(state, action) {
			state.columnsOrder = action.payload;
		},

		persistTask(state, action) {
			const columns = action.payload;
			state.columns = columns;
		},

		// RESET BOARD
		resetBoardSuccess(state) {
			state.board = null;
		},

		// GET ALL BOARDS SUCCESS
		getAllBoardSuccess(state, action) {
			state.isLoading = false;
			state.boards = action.payload;
		},

		// GET ALL BOARDS SUCCESS
		updateBoardSuccess(state, action) {
			state.isLoading = false;

			state.boards?.forEach((board, index) => {
				if (board._id === action.payload._id) {
					state.boards[index] = action.payload;
				}
			});
		},

		// DELETE BOARD SUCCESS
		deleteBoardSuccess(state, action) {
			state.isLoading = false;
			const remaining = state.boards.filter((board) => board._id !== action.payload);
			console.log(remaining);
			state.boards = remaining;
			// if we have boards in the state, redirect to the first board
		},
	},
});

export default boardSlice.reducer;

export const {
	startLoading,
	hasError,
	getAllBoardSuccess,
	createBoardSuccess,
	updateBoardSuccess,
	deleteBoardSuccess,
	resetBoardSuccess,
	persistColumn,
	persistTask,
} = boardSlice.actions;

// ---------------------------------------------------------------------
// Thunk

// Create new board
export const createBoard = (name: string, columns: Column[]) => async (dispatch: AppDispatch) => {
	try {
		dispatch(startLoading());
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post("/create-board", { name, columns }, config);
		dispatch(createBoardSuccess(data));
		dispatch(
			enqueueSnackbarAction({
				message: "Board created successfully",
				options: { variant: "success", key: new Date().getTime() + Math.random() },
			})
		);
		setTimeout(() => {
			dispatch(resetBoardSuccess());
		}, 500);
	} catch (error) {
		dispatch(hasError(error?.errors));

		error?.errors.forEach((error: { message: string }, index: number) => {
			dispatch(
				enqueueSnackbarAction({
					message: error?.message || "Error creating board",
					options: { variant: "error", key: new Date().getTime() + Math.random() + index },
				})
			);
		});
	}
};

// Persist column order
export const persistColumnOrder = (newColumnOrder: string[]) => async (dispatch: AppDispatch) => {
	try {
		dispatch(persistColumn(newColumnOrder));
	} catch (error) {
		dispatch(hasError(error?.errors));
	}
};

// Persist task order
export const persistTaskOrder = (newTaskOrder: string[]) => async (dispatch: AppDispatch) => {
	try {
		dispatch(persistTask(newTaskOrder));
	} catch (error) {
		dispatch(hasError(error?.errors));
	}
};

// Get all  boards
export const getAllBoards = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(startLoading());

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.get("/get-boards", config);
		dispatch(getAllBoardSuccess(data));
	} catch (error) {
		dispatch(hasError(error?.errors));

		error?.errors?.forEach((error: { message: string }, index: number) => {
			dispatch(
				enqueueSnackbarAction({
					message: error?.message || "Error fetching board",
					options: { variant: "error", key: new Date().getTime() + Math.random() + index },
				})
			);
		});
	}
};

// Update Board

export const updateBoard = (name: string, columns: Column[], id: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(startLoading());

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.patch("/update-board", { name, columns, id }, config);
		dispatch(updateBoardSuccess(data));

		dispatch(
			enqueueSnackbarAction({
				message: "Board updated successfully",
				options: { variant: "success", key: new Date().getTime() + Math.random() },
			})
		);
	} catch (error) {
		dispatch(hasError(error?.errors));

		error?.errors?.forEach((error: { message: string }, index: number) => {
			dispatch(
				enqueueSnackbarAction({
					message: error?.message || "Error updating board",
					options: { variant: "error", key: new Date().getTime() + Math.random() + index },
				})
			);
		});
	}
};

// Delete Board
export const deleteBoard = (id: string | string[] | undefined) => async (dispatch: AppDispatch) => {
	try {
		dispatch(startLoading());

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.delete(`/delete-board/${id}`, config);
		dispatch(deleteBoardSuccess(data));
		dispatch(
			enqueueSnackbarAction({
				message: "Board deleted successfully",
				options: { variant: "warning", key: new Date().getTime() + Math.random() },
			})
		);
		dispatch(getAllBoards());
	} catch (error) {
		dispatch(hasError(error?.errors));

		error?.errors?.forEach((error: { message: string }, index: number) => {
			dispatch(
				enqueueSnackbarAction({
					message: error?.message || "Error deleting task",
					options: { variant: "error", key: new Date().getTime() + Math.random() + index },
				})
			);
		});
	}
};
