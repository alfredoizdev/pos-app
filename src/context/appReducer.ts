import { AppState } from "./";
import IUserData from "../interface/user";

type AppActionType =
  | {
      type: "[User] - set data users";
      payload: IUserData[];
    }
  | {
      type: "[UI] - loading";
      payload: boolean;
    }
  | {
      type: "[Error] - Load user from api";
      payload: any;
    }
  | {
      type: "[SearchQuery] - set query params";
      payload: string;
    }
  | {
      type: "[Sort] - set sort by name";
      payload: boolean;
    }
  | {
      type: "[Sort] - set sort by lastName";
      payload: boolean;
    }
  | {
      type: "[Sort] - set sort by email";
      payload: boolean;
    }
  | {
      type: "[Sort] - set sort by address";
      payload: boolean;
    }
	| {
      type: "[UI] - toggle menu";
      payload: boolean;
    }
	| {
      type: "[Edition] - load user to edit";
      payload: IUserData | null;
    }
	| {
      type: "[Edition] - update user";
      payload: IUserData | null;
    };

export const appReducer = (
  state: AppState,
  action: AppActionType
): AppState => {
  switch (action.type) {
    case "[User] - set data users":
      return {
        ...state,
        data: action.payload
      };
    case "[UI] - loading":
      return {
        ...state,
        loading: action.payload
      };
    case "[Error] - Load user from api":
      return {
        ...state,
        error: action.payload
      };
    case "[SearchQuery] - set query params":
      return {
        ...state,
        searchQuery: action.payload
      };
    case "[Sort] - set sort by name":
      return {
        ...state,
        sortByName: action.payload
      };
    case "[Sort] - set sort by lastName":
      return {
        ...state,
        sortByLastName: action.payload
      };
    case "[Sort] - set sort by email":
      return {
        ...state,
        sortByEmail: action.payload
      };
    case "[Sort] - set sort by address":
      return {
        ...state,
        sortByAddress: action.payload
      };
	   case "[UI] - toggle menu":
      return {
        ...state,
        toggleMenu: action.payload
      };
	   case "[Edition] - load user to edit":
      return {
        ...state,
        userToEdit: action.payload
      };
	   case "[Edition] - update user":
      return {
        ...state,
        userToEdit: action.payload
      };
    default:
      return state;
  }
};
