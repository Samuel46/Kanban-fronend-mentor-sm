// @mui
import { Box } from "@mui/material";
//
import { useState } from "react";
//
import Header from "./header/Header";
import Main from "./Main";
import NavVertical from "./nav/NavVertical";

type Props = {
	children?: React.ReactNode;
};

export default function KanbanLayout({ children }: Props) {
	const [open, setOPen] = useState(true);

	const handleToggle = () => {
		setOPen(!open);
	};

	const handleClose = () => {
		setOPen(false);
	};

	return (
		<>
			<Header open={open} />
			<Box
				sx={{
					display: { lg: "flex" },
					minHeight: { lg: 1 },
					height: 1,
				}}
			>
				{open && <NavVertical openNav={open} onCloseNav={handleClose} handleToggle={handleToggle} />}

				<Main handleToggle={handleToggle} open={open}>
					{children}
				</Main>
			</Box>
		</>
	);
}
