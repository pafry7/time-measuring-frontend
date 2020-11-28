import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";

const secureStoreKey = "userData";
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  async function bootstrapAppData() {
    await SplashScreen.preventAutoHideAsync();
    const userData = await SecureStore.getItemAsync(secureStoreKey);

    if (userData) {
      setUser(useData);
    }
    setIsLoading(false);
    await SplashScreen.hideAsync();
  }
  React.useEffect(() => {
    bootstrapAppData();
  }, []);

  const register = React.useCallback(
    (form) => register(form).then((user) => setUser(user)),
    [setUser]
  );

  const value = React.useMemo(() => ({ user, register }), [register, user]);

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
