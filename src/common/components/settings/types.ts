export type ThemeModeValue = "light" | "dark";

export type SettingsValueProps = {
	themeMode: ThemeModeValue;
};

export type SettingsContextProps = SettingsValueProps & {
	// Mode
	onToggleMode: VoidFunction;
	onChangeMode: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
};
