jQuery(function () {
    var falseString = ["instance_node_32", "instance_node_39"];



    var txtColumn = ['a', 'b', 'label'];
    var txtList = [
        ["4,2,4", "4,5,7","10,23,4" ] ,
        ["3, 2, 4", "4, 5, 9", "1, 23, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4", "1, 263, 4"] ,
         ["3, 2, 4", "4, 5, 7", "10, 23, 4", "1, 23, 4", "1, 23, 4"] ,
    ];



    $.mockjaxSettings.contentType = "application/json;charset=utf-8";
    $.mockjax({
        url: "model/modelAccept",
        responseText: {
            status: 200,
            isSuccess: false,
            resName: "",
            column: null,
            txtList: null,
        },
        response: function (settings) {
            //var user = eval(settings.data);
            var msg = $.parseJSON(settings.data);
            this.responseText.resName = msg.nodeName;
            for (var i in falseString) {
                if (falseString[i] == msg.nodeName) {
                    this.responseText.isSuccess = false;
                    this.responseText.resName = msg.nodeName;
                    return;
                }
            }
            this.responseText.isSuccess = true;
            this.responseText.resName = msg.nodeName;
            this.responseText.column = txtColumn;
            this.responseText.txtList = txtList[1];
            //this.responseText.isSuccess = true;
        },
        status: 200,
        responseStatus: 200,
        responseTime: 2000,
    });

    $.mockjax({
        url: "result.txt",
        response: function (settings) {
            //var user = eval(settings.data);
            var msg = $.parseJSON(settings.data);
        },
        status: 200,
        responseStatus: 200,
        responseTime: 750,
    });


});