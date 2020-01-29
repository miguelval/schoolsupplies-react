import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';


export default class App extends Component {
  render() {
    return ( 	
      <div>
		<nav className="navbar navbar-expand-md navbar-dark bg-dark">
		    <div className="d-flex flex-column moqui-navbar">
		        <div className="container d-flex flex-row main-navbar">
		            <a href="/schoolSuppliesStore" className="navbar-brand d-none d-sm-block" >
		                <img height="60px" src='/schoolSuppliesStore/assets/moqui-logo.svg'  className="moqui-logo moqui-logo1" alt="" />
		                <span className="font-italic navbar-title">School Supplies</span>
		            </a>
		            <a className="navbar-brand d-block d-sm-none" href="/">
		                <span className="font-italic navbar-title">School Supplies</span>
		            </a>
		            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav_collapse1" 
		                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		                <span className="navbar-toggler-icon"></span>
		            </button>

		            <div className="navbar-collapse collapse">

		                <ul className="navbar-nav ml-auto">
		                    <div className="text-secondary">
		                        <span className="navbar-pop-title">All the School Supplies </span>
		                        <span className="navbar-pop-title">that you need!</span>
		                    </div>
		                </ul>
		            </div>
		        </div>
		        <div id="nav_collapse1" className="container navbar-collapse collapse">
		            <ul className="navbar-nav">
		                    <a className="nav-link" href="/contact">Contact Us</a>
		            </ul>

		            <ul className="navbar-nav ml-auto">
		                <li className="nav-item">
		                        <a className="nav-link pointer" data-toggle="modal" data-target="#emptyCartModal" >
		                        <span className="cart-quantity" id="cart-quantity">
		                        </span>
		                        <i className="fa fa-shopping-cart"></i>  
		                        Cart
		                    </a>
		                </li>
		            </ul>
		        </div>
		    </div>
		</nav>


        {this.props.children}
  



		<footer className="footer">
		    <div className="container">
		        <div className="row" v-if="infoLink">
		            <ul className="col col-lg-3 footer-ul">
		                <li><a href="/store/content/contact" className="footer-a">Contact Us</a></li>
		            </ul>
		            <ul className="col col-lg-3 footer-ul">
		            </ul>
		            <ul className="col col-lg-3 footer-ul">
		                
		            </ul>
		            <ul className="col col-lg-3 footer-ul">
		            </ul>
		        </div>
		    </div>
		</footer>

      </div>

		

    );
  }
}