function getCommentList() {
    $.ajax({
        type: 'GET',
        url: 'http://www.liulongbin.top:3006/api/cmtlist',
        data: {},
        success: function (res) {
            if (res.status !== 200)
                return alert('获取评论列表失败');

            // console.log(res);

            var rows = [];
            $.each(res.data, function (i, item) {
                var str = '<li class="list-group-item"><span class="badge" style="background-color: #F0AD4E;">评论时间：'+item.time+'</span><span class="badge" style="background-color: #5BC0DE;">评论人：'+item.username+'</span>'+item.content+'</li>'
                rows.push(str) // 向数组末尾添加一个或多个元素
            })
            // join()将数组转换为字符串,参数指定分隔符
            $('#cmt-list').empty().append(rows.join('')); 
        }
    })
}

getCommentList();

$(function() {
    $('#formAddCmt').submit(function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,
        function(res) {
            if(res.status !== 201) {
                return alert('发表评论失败！');
            }
            getCommentList();
            // Jq对象转换为DOM对象
            $('#formAddCmt')[0].reset();
        })
    })
})