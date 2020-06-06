import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/Textfield';
import { validateEmail } from '../helpers/helps.js';

export default class SignUpForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthdate: '',
    isValid: false,
  }

  // validateForm on field update
  componentDidUpdate(prevProps, prevState) {
    // purposefully didn't check birthdate
    if (this.state.firstName !== prevState.firstName ||
        this.state.lastName !== prevState.lastName ||
        this.state.email !== prevState.email ||
        this.state.password !== prevState.password
      ) {
        this.validateForm();
      }
  }
  // Asssining methods with arrow function, so I don't need to bind it in constructor.
  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name; 
    // Validation: 

    this.setState({
      [name]: value
    })
  }
  // Method is only to validate if the form has been filled out,
  // if true, the button will be enabled, else disabled
  // Basic front end validation. just using lengths
  validateForm = () => {
    // Full disclosure, validateEmail regexp pattern code is from a source online
    let currentDate = new Date();
    let birthdate = Date.parse(this.state.birthdate);
    // console.log(currentDate > birthdate);

    if (this.state.firstName.length > 2 && 
        this.state.lastName.length > 2 &&
        this.state.password.length > 4 &&
        validateEmail(this.state.email) &&
        currentDate > birthdate
    ) {
      // Enable the button via state when all the fields are validated
      this.setState({isValid: true})
    } else {
      this.setState({isValid: false})
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
  }

  render() {
    return (
      <form className="signUpForm" onSubmit={this.handleSubmit}>
        <div className="signUpForm__container">
          <TextField 
            placeholder="First Name" 
            type="text" 
            name="firstName" 
            value={this.state.firstName} 
            onChange={this.handleInputChange} />

          <TextField 
            placeholder="Last Name" 
            type="text" 
            name="lastName" 
            value={this.state.lastName} 
            onChange={this.handleInputChange} />

          <TextField
            id="date"
            label="Birthday"
            type="date"
            name="birthdate"
            defaultValue="1986-01-01"  
            onChange={this.handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <TextField 
          placeholder="Email" 
          type="text" 
          name="email" 
          value={this.state.email} 
          onChange={this.handleInputChange} />

          <TextField 
            placeholder="Password" 
            type="text" 
            name="password" 
            value={this.state.password} 
            onChange={this.handleInputChange} />

          <Button type="submit" variant="contained" color="primary" disabled={!this.state.isValid}>
            Sign Up
          </Button>
        </div>
      </form>

    )
  }
}