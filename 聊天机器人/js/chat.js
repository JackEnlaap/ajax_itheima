$(function () {
  $('#btnSend').on('click',function() {

    // 如果发送空格，输入框清空
    var text = $('#ipt').val().trim();
    if(text.length <= 0 ) {
      return $('#ipt').val('')
    }
    // 



    $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>'+text+'</span></li>');
    resetui();


    $('#ipt').val('');

    resetui();

    getMsg(text);
  })

  // 把文字转换为语音进行播放
  function getMsg(text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken:text
      },
      success:function(res) {
        // console.log(res);
        
        if(res.message === 'success') {
          // 接收聊天信息
          var msg = res.data.info.text;
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>' + msg+ '</span></li>')
          resetui();
          getVoice(msg)   
        }
      }
    })
    
  }

  function getVoice(text) {
    $.ajax({
      metmod: 'get',
      url:  'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text:text
      },
      success:function(res) {
        // console.log(res);

        if(res.status == 200) {
          // 播放语音
          $('#voice').attr('src',res.voiceUrl)
        }
      }
    })
  }

  // 为文本框绑定keyup事件
  $('#ipt').on('keyup',function(e) {
    // console.log(e.keycode);
    if(e.keyCode === 13) {
      $('#btnSend').click();
    }
  }) 
})