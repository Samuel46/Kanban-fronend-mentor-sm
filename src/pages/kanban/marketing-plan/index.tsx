import React from "react";
// next
import Head from "next/head";
// layout
import KanbanLayout from "src/layout/kanban/KanbanLayout";
// @mui
import { Typography } from "@mui/material";

MarketingPlan.getLayout = (page: React.ReactElement) => <KanbanLayout>{page}</KanbanLayout>;

export default function MarketingPlan() {
	return (
		<>
			<Head>
				<title>Marketing Plan | Kanban</title>
			</Head>

			<Typography variant="h1">Markerting Plan!!!!!!!!!!!!!!!!</Typography>
		</>
	);
}
