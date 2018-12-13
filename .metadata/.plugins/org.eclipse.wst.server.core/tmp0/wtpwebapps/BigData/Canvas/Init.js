var connectorPaintStyle = {                                                          //基本连接线样式
    lineWidth: 1,                   //线宽2
    strokeStyle: "#61B7CF",         //划线颜色
    joinstyle: "round",             //
    outlineColor: "white",          //
    outlineWidth: 0                 //
};
var connectorHoverStyle = {                                                         // 鼠标悬浮在连接线上的样式
    lineWidth: 3,                   //线宽3
    strokeStyle: "#216477",         //划线颜色
    outlineColor: "white",          //
    outlineWidth: 0,                //
};
var origin = {                                                                      //起点（使用时应该加上uuid，方便链接识别）
    endpoint: ["Dot", { radius: 8 }],               //起点的形状
    connectorStyle: connectorPaintStyle,            //连接线的颜色，大小样式
    connectorHoverStyle: connectorHoverStyle,       //
    paintStyle: {
        strokeStyle: "#000",                     //起点的颜色样式
        fillStyle: "white",
        radius: 4,
        lineWidth: 1
    },                                                  
    isSource: true,                                 //是否可以拖动（作为连线起点）
    connector: ["Bezier", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],                   //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
      
    isTarget: false,                                //是否可以放置（连线终点）
    maxConnections: -1,                             // 设置连接点最多可以连接几条线,-1表示无限大
    connectorOverlays: [[
        "Arrow",
        { width: 5, length: 15, location: 0.55 }
    ], ["Label", { location: 0.7 }] ],
    cssClass: 'originStyle'
};
var destination = {                                                                 //终点（使用时应该加上uuid，方便链接识别）
    endpoint: ["Dot", { radius: 5 }],           //端点的形状
    connectorStyle: connectorPaintStyle,        //连接线的颜色，大小样式
    connectorHoverStyle: connectorHoverStyle,
    paintStyle: { lineWidth: 1, radius: 4, fillStyle: "white", strokeStyle: "#000" },      //端点的颜色样式
    isSource: false,                            //是否可以拖动（作为连线起点）
    connector: ["Bezier", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],

    isTarget: true,                         //是否可以放置（连线终点）
    maxConnections: 1,                     // 设置连接点最多可以连接几条线,-1表示无限大
    connectorOverlays: [["Arrow", { width: 5, length: 15, location: 0.55 }], ["Label", { location: 0.7 }]  ],
    cssClass: 'originStyle',
    uniqueEndpoint : true,          //到底是。。？
};


var property = {
    width: $('#instance').parent().width(),                         //设置画板的宽和高
    height: $('#instance').parent().width() * 4 / 7,
    useOperStack: true,                                             //是否开启返回重做（可能会有bug）
    origin: origin,                                                 //起点样式
    destination: destination,                                       //终点样式
    initNum: 1,
    saveUrl:"/modelAccept",
};


var instance;
var resData = {};
$(document).ready(function () {
    jsPlumb.ready(function () {

        instance = $.createGooFlow($("#instance"), $("#ItemsBar"), property,Data);

        //自适应高度
        $('#Param_Panel').height($('#instance').height()-20);
        $(window).resize(function () {
            var width = $('#instance').parent().width();
            instance.reinitSize(width, width * 4 / 7);                  //重设画布大小
            $('#Param_Panel').height($('#instance').height() - 20);
        });
    });

    var menu = new BootstrapMenu('.GooFlow_item', {
        fetchElementData: function ($itemElem) {
            return $itemElem[0].id;
        },
        actions: [{
            name: '从此处运行',
            onClick: function (itemId) {
                //此处添加从此处运行的代码
            }
        }, {
            name: '运行到此处',
            onClick: function (itemId) {
                //此处添加运行到此处的代码
            }
        }, {
            name: '查看该节点数据',
            iconClass:'',
            onClick: function (itemId) {
                //查看节点数据
                showResData(itemId);
            },
            href:'www.baidu.com',
        }, {
            name: '设置',
            onClick: function () {
                alert("设置");
            }
        }]
    });

    //var bodyMenu = new BootstrapMenu('.main-container', {
    //    actions: [{
    //        name: '设置',
    //        onClick: function () {
    //            alert("设置");
    //        }
    //    }],
    //});



});