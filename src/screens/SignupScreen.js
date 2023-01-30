import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationEvents } from "react-navigation";

import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = () => {
  const { signUp, state, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        errorMessage={state.errorMessage}
        headerText="Sign Up for Tracker"
        btnText="Sign up"
        onSubmit={({ email, password }) => signUp({ email, password })}
      />
      <NavLink routeName="Signin" linkText="Already have an account ?" />
    </View>
  );
};

SignupScreen.navigationOptions = {
  headerShown: false,
};
// SignupScreen.navigationOptions = () => {
//   return { headerShown: false };

//another method
// };

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});
