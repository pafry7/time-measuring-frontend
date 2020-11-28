import * as SecureStore from "expo-secure-store";

const API_URL = "us-central1-timemeasuring-b8740.cloudfunctions.net";

async function client(endpoint, { body, ...customConfig } = {}) {
  const userData = await SecureStore.getItemAsync("userData");

  console.log("body", body);

  const headers = { "content-type": "application/json" };
  if (userData) {
    headers.Authorization = `Bearer ${userData.userId}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }
  return { userId: "xD", dada: "dada" };

  // return fetch(`${API_URL}/${endpoint}`, config).then(async (response) => {
  //   const data = await response.json();
  //   console.log(data);

  //   if (response.ok) {
  //     return data;
  //   } else {
  //     return Promise.reject(data);
  //   }
  // });
}

export { client };
