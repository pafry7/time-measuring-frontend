const API_URL = "https://totalizator.hasura.app/v1/graphql";

async function client(query, variables) {
  console.log(variables);
  const config = {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(API_URL, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
