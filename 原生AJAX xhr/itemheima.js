function resolveData(data) {
    var arr = [];
    for (var k in data) {

        var str = k + '=' + data[k];
        arr.push(str);
    }
    return arr.join("&");
}
// var res = resolveData({ name: "zs", age: 20 });
// console.log(res);
function itheima(options) {
    var xhr = new XMLHttpRequest();
    // 外界转递过来的参数对象 拼接成字符串
    // 上述函数的操作就是将对象的值变成字符串并返回给os 
    var qs = resolveData(options.data);
    console.log(qs);
    // 判断是get请求还是post
    // toUpperCase()转换大写
    if (options.method.toUpperCase() === "GET") {
        // 发起get请求
        xhr.open(options.method, options.url + "?" + qs);
        xhr.send();
    }
    else if (options.method.toUpperCase() === "POST") {
        xhr.open(options.method, options.url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(qs);
    }
    xhr.onreadystatechange = function () {
        // 获取数据成功
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 因为获取过来的数据是json字符串
            // 我们要将json字符串转换成js对象所以要用parse
            var result = JSON.parse(xhr.responseText);
            options.success(result);
        }
    }
}