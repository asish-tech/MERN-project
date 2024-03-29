import axios from 'axios'

export const register = newUser => {
  return axios.post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      return response
    })
}

export const login = user => {
  return axios.post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

// export const getProfile = user => {
//   const token = localStorage.usertoken
//   //console.log(token)
//   return axios.get('users/profile', {  
//     headers: {
//          Authorization: `Bearer ${token}`,
//        }
//     })
//     .then(response => {
//       //console.log(response.data)
//       return response.data
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

