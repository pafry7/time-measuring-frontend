import * as React from "react";
// import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { client } from "../utils/client";
import { Text } from "react-native";

const secureStoreKey = "userData";
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  async function bootstrapAppData() {
    try {
      const userData = await SecureStore.getItemAsync(secureStoreKey);

      if (userData) {
        const user = await JSON.parse(userData);
        setUser(user);
      }
      setIsLoading(false);
    } catch (e) {
      console.log("error", e);
    }
  }
  React.useEffect(() => {
    bootstrapAppData();
  }, []);

  const register = React.useCallback(
    (mail) =>
      client(
        `query($mail: String){
  users(where: {mail: {_eq: $mail}}) {
    id
		name
    mail,
    surname,
    trust
  }
}
`,
        { mail }
      ).then(async (user) => {
        await SecureStore.setItemAsync(
          "userData",
          JSON.stringify(user.data.users[0])
        );
        setUser(user.data.users[0]);
      }),
    [setUser]
  );

  const logout = React.useCallback(async () => {
    await SecureStore.deleteItemAsync("userData");
    setUser(null);
  }, [setUser]);

  const value = React.useMemo(() => ({ user, register, logout }), [
    register,
    user,
    logout,
  ]);

  if (isLoading) {
    return <Text>loading...</Text>;
  }

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
