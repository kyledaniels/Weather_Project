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
           console.log(temp)
           const description = weatherData.weather[0].description
           console.log(description);
        })
    })
    res.send("Server is up and running");
})



app.listen(3000,()=>{
    console.log('Server running on port 3000')
})