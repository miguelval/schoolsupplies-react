import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { browserHistory } from 'react-router';

export default class Login extends Component {

  constructor(props) {
    super(props);
	this.state = {
	  showLoginError: false
	}

    console.log(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const login = new FormData();
    login.append('username', formData.get('username')); 
    login.append('password', formData.get('password')); 


	let headers = {
	  'moquiSessionToken': '0_0Wy15gQvw89O1BYjYr'
	}

	axios.post(`http://localhost:8080/rest/s1/pop/login`, login, { headers: headers } )
	    .then(response => {
	        console.log(response);
			localStorage.setItem("loggedIn","true");	        
			localStorage.setItem("username",formData.get('username'));	   
			localStorage.setItem("password",formData.get('password'));	     
			localStorage.setItem("userFirstName",response.data.customerInfo["firstName"]);	        


	        console.log(localStorage.getItem("loggedIn"));

	        if(localStorage.getItem("addToCartProductId") !== null){
				browserHistory.push('/product/'+ localStorage.getItem("addToCartProductId"));
				window.location.reload(false);  
	        }
	        else{
				browserHistory.push('/');
				window.location.reload(false);     	
	        }

	    })
	    .catch(error => {
	    	const showLoginError = true;
	    	this.setState({showLoginError});

	        console.log(error);
	    });
  	}

  render() {
    return (
		<div>
		    <div className="container">
		        <br />
		        <div className="row">
		            <form className="login-form col-lg-5 col-sm-12" method="post" onSubmit={this.handleSubmit}>
		                <h1 className="text-left">Sign In</h1>


		                <div v-if="loginErrormessage && loginErrormessage.length" 
		                	className={ this.state.showLoginError ? "alert alert-primary show" : "alert alert-primary"} role="alert">
		                    Login error. Please check your credentials.
		                </div>
		                <div className="form-group row">
		                    <label for="" className=" col-form-label col-lg-3 col-sm-12 text-left">Email</label>
		                    <div className="col-lg-9 col-sm-12">
		                        <input type="text" className="form-control" name="username" required />
		                    </div>
		                </div>
		                <div className="form-group row">
		                    <label for="" className="col-form-label col-sm-12 col-lg-3 text-left">Password</label>
		                    <div className="col-lg-9 col-sm-12">
		                        <input type="password" className="form-control" name="password" required />
		                    </div>
		                </div>
		                <button className="btn btn-login offset-lg-3 btn-block col-sm-12 col-lg-9" type="submit">Sign In</button>
		            </form>
		        </div>
		    </div>
		    <br />

		</div>

    );
  }

}


