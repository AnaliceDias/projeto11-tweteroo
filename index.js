import express , {json} from "express"
import cors from "cors"

const app = express();
app.use(cors());
app.use(json());

let usuarios = [];
let tweets = []

app.post("/sign-up", (req, res) => {
    const {username , avatar} = req.body;
    usuarios.push({username, avatar});
    res.send("OK");
})

app.get("/tweets" , (req , res) => {
    let ultimosDezTweets =[];
    let avatares = [];
    let sendTweets = [];

    if (tweets.length < 10){
        ultimosDezTweets = [...tweets]; 
        ultimosDezTweets.reverse();
    }else{
        for (let i = (tweets.length - 10); i < tweets.length; i++){
            ultimosDezTweets.push(tweets[i]);
        }
        ultimosDezTweets.reverse();
    }

    for(let i = 0; i < ultimosDezTweets.length; i++){
        for ( let j = 0; j < usuarios.length; j++){
            if(usuarios[j].username === ultimosDezTweets[i].username){
                avatares.push(usuarios[j].avatar);
            } 
        }   
    }

    for(let i = 0; i < ultimosDezTweets.length; i++){
        sendTweets.push({
            username: ultimosDezTweets[i].username,
            avatar: avatares[i],
            tweet: ultimosDezTweets[i].tweet
        })
    }    

    res.send(sendTweets); //como retorno "OK" nesse caso?
})

app.post("/tweets" , (req, res) => {
    const {username , tweet} = req.body;
    let sendTweets =[];

    tweets.push({username , tweet});

    if (tweets.length < 10){
        sendTweets = [...tweets];
    }else{
        for (let i = 0; i<10; i++){
            sendTweets.push(tweets[i]);
        }
    }
    
    sendTweets.reverse();
    res.send(sendTweets);  
})

app.listen(5000);