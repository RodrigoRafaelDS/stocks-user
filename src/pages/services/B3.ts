import { FundamentalData, RootObject } from "../modules/modules";

const axios = require("axios").default;
const baseUrl = "https://brapi.ga/api";

export const requestAction = (stock: string): RootObject => {
  const url = `${baseUrl}/quote/${stock}?fundamental=true`;
  return axios.get(url);
};
export const listAllStocks = (): Array<string> => {
  const url = `${baseUrl}/available`;
  return axios.get(url);
};

export const listDataStock = (stock: string): Array<FundamentalData> => {
  const url = `https://www.okanebox.com.br/api/analisefundamentalista/${stock.toUpperCase()}`;
  return axios.get(url);
};
