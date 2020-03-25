import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";

class Signup extends Component {
  render() {
    return (
      <div id="content" style={{
        backgroundColor: '#E0E0E0',
        width: '1530px',
        height: '650px'
      }}>
      <img src={Left} width="400" height="650"></img>
      <div  style={{
        backgroundColor: 'white',
        width: '400px',
        height: '450px',
        position: 'absolute', left: '50%', top: '30%',
        transform: 'translate(-50%, -30%)' 
      }}>
        <p><h2><center><b><font face="biome" backgroundColor = 'gray'>Signup</font></b></center></h2></p>
        <form onSubmit = 
          {async (event) => {
            event.preventDefault();
            const name = this.username.value
            const email = this.email.value
            const password = this.password.value
           
            console.log(this.props.userNumber)
            console.log(this.props.userDetails)
            console.log(name)
            console.log(email)
            console.log(password)
            await this.props.signUp(name, email, password)
            console.log("user added")
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

export default Signup;
