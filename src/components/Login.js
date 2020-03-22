import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./css/Login.css";
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div  style={{
        backgroundColor: '#E0E0E0',
        width: '1530px',
        height: '650px'
      }}>
    
    <img src={Left} width="400" height="650"></img>
    <div style={{
        backgroundColor: 'white',
        width: '300px',
        height: '300px',
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)' 
      }}>
    <div className="Login"   style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'         
    }}>
        
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} backgroundColor='#3fffff' theme='dark' type="submit">
          Login
        </Button>
      </form>
    </div>    
    </div>
    <div style ={{
      float: 'right'
    }}>
       <img src={Right}  right= '500px' width="400" height="650" position='absolute'></img>    
    </div>
    </div>
  );
}