const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
     
    
})

app.post("/",(req,res)=>{
    const query = req.body.cityName;
    const apiKey = "89fda69d2bd8ba043d4051f8dfb3e96d";
    const unit = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url,(response)=>{
        console.log(response.statusCode);
        
        response.on("data",(data)=>{
           const weatherData = JSON.parse(data);
           const temp =  weatherData.main.temp
           const description = weatherData.weather[0].description
           const icon = weatherData.weather[0].icon
           const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          
           res.write("<p>The weather is currently " + description+"</p>");
           res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
           res.write("<img src=" + imageURL + ">");
           res.send();
        })
    })

})

/


app.listen(3000,()=>{
    console.log('Server running on port 3000')
})