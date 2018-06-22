export default (type, userId, id) => {
  const uri = `http://localhost:8081/api/v1/users/${userId}/${type}s/${id}`;
  return fetch(uri, { method: 'DELETE' });
};