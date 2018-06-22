const baseUrl = `http://localhost:8081/api/v1`;

const getExpenses = (userId) => fetch(`${baseUrl}/users/${userId}/expenses`)
  .then(data => data.json())
  .then(data => data.data);
const getTransactions = (userId) => fetch(`${baseUrl}/users/${userId}/transactions`)
  .then(data => data.json())
  .then(data => data.data);
const getIncomes = (userId) => fetch(`${baseUrl}/users/${userId}/incomes`)
  .then(data => data.json())
  .then(data => data.data);

export const getCategories = () => fetch(`${baseUrl}/categories`)
  .then(data => data.json())
  .then(data => data.data);
export const getData = (userId) => Promise.all([
  getExpenses(userId),
  getTransactions(userId),
  getIncomes(userId),
]);