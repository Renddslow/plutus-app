import React, { Component } from 'react';
import { sumBy } from 'lodash-es';
import cx from 'classnames';

import Tab from './Tab';
import EditModal from './EditModal';
import BudgetBar from './BudgetBar';
import './App.css';

import { getData, getCategories } from './helpers/getAppData';
import getEmptySchema from './helpers/getEmptySchema';

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
    };
    getData(userId)
      .then(([ expenses, transactions ]) => {
        this.setState({
          expenses: expenses,
          transactions: transactions
        });
      })
      .then(() => getCategories())
      .then(categories => {
        const totalSpent = sumBy(this.state.transactions, (t) => t.attributes.amount);
        this.setState({
          categoryMap: categories.reduce((accumulator, category) => {
            accumulator[category.id] = category.attributes;
            return accumulator;
          }, {}),
          totalSpent,
          loading: false,
        });
      });
  }

  updateTab = (id) => () => {
    this.setState({ activeTab: id });
  };

  openModal = (type, id) => () => {
    if (id) {

    } else {
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

  saveData = (data) => {
    console.log(data);
    this.closeModal();
  };

  render() {
    const SelectedTab = () => {
      switch(this.state.activeTab) {
        case 'expense': return (
          <Tab
            items={this.state.expenses}
          />
        );
        case 'income': return (
          <Tab
            items={[]}
          />
        );
        default: return (
          <Tab
            categoryMap={this.state.categoryMap}
            isTransaction
            items={this.state.transactions}
            loading={this.state.loading}
          />
        );
      }
    };

    return (
      <div className="app">
        <BudgetBar totalSpent={this.state.totalSpent} totalBudget={130000} />
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
          <button className="filter"><i className="material-icons">filter_list</i></button>
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
          this.state.editData.type &&
          <EditModal
            active={this.state.modalOpen}
            data={this.state.editData}
            userId={userId}
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
