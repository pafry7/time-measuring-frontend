import * as React from "react";
import { Avatar, useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native";

const ProfileButton = ({ style, hidden }) => {
  const { colors } = useTheme();
  console.log("profile button renders");
  const onPress = () => {
    console.log("xD");
  };

  if (hidden) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Avatar.Icon
        size={36}
        icon="account"
        style={{ backgroundColor: colors.primary }}
        color="white"
      />
    </TouchableOpacity>
  );
};

export { ProfileButton };
