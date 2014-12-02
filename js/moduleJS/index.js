/**
 * Created by landow hp3 on 2014/12/2.
 */
define([
    'ractive','autocomplete'
], function(ractive) {

    var Index = {},
        ractiveData = {},
        indexView = null;

    //页面加载
    Index.load = function(el, template, cityCode) {

        //准备数据
        this.initData(el, template, cityCode);
    };

    //准备数据
    Index.initData = function(el, template, cityCode) {
        $.when($.ajax({
            url: 'http://wthrcdn.etouch.cn/weather_mini?citykey=' + cityCode,
            type: 'GET'
        })).done(function(data) {
            ractiveData = $.parseJSON(data);
            ractiveData.cityCode = cityCode;
            //初始化视图
            Index.initIndex(el, template);
            Index.bindEvent();
        });
    };

    //初始化视图
    Index.initIndex = function(el, template) {
        indexView = new Ractive({
            el: el,//'container',
            template: template,//'#template',
            data:ractiveData

        });
    };

    //绑定事件
    Index.bindEvent = function() {
        indexView.on({
            'index.show.forecast' : Index.event.showForecast,
            'index.change.city': Index.event.changeCity,
            'city.autocomplete': Index.event.inputFocus
        });
    };

    //存放页面事件
    Index.event = {};
    Index.event.showForecast = function(event) {
        var e = window.event || event.original,
            target = e.srcElement || e.target;
        $("#show-forecast").toggle('linear');

    };
    Index.event.changeCity = function(event) {
        var e = window.event || event.original,
            target = e.srcElement || e.target,
            cityCode = $(target).val();
        ractiveData.cityCode = cityCode;

        Index.initData('container', '#template', cityCode);

    };
    Index.event.inputFocus = function(event) {
        console.log('我可以响应得到焦点事件！');
        var e = window.event || event.original,
            target = e.srcElement || e.target;
        var cityName = ['北京','深圳', '南京', '上海'];
        /*$(target).autocomplete(cityName, {
                minChars: 0, //双击空白文本框时显示全部提示数据
                formatItem: function(data, i, total) {
                    return "<I>" + data[0] + "</I>"; //改变匹配数据显示的格式
                },
                formatMatch: function(data, i, total) {
                    return data[0];
                },
                formatResult: function(data) {
                    return data[0];
                }
            }).result(SearchCallback); //选中匹配数据中的某项数据时，调用插件的result()方法
        //自定义返回匹配结果函数
        function SearchCallback(event, data, formatted) {
            $("#divData").html("您的选择是：" + (!data ? "空" : formatted));
        }
        //点击"查一下"按钮后，触发插件的search()方法 ，调用绑定的result(ftn)方法。
        $("#btnSearch").click(function() {
            $("#txtSearch").search();
        });*/
    };

    return Index;
});