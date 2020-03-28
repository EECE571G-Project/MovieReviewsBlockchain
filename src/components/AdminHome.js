import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import MovieBooking from './MovieBooking'
import {Redirect, BrowserRouter, Route} from 'react-router-dom';

import {  withRouter, Router} from 'react-router';
let username = '';
let userid = 0;

class AdminHome extends Component {
  constructor(props)
  {
    super(props)
    console.log("Inside AdminHome constructor")
    console.log(this.props) 
  }

 

  state = {
    homeRedirect: false
  }
  
  setHomeRedirect = () => {
    this.setState({
      homeRedirect: true
    })
  }

  renderRedirect = () => {
    if(this.state.homeRedirect){
      alert("AdminHome successfull");     
    }
  }

  render() {
    {
      console.log("Inside Admin home render")
      if(this.state.homeRedirect){
        alert("AdminHome successfull");
        return (
          <BrowserRouter>
          <Route path='/' render={props => <MovieBooking {...props} state = {this.props.state} username = {username} userid = {userid}/>}
          />
          </BrowserRouter>
        )
      }
    }

    return (
      <div id="content" style={{
        backgroundColor: '#E0E0E0',
        width: '1530px',
        height: '650px'
      }}>
        {this.renderRedirect()}
      <img src={Left} width="400" height="650"></img>
      <div  style={{
        backgroundColor: 'white',
        width: '400px',
        height: '450px',
        position: 'absolute', left: '50%', top: '30%',
        transform: 'translate(-50%, -30%)' 
      }}>
        <h2><center><b><font face="biome" >AdminHome</font></b></center></h2>
        <form onSubmit = 
          {async (event) => {
            event.preventDefault();
            const name = this.username.value
            const email = this.email.value
            const password = this.password.value
           
            await this.props.state.signUp(name, email, password)
            console.log("user added")
            username = this.username.value
            userid = this.props.state.userNumber
           
            this.setHomeRedirect()
          }          
            
          }>
            <br></br>
            <br></br>
        <div className="form-group mr-sm-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <b>Name</b>
            <input 
            id="username"
            type="text"
            ref={(input)=>{this.username=input}}
            className="form-control"
            placeholder="username"
            required/>
        </div>
        <div className="form-group mr-sm-2"></div>
        <div className="form-group mr-sm-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <b>Email</b>
            <input 
            id="email"
            type="text"
            ref={(input)=>{this.email=input}}
            className="form-control"
            placeholder="email"
            required/>
        </div>
        <div className="form-group mr-sm-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <b>Password</b>
            <input 
            id="password"
            type="text"
            ref={(input)=>{this.password=input}}
            className="form-control"
            placeholder="password"
            required/>
        </div>
       <center>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        </center>
        </form>

       
      </div>
      <div style ={{
      float: 'right'
        }}>
       <img src={Right}  right= '500px' width="400" height="650" position='absolute'></img>  
      </div>
      </div>
    );
  }
}

export default withRouter(AdminHome);
