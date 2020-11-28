import * as React from "react";
import { AuthProvider } from "./src/context/auth-context";
import { Router } from "./src/navigation";

export default function App() {
  console.log("I am in app");
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
