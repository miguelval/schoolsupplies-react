# school-supplies
author: [Miguel Valdez]

This is a simple react app that aims to create a simple ecommerce site that exemplifies the connectivity between front end code and backend data to the Moqui framework.


The app makes use of Axios to make REST API calls to Moqui's Pop Store's [https://github.com/moqui/PopRestStore] REST API, which can be found here: 

https://demo.moqui.org/toolstatic/lib/swagger-ui/index.html?url=https://demo.moqui.org/rest/service.swagger/pop


The app uses express and webpack. 

An example of a basic use of Axios to make REST calls to Moqui is as follows:



    let headers = {
      'moquiSessionToken': '0_0Wy15gQvw89O1BYjYr'
    }

     axios.get(`http://localhost:8080/rest/s1/pop/products/CategoryProducts?productCategoryId=SCHOOL_SUPPLIES`, null, { headers: headers })
        .then(res => {
          const productList = res.data.productList;
          console.log(res.data);
          this.setState({ productList });

          console.log(this.state.productList);
        })


The moqui session token is essential for making API calls to moqui's services. The second argument in the get call is null because the productCategoryId is specified in the URL, but it can be the second argument in this call. The third argument is the headers with the moqui session token. You can also add auth next to the headers on the third argument if needed. 