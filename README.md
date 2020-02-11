# school-supplies
author: [Miguel Valdez]

This is a simple react app that aims to create a simple ecommerce site that exemplifies the connectivity between front end code and backend data to the Moqui framework.


The app makes use of Axios to make REST API calls to Moqui's Pop Store's [https://github.com/moqui/PopRestStore] REST API, which can be found here: 

https://demo.moqui.org/toolstatic/lib/swagger-ui/index.html?url=https://demo.moqui.org/rest/service.swagger/pop


The app uses express and webpack. 


/ - -  Example of a basic use of Axios to make REST calls to Moqui. - - /

A moqui session token is needed to make REST calls. A token can be requested from the following URL:
s

localhost:8080/rest/moquiSessionToken

Then, to make an API call:

    let headers = {
      'moquiSessionToken': '0_0Wy15gQvw89O1BYjYr'
    }

     axios.get(`http://localhost:8080/rest/s1/pop/products/CategoryProducts?productCategoryId=SCHOOL_SUPPLIES`, null, { headers: headers })
        .then(res => {
          const productList = res.data.productList;
          this.setState({ productList });
        })


The moqui session token is essential for making API calls to moqui's services. The second argument in the get call is null because the productCategoryId is specified in the URL, but it can be the second argument in this call. The third argument is the headers with the moqui session token. You can also add auth next to the headers on the third argument if needed. 