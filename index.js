const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

    

});


app.post("/", function(req, res){

    var firstName = req.body.fname;
    var lastName = req.body.lname
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME:  lastName,
            },
        }]
    };

var jasonData = JSON.stringify(data);

var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/7ace82f0da",
    
    method: "POST",
    headers: {
        "Authorization": "yogesh 740ce528991352e9802bb232215ef22c-us20"
    },
   body: jasonData 
};

request(options, function(error, response, body){

if(error){
    res.sendFile(__dirname + "/fail.HTML" );
}else{
    if(response.statusCode === 200)
    res.sendFile(__dirname + "/SUCESS.HTML");
    else
    res.sendFile(__dirname + "/fail.HTML" );
}


}
);

});

app.post("/fail", function(req, res){
    res.redirect("/");
    
});




app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});



//740ce528991352e9802bb232215ef22c-us20

//7ace82f0da