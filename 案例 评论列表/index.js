function getComementList() {
    $.ajax({
        method: "GET",
        url: "http://liulongbin.top:3006/api/cmtlist",
        data: {

        },
        success: function (res) {
            // 等于200的就说明获取到数据了
            if (res.status != 200) {
                return alert("获取评论列表失败");
            }
            console.log(res);
            // 定义空数组
            var rows = [];
            $.each(res.data, function (i, item) {
                var str = " <li class='list-group-item'><span class='badge' style='background-color: #F0AD4E;' > 评论时间:" + item.time + "</span> <span class='badge' style='background-color:#5BC0DE;'>评论人:" + item.username + "</span>" + item.content + "</li > "
                rows.push(str);
            })
            $(".cmt-list").empty().append(rows.join(""));
        }

    })
}
getComementList();


$(function () {
    // 当我们提交表单就会触发下列事件
    $(".formAddlist").submit(function (e) {
        // 阻止表单默认行为
        e.preventDefault();
        // 快速获取表单事件 首页要有定义name
        var data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "http://liulongbin.top:3006/api/addcmt",
            data: data,
            success: function (res) {
                if (res.status != 201) {
                    return alert("发表评论失败");
                }
                getComementList();
                
                // jquery转换成原生对象 
                // 发表成功后重置表单
                $(".formAddlist")[0].reset();
            }

        })
    })
})
