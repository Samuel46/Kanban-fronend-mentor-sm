import React from "react";
import { useSettingsContext } from "../settings";

type Props = {
	styles?: React.CSSProperties;
};

export default function Logo({ styles }: Props) {
	const { themeMode } = useSettingsContext();

	if (themeMode === "light") {
		return <img src="../logo_dark.png" alt="logo_dark" width={"60%"} style={{ objectFit: "contain", ...styles }} />;
	}

	return <img src="../logo_light.png" alt="logo_light" width={"60%"} style={{ objectFit: "contain", ...styles }} />;
}
