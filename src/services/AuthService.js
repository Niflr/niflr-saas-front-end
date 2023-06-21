import decode from 'jwt-decode';

export default class AuthService {
  constructor(domain) {
    const uri = `${process.env.ADMIN_HOST}/api`;
    console.log("login uri",uri, domain )
    this.domain = `http://localhost:3000/api/${domain}`;
    console.log("logi domain", this.domain)
  }

  register = async (name, email, password) => {
    const res = await this.fetch(this.domain, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    return res;
  }

  login  =async ({ email, password }) => {
    console.log("checking login", email, password)
    const res = await this.fetch(this.domain, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
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

  fetch = async (url, options) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    // if (this.loggedIn()) {
    //   headers['x-access-token'] = this.getToken()
    // }
    const res = await fetch(url, {  ...options });
    console.log("fetch req response",res)
    return this.checkStatus(res).json();
  }

//   checkStatus = (response) => {
//     if (response.status >= 200 && response.status < 300) {
//       return response
//     }
//       const error = new Error(response.statusText)
//       error.response = response
//       throw error
    
//   }
}
