import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { client } from "../utils/client";

const secureStoreKey = "userData";
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  async function bootstrapAppData() {
    try {
      await SplashScreen.preventAutoHideAsync();
      const userData = await SecureStore.getItemAsync(secureStoreKey);

      if (userData) {
        setUser(userData);
      }
      setIsLoading(false);
      await SplashScreen.hideAsync();
    } catch (e) {
      console.log("error", e);
    }
  }
  React.useEffect(() => {
    bootstrapAppData();
  }, []);

  const register = React.useCallback(
    (form) =>
      client("register", { body: form }).then(async (user) => {
        await SecureStore.setItemAsync("userData", user);
        setUser(user);
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
    return null;
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
