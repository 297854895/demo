// 百度地图API功能
var map = new BMap.Map('map');
var poi = new BMap.Point(106.574737,29.581328);
map.centerAndZoom(poi, 16);
map.enableScrollWheelZoom();
var overlays = [];
var overlaycomplete = function(e){
    overlays.push(e.overlay);
    $("#sideBarContents").removeClass("hide");

};
var styleOptions = {
    strokeColor:"red",    //边线颜色。
    fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 3,       //边线的宽度，以像素为单位。
    strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' //边线的样式，solid或dashed。
}

// 编写自定义函数,创建标注
function addMarker(point,label){
    var myIcon = new BMap.Icon("images/icon2-35.png", new BMap.Size(35,35));
    var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
    marker2.setLabel(label);
    map.addOverlay(marker2);  // 将标注添加到地图中
}
// 随机向地图添加25个标注
var bounds = map.getBounds();
var sw = bounds.getSouthWest();
var ne = bounds.getNorthEast();
var lngSpan = Math.abs(sw.lng - ne.lng);
var latSpan = Math.abs(ne.lat - sw.lat);
for (var i = 0; i < 25; i ++) {
    var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
    var myIcon = new BMap.Icon("images/icon2-35.png", new BMap.Size(35,35));
    var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
    map.addOverlay(marker2);// 将标注添加到地图中
}

//选择人物
function listPer(e) {
    map.clearOverlays();
    for (var i = 0; i < 60; i ++) {
        var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
        var myIcon = new BMap.Icon("images/icon3-30.png", new BMap.Size(35,37));
        var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
        map.addOverlay(marker2);// 将标注添加到地图中
        $("#pers").empty()
        $("#perLists").addClass("show")
        $("#perLists").append("<li onclick='evt(this)' lat="+point.lat+" lng="+point.lng+" id="+$(marker2)[0].ba+" class='cssper'>嫌疑人 "+i+"</li>");
    }
}

function evt(e) {
    var pointObj = {
        lat:e.getAttribute("lat"),
        lng:e.getAttribute("lng"),
    }
    var myIcon = new BMap.Icon("images/icon3-35.png", new BMap.Size(60,65));
    var marker2 = new BMap.Marker(pointObj,{icon:myIcon});  // 创建标注
    var allOverlay = map.getOverlays();
    for (var i = 0; i <allOverlay.length; i++){
        var label = new BMap.Label("嫌疑人"+i,{offset:new BMap.Size(5,-25)});
        if(e.id == allOverlay[i].ba){
            marker2.setLabel(label);
            map.addOverlay(marker2);
            return false;
        }
    }
}

var addArea = function (e) {
    $("#area-con").append($("#areas").html())
}

//搜索
$('.ipt-btn').click(function (e) {
    $(".list").empty()
    $(".list").removeClass("hide")
    $(".list").append($("#nav").html())
    $(".list").append($("#contain").html())
    $(function(){
        $(':input').labelauty();
        $.getScript("js/jquery-labelauty.js");
        $.getScript("js/city-picker.data.js");
        $.getScript("js/city-picker.js");
        layui.use(['form', 'layedit', 'laydate', 'table'], function(){
            var form = layui.form
                ,layer = layui.layer
                ,layedit = layui.layedit
                ,table = layui.table
                ,laydate = layui.laydate;
            //日期
            laydate.render({
                elem: '#date'
            });
            laydate.render({
                elem: '#date1'
            });
            table.render({
                elem: '#tab1'
                ,url:'json/targetTarcing.json'
                ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                ,cols: [[
                    {field:'imsi', width:120, title: 'IMSI'}
                    ,{field:'imei', width:89, title: 'IMEI'}
                    ,{field:'phone', width:80, title: '电话'}
                    ,{field:'address', width:150, title: '地址'}
                    ,{field:'imsiaddress', title: 'IMSI地址', width: '100'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                    ,{field:'capturetime', title: '捕获时间', sort: true,width: '100'}
                    ,{field:'sign', title: '运营商'}
                ]]
            });
        });
    });
    $('#anter').click(function (e) {
        $("#anter").addClass('hide')
        $("#main").addClass('hide')
        $("#tab").removeClass('hide')
    })
})
//查询



//返回
$(".ipt-cle").click(function (e) {
    $("#anter").removeClass('hide')
    $("#main").removeClass('hide')
    $("#tab").addClass('hide')
})

//清除覆盖物
function remove_overlay(){
    map.clearOverlays();
}
//配置中心
