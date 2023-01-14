import { Typography } from "@mui/material";
import React, { DetailedHTMLProps, LabelHTMLAttributes } from "react";

type Props = {
	htmlFor: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>["htmlFor"];
	children: React.ReactNode;
};
export default function Label({ htmlFor, children }: Props) {
	return (
		<label style={{ cursor: "pointer" }} htmlFor={htmlFor}>
			<Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
				{children}
			</Typography>
		</label>
	);
}
