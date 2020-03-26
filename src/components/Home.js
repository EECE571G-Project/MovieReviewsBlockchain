import React, { Component } from 'react';
import "./css/Home.css";
import Logo from "./images/home_page.jpg";
import {Route} from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';



class Home extends Component {
  loginHandler = () => {
    console.log(this.props)
    this.props.history.push('/Login', {locations: JSON.stringify(this.props.state.locations), locationNumber: JSON.stringify(this.props.state.locationNumber), userNumber: JSON.stringify(this.props.state.userNumber)});
  }

  signUpHandler = () => {
    this.props.history.push('/Signup');
  }

  render() {
    {
      console.log("Inside home render");
      console.log(this.props);
      console.log(this.props.state);
    }
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
        <button type="submit" onClick={this.loginHandler} className="btn btn-primary">Login</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.signUpHandler} className="btn btn-primary">SignUp</button>
       
       </div>
    </div>
    </div>
    );
  }
}

export default Home;
