import { useAuth } from "../context/auth-context";
import { client } from "./client";

const getActivities = (id) => {
  return client(`users/${id}/approaches`);
};

export { getActivities };
