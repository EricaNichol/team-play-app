// Core
import React from 'react';
import './App.css';
// Components
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import UserInfoContainer from './components/UserInfoContainer';
import ToggleTheme from './components/ToggleTheme';
// css
import { myStyle } from "./myStyles";

class App extends React.Component {
  state = {
    showForm: false,
    user: {},
    theme: "light"
  }

  componentDidMount = () => {
    const userData = localStorage.getItem('userInfo');
    // Note to self: checking local storage
    console.log('userData', userData);
    
    this.setState({
      user: userData ? JSON.parse(userData) : {}
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user !== prevState.user) {
      this.isLoggedIn();
    }
  }
  // Handle submit, sets userInfo in localStorage
  handleSubmit = (data) => {
    this.setState({user: data})
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  handleSignOut = () => {
    console.log("signing out")
    localStorage.removeItem('userInfo');
    this.setState({user: {}})
  }

  isLoggedIn = () => {
    // Validate Login information. for my simple example, 
    // i am just going to check if we have the state of the user
    const isLoggedIn = Object.keys(this.state.user).length > 0
    this.setState({
      showForm: isLoggedIn
    })
  }
  
  // Toggle method uses, the prevState argument in
  // set state
  toggleTheme = () => {
    console.log('toggling bro');
    this.setState((prevState) => {
      return {
        ...prevState,
        theme: prevState.theme === 'light' ? 'dark' : 'light'
      }
    })
  }
  render () {
    return (
        <div className="App" style={this.state.theme === 'light' ? {...myStyle.lightTheme} : {...myStyle.darkTheme}} >
            {/* Bonus: trying to toggle theme */}
            <div style={{position: "absolute", left: "0", fontWeight: "bold"}}>
              <ToggleTheme onToggleTheme={this.toggleTheme}/>
              <h1>David Lin Team Play App</h1>
            </div>

            { this.state.showForm && <SignOut handleSignOut={this.handleSignOut}/> }
            <div style={{...myStyle.container}} className="container"> 
              {/* show user info container if user is logged In else show sign up form*/}
              { this.state.showForm &&  <UserInfoContainer userInfo={this.state.user} /> }
              { !this.state.showForm && <SignUp onFormSubmit={this.handleSubmit} /> }
            </div>
        </div>

    );
  }
}

export default App;
