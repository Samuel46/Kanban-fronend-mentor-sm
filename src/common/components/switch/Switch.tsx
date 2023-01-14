import * as React from "react";
import Switch from "@mui/material/Switch";
import { useSettingsContext } from "../settings";

export default function ControlledSwitches() {
	const { themeMode, onToggleMode } = useSettingsContext();

	return <Switch defaultChecked onClick={onToggleMode} />;
}
