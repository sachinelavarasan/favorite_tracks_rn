import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import tracker from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "error":
      return { ...state, errorMessage: payload };
    case "clear_error":
      return { ...state, errorMessage: null };
    case "signup":
      return { ...state, token: payload, errorMessage: null };
    case "signin":
      return { ...state, token: payload, errorMessage: null };
    case "signout":
      return { ...state, user: null, token: null, errorMessage: null };
    case "userdata":
      return { ...state, user: payload, errorMessage: null };
    default:
      return state;
  }
};

const signUp =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const resp = await tracker.post("/signup", { email, password });
      await AsyncStorage.setItem("token", resp.data.token);
      dispatch({ type: "signup", payload: resp.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({ type: "error", payload: "Something went wrong" });
    }
  };

const signIn =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const resp = await tracker.post("/signin", { email, password });
      await AsyncStorage.setItem("token", resp.data.token);

      dispatch({ type: "signin", payload: resp.data.token });
      dispatch({ type: "userdata", payload: resp.data.user });
      navigate("TrackList");
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: "Something went wrong" });
    }
  };

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};

const checkLocalSigin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const signOut = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");

    dispatch({ type: "signout" });
    navigate("loginFlow");
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signIn, signOut, signUp, clearErrorMessage, checkLocalSigin },
  { token: null, errorMessage: null }
);
