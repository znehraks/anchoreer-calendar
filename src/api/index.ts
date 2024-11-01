import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://d1kh1cvi0j04lg.cloudfront.net/api/v1',
});
