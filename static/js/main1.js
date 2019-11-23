
    document.addEventListener('DOMContentLoaded', () => {
    let display_name = localStorage.getItem('display_name');
    
       // By default, submit button is disabled
       document.querySelector('#submit').disabled = true;
       document.querySelector('#submit').style.color = "red";
       // Connect to websocket
       var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
   
       // Enable button only if there is text in the input field
       document.querySelector('#task').onkeyup = () => {
           if (document.querySelector('#task').value.length > 0){
   
               document.querySelector('#submit').disabled = false;
               document.querySelector('#submit').style.color = "blue";
   
           }
           else
               document.querySelector('#submit').disabled = true;
               document.querySelector('#submit').style.color = "red";
       };
   
       // When connected, configure button
       socket.on('connect', () => {
           document.querySelector('#submit').onclick = (ev) => {
               ev.preventDefault();
               var message = document.querySelector('#task').value;
               var channelName = document.querySelector('#channelName').value;
               socket.emit('submit message', {'message': message, 'channelName': channelName});
            //console.log(content);
               };
           });
   
       socket.on('receive message', data => {
           const content = document.createElement('div');
           console.log("data.display_name:"+ data.display_name);
           console.log("display_name:"+ display_name);
            if(data.display_name == display_name ){
                content.innerHTML = `<div class="outgoing-chats">
                <div class="outgoing-chats-msg">
                <p>${data.message}</p>
                <span class="time">${data.timeStamp}</span>
             </div>
          </div>`;
                console.log("content:"+ content);
            }else{
                
                content.innerHTML = `<div class="received-chats">
                <div class="received-chats-name">
                    <p class="sender-display-name">${data.display_name}</p>
                </div>
                <div class="received-msg">
                    <div class="received-msg-inbox">
                        <p>${data.message}</p>
                        <span class="time">${data.timeStamp}</span>
                    </div>
                </div>
            </div>`;

            console.log("content:"+ content);
            }

           document.querySelector('#msg-page').append(content);
           document.querySelector('#task').value = '';
           document.querySelector('#submit').disabled = true;
           document.querySelector('#submit').style.color = "red";
           
      });
});



