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
    textMe(number)
    resp.sendStatus(200)
})

server.listen(3000, () => {
    console.log('Server started on port', server.address().port)
})

function textMe(number){
    
    var twilio = require('twilio');

    // Find your account sid and auth token in your Twilio account Console.
    var client = new twilio('AC084231ba308475eb8aad413b41a4089c', 'fb7d9d849e57517417894c563ecc6889');

    // Send the text message.
    client.messages.create({
      to: number,
      from: '+447479273187',
      body: 'Here are your reccomendations from:'
    });
    console.log('texting ', number)
}
