import { Box, Paper, Skeleton, Stack } from "@mui/material";
import React from "react";
import { NAV } from "src/config";

export default function NavSkeleton() {
	return (
		<Paper
			sx={{
				height: "100vh",
				width: NAV.W_DASHBOARD,
				background: (theme) => theme.palette.background.paper,
				display: "flex",
				flexDirection: "column",
				borderRadius: 0,
			}}
		>
			<Stack alignItems="center" justifyItems="center" direction="row" spacing={2} alignSelf="flex-start" mt={3} px={2}>
				<Skeleton variant="circular" width={40} height={40} />
				<Skeleton variant="rounded" width={200} height={40} />
			</Stack>

			<Stack alignSelf="flex-start" mt={6} px={2}>
				<Skeleton variant="text" width={240} height={40} />
			</Stack>

			<Stack alignSelf="flex-start" mt={3} px={2} spacing={3} sx={{ position: "relative" }}>
				<Skeleton
					variant="rectangular"
					width={260}
					height={40}
					sx={{
						borderBottomRightRadius: 20,
						borderTopRightRadius: 20,
						width: "100%",
						position: "absolute",
						left: 0,
					}}
				/>

				<Skeleton
					variant="rectangular"
					width={260}
					height={40}
					sx={{
						borderBottomRightRadius: 20,
						borderTopRightRadius: 20,
						width: "100%",
						position: "absolute",
						top: 30,
						left: 0,
					}}
				/>

				<Skeleton
					variant="rectangular"
					width={260}
					height={40}
					sx={{
						borderBottomRightRadius: 20,
						borderTopRightRadius: 20,
						width: "100%",
						position: "absolute",
						top: 85,
						left: 0,
					}}
				/>

				<Skeleton
					variant="rectangular"
					width={260}
					height={40}
					sx={{
						borderBottomRightRadius: 20,
						borderTopRightRadius: 20,
						width: "100%",
						position: "absolute",
						top: 140,
						left: 0,
					}}
				/>

				<Skeleton
					variant="rectangular"
					width={260}
					height={40}
					sx={{
						borderBottomRightRadius: 20,
						borderTopRightRadius: 20,
						width: "100%",
						position: "absolute",
						top: 195,
						left: 0,
					}}
				/>
			</Stack>

			<Box sx={{ flexGrow: 1 }} />

			<Stack alignItems="center" justifyContent="center" px={2} mb={10} spacing={2}>
				<Skeleton variant="rounded" width={250} height={40} />
				<Skeleton variant="text" width={250} height={30} />
			</Stack>
		</Paper>
	);
}
