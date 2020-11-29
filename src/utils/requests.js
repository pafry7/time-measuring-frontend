const API_URL =
  "https://us-central1-timemeasuring-b8740.cloudfunctions.net/app";

async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { "content-type": "application/json" };
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

  return fetch(`${API_URL}/${endpoint}`, config).then(async (response) => {
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
