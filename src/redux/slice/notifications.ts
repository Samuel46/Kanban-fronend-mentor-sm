import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

interface NotificationState {
	notifications: {
		key: string;
		message: string;
		options: {
			variant: string;
		};
		dismissed: boolean;
	}[];
}
// TODO: Fix this by adding proper types∂

const initState = {
	notifications: [],
} as unknown as NotificationState;
console.log(initState);

const notificationSlice = createSlice({
	name: "notifications",
	initialState: initState,
	reducers: {
		// ENQUEUE_SNACKBAR
		enqueueSnackbar(state, action) {
			console.log(action, "get my type please");
			const payload = action.payload;
			state.notifications = [
				...state.notifications,
				{
					key: payload.key,
					...payload.notification,
				},
			];
		},

		// CLOSE_SNACKBAR
		closeSnackbar(state, action) {
			const payload = action.payload;
			state.notifications = state.notifications.map((notification) =>
				payload.dismissAll || notification.key === payload.key || !payload.key
					? { ...notification, dismissed: true }
					: { ...notification }
			);
		},

		// REMOVE_SNACKBAR

		removeSnackbar(state, action) {
			state.notifications = state.notifications.filter((notification: any) => notification.key !== action.payload);
		},
	},
});

export default notificationSlice.reducer;

// -----------------------------------------
// Thunk

const { enqueueSnackbar, closeSnackbar, removeSnackbar } = notificationSlice.actions;

export const enqueueSnackbarAction =
	(notification: { message: string; options: { key: string | number; variant: string } }) => async (dispatch: AppDispatch) => {
		dispatch(enqueueSnackbar({ key: notification.options && notification.options.key, notification }));
	};

export const closeSnackbarAction = (key: string) => async (dispatch: AppDispatch) => {
	dispatch(closeSnackbar(key));
};

export const removeSnackbarAction = (key: string | number) => async (dispatch: AppDispatch) => {
	dispatch(removeSnackbar(key));
};
