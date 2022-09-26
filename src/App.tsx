import { useContext } from "react";
import IUserData from "./interface/user";
import Card from "./components/Card/Card";
import Search from "./components/Search/Search";
import SortBy from "./components/SortBy/SortBy";
import "./styles.css";
import { AppContext } from "./context";
import EditModal from "./components/EditModal/EditModal";

export default function App() {
	const { data, loading, error, searchQuery, toggleMenu } = useContext(AppContext);

	if (!data && loading) return <div>loading...</div>;
	if (error) return <div>Something went wrong please try againg</div>;

	return (
		<div className="main">
			<div className="AppHeader">
				<div className="AppHeaderItem">
					<Search />
				</div>
				<div className="AppHeaderItem">
					<SortBy by="name" />
					<SortBy by="lastName" />
					<SortBy by="email" />
					<SortBy by="address" />
				</div>
			</div>
			<div className="Appcontainer">

				{data
					.filter(
						({ name, email, phone }) =>
							name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
							name.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
							email.toLowerCase().includes(searchQuery.toLowerCase()) ||
							phone.includes(searchQuery)
					)
					.map((user: IUserData, index: any) => (
						<Card key={index} user={user} />
					))}
			</div>
			{toggleMenu && <EditModal />}
		</div>
	);
}
