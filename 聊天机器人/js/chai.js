$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中

    resetui();
    //为发送按钮绑定点击事件
    $(".btnsend").on("click", function () {
        // trim去除两端空格 
        var text = $(".ipt").val().trim();
        if (text.length <= 0) {
            return $(".ipt").val("");
        }
        // 如果用户输入了聊天 则将聊天内容追加到页面显示
        $(".talk").append("<li class='right_word'><img src='img/person02.png'/> <span>" + text + "</span></li>")
        // 清空聊天框
        $(".ipt").val("");
        // 重置滚动跳的位置
        resetui();
        // 发起请求获取聊天机器人
        getMeg(text);
    })
    //获取聊天机器人发送回来的信息
    function getMeg(text) {
        $.ajax({
            type: "GET",
            url: "http://ajax-base-api-t.itheima.net/api/robot",
            data: {
                spoken: text
            },
            success: function (res) {
                // 如果res里面的messagge等于success 说明请求成功
                if (res.message === "success") {
                    // 接受聊天消息
                    var message = res.data.info.text;
                    $(".talk").append("<li class='left_word'><img src='img/person01.png' /> <span>" + message + "</span></li>");
                    // 重置滚动跳的位置
                    resetui();
                    getVoice(message);
                }
            }
        })
    }
    // 把文字装换为语音
    function getVoice(text) {
        $.ajax({
            type: "GET",
            url: "http://ajax-base-api-t.itheima.net/api/synthesize",
            data: {
                text: text
            },
            success: function (res) {
                if (res.status == 200) {
                    // 播放语音
                    // attr设置 自定义属性 prop设置自带属性
                    $(".voice").prop("src", res.voiceUrl);

                }
            }

        })
    }
    // 按回车键发送信息
    // 当键盘弹起keyup
    $(".ipt").on("keyup", function (e) {

        if (e.key === "Enter") {
            $(".btnsend").click();
        }
    })
})