import React, { Component } from "react";
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class Home extends Component {

 constructor(props) {
    super(props);
    this.state = {
      productList: []
    }
  }


  componentDidMount() {
    browserHistory.push('/');

    let headers = {
      'moquiSessionToken': '0_0Wy15gQvw89O1BYjYr'
    }

     axios.get(`http://localhost:8080/rest/s1/pop/products/CategoryProducts?productCategoryId=SCHOOL_SUPPLIES`, null, { headers: headers })
        .then(res => {
          const productList = res.data.productList;
          this.setState({ productList });
        })
  }

  render() {

    this.products = this.state.productList.map((product, key) =>

          <div className={`${key == 0 ? 
                             "carousel-item static active" : 
                             "carousel-item static"}`}>

            <div className="d-block col-lg-3 col-12">
                <a className="category-product" href={"/product/" +product.productId}>
                    <figure className="figure">
                            <img width="90%" className="figure-img img-fluid" src={"http://localhost:8080//store/content/productImage/" + product.smallImageInfo.productContentId} />

                        <figcaption className="text-left title-product-text figure-caption">
                          {product.productName}
                        </figcaption>
                        <figcaption className="text-left figure-caption">
                                    <span className="star-rating">
                                            <i className="fas fa-star"></i>
                                            <i className="far fa-star"></i>
                                    </span>
                        </figcaption>
                        <figcaption className="text-primary text-left figure-caption">
                            <span className="product-price-text">  {product.price}  </span>
                            <span className="product-last-price">
                            </span>
                        </figcaption>
                    </figure>
                </a>
            </div>
        </div>
    );

    return (
      <div id="home">

      <div className="container-fluid features d-none d-sm-none d-md-block">
          <div className="d-flex justify-content-around container">
              <div className="feature">
                  <div className="feature-icon"><i className="fa fa-gift" aria-hidden="true"></i></div>
                  <div className="feature-info">
                      <div className="title text-left">FAST SHIPPING</div>
                      <div className="subtitle">Nationwide delivery whitin 3 days</div>
                  </div>
              </div>
              <div className="feature">
                  <div className="feature-icon"><i className="fa fa-fire" aria-hidden="true"></i></div>
                  <div className="feature-info">
                      <div className="title text-left">HOT DEALS</div>
                      <div className="subtitle">New deals every week</div>
                  </div>
              </div>
              <div className="feature">
                  <div className="feature-icon"><i className="fa fa-lock" aria-hidden="true"></i></div>
                  <div className="feature-info">
                      <div className="title text-left">SECURE ORDERING</div>
                      <div className="subtitle">Safe shopping guaranteed</div>
                  </div>
              </div>
          </div>
      </div>

      <div className="container">
          <div className="text-left mt-3 modal-text">This Week's deals</div>

              <div className="container text-center my-3">
                  <div className="row mx-auto my-auto">
           
                    
                            {this.products}
                          <a className="carousel-control-prev" href="#recipeCarousel" role="button" data-slide="prev">
                              <button type="button" className="carousel-prev"><i className="fas fa-arrow-left"></i></button>
                              <span className="sr-only">Previous</span>
                          </a>
                          <a className="carousel-control-next" href="#recipeCarousel" role="button" data-slide="next">
                              <button type="button" className="carousel-next"><i className="fas fa-arrow-right"></i></button>
                              <span className="sr-only">Next</span>
                          </a>
         
                  </div>
        
          </div>
          </div>
      </div>
    );
  }
}