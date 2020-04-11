/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { getCardUrl, createCardUrl, getTransactionUrl } from './utils';

export const getCards = (token, account, callback, fail, setOpenDialog) => {
  const url = getCardUrl();
  axios.post(url, account, {
    headers: {
      'x-token': token,
    },
  }).then((res) => {
    callback(res.data.data);
  }).catch((err) => {
    console.log(err);
    fail('A network error occured');
    setOpenDialog(true);
  });
};

export const createCard = (token, payload, callback, fail, setOpenDialog) => {
  const url = createCardUrl();
  axios.post(url, payload, {
    headers: {
      'x-token': token,
    },
  }).then((res) => {
    callback(res.data.data);
  }).catch((err) => {
    console.log(err);
    fail('A network error occured');
    setOpenDialog(true);
  });
};

export const getTransactions = (token, payload, callback, fail, setOpenDialog) => {
  const url = getTransactionUrl()
  axios.post(url, payload, {
    headers: {
      'x-token': token,
    },
  }).then((res) => {
    callback(res.data.data);
  }).catch((err) => {
    console.log(err);
    // fail('A network error occured');
    // setOpenDialog(true);
  });
};
