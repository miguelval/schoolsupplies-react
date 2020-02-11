import React, { Component } from "react";
import { browserHistory } from 'react-router';
import axios from 'axios';
import $ from "jquery";

export default class Product extends Component {

	constructor(props) {
		super(props);
		this.state = {
	      cartInfo: [],
	      orderHeader: [],
	      orderItemList: [],
	      postalAddress: [],
	      postalAddressStateGeo: [],
	      paymentInfoList: []
	    }
	}


	componentDidMount() {
		// set order info 
		let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));

		let orderHeader 		  = cartInfo.orderHeader;
		let orderItemList 		  = cartInfo.orderItemList;
		let postalAddress 		  = cartInfo.postalAddress;
		let postalAddressStateGeo = cartInfo.postalAddressStateGeo;
		let paymentInfoList 	  = cartInfo.paymentInfoList;

		this.setState({ cartInfo });
		this.setState({ orderHeader });
		this.setState({ orderItemList });
		this.setState({ postalAddress });
		this.setState({ postalAddressStateGeo });
		this.setState({ paymentInfoList });

		console.log('cart info wooo: ');
		console.log(cartInfo);
		console.log(orderHeader);
		console.log(orderItemList);


		// get customer payment methods
		let headers = {
		  'moquiSessionToken': '0_0Wy15gQvw89O1BYjYr'
		}

		let auth = {
	    	username: localStorage.getItem("username"),
	    	password: localStorage.getItem("password")
		}

		axios.put(`http://localhost:8080/rest/s1/pop/customer/paymentMethods/`, null, {headers: headers, auth: auth} )
		    .then(response => {
		        console.log("payment methods: ");
		        console.log(response);
	    })
	    .catch(error => {
	        console.log(error);
	    });

	}
  
	render() {

		// get subtotal
		this.subtotal = 0;
		for (var i=0; i<this.state.orderItemList.length; i++) {
	        this.subtotal += this.state.orderItemList[i].unitAmount * this.state.orderItemList[i].quantity;
	    }

	    this.total = this.subtotal + 4.99;

		this.items = this.state.orderItemList.map((item, key) =>
			<div>
                <p className="row title-cart-item">
                    <span className="col col-6 col-sm-2">Item</span>
                    <span className="col d-none d-sm-block col-sm-5"></span>
                    <span className="col col-3 col-sm-2">Quantity</span>
                    <span className="col col-3 col-sm-3 text-center">Price</span>
                </p>
                <hr className="hr" />
                <div className="row">
                    <div className="col col-sm-2 d-none d-sm-block">
                    <img className={ item.itemTypeEnumId=='ItemProduct' ? "figure-img img-fluid product-img" : "figure-img img-fluid product-img hide"} alt="Product Image"
	                            src={"http://localhost:8080//store/content/productImage/" + item.productId +"_IMG"}  />
                    </div>
                    <div className="col col-6 col-sm-5">
                        <p className="item-text-desc">
                            <a className="item-text-desc">{item.itemDescription}</a>
                        </p>
                        <p className="last-price">
                            <del>${item.price}</del> 
                            <span className="place-order-total"> Save </span>
                        </p>
                    </div>
                    <div className="col col-3 col-sm-2">
                        <input className="input-quantity form-control" id="quantity" type="text" value={item.quantity} disabled={item.itemTypeEnumId=='ItemProduct' ? "" : "disabled" }  />
                    </div>
                    <div className="col col-3 col-sm-3 text-right">
                        <div className="place-order-total pr-4">${item.unitAmount} </div>
                        <div className="item-actions pr-4">
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
		    </div>
		);

		this.paymentMethods = this.state.paymentInfoList.map((item, key) =>
			<div className="row div-checkmark">
			    <label className="container-input col-11">
			        <input type="radio" value="item.paymentMethodId" />
			        <span className="checkmark"></span>
			        <span className="span-description">{item.paymentMethod.description}</span>
			        <span className="span-description">{item.paymentMethod.titleOnAccount}</span>
			        <span className="span-description">Expires on {item.paymentMethod.expireDate}</span>
			        <div className="input-group selected-card-cvv">
			            <input id="cvv" type="text" className="form-control col-4" placeholder="CVV" />
			            <div className="text-danger">Card security code must be either 3 or 4 numeric characters</div>
			        </div>
			    </label>
			    <div className="delete-icon margin-top--10px col-1">
			        <i className="fas fa-trash-alt"></i>
			    </div>
			</div>
		 );

		console.log("subtotal: " + this.subtotal);

	    return (

		<div>
		    <checkout-navbar />
		    <div className="container">
		        {/* <div className="loader" v-if="isCurrentStep(STEP_PENDING)"></div>*/}
		        <div className="row">
		            <div className="col col-lg-6 col-sm-12 col-12 loader-wrapper">
		            { /*
		                // <div className="loader" v-if="loading">
		                //         // <div className="ball-spin-fade-loader"></div>
		                // </div> */}
		                {this.items}

		                <hr />
		                <div className="row div-total">
		                    <span className="col col-9 col-lg-9">Subtotal</span>
		                    <span className="col col-3 col-lg-3 text-right">
		                        <span className="pr-4">${this.subtotal.toFixed(2)}</span>
		                    </span>
		                </div>
		                <hr />

		                <div className="row div-total">
		                    <span className="col col-9 col-lg-9 mt-4">Shipping</span>
		                    <span className="col col-3 col-lg-3 mt-4 text-right place-order-total">
		                        <span className="pr-4">
		                            $4.99
		                        </span>
		                    </span>
		                    <hr />
		                    <span className="col col-9 col-lg-9 mt-3 mb-5">Total</span>
		                    <span className="col col-3 col-lg-3 mt-3 text-right place-order-total" v-if="productsInCart.orderHeader">
		                        <span className="pr-4"></span>
		                       ${this.total.toFixed(2)}
		                    </span>
		                </div>

		                <div className="alert alert-warning" role="alert">
		                    <prop65-warning/>
		                </div>

		                <div className="row">
		                    <p className="col">Do you have a Promotion Code?</p>
		                </div>
		                <div className="row">
		                    <div className="input-group col">
		                        <input type="text" className="col-lg-9 form-control" placeholder="Enter it here..." aria-label="Input group promotion" aria-describedby="btnGroupAddon" name="promoCode" id="promoCode" />
		                        <div className="input-group-append">
		                            <button className="btn btn-outline-info">Apply</button>
		                        </div>
		                    </div>
		                </div>
		                <div className="row">
		                    <span className="col text-danger"> promoError </span>
		                    <span className="col text-green">promoSuccess </span>
		                </div>
		                <div className="row mt-5">
		                    <contact-info/>
		                </div>
		            </div>

		            <div className="col col-lg-5 offset-lg-1 col-sm-12 col-12 loader-wrapper">

		            	{ /*
		                <div className="loader" v-if="loading">
		                    <div className="ball-spin-fade-loader"></div>
		                </div>
						*/}
		                <p className="title-check-text">
		                    <span className="circle">1</span>
		                    <span className="circle"><i className="fa fa-check"></i></span>
		                    <span className="text-address">SHIPPING ADDRESS</span>
		                    <span>
		                        Change
		                    </span>
		                </p>

		                <hr className="hr" />

		                <div className="div-total">
		                    <span className="span-description"> {this.state.postalAddress.toName} </span>
		                    <span className="span-description">
		                        {this.state.postalAddress.address1} 
		                    </span>
		                    <span className="span-description">{this.state.postalAddress.city}</span>
		                    <span className="span-description">{this.state.postalAddressStateGeo.geoName}</span>
		                    <span className="span-description">
		                        <i className="fa fa-phone phone-icon"></i>
		                        {this.state.postalAddress.contactNumber}
		                    </span>
		                </div>

		                <div id="shippingAddressCollapse">
		                    <div>
		                      {/*}  
		                        <div>
		                            <label className="container-input">
		                                <input id="sd" type="radio" />
		                                <span className="checkmark"></span>
		                                <span className="span-description">option.postalAddress.toName</span>
		                                <span className="span-description">
		                                    option.postalAddress.address1 option.postalAddress.address2
		                                </span>
		                                <span className="span-description">option.postalAddress.city</span>
		                                <span v-if="option.postalAddressStateGeo" className="span-description">
		                                    option.postalAddressStateGeo.geoName
		                                </span>
		                                <span className="span-description">
		                                    <i className="fa fa-phone phone-icon"></i>
		                                    option.telecomNumber.contactNumber
		                                </span>
		                            </label>

		                            <span data-toggle="modal" data-target="#addressFormModal" className="edit-icon">
		                                <i className="fas fa-edit"></i>
		                            </span>
		                            <span className="delete-icon">
		                                <i className="fas fa-trash-alt"></i>
		                            </span>
		                        </div>
		                    */}
		                    </div>
		                    <br />

		                    {/*<button
		                        className="btn-continue float-right">
		                        Continue
		                    </button>*/}
		                    <a data-toggle="modal" data-target="#addressFormModal" className="text-add">
		                        Add a New Address
		                    </a>
		                </div>
		                <br />

		             
		                <p className="title-check-text" >
		                    <span v-if="isIncompleteStep(STEP_SHIPPING)" className="circle">2</span>
		                    <span v-if="isCompleteStep(STEP_SHIPPING)" className="circle"> <i className="fa fa-check"></i></span>
		                    <span className="text-address">SHIPPING METHOD</span>
		                    <span v-if="isCompleteStep(STEP_SHIPPING)"
		                        className="text-address change-info float-right"
		                        >
		                        Change
		                    </span>
		                </p>

		                <hr className="hr" />
		                <div className="div-total">
		                	{/*
		                    <span className="span-description">
		                    shippingMethod.shipmentMethodDescription
		                    <span className="float-right" >shippingMethod.shippingTotal</span>
		                    </span> */}
		                </div>

		                <div id="shippingMethodCollapse">
		                    <div >
		                        <div className="">
		                            <label for="" className="container-input">
		                            <input id="indexr2" type="radio" />
		                            <span className="checkmark"></span>
		                            
		                            Ground Parcel
		                            <span className="float-right">4.99 </span>
		                            </label>
		                        </div>
		                    </div>
		                    <br />
		                    {/*<button
		                         className="btn-continue float-right">
		                        Continue
		                    </button>*/}
		                </div>
		                <br />

		               <p className="title-check-text">
		                    <span className="circle">3</span>
		                    <span className="circle"><i className="fa fa-check"></i></span>
		                    <span className="text-address">PAYMENT METHODS</span>
		                    <span>
	                            Change
		                    </span>
		                </p>
		                <hr className="hr" />
		                {/*}
		                <div className="div-total">
		                    <span className="span-description">paymentMethod.description</span>
		                    <span className="span-description">paymentMethod.titleOnAccount</span>
		                    <span className="span-description">paymentMethod.expireMonth/paymentMethod.expireYear</span>
		                    <br />
		                    <template>
		                        <span>Billing address:</span>
		                        <br />
		                        <span className="span-description">paymentMethod.toName</span>
		                        <span className="span-description">paymentMethod.address1 paymentMethod.address2</span>
		                        <span className="span-description">paymentMethod.city</span>
		                        <span className="span-description"><i className="fa fa-phone phone-icon"></i>paymentMethod.contactNumber</span>
		                    </template>
		                </div>
		            	*/}
		                <div id="paymentMethodCollapse" className="checkout-payment-methods-list">
		                    <div className="col">
		         				{this.paymentMethods}
		                        <br />
		                    </div>
		                    <br />
		                    <a className="text-add" data-target="#creditCardModal" data-toggle="modal">
		                        Add a Credit Card
		                    </a>
		                    {/*<button className="btn-continue float-right">
		                        Continue
		                    </button>*/}
		                </div>
		                <br />
		                <p className="title-check-text">
		                    <span className="circle">4</span>
		                    <span className="circle"><i className="fa fa-check"></i></span>
		                    <span className="text-address">COMPLETE PURCHASE</span>
		                </p>
		                <hr className="hr" />
		                <div id="placeOrderCollapse">
		                    <div className="div-place-order">
		                        <p className="text-center">YOUR TOTAL IS: 
		                            <span className="place-order-total">
		                                ${this.total.toFixed(2)}
		                            </span>
		                        </p>
		                        <p className="text-center place-order-text">Place order below to complete your purchase</p>
		                    </div>
		                    <button className="btn btn-place-order col col-lg-12">Place Order</button>
		                </div>
		                <div className="text-center"> 
		                    <a className="btn text-add">Keep Shopping</a>
		                </div>
		            </div>


		        </div>
		        <div>
		            <div className="modal fade" id="modal-error">
		                <div className="modal-dialog" role="document">
		                    <div className="modal-content">
		                        <div className="modal-header">
		                            <h5 className="modal-title" id="exampleModalLabel">An error occurred</h5>
		                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		                                <span aria-hidden="true">&times;</span>
		                            </button>
		                        </div>
		                        <div className="modal-body">
		                            <p className="text-center">responseMessage</p>
		                        </div>
		                    </div>
		                </div>
		            </div>

		            <div className="modalfade" id="addressFormModal">
		                <div className="modal-dialog" role="document">
		                    <modal-address shippingAddress="shippingAddress" isUpdate="isUpdate" cancelCallback="onAddressCancel" completeCallback="onAddressUpserted" />
		                 </div>
		            </div>

		            <div className="modal fade" id="creditCardModal">
		                <div className="modal-dialog" role="document">
		                    <modal-credit-card paymentMethod="paymentMethod" isUpdate="isUpdate" addressList="listShippingAddress" cancelCallback="onCreditCardCancel" completeCallback="onCreditCardSet" />
		                </div>
		            </div>
		        </div>
		    </div>
		</div>


		


	    );
	}


}