import React, { useReducer, createContext } from 'react';

import contextReducer from './contextReducer';
import  { Axios } from 'axios';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    
    async function getTransactions() {
        try {
            const res = await Axios('/api/v1/transactions');

            dispatch({
                type: ' GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }
    
    
    const deleteTransaction = (id) => {
        dispatch({ 
            type: 'DELETE_TRANSACTION' , 
            payload: id 
        })};

    const addTransaction = (transaction) => {
        dispatch({ 
            type: 'ADD_TRANSACTION', 
            payload: transaction 
        })};

    const balance = transactions.reduce((acc,curVal) => {
        return  (curVal.type === 'Expense' ? acc - curVal.amount : acc + curVal.amount)
    }, 0);
    
    return (
        <ExpenseTrackerContext.Provider value={{ 
            getTransactions,
            deleteTransaction,
            addTransaction,
            transactions,
            balance
         }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
};