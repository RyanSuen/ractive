/**
 * Created by landow hp3 on 2014/12/2.
 */

require.config({
    baseUrl: '../',
    paths: {
        'jQuery': 'lib/jquery',
        'ractive': 'lib/ractive',
        'autocomplete': 'lib/jquery.autocomplete',
        'index': 'js/moduleJS/index'
    }
});

define([
    'ractive', 'index',    //模块依赖
    'jQuery'    //文件加载
],
function(ractive, index) {
    function Main() {
        $(function() {
            index.load('container', '#template', '101280102');
        });
    }
    return {
        Main: Main
    };
});