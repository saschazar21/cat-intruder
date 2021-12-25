const DB_ENDPOINT = import.meta.env.DB_ENDPOINT;

export const graphQLRequest = (query: Query): Promise<Response> => {
  return fetch(DB_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.DB_TOKEN}`,
      Accept: 'application/json',
      'X-Schema-Preview': 'partial-update-mutation',
    },
    body: JSON.stringify(query),
  });
};
