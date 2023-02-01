import React from "react";
import { SnackbarKey, useSnackbar } from "notistack";
import { removeSnackbarAction } from "@redux/slice/notifications";
import { dispatch, useSelector } from "src/redux/store";

let displayed: string[] = [];

type Props = {
	key: string;
	message: string;
	options?: any;
	dismissed?: boolean;
};
const useNotifier = () => {
	const notificationState = useSelector((state) => state.notifications || []);
	const { notifications } = notificationState;
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const storeDisplayed = (id: string) => {
		displayed = [...displayed, id];
	};

	const removeDisplayed = (id: SnackbarKey) => {
		displayed = [...displayed.filter((key) => id !== key)];
	};

	React.useEffect(() => {
		notifications?.forEach(({ key, message, options = {}, dismissed = false }: Props) => {
			if (dismissed) {
				// dismiss snackbar using notistack
				closeSnackbar(key);
				return;
			}

			// do nothing if snackbar is already displayed
			if (displayed.includes(key)) return;

			// display snackbar using notistack
			enqueueSnackbar(message, {
				key,
				...options,
				onClose: (event, reason, myKey) => {
					if (options.onClose) {
						options.onClose(event, reason, myKey);
					}
				},
				onExited: (event, myKey) => {
					// remove this snackbar from redux store
					dispatch(removeSnackbarAction(myKey));
					removeDisplayed(myKey);
				},
			});

			// keep track of snackbars that we've displayed
			storeDisplayed(key);
		});
	}, [notifications, closeSnackbar, enqueueSnackbar]);
};

export default useNotifier;
