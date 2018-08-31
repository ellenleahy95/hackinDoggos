var http = require('http')
var express = require('express')
var bodyparser = require('body-parser')

var app = express(server)
var server = http.Server(app)

app.use(express.static(__dirname))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.post('/textme', (req,resp)=>{
    const number = req.body.number
    const name = req.body.name
    if (req.body.hasOwnProperty('recommendation')){
      const recommendation = req.body.recommendation
      textMeRecommendation(name, number, recommendation)
      resp.sendStatus(200)
    }else if (req.body.hasOwnProperty('watchshow')){
      const watchshow = req.body.watchshow
      textMeWatchRequest(name, number, watchshow)
      resp.sendStatus(200)
    }else{
      resp.sendStatus(500)
    }
})

server.listen(3000, () => {
    console.log('Server started on port', server.address().port)
})

function textMeRecommendation(name, number, recommendation){
    
    var twilio = require('twilio');
    var messageBody = `Hi ${name}, Tinashe has recomnmended that you watch ${recommendation}!`;

    // Find your account sid and auth token in your Twilio account Console.
    var client = new twilio('AC084231ba308475eb8aad413b41a4089c', 'fb7d9d849e57517417894c563ecc6889');

    // Send the text message.
    client.messages.create({
      to: number,
      from: '+447479273187',
      body: messageBody
    });
    console.log('texting recommendation ', number, messageBody)
}

function textMeWatchRequest(name, number, watchshow){
    var twilio = require('twilio');
    var messageBody = `Hi ${name}, Tinashe wants to watch ${watchshow} with you! Log onto Sky Go to watch it with him.`;

    // Find your account sid and auth token in your Twilio account Console.
    var client = new twilio('AC084231ba308475eb8aad413b41a4089c', 'fb7d9d849e7517417894c563ecc6889');

    // Send the text message.
    client.messages.create({
      to: number,
      from: '+447479273187',
      body: messageBody
    });
    console.log('texting watch request ', number, messageBody)
}