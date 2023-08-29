import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthService {
  constructor(path) {
    this.domain = `https://label-api.niflrpassdev.com/api/${path}`;
    console.log("logi domain", this.domain)
  }

  register = async (name, email, password) => {
    const res = await this.fetchData(this.domain, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    return res;
  }

  login  =async ({ email, password }) => {
    console.log("checking login", email, password)
    const body= { email, password }
    const res = await axios({ method: 'POST', url:this.domain, data: body });
    
    // this.setToken(res.token);
    // if (res.userPermissions) {
    //   this.setPermissions(res);
    // }
    return res;
  }

//   loggedIn  ()  {
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token);
//   }

//   isTokenExpired(token) {
//   try {
//     const decoded = decode(token);
//     if (decoded.exp < Date.now() / 1000) {
//       return true;
//     }
//     return false;
//   } catch (err) {
//     return false;
//   }
// }



//   setToken (idToken) {localStorage.setItem('niflr_admin_token', idToken)}
//   setPermissions = (data) => {
//     const userPermissionIds = data.userPermissions.map(permission => permission.permissionId);
//     const permissions = data.permissions.reduce((accumulator, permission) => {
//       if (userPermissionIds.includes(permission.id)) {
//         return [...accumulator,
//           permission.name
//         ];
//       }
//       return accumulator;
//     }, []);
//     localStorage.setItem('user_permissions', permissions);
//   }

//   getToken = () => (localStorage.getItem('niflr_admin_token'))

//   logout = () => (localStorage.removeItem('niflr_admin_token'))

  fetchData = async (url, body) => {
    axios.defaults.headers = {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
    };
    
    // console.log("headers",headers)
    // if (this.loggedIn()) {
    //   headers['x-access-token'] = this.getToken()
    // }
    console.log("Instance property:", this.uri);

   console.log("Instance property:", url,body);
    const res = await axios({ method: 'POST', url, data: body });
    console.log("fetch req response",res)
    return res;
  }


}
