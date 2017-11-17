
var one = 1
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
            $('#operate').css({
                width:'394px'
            })
            $("#anter").removeClass('hide')
            $("#main").removeClass('hide')
            $("#area-con").removeClass('hide')
            $("#arget").addClass('hide')
            $("#arget-text").removeClass('hide').val('')
            $("#arget-ipt").val('')
            $(".layui-form").remove()
            break
        case 'targetTracing':
            $('#operate').css({
                width:'763px'
            })
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
                $("#listBtn1").removeClass('hide')
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
                $("#listBtn").removeClass('hide')
                $('#operate').css({
                    width:'763px;'
                })
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
    if(one == 1){
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
        one = 2
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
                // var str = obj.data[key].length < 5 ? obj.data[key] : obj.data[key].substring(0,5) + '....'
                thisHtml+= `
                    <span>${obj.data[key]}</span>    
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

//开始规划
function Anchor(){
    event.stopPropagation();
    map.clearOverlays();
    createCruvue()
    $(".layui-form").addClass('hide')
    $("#operate").addClass('hide')
    $("#listBtn").addClass('hide')
    $("#close").addClass('hide')
    $(".ipt").addClass('hide')
    $(".list").addClass('hide')
    $("#start").removeClass("hide")
}
//取消规划
function UnAnchor(){
    $(".layui-form").removeClass('hide')
    $("#operate").removeClass('hide')
    $("#listBtn").removeClass('hide')
    $("#close").removeClass('hide')
    $(".ipt").removeClass('hide')
    $(".list").removeClass('hide')
    $("#start").addClass("hide")
}
//返回
$(".ipt-cle").click(function (e) {
    $("#anter").removeClass('hide')
    $("#main").removeClass('hide')
    $("#tab").addClass('hide')
    $("#area-con").removeClass('hide')
    $("#arget").addClass('hide')
    $("#arget-text").removeClass('hide')
    $("#allmap > .layui-form").remove()
    $(".list-title").removeClass("act")
    $(".list-title:first").addClass("act")
})

//清除覆盖物
function remove_overlay(){
    map.clearOverlays();
}

//关闭列表
function closeList() {
    $("#anter").removeClass('hide')
    $("#main").removeClass('hide')
    $("#area-con").removeClass('hide')
    $("#arget").addClass('hide')
    $("#arget-text").removeClass('hide')
    $("#allmap > .layui-form").remove()
    //fuck
    $(".list-title").removeClass("act")
    $(".list-title:first").addClass("act")
    $("#operate").addClass("hide")
    $("#close").addClass("hide")
    $("#listBtn").addClass("hide")
    $("#listBtn1").addClass("hide")
    $('#tab').addClass('hide')
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
$('#operate').click(function(){
    event.stopPropagation();
})
function createUl(){
    if ($('#tableId')){
        $('#tableId').remove();
    }
    var table = document.createElement('table')
    table.id = 'tableId'
    var thead =`
        <thead>
        <tr>
        <th style="width:150px;">IMSI</th>
        <th style="width:150px;">IMEI</th>
        <th style="width:120px;">电话号码</th>
        <th style="width:150px;">地点</th>
        <th style="width:60px;">次数</th>
        <th style="width:80px;">运营商</th>
</tr>
</thead>
    `
    var html="";
    $.getJSON("json/json2.json", function (data){
        data.data.forEach(function (i,v) {
            var add=""
            i.address.forEach(function (item, index) {
                add+=`
                    <p>${item}</p>
                `
            })
            var times=""
            i.time.forEach(function (item, index) {
                times+=`
                    <p>
                    ${item}
</p>
                `
            })
            html += `
                <tr data-id=${v}>
                <td>${i.imsi}</td>
                <td>${i.imei}</td>
                <td>${i.phone}</td>
                <td>${add}</td>
                <td>${times}</td>
                <td>${i.sign}</td>
</tr>
            `
        })
        table.innerHTML = thead + '<tbody>' + html + '</tbody>'
        document.getElementById('tab').append(table)
        $('#tab').removeClass('hide')
    })
}
$('#tab').delegate('tbody tr','click',function () {
   var thisId = $(this).attr('data-id')
    var data = tabdata[thisId]
    var address = ''
    var times = ''
    data.address.forEach(function(item, idex){
        address+= `
            <em>${item}</em>    
        `
    })
    data.time.forEach(function(item, index){
        times+=`
            <em>${item}</em>
        `
    })
    var thisHtml = `
        <span>${data.imsi}</span>
        <span>${data.imei}</span>
        <span>${data.phone}</span>
        <span>${address}</span>
        <span>${times}</span>
        <span>${data.sign}</span>
    `
    var html = `
                <div id="times"> ${thisHtml}</div> 
                <div id = "operateBtn">
                    <p>>><span>目标跟踪</span>|<span>临时布控</span>|<span>加入队列</span></p>
                    <p>>><span>同行IMSI</span>|<span>同行MAC</span>|<span>同行车牌</span>|<span>IMSI比对</span>|<span>IMEI比对</span>|<span>手机号</span></p>
                    <a href="javascript:void(0)" onclick="Anchor()"></a>
                </div>
            `
    $('#operate').html(html).toggleClass('hide').css({
        width:'763px'
    })
})


var tabdata = [
    {
        "imsi":"460028684227868",
        "imei":"386778867533230",
        "phone": "13892330021",
        "address":["龙头市转盘路口A","龙头市转盘路口B","龙头市转盘路口C"],
        "time":["10", "20", "1"],
        "sign":"移动"
    },
    {
        "imsi":"460028684227867",
        "imei":"386778867533231",
        "phone": "13892330022",
        "address":["黄花园大桥A","黄花园大桥B","黄花园大桥C"],
        "time":["3", "15", "2"],
        "sign":"移动"
    },
    {
        "imsi":"460028684227867",
        "imei":"386778867533231",
        "phone": "13892330022",
        "address":["江北城A","江北城B"],
        "time":["3", "10"],
        "sign":"移动"
    },
    {
        "imsi":"460028684227860",
        "imei":"386778867533232",
        "phone": "13892330522",
        "address":["南坪轻轨站A出口","南坪轻轨站B出口","南坪轻轨站C出口"],
        "time":["9", "12","30"],
        "sign":"联通"
    },
    {
        "imsi":"460028684267860",
        "imei":"386978867533232",
        "phone": "13892330122",
        "address":["红土地A","红土地B"],
        "time":["9", "30"],
        "sign":"电信"
    },
    {
        "imsi":"460028684267060",
        "imei":"386978867533232",
        "phone": "13892330322",
        "address":["红旗河沟A","红旗河沟B"],
        "time":["9", "11"],
        "sign":"电信"
    },
    {
        "imsi":"460028684267020",
        "imei":"386978867563232",
        "phone": "13892330722",
        "address":["观音桥","北城天街","九街"],
        "time":["9", "11","20"],
        "sign":"电信"
    }
];
$('#listBtn').delegate('button','click',function(){
    $(this).addClass('act').siblings().removeClass('act')
    var index=$(this).index()
    $('#operate').addClass('hide')
    switch (index) {
        case 1:
            createUl()
            $('.layui-form').remove();
            break
        case 2:
            cols = [[
                {field:'imsi', width:150, title: 'IMSI', event: 'showCrvue'}
                ,{field:'phone', width:100, title: '电话', event: 'showCrvue'}
                ,{field:'sign', title: '运营商', event: 'showCrvue'}
                ,{field:'times', width:140, title: '次数', event: 'showCrvue'}
                ,{field:'days', title: '天数', width: '100', event: 'showCrvue'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                ,{field:'spot', title: '地点数', sort: true,width: '100', event: 'showCrvue'}
                ,{field:'area', title: '区域', sort: true,width: '100', event: 'showCrvue'}

            ]];
            url = 'json/json3.json'
            createTab(cols,url)
            break
        case 0:
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
    }

})