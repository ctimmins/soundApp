var CLIENT_ID = 'YOUR_CLIENT_ID';
var CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
var REDIRECT_URI = 'http://localhost:8888/callback.html';

SC.initialize({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI
});

$(document).ready(function(){
    $('div#loggedin').hide();    
/**  
**** Login Button ****
**/
    $('button#login').click(function(e){
        //e.preventDefault;
        SC.connect(function(){
            $('div#login').hide();
            $('div#loggedin').show();
            SC.get('/me', function(me){
                var numSongs = me.public_favorites_count;
                SC.get('/me/favorites', function(favorites){
                    for(var i = 0; i < numSongs; i++){
                        $('<div class="widget"></div>').appendTo($('div#player'));
                        console.log(i);
                        SC.oEmbed(favorites[i].permalink_url, $('#player div:last-child')[0]);                        
                    };  
                });
            });
        });    
    });
});
