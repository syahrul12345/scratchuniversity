/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { getCardUrl, createCardUrl } from './utils';

export const getCards = (token, account, callback) => {
  const url = getCardUrl();
  axios.post(url, account, {
    headers: {
      'x-token': token,
    },
  }).then((res) => {
    callback(res.data.data);
  }).catch((err) => {
    console.log(err);
  });
};

export const createCard = (token,account) => {
  const url = createCardUrl();
  axios.post(url, account, {
    headers: {
      'x-token': token,
    },
  }).then((res) => {
    console.log(res.data.data);
  }).catch((err) => {
    console.log(err);
  });
}