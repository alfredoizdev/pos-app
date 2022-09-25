import { FunctionComponent, useEffect, useReducer } from "react";
import { AppContext, appReducer } from "./";
import IUserData, { IUserUpdated } from "../interface/user";
import { sortUp, sortDown } from "../helpers/sortFunctions";

export interface AppState {
	data: IUserData[];
	error: any;
	loading: Boolean;
	searchQuery: string;
	sortByName: boolean;
	sortByLastName: boolean;
	sortByEmail: boolean;
	sortByAddress: boolean;
	toggleMenu: boolean;
	userToEdit: IUserData | null;
}

const APP_INITIAL_STATE: AppState = {
	data: [],
	error: null,
	loading: false,
	searchQuery: "",
	sortByName: false,
	sortByLastName: false,
	sortByEmail: false,
	sortByAddress: false,
	toggleMenu: false,
	userToEdit: null,
};

interface Props {
	children: any
}

export const AppProvider: FunctionComponent<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

	useEffect(() => {
		dispatch({ type: "[UI] - loading", payload: true });
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://randomuser.me/api/?page=1&results=10",
					{
						method: "GET",
						headers: {
							dataType: "json"
						}
					}
				);
				const { results } = await response.json();
				dispatch({ type: "[UI] - loading", payload: false });
				dispatch({ type: "[User] - set data users", payload: results });
			} catch (error) {
				dispatch({ type: "[UI] - loading", payload: false });
				dispatch({ type: "[Error] - Load user from api", payload: error });
			}
		};

		fetchData();
	}, []);

	const filterByParams = (query: string) => {
		dispatch({ type: "[SearchQuery] - set query params", payload: query });
	};

	const setSortByName = () => {
		if (state.sortByName === false) {
			dispatch({
				type: "[User] - set data users",
				payload: sortUp(state.data, "name")
			});
			dispatch({ type: "[Sort] - set sort by name", payload: true });
		} else {
			dispatch({
				type: "[User] - set data users",
				payload: sortDown(state.data, "name")
			});
			dispatch({ type: "[Sort] - set sort by name", payload: false });
		}
	};

	const setSortByLastName = () => {
		if (state.sortByLastName === false) {
			dispatch({
				type: "[User] - set data users",
				payload: sortUp(state.data, "lastName")
			});
			dispatch({ type: "[Sort] - set sort by lastName", payload: true });
		} else {
			dispatch({
				type: "[User] - set data users",
				payload: sortDown(state.data, "lastName")
			});
			dispatch({ type: "[Sort] - set sort by lastName", payload: false });
		}
	};

	const setSortByEmail = () => {
		if (state.sortByEmail === false) {
			dispatch({
				type: "[User] - set data users",
				payload: sortUp(state.data, "email")
			});
			dispatch({ type: "[Sort] - set sort by email", payload: true });
		} else {
			dispatch({
				type: "[User] - set data users",
				payload: sortDown(state.data, "email")
			});
			dispatch({ type: "[Sort] - set sort by email", payload: false });
		}
	};

	const setSortByAddress = () => {
		if (state.sortByAddress === false) {
			dispatch({
				type: "[User] - set data users",
				payload: sortUp(state.data, "email")
			});
			dispatch({ type: "[Sort] - set sort by address", payload: true });
		} else {
			dispatch({
				type: "[User] - set data users",
				payload: sortDown(state.data, "email")
			});
			dispatch({ type: "[Sort] - set sort by address", payload: false });
		}
	}

	const setToggleMenu = () => {
		dispatch({ type: "[UI] - toggle menu", payload: !state.toggleMenu })
	}

	const loadUserToEdit = (user: IUserData | null) => {
		dispatch({ type: "[Edition] - load user to edit", payload: user })
	}

	const updatedUser = (updateUser: IUserUpdated) => {

		const elementsIndex = state.data.findIndex(user => user.id.value === updateUser.id);
		let newArrayUpdated = [...state.data];
		newArrayUpdated[elementsIndex].email = updateUser.email!;
		newArrayUpdated[elementsIndex].name.first = updateUser.name!;
		newArrayUpdated[elementsIndex].location.city = updateUser.city!;
		newArrayUpdated[elementsIndex].location.country = updateUser.country!;
		newArrayUpdated[elementsIndex].location.state = updateUser.state!;

		dispatch({ type: "[User] - set data users", payload: newArrayUpdated });
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				// method
				filterByParams,
				setSortByName,
				setSortByLastName,
				setSortByEmail,
				setSortByAddress,
				setToggleMenu,
				loadUserToEdit,
				updatedUser
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
