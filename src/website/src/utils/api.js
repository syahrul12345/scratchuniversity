/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  getCardUrl, createCardUrl, getTransactionUrl, getAccountUrl, getVerifyGmailTokenUrl,
} from './utils';

export const getCards = (token, account, callback, fail, setOpenDialog) => {
  const url = getCardUrl();
  axios.post(url, account, {
    headers: {
      'x-token': token,
    },
  }).then((res) => {
    callback(res.data.data);
  }).catch((err) => {
    fail(err.toString());
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
    fail(err.toString());
    setOpenDialog(true);
  });
};

export const getTransactions = (token, payload, callback, fail, setOpenDialog) => {
  const url = getTransactionUrl();
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

export const getAccount = (
  token, setAccountCallback,
  setErrorMessageCallback, setOpenErrorDialogCallback,
) => {
  const url = getAccountUrl();
  axios.get(url, {
    headers: {
      'x-token': token,
    },
  }).then((res) => {
    setAccountCallback(res.data.data);
  }).catch((err) => {
    setErrorMessageCallback('A network error occured');
    setOpenErrorDialogCallback(true);
  });
};

export const verifyToken = (token, setVerifyCallback, failVerifyCallback) => {
  const baseUrl = getVerifyGmailTokenUrl();
  const endPoint = `${baseUrl}?token=${token}`;
  axios.get(endPoint)
    .then(() => {
      setVerifyCallback(true);
    }).catch((err) => {
      failVerifyCallback(err.toString());
    });
};
