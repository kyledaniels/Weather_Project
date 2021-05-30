const express = require('express');
const https = require('https');

const app = express();

app.get("/", (req,res)=>{
    
    const url ='https://api.openweathermap.org/data/2.5/weather?q=Hampton&units=metric&appid=89fda69d2bd8ba043d4051f8dfb3e96d'
    https.get(url,(response)=>{
        console.log(response.statusCode);
        
        response.on("data",(data)=>{
           const weatherData = JSON.parse(data);
           const temp =  weatherData.main.temp
           const description = weatherData.weather[0].description
           const icon = weatherData.weather[0].icon
           const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          
           res.write("<p>The weather is currently " + description+"</p>");
           res.write("<h1>The temperature in Hampton is " + temp + " degrees Celcius</h1>");
           res.write("<img src=" + imageURL + ">");
           res.send();
        })
    })
    
})



app.listen(3000,()=>{
    console.log('Server running on port 3000')
})