$(function () {
    // 定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function (dtstr) {
        var dt = new Date(dtstr);
        var y = dt.getFullYear();
        var m = dt.getMonth + 1();
        var d = dt.getDay();
        var hh = dt.getHours();
        var mm = dt.getMinutes();
        var ss = dt.getSeconds();
        return y + "-" + m + "-" + d + ' ' + hh + ":" + mm + ":" + ss
    }
    // 获取新闻列表数据
    function getNewsList() {
        $.ajax({
            type: "GET",
            url: "http://liulongbin.top:3006/api/news",
            success: function (res) {
                // 不等于200就代表没有获取成功
                if (res.status !== 200) {
                    return alert("获取新闻列表失败");
                }

                for (var i = 0; i < res.data.length; i++) {
                    // 把每一项的tags属性 从字符串改造成字符串的数组
                    res.data[i].tags = res.data[i].tags.split(",");
                }
                console.log(res);
                var str = template("tpl-news", res);
                $("#news-list").html(str);
            }
        })
    }
    getNewsList();
})