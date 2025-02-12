import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/auth-context";
import { TextInput, Button } from "react-native-paper";
import { Headline } from "react-native-paper";
import { DismissKeyboard } from "../components/DismissKeyboard";

const Register = () => {
  const [email, setEmail] = React.useState();
  const [loading, setLoading] = React.useState();
  const { register, user } = useAuth();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await register(email);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Headline>Podaj email</Headline>
        </View>
        <View style={styles.form}>
          <TextInput
            mode="outlined"
            theme={{ roundness: 12 }}
            style={styles.textField}
            placeholder="joe@doe.com"
            value={email}
            onChangeText={setEmail}
          ></TextInput>
          <Button
            mode="contained"
            loading={loading}
            labelStyle={styles.buttonText}
            contentStyle={{ width: "100%", height: 50 }}
            onPress={() => handleSubmit()}
            theme={{ roundness: 12 }}
          >
            Login
          </Button>
        </View>
      </View>
    </DismissKeyboard>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  header: {
    fontSize: 28, // refactor or fix
  },
  form: {
    width: "80%",
  },
  textField: {
    backgroundColor: "white",
    marginBottom: 24,
  },
  buttonText: {
    fontFamily: "SFProDisplay-Medium", // refactor/fix
  },
});

export { Register };
