// components
import NavItem from "./NavItem";
// hooks
import useActiveLink from "@common/hooks/useActiveLink";
// @types
import { NavListProps } from "./types";

type NavListRootProps = {
	data: NavListProps;
};

export default function Navlist({ data }: NavListRootProps) {
	const { active } = useActiveLink(data.path);

	return <NavItem active={active} item={data} />;
}
