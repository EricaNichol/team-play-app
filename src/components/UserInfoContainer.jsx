import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { myStyle  } from "../myStyles";

// Create context so The userInfoContainer can be stateful
const ColorContext = React.createContext(myStyle);

// BirthDate functional component
// Could put this in another file
const BirthDateCounter = (props) => {
  const today = new Date();
  const userBirthdate = new Date(props.date);
  const userMonth = userBirthdate.getMonth();
  const userDate = userBirthdate.getDate();
  const daysUntilBday = new Date(today.getFullYear(), userMonth, userDate);
  if (today.getMonth() === userMonth && today.getDate() > userDate) {
    daysUntilBday.setFullYear(userBirthdate.getFullYear() + 1)
    console.log(userBirthdate)
  }

  const one_day = 1000*60*60*24;
  const days = Math.ceil((daysUntilBday.getTime() - today.getTime()) / (one_day))
  
  return (
    <b> Your birthday is due in: { Math.abs(days) } days!</b>
  )
}

export default function UserInfoContainer(props) {
  const styles = useContext(ColorContext)
  // const daysUntil = new Date() - Date.parse(props.userInfo.birthdate).getDay();
  return (
    // Demonstrating styles objects
    <div style={{...styles.container_context,...styles.center}} className="container__context">
      <div>
        <p> First Name: {props.userInfo.firstName}</p>
        <p> Last Name: {props.userInfo.lastName}</p>
        <p> Email: {props.userInfo.email}</p>
        <p>  Birhtdate: {props.userInfo.birthdate}</p>
        <BirthDateCounter date={props.userInfo.birthdate} />
      </div>
    </div>
  )
}

UserInfoContainer.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired
  })
}
