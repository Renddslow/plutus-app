import React, { Component } from 'react';
import { sumBy, sortBy, reverse } from 'lodash-es';
import cx from 'classnames';
import moment from 'moment';

import './App.css';

import Tab from './components/Tab';
import EditModal from './components/EditModal';
import BudgetBar from './components/BudgetBar';
import Sheet from './components/Sheet';
import MonthPicker from './components/MonthPicker';

import { getData, getCategories } from './helpers/getAppData';
import getEmptySchema from './helpers/getEmptySchema';
import deleteUserData from './helpers/deleteUserData';
import createUserData from './helpers/createUserData';
import saveUserData from './helpers/saveUserData';

const tabs = [
  { id: 'transaction', label: 'Transactions' },
  { id: 'income', label: 'Income' },
  { id: 'expense', label: 'Recurring Bills' },
];

const userId = '51c29d25-6f8b-11e8-9883-8665abbf1d99';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categoryMap: {},
      activeTab: 'transaction',
      modalOpen: false,
      editData: {},
      sheet: {},
      expenses: [],
      transactions: [],
      incomes: [],
      displayTransactions: [],
      displayDate: moment().unix(),
      filter: 'date',
    };

    getData(userId)
      .then(([ expenses, transactions, incomes ]) => {
        this.setState({
          expenses,
          transactions,
          incomes,
          displayTransactions: transactions.filter(t => {
            const transactionMonthYearString = moment(t.attributes.date * 1000).format('MMMM YYYY');
            const currentMonthYearString = moment(this.state.displayDate * 1000).format('MMMM YYYY');
            return transactionMonthYearString === currentMonthYearString;
          }),
        });
      })
      .then(() => getCategories())
      .then(categories => {
        this.setState({
          categoryMap: categories.reduce((accumulator, category) => {
            accumulator[category.id] = category.attributes;
            return accumulator;
          }, {}),
          totalSpent: sumBy(this.state.displayTransactions, (t) => t.attributes.amount),
          totalBudget: sumBy(this.state.incomes, (t) => t.attributes.amount),
          totalExpenses: sumBy(this.state.expenses, (t) => t.attributes.amount),
          loading: false,
        });
      });
  }

  hydrateData = (userId) => getData(userId)
    .then(([expenses, transactions, incomes]) => {
      this.setState({
        expenses,
        transactions,
        incomes,
        displayTransactions: transactions.filter(t => {
          const transactionMonthYearString = moment(t.attributes.date * 1000).format('MMMM YYYY');
          const currentMonthYearString = moment(this.state.displayDate * 1000).format('MMMM YYYY');
          return transactionMonthYearString === currentMonthYearString;
        }),
      })
    })
    .then(() => {
      this.setState({
        totalSpent: sumBy(this.state.displayTransactions, (t) => t.attributes.amount),
        totalBudget: sumBy(this.state.incomes, (t) => t.attributes.amount),
        totalExpenses: sumBy(this.state.expenses, (t) => t.attributes.amount),
        loading: false,
      })
    });

  updateTab = (id) => () => {
    this.setState({ activeTab: id });
  };

  openModal = (type, id) => () => {
    if (!id) {
      this.setState({
        editData: {
          type,
          attributes: getEmptySchema(type),
        },
        modalOpen: true,
      });
    }
  };

  closeModal = () => {
    this.setState({ modalOpen: false, editData: {} });
  };

  closeSheet = () => {
    this.setState({ sheet: {} });
  };

  saveData = (data) => {
    this.closeModal();
    this.setState({ loading: true });

    data.attributes.userId = userId;
    if (data.id) {
      saveUserData(data, userId).then(() => this.hydrateData(userId));
    } else {
      createUserData(data, userId).then(() => this.hydrateData(userId));
    }
  };

  openSheet = (id, type) => {
    const sheet = { id, type };
    this.setState({ sheet });
  };

  takeSheetAction = (data) => {
    this.closeSheet();
    if (data.action === 'delete') {
      this.setState({
        loading: true,
      });
      deleteUserData(data.type, userId, data.id)
        .then(() => this.hydrateData(userId));
    }

    if (data.action === 'edit') {
      this.setState({
        editData: this.state[data.type + 's'].filter(t => t.id === data.id)[0],
        modalOpen: true,
      });
    }
  };

  updateDisplayDate = (date) => {
    this.setState({
      displayDate: date.unix(),
    }, () => {
      this.setState({
        displayTransactions: this.state.transactions.filter(t => {
          const transactionMonthYearString = moment(t.attributes.date * 1000).format('MMMM YYYY');
          const currentMonthYearString = moment(this.state.displayDate * 1000).format('MMMM YYYY');
          return transactionMonthYearString === currentMonthYearString;
        })
      }, () => {
        this.setState({
          totalSpent: sumBy(this.state.displayTransactions, (t) => t.attributes.amount),
        })
      })
    });
  };

  render() {
    const SelectedTab = () => {
      switch(this.state.activeTab) {
        case 'expense': return (
          <Tab
            items={this.state.expenses}
            onMenu={this.openSheet}
          />
        );
        case 'income': return (
          <Tab
            items={this.state.incomes}
            isIncome
            onMenu={this.openSheet}
          />
        );
        default: return (
          <Tab
            categoryMap={this.state.categoryMap}
            isTransaction
            items={reverse(sortBy(this.state.displayTransactions, (t) => t.attributes[this.state.filter]))}
            onMenu={this.openSheet}
          />
        );
      }
    };

    return (
      <div className="app">
        <MonthPicker
          date={this.state.displayDate}
          onChange={this.updateDisplayDate}
        />
        <BudgetBar
          totalSpent={this.state.totalSpent}
          totalBudget={this.state.totalBudget}
          totalExpenses={this.state.totalExpenses}
        />
        <div className="tab-bar">
          {
            tabs.map(tab => (
              <button
                className={cx(
                  'tab-bar-label',
                  `tab-bar-label--${tab.id}`,
                  { 'active': tab.id === this.state.activeTab }
                )}
                onClick={this.updateTab(tab.id)}
                key={tab.id}
              >
                {tab.label}
              </button>
            ))
          }
          <div className="spacer" />
          <button className="filter">
            <i className="material-icons">filter_list</i>
          </button>
        </div>
        {
          !this.state.loading &&
          <SelectedTab />
        }
        <button
          className={cx(
            'add-button',
            `add-button--${this.state.activeTab}`,
          )}
          onClick={this.openModal(this.state.activeTab)}
        >
          <i className="material-icons">add</i>
        </button>
        {
          this.state.sheet.id &&
            <Sheet
              id={this.state.sheet.id}
              type={this.state.sheet.type}
              onAction={this.takeSheetAction}
              onClose={this.closeSheet}
            />
        }
        {
          this.state.editData.type &&
          <EditModal
            active={this.state.modalOpen}
            data={this.state.editData}
            onExit={this.closeModal}
            onSave={this.saveData}
            categories={this.state.categoryMap}
          />
        }
      </div>
    );
  }
}

export default App;
