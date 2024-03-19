const express=require("express")
const app=express()
const process=require('./fetchTemperature')
const process2=require('./fetchSoilHumidity')
const process3=require('./fetchAirHumidity')

app.get('/temperatureValues',(req,res)=>{
    process().then(data=>
         res.json(data).status(200)
        )
})
app.get('/soilHumidityValues',(req,res)=>{
    process2().then(data=>{
        res.json(data).status(200)
    })
})
app.get('/humidityValues',(req,res)=>{
  process3().then(data=>{
    res.json(data).status(200)
  })
})

app.all('*',(req,res)=>{
    res.send().status(404)
})
app.listen(5000,()=>{
    console.log("the server is listening on port 5000")
})