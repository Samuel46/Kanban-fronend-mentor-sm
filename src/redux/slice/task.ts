import { enqueueSnackbarAction } from "./notifications";
import { createSlice } from "@reduxjs/toolkit";
import axios from "src/utils/axios";

import { AppDispatch, RootState } from "../store";
import { getAllBoards } from "./board";

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

type TaskState = {
	isLoading: boolean;
	error: any;
	tasks: Task[];
};

const initialState: TaskState = {
	isLoading: false,
	error: null,
	tasks: [],
};

const taskSlice = createSlice({
	name: "task",
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
		createTaskSuccess(state, action) {
			state.isLoading = false;
			state.tasks?.push(action.payload);
		},

		// GET ALL TASKS SUCCESS
		getAllTasksSuccess(state, action) {
			state.isLoading = false;
			state.tasks = action.payload;
		},

		// UPDATE  TASKS SUCCESS
		/*
		 *if the task we're looking at has the same special code as the task we want to update,
		 *then change that task in the list to the new task we have.
		 *
		 * */
		updateTasksSuccess(
			state: TaskState,
			action: {
				type: string;
				payload: Task;
			}
		) {
			state.isLoading = false;
			state.tasks?.forEach((task: Task, index: number) => {
				if (task._id === action.payload._id) {
					state.tasks[index] = action.payload;
				}
			});
		},

		// DELETE TASKS SUCCESS
		deleteTasksSuccess(state, action) {
			state.isLoading = false;
			state.tasks = state.tasks?.filter((task: Task) => task._id !== action.payload);
		},
	},
});

export default taskSlice.reducer;

// THUKN
// ----------------------------------------------

const { startLoading, hasError, createTaskSuccess, getAllTasksSuccess, updateTasksSuccess, deleteTasksSuccess } =
	taskSlice.actions;

// Create task
export const createTask =
	(title: string, description: string, subtasks: Subtasks[], status: string) => async (dispatch: AppDispatch) => {
		dispatch(startLoading());
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post("/create-task", { title, description, subtasks, status }, config);
			dispatch(createTaskSuccess(data));

			dispatch(
				enqueueSnackbarAction({
					message: "Task created successfully",
					options: { variant: "success", key: new Date().getTime() + Math.random() },
				})
			);
		} catch (error) {
			dispatch(hasError(error?.errors));
			error?.errors?.forEach((error: { message: string }, index: number) => {
				dispatch(
					enqueueSnackbarAction({
						message: error?.message || "Error creating task",
						options: { variant: "error", key: new Date().getTime() + Math.random() + index },
					})
				);
			});
		}
	};

// Get all tasks
export const getAllTasks = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(startLoading());

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.get("/get-tasks", config);

		dispatch(getAllTasksSuccess(data));
	} catch (error) {
		dispatch(hasError(error?.errors));

		error?.errors?.forEach((error: { message: string }, index: number) => {
			dispatch(
				enqueueSnackbarAction({
					message: error?.message || "Error fetching task",
					options: { variant: "error", key: new Date().getTime() + Math.random() + index },
				})
			);
		});
	}
};

// Update task
export const updatedTask =
	(title: string, description: string, subtasks: Subtasks[], status: string, id: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(startLoading());

			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.patch("/update-task", { title, description, subtasks, status, id }, config);

			dispatch(updateTasksSuccess(data));

			dispatch(
				enqueueSnackbarAction({
					message: "Task updated successfully",
					options: { variant: "success", key: new Date().getTime() + Math.random() },
				})
			);
			dispatch(getAllTasks());
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

// Detete Task
export const deleteTask = (id?: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(startLoading());

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.delete(`/delete-task/${id}`, config);

		dispatch(deleteTasksSuccess(data));
		dispatch(getAllTasks());
		dispatch(
			enqueueSnackbarAction({
				message: data.message,
				options: { variant: "warning", key: new Date().getTime() + Math.random() },
			})
		);
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
