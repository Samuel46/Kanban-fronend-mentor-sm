import { Container, Stack } from "@mui/material";
import { pxToRem } from "src/theme/typography";
import PlatFormLaunchColumn from "./PlatFormLaunchColumn";
import PlatFormLaunchColumnAdd from "./PlatFormLaunchColumnAdd";

const data = [
	{
		status: "Todo",
		tasks: [
			{
				title: "Build UI for onboarding flow",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
			{
				title: "Build UI for search",
				subtasks: ["Create a new column"],
			},
			{
				title: "Create template structures",
				subtasks: ["Create a new column", "Create a new column"],
			},
			{
				title: "QA and test all major user journeys",
				subtasks: ["Create a new column", "Create a new column"],
			},
		],
	},
	{
		status: "In Progress",
		tasks: [
			{
				title: "Design settings and search pages",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
			{
				title: "Add account management endpoints",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
			{
				title: "Design onboarding flow",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
			{
				title: "Add search enpoints",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
			{
				title: "Add authentication endpoints",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
			{
				title: "Research pricing points of various competitors and trial different business models",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
		],
	},
	{
		status: "Done",
		tasks: [
			{
				title: "Conduct 5 wireframe tests",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
			{
				title: "Create wireframe prototype",
				subtasks: ["Create a new column"],
			},
			{
				title: "Review results of usability tests and iterate",
				subtasks: ["Create a new column", "Create a new column"],
			},
			{
				title: "Create paper prototypes and conduct 10 usability tests with potential customers",
				subtasks: ["Create a new column", "Create a new column"],
			},
			{
				title: "Market discovery",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},

			{
				title: "Competitor analysis",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
			{
				title: "Research the market",
				subtasks: ["Create a new column", "Create a new column", "Create a new column"],
			},
		],
	},
];

export default function PlatFormLaunch() {
	return (
		<Container maxWidth={false} sx={{ py: pxToRem(24), zIndex: 1000 }}>
			<Stack
				spacing={pxToRem(20)}
				direction="row"
				alignItems="flex-start"
				sx={{
					width: 1,
					height: "100vh",
					overflowY: "auto",
					"&::-webkit-scrollbar": {
						width: 0,
					},
				}}
			>
				{data.map((item, index) => {
					return <PlatFormLaunchColumn key={index} data={item} />;
				})}

				{/*
				 * This is the component that will add a new column
				 */}

				<PlatFormLaunchColumnAdd />
			</Stack>
		</Container>
	);
}
