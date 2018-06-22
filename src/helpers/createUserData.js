const baseUrl = 'http://localhost:8081/api/v1';

module.exports = (data, userId) => fetch(
  baseUrl + `/users/${userId}/${data.type}s`,
  {
    method: 'POST',
    body: JSON.stringify({ data }),
    headers: {
      'content-type': 'application/json',
    }
  }
);