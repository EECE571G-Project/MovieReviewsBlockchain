import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import "./css/Location.css";

class Location extends Component {
  render() {
    return (
      <div id="content" style={{
        backgroundColor: '#E0E0E0',
        width: '1530px',
        height: '650px'
      }}>
      <img src={Left} width="400" height="650"></img>
      <div className="Location" style={{
        backgroundColor: 'white',
        width: '400px',
        height: '450px',
        position: 'absolute', left: '50%', top: '30%',
        transform: 'translate(-50%, -30%)' 
      }}>
        <p><h2><center><b><font face="biome">Add Location</font></b></center></h2></p>
        <form onSubmit = 
          {async (event) => {
            event.preventDefault();
            const locationName = this.locationName.value
            await this.props.addLocation(locationName)}
            
          }>
        <div className="form-group mr-sm-2">
            <input 
            id="locationName"
            type="text"
            ref={(input)=>{this.locationName=input}}
            className="form-control"
            placeholder="Location Name"
            required/>
        </div>
       <center>
        <button type="submit" className="btn btn-primary">Add Location</button>
        </center>
        </form>

       
        <p>&nbsp;</p>
        <h3>Locations</h3>
        <table className="table">
        <thead id="itemList">
          <tr>
            <th scope="col">Location ID</th>
            <th scope="col">Location Name</th>
            <th scope="col">Active</th>
            <th scope="col"></th>
          </tr> 
        </thead>
        <tbody id="itemList">
            {this.props.locations.map((location, key)=>{
                return(
                    <tr key={key}>
                    <th scope="row">{location.id.toString()}</th>   
                    <td>{location.name}</td> 
                    <td>{location.active.toString()}</td> 
                    <td>
                      {
                        location.active
                          ?
                          <button 
                            name = {location.id}
                            onClick={async (event)=>{
                              await this.props.deleteLocation(event.target.name);
                            }}
                          >
                            Delete
                          </button>
                          : 
                          null
                        }
                    </td>
                  </tr>
                )
            })}
        </tbody>
        </table>
      
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

export default Location;
