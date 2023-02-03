import { OnBoardingUser } from "@component/onboarding";
import { Box } from "@mui/material";
import { RootState, useSelector } from "@redux/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import KanbanLayout from "src/layout/kanban/KanbanLayout";

OnBoarding.getLayout = (page: React.ReactElement) => <KanbanLayout>{page}</KanbanLayout>;
export default function OnBoarding() {
	const { boards, isLoading } = useSelector((state: RootState) => state.board);
	const { replace } = useRouter();

	useEffect(() => {
		if (boards?.length > 0 && !isLoading) {
			replace(`/kanban/${boards[0]._id}`);
		}
	}, [isLoading, boards, replace]);

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
