var pageY = '';
$('body').click(function(e){
    pageY = e.pageY
    var tableWidth = $('.layui-form').width()
    $('#operate').css({
        top:pageY,
        width:tableWidth
    })
})
$(function(){
    $(':input').labelauty();
});
layui.use(['form', 'layedit', 'laydate', 'table'], function(){
    var form = layui.form
      ,layer = layui.layer
      ,layedit = layui.layedit
      ,laydate = layui.laydate;
    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });
});
$('.list').delegate('.list-title>span', 'click',function () {
    // 关闭绘制工具，清除画圈
    if (drawingManager) {
        drawingManager.close()
    }
    if (overlays.length && overlays.length > 0) {
        for(var i = 0; i < overlays.length; i++){
            map.removeOverlay(overlays[i]);
        }
        overlays.length = 0
        overlays = []
    }
    var thisId = $(this).attr('id')
    $(this).parent().addClass('act').siblings().removeClass('act');
    var cols = '',url = '';
    $('#operate').addClass('hide')
    switch (thisId) {
        case 'areaData':
            $("#anter").removeClass('hide')
            $("#main").removeClass('hide')
            $("#area-con").removeClass('hide')
            $("#arget").addClass('hide')
            $("#arget-text").removeClass('hide').val('')
            $("#arget-ipt").val('')
            $(".layui-form").remove()
            break
        case 'targetTracing':
            $("#anter").removeClass('hide')
            $("#main").removeClass('hide')
            $("#area-con").addClass('hide')
            $("#arget").removeClass('hide')
            $("#arget-text").removeClass('hide').val('')
            $("#arget-ipt").val('')
            $(".layui-form").remove()
            break
        case 'collisionStatic':
            createCircle()
            break
        case 'groupCollision':
            break
        case 'togetherAnalysis':
            break
        case 'fomulaCalculate':
            break
        case 'targetStatic':
            break
    }
})
// 随机生成曲线轨迹
function createCruvue() {
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var lngSpan = Math.abs(sw.lng - ne.lng);
    var latSpan = Math.abs(ne.lat - sw.lat);

    // map.centerAndZoom(new BMap.Point(106.574737, 29.581328), 16);
    var pointsArr = []
    for (var i = 0; i < 8; i ++) {
        var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
        var marker = new BMap.Marker(point);
        var label = new BMap.Label(i+1,{offset:new BMap.Size(5, 0)})
        label.setStyle({
            border: 'none',
            background: 'none',
            color : "#fff",
            fontSize : "12px",
            height : "20px",
            lineHeight : "20px",
            fontFamily:"微软雅黑"
        });
        map.addOverlay(marker);
        marker.setLabel(label)
        pointsArr.push(point);
    }
    var curve = new BMapLib.CurveLine(pointsArr, {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5}); //创建弧线对象
    map.addOverlay(curve); //添加到地图中
    // curve.enableEditing(); //开启编辑功能
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
    $("#arget-text").val($("#city-picker3").val() + "\n" + $("#arget-text").val())
    $(".title").html('')
    $(".placeholder").css('display', 'block')
}

//搜索
$('.ipt-btn').click(function (e) {
    $(".list").empty()
    $(".list").removeClass("hide")
    $(".list").append($("#nav").html())
    $(".list").append($("#contain").html())
    $("#area-con").removeClass('hide')
    $("#arget-text").removeClass('hide')
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
                ,url:'json/table1.json'
                ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                ,cols: [[
                    {field:'id', width:120, title: 'IMSI'}
                    ,{field:'username', width:89, title: '电话'}
                    ,{field:'sex', width:80, title: '归属地'}
                    ,{field:'city', width:150, title: '时间'}
                    ,{field:'sign', title: '运营商', width: '100'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                ]]
            });
        });
    });
    $('#anter').click(function (e) {
        var thisCheckId = $('.act').children('span').attr('id')
        var cols = '',url = '';
        switch (thisCheckId) {
            case 'areaData':
                cols = [[
                    {field:'id', width:120, sort: true, title: 'IMSI'}
                    ,{field:'username', width:120, title: '手机号', event: 'showCrvue'}
                    ,{field:'sex', width:100, title: '归属地', event: 'showCrvue'}
                    ,{field:'city', width:150, title: '时间', event: 'showCrvue'}
                    ,{field:'sign', title: '运营商', width: '100', event: 'showCrvue'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                ]];
                url = 'json/table1.json'
                createTab(cols,url)
                break
            case 'targetTracing':
                cols = [[
                    {field:'imsi', width:120, title: 'IMSI', event: 'showCrvue'}
                    ,{field:'imei', width:120, title: 'IMEI', event: 'showCrvue'}
                    ,{field:'phone', width:100, title: '电话', event: 'showCrvue'}
                    ,{field:'address', width:150, title: '地址', event: 'showCrvue'}
                    ,{field:'imsiaddress', title: 'IMSI地址', width: '100', event: 'showCrvue'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                    ,{field:'capturetime', title: '捕获时间', sort: true,width: '100', event: 'showCrvue'}
                    ,{field:'sign', title: '运营商', event: 'showCrvue'}
                ]];
                url = 'json/targetTarcing.json'
                createTab(cols,url)
                break
            case 'collisionStatic':
                break
            case 'groupCollision':
                break
            case 'togetherAnalysis':
                break
            case 'fomulaCalculate':
                break
            case 'targetStatic':
                break
        }
        $("#anter").addClass('hide')
        $("#main").addClass('hide')
        $("#arget-text").addClass('hide')
        var tableWidth = $('.layui-form').width() + 20
        $('#close').css({
            left:tableWidth
        })
        $('#close').removeClass('hide')
    })
    $("#addImg").click(function (e) {
        $("#arget-text").val($("#arget-ipt").val() + "\n" + $("#arget-text").val())
    })
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

})
//查询
// 添加表格
function createTab(cols,url){
    $('.layui-form').remove();
    layui.use('table', function(){
        var table = layui.table;
        table.on('tool(test1)', function(obj){
            $('#operate').toggleClass('hide')
            var thisHtml = ''
            for(var key in obj.data) {
                var str = obj.data[key].length < 5 ? obj.data[key] : obj.data[key].substring(0,5) + '....'
                thisHtml+= `
                    <span>${str}</span>    
                `
            }
            var html = `
                <div> ${thisHtml}</div> 
                <div id = "operateBtn">
                    <p>>><span>目标跟踪</span>|<span>临时布控</span>|<span>加入队列</span></p>
                    <p>>><span>同行IMSI</span>|<span>同行MAC</span>|<span>同行车牌</span>|<span>IMSI比对</span>|<span>IMEI比对</span>|<span>手机号</span></p>
                    <a href="javascript:void(0)" onclick="Anchor()"></a>
                </div>
            `
            $('#operate').html(html)
            // 添加曲线轨迹
        })
        table.render({
            elem: '#tab'
            ,url:url
            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols:cols
            // ,width:800
            ,height:300
        });
    })
}

function Anchor(){
    event.stopPropagation();
    map.clearOverlays();
    createCruvue()
}
//返回
$(".ipt-cle").click(function (e) {
    $("#anter").removeClass('hide')
    $("#main").removeClass('hide')
    $("#tab").removeClass('hide')
    $("#area-con").removeClass('hide')
    $("#arget").addClass('hide')
    $("#arget-text").removeClass('hide')
    $(".layui-form").remove()
    $(".list-title").removeClass("act")
    $(".list-title:first").addClass("act")
})

//清除覆盖物
function remove_overlay(){
    map.clearOverlays();
}


//配置中心

$("#operate").delegate('#operateBtn span','click',function () {
    event.stopPropagation();
    var content = $(this).html()
    alert('正在执行'+content)
})


// 添加一个初始化的原型区域
var drawingManager;
var overlays = [];
function createCircle() {
    map.enableScrollWheelZoom();
    //实例化鼠标绘制工具
    if (!drawingManager) {
        var overlaycomplete = function(e){
            // 绘制完成后
            if (overlays.length !== 0) {
                clearAll();
            }
            overlays.push(e.overlay);
            console.log('complete');
        };
        var styleOptions = {
            strokeColor:"#A6CBA1",    //边线颜色。
            fillColor:"#A6CBA1",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
        drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: true, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
        function clearAll() {
            for(var i = 0; i < overlays.length; i++){
                map.removeOverlay(overlays[i]);
            }
            overlays.length = 0
            overlays = []
        }
    } else {
        drawingManager.open();
    }
    drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
}
