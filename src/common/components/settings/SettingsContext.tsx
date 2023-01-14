import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultSettings } from "./config";
import { SettingsContextProps, ThemeModeValue } from "./types";

/*
 *Define the initial state of the context

 */

const initialState: SettingsContextProps = {
	...defaultSettings,

	// Mode
	onToggleMode: () => {},
	onChangeMode: () => {},
};

/*
 * Create settings context
 * Export settings context

 */

export const SettingsContext = createContext(initialState);

/*
 * Create settings context hook
 * Export settings context hook

 */

export const useSettingsContext = () => {
	const context = useContext(SettingsContext);
	if (context === undefined || !context) {
		throw new Error("useSettingsContext must be used within a SettingsProvider");
	}
	return context;
};

// ----------------------------------------------------------

type SettingsProviderProps = {
	children: ReactNode;
};

/*
 * Create settings provider
 * Export settings provider where will add some common fn to use throughout the app

 */

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
	const [themeMode, setThemeMode] = useState(initialState.themeMode);

	/*
	 *  When the component mounts set the mode using the user cookies or the default values in the config
	 */

	const undefinedWindow = typeof window === "undefined";

	useEffect(() => {
		if (undefinedWindow) {
			const mode = getCookie("themeMode") || defaultSettings.themeMode;

			setThemeMode(mode as ThemeModeValue);
		}
	}, []);

	// Mode

	const onToggleMode = useCallback(() => {
		const value = themeMode === "light" ? "dark" : "light";
		setThemeMode(value);
		setCookie("themeMode", value);
	}, [themeMode]);

	const onChangeMode = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as ThemeModeValue;
		setThemeMode(value);
		setCookie("themeMode", value);
	}, []);

	/*
	 *  Memoize values this will not affect the re-rendering of the component just the value of the context
	 */
	const value = useMemo(
		() => ({
			// Mode
			themeMode,
			onToggleMode,
			onChangeMode,
		}),
		[themeMode, onToggleMode, onChangeMode]
	);

	return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

/*
 * Store the user settings in the cookies
 * Fn to create, set cookies and to remove cookies better than localstorage
 */

function getCookie(name: string) {
	if (typeof document === "undefined") {
		throw new Error(
			"getCookie() is not supported on the server. Fallback to a different value when rendering on the server."
		);
	}

	const value = `; ${document.cookie}`;

	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) {
		return parts[1].split(";").shift();
	}

	return undefined;
}

function setCookie(name: string, value: string, exdays = 3) {
	const date = new Date();
	date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function removeCookie(name: string) {
	document.cookie = `${name}=;path=/;max-age=0`;
}
