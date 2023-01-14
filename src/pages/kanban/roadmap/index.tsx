import React from "react";
// next
import Head from "next/head";
// layout
import KanbanLayout from "src/layout/kanban/KanbanLayout";
// @mui
import { Typography } from "@mui/material";

RoadMap.getLayout = (page: React.ReactElement) => <KanbanLayout>{page}</KanbanLayout>;

export default function RoadMap() {
	return (
		<>
			<Head>
				<title>Roadmap | Kanban</title>
			</Head>

			<Typography variant="h1">Road Map!!!!!</Typography>
		</>
	);
}
