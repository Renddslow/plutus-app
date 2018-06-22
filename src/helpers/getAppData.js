const getExpenses = (userId) => fetch(`http://localhost:8081/api/v1/users/${userId}/expenses`)
  .then(data => data.json())
  .then(data => data.data);
const getTransactions = (userId) => fetch(`http://localhost:8081/api/v1/users/${userId}/transactions`)
  .then(data => data.json())
  .then(data => data.data);

export const getCategories = () => fetch(`http://localhost:8081/api/v1/categories`)
  .then(data => data.json())
  .then(data => data.data);
export const getData = (userId) => Promise.all([
  getExpenses(userId),
  getTransactions(userId)
]);