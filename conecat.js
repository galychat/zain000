function newsock()
{
   socket = io('', { reconnection:false, transportstra: ['polling', 'websocket'] });
   socket.on('connect', function () {
    lstat('success', 'انت متصل بشات غالي وغالي'); $('#tlogins button').removeAttr('disabled');
    if (pending) { socket.emit('re', { token: token });pending=false; }
    if (getUrlParameter('enter') != null) {
      $('#u1').val(hash([new Date().getTime()], 256) + '_زائر');
      login(1);
    }
  });
  socket.on('re', function (data) { if (data.ok == true) { pending == false;pdata.forEach(function(e){socket.emit('msg',e);});pdata=[]; } else { close(); } });
  socket.on('msg', function (data) { onq.push(data); }); 
  socket.on('disconnect', function (data) {
    if (myid != null && pending == false) {pending = true;setTimeout(newsock,12000); return;}
    lstat('danger', 'غير متصل'); close(); });
  socket.on('connect_error', function (data) {console.log('connect_error'); lstat('danger', 'غير متصل'); close(); });
  socket.on('connect_timeout', function (data) {console.log('connect_timeout'); lstat('danger', 'غير متصل'); close(); }); 
  socket.on('error', function (data) {console.log('error'); lstat('danger', 'غير متصل'); close(); });
}
