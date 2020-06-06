import React from 'react';
import Button from '@material-ui/core/Button';

export default function SignOut(props) {

  return (
    <Button 
      variant="contained" 
      color="secondary" 
      style={{position: "absolute", right: "0", fontWeight: "bold"}}
      onClick={props.handleSignOut}>
      Sign Out
    </Button>
  )
}
