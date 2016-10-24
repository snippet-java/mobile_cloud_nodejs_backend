var appRouter = function(app) {    
    
    //Home page of the app
    app.get("/",function(req,res) {
        res.send("hello! , This is nodeJs backend for mobile cloud app. Post to /checklogin with user_name and password.")
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
      // or password, the server cannot do much, can it?
      if( !req.body.user_name || 
          !req.body.password ){
          console.log( "Did not receive any credential" );          
          return res.send( JSON.stringify( {"result":"error", "description" : "Credential missing" } ) );
      }
      //This condition simply validates the user name and
      //password against the actual credentials stored in environment variables
      else if( req.body.user_name == process.env.APP_USER_NAME &&
          req.body.password == process.env.APP_USER_PASSWORD ){
          //send a success message and also the record shows
          //that the student has great record
          return res.send(JSON.stringify( {"result":"success", "record":"You are outstanding" } ) );

      }
      else{
          //well, user name and password did not match the actual credentials,
          //it seems the user is not our student
          //Send error message with the reason of failure.
          return res.send( JSON.stringify( {"result": "error", "description": "Incorrect credentials" } ) );
      }      
   }); 
}
 
module.exports = appRouter;