import React from "react";
// next
import Head from "next/head";
// layout
import KanbanLayout from "src/layout/kanban/KanbanLayout";
// @mui
import { Typography } from "@mui/material";

NewBoard.getLayout = (page: React.ReactElement) => <KanbanLayout>{page}</KanbanLayout>;

export default function NewBoard() {
	return (
		<>
			<Head>
				<title>NewBoard | Kanban</title>
			</Head>

			<Typography variant="h1">NewBoard!!!!!!!!!!</Typography>
		</>
	);
}
