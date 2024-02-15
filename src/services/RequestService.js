import axios from 'axios';
import decode from 'jwt-decode';

export default class RequestService {
  constructor(domain) {
    console.log("checking domain",domain)
    this.getBaseUrlAndToken(domain);
  }

  getBaseUrlAndToken = (domain) => {
    console.log("domain",domain)
    console.log(" error removal", this.loggedIn())
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
        };
    switch (domain) {
      case 'RETURN':
        axios.defaults.baseURL = 'http://localhost:3000/api/';
        break;
      case 'MACHINE':
        axios.defaults.baseURL = 'http://localhost:3000/api/';
        axios.defaults.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'n-mach-secret': process.env.MACHINE_SECRET,
        };
        break;
      case 'LOCAL':
        console.log("inside local domain")
        axios.defaults.baseURL = 'http://localhost:1234/api/';
        axios.defaults.headers = {
          'Accept': '*/*',
          'Content-type': 'application/json',
          'apikey': 'igrXzjIKSanCcfsN'
        }
        break;
          
      case 'CLOUD':
        console.log("inside cloud domain")
        console.log("user token--->", JSON.parse((window.localStorage.getItem("user"))).token)


      axios.defaults.baseURL = 'https://label-api.niflrpassdev.com/api';
      axios.defaults.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'apikey': '4EzPPEG74vMrs4HNyq' // niflr-passdev apikey
      };
      break;
      case 'ADMIN':
        console.log("inside admin domain")
        axios.defaults.baseURL = 'https://cs-brysk-ca.com/api/';
        axios.defaults.headers = {
         'accept': 'application/json',
          'content-type': 'application/json',
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhNDhhN2IyLWIwYjAtNGM3Yi1iMzNiLTRkNGM0MWQzYTc1YSIsIm5hbWUiOiJrdXNoYWwgZ29zd2FtaSIsImlhdCI6MTY4Nzc2NjQ0MywiZXhwIjoxNjg3ODUyODQzfQ.cP_Tqz5z0xea6zQnvs0GwOJyru6LyZ2uWkU2XNsj_90',
        };
        break;
      case 'DEVELOPMENT':
        console.log("inside development domain")
        axios.defaults.baseURL = 'https://dd3de2fb-fce3-4e83-b07d-768f145f1eed.mock.pstmn.io';
        break;
      default:
        axios.defaults.baseURL = 'http://localhost:3000/api/';
    }
  }

  get = async ({ url, params, domain,data }) => {
    console.log("checking domain",data)
    this.getBaseUrlAndToken(domain);
    let queryString = null;
   if (data){
    queryString = Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
    console.log("query string",queryString)
   }

   
    try {
      const res = await axios({ method: 'GET', url: `${url}${params || ''}${queryString ? `?${queryString}` : ''}` });
      console.log("get response", res)
      return res.data;
    } catch (err) {
      return this.handleError(err);
    }
  }

  post = async ({ url, data, params, domain }) => {
    console.log("checking domain",data)
    this.getBaseUrlAndToken(domain);
    try {
      const res = await axios({ method: 'POST', url: `${url}${params || ''}`, data });
      console.log("put response", res)
      return res.data;
    } catch (err) {
      return this.handleError(err);
    }
  }

  put = async ({ url, data, params, domain }) => {
    this.getBaseUrlAndToken(domain);
    console.log("put request data",domain, data)
    try {
      const res = await axios({ method: 'PUT', url: `${url}${params || ''}`, data });
      console.log("put response", res)
      return res.data;
    } catch (err) {
      return this.handleError(err);
    }
  }

  delete = async ({ url, domain }) => {
    this.getBaseUrlAndToken(domain);

    try {
      const res = await axios({ method: 'DELETE', url });
      console.log("delete response", res)
      return res.data;
    } catch (err) {
      return this.handleError(err);
    }
  }

  loggedIn = () => {
    const token = localStorage.getItem('niflr_admin_token');
    return !!token && !this.isTokenExpired(token)
  }

  // isTokenExpired = (token) => {
  //   try {
  //     const decoded = decode(token);
  //     if (decoded.exp < Date.now() / 1000) return true;
  //    return false;
  //   }
  //   catch (err) {
  //     return false;
  //   }
  // }

  // handleError = (err) => {
  //   if (err.response.status === 500) {
  //     document.location.reload(true)
  //     localStorage.removeItem('niflr_admin_token');
  //   }
  //   return err.response.data;
  // }
}
