import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { withNavigation } from "react-navigation";
import Spacer from "./Spacer";

const NavLink = ({ navigation, routeName, linkText }) => {
  return (
    <Spacer>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(routeName);
        }}
      >
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </Spacer>
  );
};

export default withNavigation(NavLink);

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
});
