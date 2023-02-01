import { OnBoardingUser } from "@component/onboarding";
import { Container, Box } from "@mui/material";
import Head from "next/head";
import KanbanLayout from "src/layout/kanban/KanbanLayout";

OnBoarding.getLayout = (page: React.ReactElement) => <KanbanLayout>{page}</KanbanLayout>;
export default function OnBoarding() {
	return (
		<>
			<Head>
				<title>OnBoarding | Kanban</title>
			</Head>
			<Box sx={{ display: "grid", height: "60vh", placeItems: "center", overflow: "hidden" }}>
				<OnBoardingUser />
			</Box>
		</>
	);
}
