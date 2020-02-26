//Variables

 const listaTweets = document.getElementById('lista-tweets');


//Even Listeners

   evenListeners();

  function evenListeners(){
        
        //cuando se envia el formulario
        document.querySelector('#formulario').addEventListener('submit', agregarTweet);

        //Borrar Tweets
        listaTweets.addEventListener('click',borrarTweet);

        //Contenido cargado
        document.addEventListener('DOMContentLoaded',localStorageListo);
  }



//Funciones
//Añadir tweet del formulario

function agregarTweet(e){
      
      e.preventDefault();
     //leer el valor del textarea
     const tweet = document.getElementById('tweet').value;
     //crear boton eliminar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList ='borrar-tweet';
     botonBorrar.innerText = 'X';

     //crear el elemento y añadirle el contenido a la lista
     const li = document.createElement('li');
     li.innerText = tweet;
     //añade el boton de borrar al tweet
     li.appendChild(botonBorrar);
     //añade el tweet a la lista
     listaTweets.appendChild(li);

     //Añadir a Local Storage
     agregarTweetLocalStorage(tweet);
}


 //evento
 function borrarTweet(e){

      e.preventDefault();
      if(e.target.className === 'borrar-tweet'){

          e.target.parentElement.remove();
          borrarTweetLocalStorage(e.target.parentElement.innerText);
         
      }
 }

   
   //Mostrar datos de LocalStorage en la lista
   function localStorageListo(){

           let tweets;
           tweets = obtenerTweetsLocalStorage();
           
              tweets.forEach(function(tweet){

                     //crear boton eliminar
                    const botonBorrar = document.createElement('a');
                    botonBorrar.classList ='borrar-tweet';
                    botonBorrar.innerText = 'X';

                    //crear el elemento y añadirle el contenido a la lista
                    const li = document.createElement('li');
                    li.innerText = tweet;
                    //añade el boton de borrar al tweet
                    li.appendChild(botonBorrar);
                    //añade el tweet a la lista
                    listaTweets.appendChild(li);    
             });
           
   }


 //Agrega tweet a local storage
 function agregarTweetLocalStorage(tweet){

      let tweets;
      //muestra los tweets en local storage
      tweets = obtenerTweetsLocalStorage();
      //Añadir el nuevo tweet
      tweets.push(tweet);
      //Convertir de arreglo a string para local storage
      //en local storage solo acepta cadenas de textos, string, no imagenes o objetos
      localStorage.setItem('tweets', JSON.stringify(tweets));

     
 }

 
 //esta funcion se llama apenas se agregue un tweet 
 function obtenerTweetsLocalStorage(){

      let tweets;
      //revisamos los valores del local storage
      if(localStorage.getItem('tweets')===null){
          
           tweets=[];
      } else {
          
          //muestra los tweets en una cadena de texto y en un arreglo
          tweets = JSON.parse(localStorage.getItem('tweets') );
      }

      return tweets;
 } 

     //eliminar tweet de Local Storage
     function borrarTweetLocalStorage(tweet){
          
          let tweets, tweetBorrar;
          
          //elimina la 'X' del tweet
          //para eliminar la 'X' aplicamos -1 asi se mostrará solo el texto del tweet
          tweetBorrar = tweet.substring(0, tweet.length - 1);

          tweets = obtenerTweetsLocalStorage();
    
          
          tweets.forEach(function(tweet,index){

                //recorre el array tweets y si el tweet que quiero borrar es igual al tweet que estoy recorriendo lo borro, con el index identifico la posicion e indico que borraré solo uno
                
                 if(tweetBorrar === tweet){
                       
                      tweets.splice(index,1);
                 }
          });

          localStorage.setItem('tweets', JSON.stringify(tweets));
          
     }

