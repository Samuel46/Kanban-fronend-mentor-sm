import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// slices
// Notifications
import notificationReducer from "./slice/notifications";
import boardReducer from "./slice/board";
import taskReducer from "./slice/task";
import { apiSlice } from "./api/apiSlice";

const createNoopStorage = () => ({
	getItem: (_key: string) => Promise.resolve(null),
	setItem: (_key: string, value: string) => Promise.resolve(value),
	removeItem: (_key: string) => Promise.resolve(),
});

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const rootPersistConfig = {
	key: "root",
	storage,
	keyPrefix: "redux-",
	whitelist: [],
	blacklist: [],
};

// const authPersistConfig = {
// 	key: "auth",
// 	storage,
// 	keyPrefix: "redux-",
// 	whitelist: ["accessToken", "isAuthenticated"],
// };

// persist the the tasks
const taskPersistConfig = {
	key: "task",
	storage,
	keyPrefix: "redux-",
	whitelist: ["tasks"],
};

// Persist the boards

const boardPersistConfig = {
	key: "board",
	storage,
	keyPrefix: "redux-",
	whitelist: ["boards"],
};

const rootReducer = combineReducers({
	// slices
	notifications: notificationReducer,
	board: persistReducer(boardPersistConfig, boardReducer),
	task: persistReducer(taskPersistConfig, taskReducer),
	[apiSlice.reducerPath]: apiSlice.reducer,
});

export { rootPersistConfig, rootReducer };
