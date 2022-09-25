import { FC, Fragment, useContext } from "react";
import style from "./SortBy.module.css";
import { AppContext } from "../../context";

interface Props {
	by: "name" | "lastName" | "email" | "address";
}

const SortBy: FC<Props> = ({ by }) => {

	const {
		setSortByName,
		setSortByLastName,
		setSortByEmail,
		setSortByAddress,
		sortByName,
		sortByLastName,
		sortByEmail,
		sortByAddress
	} = useContext(AppContext);
	return (
		<Fragment>
			{by === "name" && (
				<button className={style.button} onClick={setSortByName}>
					{sortByName ? (
						<span>Sort by {by} ⇡ </span>
					) : (
						<span>Sort by {by} ⇣ </span>
					)}
				</button>
			)}
			{by === "lastName" && (
				<button className={style.button} onClick={setSortByLastName}>
					{sortByLastName ? (
						<span>Sort by {by} ⇡ </span>
					) : (
						<span>Sort by {by} ⇣ </span>
					)}
				</button>
			)}
			{by === "email" && (
				<button className={style.button} onClick={setSortByEmail}>
					{sortByEmail ? (
						<span>Sort by {by} ⇡ </span>
					) : (
						<span>Sort by {by} ⇣ </span>
					)}
				</button>
			)}
			{by === "address" && (
				<button className={style.button} onClick={setSortByAddress}>
					{sortByAddress ? (
						<span>Sort by {by} ⇡ </span>
					) : (
						<span>Sort by {by} ⇣ </span>
					)}
				</button>
			)}
		</Fragment>
	);
};

export default SortBy;
