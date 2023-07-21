import { LOGIN_SUCCESS, LOGIN_FAIL, SET_MESSAGE } from "./types";

import AuthService from "../services/auth.service";

export const login: any =
  (username: string, password: string) => (dispatch: any) => {
    return AuthService.login(username, password).then(
      (data: any) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error: any) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };
