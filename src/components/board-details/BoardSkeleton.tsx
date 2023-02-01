import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";
import { pxToRem } from "src/theme/typography";
import SkeletonBody from "./SkeletonBody";

export default function BoardSkeleton() {
	return (
		<Box sx={{ display: "grid", height: "100%", gap: 2, mt: 3 }}>
			<SkeletonBody />
			<SkeletonBody />
		</Box>
	);
}
