import React, { Component } from "react";
import { browserHistory } from 'react-router';
import axios from 'axios';
import $ from "jquery";

export default class Product extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  id: '',
	      productInfo: [],
	      productImg: '',
	      inStock: false,
	      isVirtual: false,
	      cartInfo: []
	    }
	    this.addToCart = this.addToCart.bind(this);
	}

	addToCart(event) {
		event.preventDefault();

		let isLoggedIn = localStorage.getItem("loggedIn");


		if(isLoggedIn != "true"){
			localStorage.setItem("addToCartProductId",this.state.id);
			browserHistory.push('/login');
		}
		else{
			$(".product-spinner").show();

			let headers = {
			  'moquiSessionToken': '0_0Wy15gQvw89O1BYjYr'
			}

			let auth = {
		    	username: localStorage.getItem("username"),
		    	password: localStorage.getItem("password")
			}

			axios.post(`http://localhost:8080/rest/s1/pop/cart/add`, {productId: this.state.id} , { headers: headers, auth: auth })
			    .then(res => {
			      const cartInfo = res.data;

			      localStorage.setItem("cartInfo", JSON.stringify(cartInfo));

     		      if(typeof cartInfo.orderItemList !== 'undefined'){

			      	let cartCount = 0;
			      	cartInfo.orderItemList.map((item, key) => {
			      		if( item.itemTypeEnumId=='ItemProduct'){
			      			if(item.quantity != 0){
				      			console.log("quantity "+ item.quantity);
				      			cartCount= cartCount + item.quantity;
			      			}
			      			localStorage.setItem("cartQuantity",cartCount);
			      		}
			      	});

			      	$('.cart-quantity').html(cartCount);
			      	$('.cart-quantity').show();

			      	$(".product-spinner").hide();
			      	$(".alert-primary").show();

			      }
			      console.log(typeof res.data.orderItemList === 'undefined');
			      console.log(cartInfo);
			    })
		}


	}

	componentDidMount() {

		const { id } = this.props.params;

		this.setState({ id });

		console.log("id: " + id);

		axios.get(`http://localhost:8080/rest/s1/pop/products/`+id)
	    .then(res => {
	      console.log(res.data);

	      const productInfo = res.data;
	      this.setState({ productInfo });

	      const productImg = this.state.productInfo.contentList[0].productContentId;
	      this.setState({ productImg });

	      const isVirtual = this.state.productInfo.productTypeEnumId == 'PtVirtual' ? true : false;
	      this.setState({ isVirtual });

	      const productAvailability = true;

	      console.log("here: " + this.state.productInfo.contentList[0].productContentId );
	    });

	    if(localStorage.getItem("addToCartProductId") !== null){
	    	//this.addToCart();
	    	localStorage.removeItem("addToCartProductId");
	    }

	}


	render() {
	    return (

	    <div>
			<div className="container mt-2">
			    <a className="customer-link" href="/">Home <i className="fas fa-angle-right"></i></a>
			    <a className="customer-link">{this.state.productInfo.productName}</a>
			</div>
			<div className="container container-text mt-1">
			        <div className="alert alert-primary mt-3 mb-3" role="alert">
			            <i className="far fa-check-square"></i> You added a {this.state.productInfo.productName} to your shopping cart.
			            <a className="float-right" href="/cart">Go to Checkout <i className="fas fa-arrow-right"></i></a>
			        </div>
			        <div className="row d-flex justify-content-center">
				        <img id="spinner" className="product-spinner" src="/public/images/spinner.gif" />
				    </div>
			    <div className="row mt-2">
			        <div className="col col-lg-1 col-sm-4 col-4">
			            <div>

	                        <img className="figure-img img-fluid product-img" alt="Product Image"
	                            src={"http://localhost:8080//store/content/productImage/" + this.state.productImg }  />
			            </div>
			        </div>
			        <div className="col col-lg-4 col-sm-8 col-8">
			            <img id="product-image-large" className="product-img-select" 
			                data-toggle="modal" data-target="#modal2" src={"http://localhost:8080//store/content/productImage/" + this.state.productImg }  />
			        </div>
			        <div className="col col-lg-4 col-sm-12 col-12">
			            <p>
			                <span className="product-title">{this.state.productInfo.productName}</span>
			                <br />
			            </p>
			            <div className="product-description" dangerouslySetInnerHTML={{ __html: this.state.productInfo.descriptionLong }} />
			  
			        </div>
			        <div className="col col-lg-3">
			            <form className="card cart-div" method="post" onSubmit={this.addToCart} >
			                <div>
		                        <span className="save-circle" v-if="product.listPrice">
		                            <span className="save-circle-title">SAVE</span>
		                            <span className="save-circle-text"> ${eval(this.state.productInfo.listPrice - this.state.productInfo.price ).toFixed(2)} </span>
		                        </span>
			                    <div className="form-group col">
			                        <div className="cart-form-price">
			                            <p>
			                                <span className="price-text">{this.state.productInfo.price}</span> 
		                                    <span>
		                                        <span className="product-listprice-text">was</span>
		                                        <del>{this.state.productInfo.listPrice}</del>
		                                    </span>
			                            </p>
			                        </div>
			                        <hr className="product-hr" />
			                    </div>
			                </div>
				            <button id="cartAdd" class="btn cart-form-btn col" type="submit" onclick="">
				                <i class="fa fa-shopping-cart"></i> Add to Cart
				            </button>


			            </form>
			        </div>
			    </div>
			    <hr />
			</div>		
			<div className="modal fade" id="modal2">
			    <div className="modal-dialog" role="document">
			        <div className="modal-content" id="product-review-form">
			            <div className="modal-header">
			                <h5 className="modal-title">Image Detail</h5>
			                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			                    <span aria-hidden="true">&times;</span></button>
			            </div>
			            <div className="modal-body">
			                    <img width="100%" height="200px" className="figure-img img-fluid product-img"
			                        src={"http://localhost:8080//store/content/productImage/" + this.state.productImg } alt="Product Image" />
			            </div>
			            <div className="modal-footer">
			                <a data-dismiss="modal" className="btn btn-link">Close</a>
			            </div>
			        </div>
			    </div>
			</div>

		</div>


		


	    );
	}


}