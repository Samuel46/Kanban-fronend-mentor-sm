import React from "react";
// next
import Head from "next/head";
// layout
import KanbanLayout from "src/layout/kanban/KanbanLayout";
// components
import PlatFormLaunch from "@component/platform-launch/PlatFormLaunch";

PlatformLaunch.getLayout = (page: React.ReactElement) => <KanbanLayout>{page}</KanbanLayout>;

export default function PlatformLaunch() {
	return (
		<>
			<Head>
				<title>Platform Launch | Kanban</title>
			</Head>

			<PlatFormLaunch />
		</>
	);
}
