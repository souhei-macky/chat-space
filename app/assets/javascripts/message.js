$(function(){
  function buildHTML(message) {
    image = ( message.image ) ? `<img class= "text-message__image" src=${message.image} >` : "";
    var html = `<div class=message>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}　
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="text-message">
                    <p class="text-message__content">
                    ${message.content}
                    </p>
                    ${image}
                  </div>
                </div> `
    return html
  }




  $('.new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: (formData),  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast')
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました')
    })   
    return false;
  })
});
