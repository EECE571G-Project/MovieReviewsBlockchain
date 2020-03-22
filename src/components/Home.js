import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Logo from "./images/home_page.jpg";
import "./css/Home.css";


export default function Home(props) {

 return (
    <div  style={{
        backgroundColor: '#E0E0E0',
        width: '1500px',
        height: '650px'
      }}>
    <div style={{
        backgroundColor: 'white',
        width: '1100px',
        height: '650px' 
      }}>
    <img src={Logo} width="1100" height="650"></img>
    <div className="Home"   style={{
        position: 'absolute', left: '88%', top: '50%',
        transform: 'translate(-80%, -50%)'         
    }}>
    
   
        <Button className="buttonW" block bsSize="large"  backgroundColor='545A5F' type="submit"  >
          Login
        </Button>
        <Button className="buttonW" block bsSize="large"  backgroundColor='#3fffff' type="submit" >
          SignUp
        </Button>
      
    </div>
    </div>
    </div>
  );
}