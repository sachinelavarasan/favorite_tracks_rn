import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = () => {
  const { signIn, state, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        errorMessage={state.errorMessage}
        headerText="Sign In to Your Account"
        btnText="Sign in"
        onSubmit={({ email, password }) => signIn({ email, password })}
      />
      <NavLink routeName="Signup" linkText="Create New Account" />
    </View>
  );
};

export default SigninScreen;

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});
