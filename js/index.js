function parseQueryString(url) {
    var json = {};
    var arr = url.substr(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var tmp = item.split('=');
        json[tmp[0]] = tmp[1];

    }
    return json;
}

$(document).ready(function() {
    $('#confirm').click(function(event) {
        if (!$(this).hasClass("btn-primary")) {
            return false;
        };
        $.blockUI({
            message: $('#tip'),
            css: {
                width: "auto"
            }
        });
        event.stopPropagation();
    });
}).click(function() {
    if ($.unblockUI) {
        $.unblockUI();
    }
});

function setData(data) {
    var cardNo = data.cardNo;
    var paySum = data.paySum || 0;
    var debitSum = data.debitSum;
    $("#card").text(cardNo);
    $("#price").text('¥ ' + paySum);
    $(".jine").each(function(index, ele) {
        var fenqiSum = 0;
        if (index === 0) {
            fenqiSum = paySum / 12;
        } else if (index === 1) {
            fenqiSum = paySum / 6;
        } else {
            fenqiSum = paySum / 3;
        }
        $(ele).text(fenqiSum.toFixed(2));
    });
}

function setFenqiData() {
    getFenqiData().then(function(response) {
        // var response = {
        //     data: {
        //         cardNo: 111111,
        //         paySum: 2200,
        //         debitSum: 3
        //     }
        // }
        if (response && response.data) {
            setData(response.data);

        }
    });
}

function getFenqiData() {
    var url = window.location.href;
    var params = parseQueryString(url) || {};
    var cardNo = params.cardNo || "";
    var api = '/backend/changsha/accounts/' + cardNo;

    return $.ajax({
        url: api
    });
}

function getLinghuoFenqiData() {
    var url = window.location.href;
    var type = $("#select").val() || "";
    var params = parseQueryString(url) || {};
    var cardNo = params.cardNo || "";
    var api = '/backend/changsha/accounts/' + cardNo + '/bills?type=' + type;

    return $.ajax({
        url: api
    });
}

function setLinghuoFenqiData(callback) {
    // var response = {
    //     data: {
    //         cardNo: 111111,
    //         paySum: 2200,
    //         debitSum: 3
    //     }
    // }
    getLinghuoFenqiData().then(function(response) {
        if (response && response.data) {
            var data = response.data;
            setData(data);
            callback(data);
        }
    });
}