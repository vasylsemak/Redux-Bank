import { createStore, applyMiddleware } from 'redux';

const balance = document.getElementById("balance");
const deposit5 = document.getElementById("deposit5");
const deposit25 = document.getElementById("deposit25");
const withdraw5 = document.getElementById("withdraw5");
const withdraw25 = document.getElementById("withdraw25");

// Action Types
const DEPOSIT = 'DEPOSIT';
const WITHDRAW = 'WITHDRAW';

// Action Creators
const deposit = amount => ({ type: DEPOSIT, amount });
const withdraw = amount => ({ type: WITHDRAW, amount });

// Action Dispath
deposit5.onclick = () => store.dispatch(deposit(5));
deposit25.onclick = () => store.dispatch(deposit(25));
withdraw5.onclick = () => store.dispatch(withdraw(5));
withdraw25.onclick = () => store.dispatch(withdraw(25));

// Custom Middleware
const customMW = store => next => action=> {
  const currState = store.getState();
  const actionType = action.type;

  console.log('Current state ->', currState);
  console.log('Action type ->', actionType);

  return next(action);
}

let initialState = { balance: 0 };

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case DEPOSIT:
      return { balance: state.balance + action.amount };
    case WITHDRAW:
      return { balance: state.balance - action.amount };
    default:
      return state;
  }
}
const store = createStore(reducer, applyMiddleware(customMW));

balance.innerText = '$' + store.getState().balance;

store.subscribe(() => {
  balance.innerText = '$' + store.getState().balance;
});
