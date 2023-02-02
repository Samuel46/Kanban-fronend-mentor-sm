import React from "react";
// next
import Head from "next/head";
// layout
import KanbanLayout from "src/layout/kanban/KanbanLayout";
// components
import Board from "@component/board-details/Board";

BaordDetails.getLayout = (page: React.ReactElement) => <KanbanLayout>{page}</KanbanLayout>;

export default function BaordDetails() {
	return (
		<>
			<Head>
				<title>Board Details | Kanban</title>
			</Head>

			<Board />
		</>
	);
}
