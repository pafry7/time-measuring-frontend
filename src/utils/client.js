import * as SecureStore from "expo-secure-store";

const API_URL = "TEST";

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

  let response;

  switch (endpoint) {
    case "register":
      response = {
        userId: "123",
        name: "Patryk Fryda",
        email: "patrykfryda@o2.pl",
      };
    default:
      response = "error";
  }

  return response;

  // return fetch(`${API_URL}/${endpoint}`, config)
  //   .then(async (response) => {
  //     const data = await response.json();

  //     if (response.ok) {
  //       return data;
  //     } else {
  //       return Promise.reject(data);
  //     }
  //   });
}

export { client };
