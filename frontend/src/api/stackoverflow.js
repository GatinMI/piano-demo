import axios from 'axios';

//http://api.stackexchange.com/docs/search#order=desc&sort=activity&intitle=java&filter=default&site=stackoverflow&run=true
//https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=java

const api = axios.create({
  baseURL: 'https://api.stackexchange.com/2.2',
  timeout: 1000,
  params: {
    order: 'desc',
    sort: 'activity',
    filter: 'default',
    site: 'stackoverflow',
    pagesize: 20,
  }
});


export default class Stackoverflow {
  search(intitle, page) {
    return api.get('/search', {params: {intitle, page}});
  }
};
