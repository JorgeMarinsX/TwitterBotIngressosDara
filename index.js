/*Dara - um bot para ajudar usuários do Twitter a vender ingressos
que não precisam ou não querem mais */

/*Dependências*/
var twit = require("twit");
require("dotenv").config();

const Dara = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
});

/*Variáveis*/

/* Os termos e condições dos tweets que iremos buscar*/

var query = {
    q: "(#vendoingresso) OR (vendo ingresso) -zap -whatsapp -to:vendo_ingresso -is:reply",
    result_type: "recent",

}



/*Funções*/
function DaraInit() {

    Dara.get("search/tweets", query, BotGotLatestTweets);

    function BotGotLatestTweets(error, data, response) {
        if (error){
            console.log("Nao foi possivel buscar os tweets");
            console.log(error);
        } 
        else {
             var id = {
            id:data.statuses[0].id_str,
        }                 
    }

    Dara.post("statuses/retweet/:id", id, BotRetweeted);

  
 function BotRetweeted(error, response) {
    if (error){
          console.log("Impossivel dar rt no tweet");
          console.log(error);
      }

     else {
          console.log("Retweetado com sucesso: " + id.id);
      }
  }

 }


}

/*Execução*/

/*Determina o intervalo com o qual o bot irá executar a função*/
setInterval (DaraInit, 20 * 1000); 

/*Inicializa o robô*/
DaraInit();



 


