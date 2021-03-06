import React, { Component } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default class Contact extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const login = new FormData();
    login.append('username', 'john.doe'); 
    login.append('password', 'moqui'); 

    const party = new FormData();
    party.append('firstName', formData.get('firstName')); 
    party.append('lastName', formData.get('lastName')); 
    party.append('email', formData.get('email')); 


	axios.defaults.headers['moquiSessionToken'] = 'J7NQCvgnDXavHeQxf9zR';


	let headers = {
	  'moquiSessionToken': '0_0Wy15gQvw89O1BYjYr'
	}

	let auth = {
    	username: 'john.doe',
    	password: 'moqui'
	}


	axios.post(`http://localhost:8080/rest/s1/pop/login`, login, { headers: headers } )
	    .then(response => {
	        console.log(response);
	        console.log(response.data.moquiSessionToken);

		headers = {
		  'moquiSessionToken': response.data.moquiSessionToken
		}

	   console.log(axios.defaults.headers);

	   axios.post(`http://localhost:8080/rest/s1/mantle/parties/person`, party, {headers: headers, auth: auth})
		    .then(response => {
		        console.log(response);
		    })
		    .catch(error => {
		        console.log(error);
		    });

	    })
	    .catch(error => {
	        console.log(error);
	    });
  	}

  render() {
    return (
      <div id="contact">
	      <form className="ConctacForm" onSubmit={this.handleSubmit}> 
	      	<div className="form-group">
		        <label for="name">First Name</label>
		        <input className="form-control" id="firstName" name="firstName" type="text" />
	        </div>
	      	<div className="form-group">
		        <label for="name">Last Name</label>
		        <input className="form-control" id="lastName" name="lastName" type="text" />
	        </div>
	        <div className="form-group">
		        <label for="email">Email</label>
		        <input className="form-control" id="email" name="email" type="email" />
		    </div>

		    <div className="form-group">
		        <label for="message">Message</label>
		        <textarea className="form-control" id="message" name="message" type="text" />
		    </div>

	        <button>Send message</button>
	      </form>
      </div>
    );
  }

}


