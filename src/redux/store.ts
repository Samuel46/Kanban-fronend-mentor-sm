import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import { apiSlice } from "./api/apiSlice";
import { rootPersistConfig, rootReducer } from "./rootReducer";

const store = configureStore({
	reducer: persistReducer(rootPersistConfig, rootReducer),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutabelCheck: false,
			overrideExisting: true,
		}).concat(apiSlice.middleware),

	devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, persistor, useDispatch, useSelector, dispatch };
