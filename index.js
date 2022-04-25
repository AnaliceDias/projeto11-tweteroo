import express , {json} from "express"
import cors from "cors"

const app = express();
app.use(cors());
app.use(json());

let usuarios = [];

let tweets = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
        tweet: "eu amo o hub",
    }
]

app.post("/sign-up", (req, res) => {
    const {username , avatar} = req.body;
    usuarios.push({username, avatar});
    res.send("OK");
})

app.get("/tweets" , (req , res) => {
    let sendTweets =[];
    if (tweets.length < 10){
        sendTweets = [...tweets];
    }else{
        for (let i = 0; i<10; i++){
            sendTweets.push(tweets[i]);
        }
    }
    
    res.send(tweets);
})

app.post("/tweets/:username" , (req, res) => {
    const {username , tweet} = req.params;
    console.log({username , tweet});
    //tweets.push();
})

app.listen(5000);