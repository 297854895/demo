$('body').append($('<button style="position: fixed; top: 0" type="button" lng="106.574737" lat="29.581328" onclick="testMapPoint(this)">test</button>'))
function testMapPoint(dom) {
  // map.clearOverlays();
  var lng = Number($(dom).attr('lng'));
  var lat = Number($(dom).attr('lat'));
  var bounds = map.getBounds();
  var sw = bounds.getSouthWest();
  var ne = bounds.getNorthEast();
  var lngSpan = Math.abs(sw.lng - ne.lng);
  var latSpan = Math.abs(ne.lat - sw.lat);

  map.centerAndZoom(new BMap.Point(lng, lat), 16);
  var pointsArr = []
  for (var i = 0; i < 8; i ++) {
    var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
    var label = new BMap.Label(i + 1, {
      position: point,
      offset: new BMap.Size(-4, -10)
    });
    label.setStyle({
       border: 'none',
       background: 'none',
			 color : "#fff",
			 fontSize : "12px",
			 fontFamily:"微软雅黑"
		 });
    map.addOverlay(label);
    pointsArr.push(point);
  }
  var curve = new BMapLib.CurveLine(pointsArr, {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5}); //创建弧线对象
  map.addOverlay(curve); //添加到地图中
  curve.enableEditing(); //开启编辑功能
}
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
  $.getScript("js/jquery-labelauty.js");
  $.getScript("js/city-picker.data.js");
  $.getScript("js/city-picker.js");
  $(".list").empty()
  $(".list").removeClass("hide")
  $(".list").append($("#nav").html())
  $(".list").append($("#contain").html())
  $(function(){
    $(':input').labelauty();
  });
  $('#anter').click(function (e) {
    $("#main").html($("#show-list").html())
    $("#anter").remove()
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
    });
  })
})
//查询



//返回
$(".ipt-cle").click(function (e) {
  $.getScript("js/jquery-labelauty.js");
  $.getScript("js/city-picker.data.js");
  $.getScript("js/city-picker.js");
  $(".list").empty()
  $(".list").removeClass("hide")
  $(".list").append($("#nav").html())
  $(".list").append($("#contain").html())
  $(function(){
    $(':input').labelauty();
  });
  $('#anter').click(function (e) {
    $("#main").html($("#show-list").html())
    $("#anter").remove()
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
    });
  })

})

//清除覆盖物
function remove_overlay(){
  map.clearOverlays();
}
//配置中心
