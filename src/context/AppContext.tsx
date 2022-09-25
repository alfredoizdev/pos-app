import { createContext } from "react";
import IUserData, { IUserUpdated } from "../interface/user";

interface contextProps {
	data: IUserData[];
	error: any;
	loading: Boolean;
	searchQuery: string;
	sortByName: boolean;
	sortByLastName: boolean;
	sortByEmail: boolean;
	sortByAddress: boolean;
	toggleMenu: boolean;
	userToEdit: IUserData | null
	// method
	filterByParams: (query: string) => void;
	setSortByName: () => void;
	setSortByLastName: () => void;
	setSortByEmail: () => void;
	setSortByAddress: () => void;
	setToggleMenu: () => void;
	loadUserToEdit: (user: IUserData | null) => void;
	updatedUser: (updateUser: IUserUpdated) => void;
}

export const AppContext = createContext({} as contextProps);
