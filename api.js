var appRouter = function(app) {    
    
    //get to /checklogin display the message.
    app.get("/checklogin",function(req,res) {
        res.send("hello! , This is nodeJs backend for mobile cloud app. " +
        		"Post to /checklogin with user_name and user_password.")
    });
    

   /*
    Function to validate the user credentials

    This function is accessible by the /checklogin URI, relative to the server ip address

    The function accepts a "Request" object  sent by any client by POST method. The user credential
    is passed in the body of the request as JSON object.

    The function checks the user credential and prepares another JSON object with required data for 
    client-side processing.

    Please refer readme to find how to test this app using CURL
   */   

   app.post( "/checklogin", function( req, res ){
   console.log( "Request received. Checking...." )

      //if the request does not contain user_name
      // or user_password, the server cannot do much, can it?
    
   
   //Get user_name and password_password from the HTTP Request and save them in the variables
    var provided_user_name = req.body.user_name;
	var provided_user_password = req.body.user_password;
	
	//Get actual user name and password from environment variables
	var actual_user_name = process.env.APP_USER_NAME;
	var actual_user_password = process.env.APP_USER_PASSWORD;
	
	if( !provided_user_name || 
          !provided_user_password ){
          console.log( "Did not receive any credential" );          
          return res.send( JSON.stringify( {"result":"error", "description" : "Credential missing" } ) );
      } else {
	
		if( provided_user_name == actual_user_name &&
		      provided_user_password == actual_user_password ){
		      //send a success message and also the record shows
		      return res.send(JSON.stringify( {"result":"success", "record":"You are outstanding" } ) );

		  }
		  else{
		      //well, user_name and user_password did not match the actual credentials,
		      //Send error message with the reason of failure.
		      return res.send( JSON.stringify( {"result": "error", "description": "Incorrect credentials" } ) );
		  }
	}      
   }); 
}
 
module.exports = appRouter;

