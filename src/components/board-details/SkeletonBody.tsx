import { Skeleton, Stack } from "@mui/material";
import React from "react";
import { pxToRem } from "src/theme/typography";

export default function SkeletonBody() {
	return (
		<Stack direction="row" spacing={3} alignItems="center">
			<Stack direction="column" spacing={1}>
				<Skeleton animation="wave" variant="rectangular" width={300} height={150} sx={{ borderRadius: pxToRem(8) }} />
				<Skeleton variant="rounded" width={300} height={20} />
			</Stack>
			<Stack direction="column" spacing={1}>
				<Skeleton variant="rectangular" width={300} height={150} sx={{ borderRadius: pxToRem(8) }} />
				<Skeleton variant="rounded" width={300} height={20} />
			</Stack>

			<Stack direction="column" spacing={1}>
				<Skeleton variant="rectangular" width={300} height={150} sx={{ borderRadius: pxToRem(8) }} />
				<Skeleton variant="rounded" width={300} height={20} />
			</Stack>
			<Stack direction="column" spacing={1}>
				<Skeleton animation="wave" variant="rectangular" width={300} height={150} sx={{ borderRadius: pxToRem(8) }} />
				<Skeleton variant="rounded" width={300} height={20} />
			</Stack>
			<Stack direction="column" spacing={1}>
				<Skeleton variant="rectangular" width={300} height={150} sx={{ borderRadius: pxToRem(8) }} />
				<Skeleton variant="rounded" width={300} height={20} />
			</Stack>
		</Stack>
	);
}
