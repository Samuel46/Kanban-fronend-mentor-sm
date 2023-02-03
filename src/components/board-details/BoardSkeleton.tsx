import { Stack } from "@mui/material";
import React from "react";
import { HEADER } from "src/config";
import SkeletonBody from "./SkeletonBody";

const SPACING = 8;

export default function BoardSkeleton() {
	return (
		<Stack spacing={3} sx={{ py: `${HEADER.H_MOBILE + SPACING}px`, px: 2 }}>
			<SkeletonBody />
			<SkeletonBody />
		</Stack>
	);
}
