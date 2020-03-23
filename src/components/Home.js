import React, { Component } from 'react';
import "./css/Home.css";
import Logo from "./images/home_page.jpg";

class Home extends Component {
  render() {
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
        <button type="submit" className="btn btn-primary">Login</button>
        <br></br>
        <br></br>
        <button type="submit" className="btn btn-primary">SignUp</button>
       
       </div>
    </div>
    </div>
    );
  }
}

export default Home;
