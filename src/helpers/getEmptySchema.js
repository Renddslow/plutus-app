import moment from 'moment';

export default (type) => {
  switch (type) {
    case 'expense': return {
      name: '',
      amount: 0,
      recurrenceDays: [],
      reminder: false,
    };
    case 'income': return {
      name: '',
      amount: 0,
    };
    default: return {
      name: '',
      amount: 0,
      date: moment().unix(),
      categoryId: 1,
    }
  }
};