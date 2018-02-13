// 获取需要的DOM元素
var body = document.getElementsByTagName("body")[0];
var main = document.getElementsByClassName("main")[0];
var display = document.getElementsByClassName("display")[0];
var generate = document.getElementsByClassName("generate")[0];
var copy = document.getElementsByClassName("copy")[0];
var line = document.getElementsByClassName("line")[0];
var option = document.getElementsByClassName("option")[0];
var ele_length = document.getElementsByClassName("length")[0];
var ele_has_lowercase = document.getElementsByClassName("has_lowercase")[0];
var ele_has_capital = document.getElementsByClassName("has_capital")[0];
var ele_has_digit = document.getElementsByClassName("has_digit")[0];
var ele_has_symbol = document.getElementsByClassName("has_symbol")[0];

// 为元素的class属性添加animate值
function add_animate(ele) {
    // 获取元素本身的class属性-getAttribute(attribute)
    origin_attribute = ele.getAttribute("class");
    // 如果元素的class属性值为null，则将其转换为空字符串
    if (origin_attribute === null){
        origin_attribute = "";
    }else {
        origin_attribute += " "
    }
    // 如果元素的class属性值中已存在"animate"字符串，则不做任何操作
    if (origin_attribute.match("animate")){
        return 1;
    }
    // 在元素原始class属性值的基础上加上"animate"-setAttribute(attribute,value)
    ele.setAttribute("class", origin_attribute+"animate")
}

// 为元素添加id属性
function add_id(ele) {
    // 获取元素的class属性的属性值
    class_attribute = ele.getAttribute("class");
    // 获取元素的id属性的属性值
    id_attribute = ele.getAttribute("id");
    // 如果元素id属性值为null,则添加id属性,否则移除其id属性
    if (id_attribute === null || id_attribute === "null"){
        ele.setAttribute("id", class_attribute+"_re");
    }else{
        ele.setAttribute("id", null);
    }
}

// 获取元素的title属性值
function get_title(ele) {
    if (ele === ele_length){
        // 如果ele_length元素的id属性值不为null,则弹出提示框，确定其title属性值
        if (ele.getAttribute("id") !== null && ele.getAttribute("id") !== "null"){
            var res = prompt("请指定密码长度", "8");
            ele.setAttribute("title", res);
        }else{
            ele.setAttribute("title", 8)
        }
    }else{
        // 如果其他元素的id属性值不为null,则其title属性值为True
        if (ele.getAttribute("id") !== null && ele.getAttribute("id") !== "null"){
            ele.setAttribute("title", "True");
        }else{
            ele.setAttribute("title", "False");
        }
    }
    return ele.getAttribute("title");
}

// 创建XMLHttpRequest对象
function get_xml_http_request() {
    // 创建XMLHttpRequest对象
    var xml_http_request = null;
    try{
        // 对于Firefox等浏览器
        xml_http_request = new XMLHttpRequest();
    }
    catch(e){
        try{
            // 对于IE等浏览器
            xml_http_request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e){
            try{
                xml_http_request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e){
                xml_http_request = false;
            }
        }
    }
    return xml_http_request;
}

// 发送异步请求
function get_random_key(length, has_lowercase, has_capital, has_digit, has_symbol) {
    xml_http_request = get_xml_http_request();
    // console.log(xml_http_request);
    // 发起异步请求
    if (xml_http_request === null){
        alert("您的浏览器不支持XMLHttpRequest");
        return 1;
    }
    // 构造请求的url
    url = "/get_random_key?"+"length="+length.toString()+"&"+"has_lowercase="+has_lowercase.toString()+"&"+"has_capital="+has_capital.toString()+"&"+"has_digit="+has_digit.toString()+"&"+"has_symbol="+has_symbol.toString();
    // 使用post方法打开与服务器的连接
    xml_http_request.open("GET", url, true);
    // 处理服务器响应
    xml_http_request.onreadystatechange= function() {
        if (xml_http_request.readyState === 4 && xml_http_request.status === 200){
            var response = xml_http_request.responseText;
            // console.log(response);
            handle_response(response);
        }
    };
    // 发送请求
    xml_http_request.send(null);
}

// 处理服务器响应
function handle_response(response) {
    // 将JSON字符串转为JavaScript对象
    response = JSON.parse(response);
    // console.log(response);
    // 将要展示在页面的数据
    result = '';
    if (response.code === 0){
        result = response.data;
    }
    else{
        result = response.msg;
    }
    // console.log(result);
    updatePage(result);
}

// 根据响应结果更新页面
function updatePage(result) {
    add_animate(display);
    display.innerHTML = result;
    return 0;
}

window.onload=function() {
    // 进场效果
    add_animate(body);
    add_animate(main);

    // 请求参数列表
    parameters = [8, "False", "False", "False", "False"];

    // 为"可选项"绑定点击事件,并更新请求参数列表
    options = [ele_length, ele_has_lowercase, ele_has_capital, ele_has_digit, ele_has_symbol];
    options.forEach(function(value, index, array) {
        value.onclick = function() {
            add_id(value);
            parameters[index] = get_title(value);
        }
    });

    // 为"生成随机密码"按钮绑定点击事件
    generate.onclick=function(){
        add_animate(copy);
        add_animate(line);
        add_animate(option);
        // 从服务器获取数据
        get_random_key(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4]);
    };
};