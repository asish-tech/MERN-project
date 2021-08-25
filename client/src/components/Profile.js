import React, { Component } from 'react'
import axios from 'axios'

 class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    axios.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      const data = res.data
      this.setState({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile