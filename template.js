function template(id, data) {
    var str = document.querySelector("#" + id).innerHTML;
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/;

    var result = null;m

    while (result = pattern.exec(str)) {
        str = str.replace(result[0], data[result[1]]);
    }
    return str;
}