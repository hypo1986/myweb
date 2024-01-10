/**
 * hypo1986 common.js
 */
$(function(){

    LeftDialog.init();
    //logDataRender.init();
})

//左侧 标题目录 弹层
var LeftDialog = {
    init:function(){
        this.leftMenuTpl = $('.left-menu-tpl');
        this.leftMenuTitle = $('.lm-title',this.leftMenuTpl);
        this.leftMenuIcon = $('.ico-down',this.leftMenuTitle);
        var that = this;
        $('.menu-el').click(function(evt){
            that._show();
            evt.preventDefault();
            //$(document).on('touchmove', function (e) { e.preventDefault(); });
        });
        $('#tlDiaClose,.tm-left-overlay').click(function(evt){
            that._hide();
            evt.preventDefault();
            //$(document).off('touchmove');
        });

    },
    _show:function(){
        $('.tm-left-overlay').show();
        $('.tm-left-dialog').animate({'left':'0'});
    },
    _hide:function(){
        $('.tm-left-overlay').hide();
        $('.tm-left-dialog').animate({'left':'-200px'});
    }
}

//日志加载json
/*var logDataRender = {
    init:function(){
        this.logWrap = $('.log-wrap');
        var that = this;
        $.getJSON("data/list.txt",function(responseData){
            if(responseData.success){ 
                var title = responseData.rows[0].title,
                    date = responseData.rows[0].date,
                    desc = responseData.rows[0].desc;
                var titleHtml = $('.ml-title',that.logWrap),
                    dateHtml = $('.ml-date',that.logWrap),
                    textHtml = $('.ml-text',that.logWrap);  
                titleHtml.html(title); 
                dateHtml.html(date);
                textHtml.html(desc);    
            }
        });
        // $.ajax({
        //     "type":"get",
        //     "data":{},
        //     'datatype': "json",
        //     "url":"data/list.json?t=" + Math.random(),
        //     "success":function(responseData){
        //         alert(2);  
        //         if(responseData.success){
                      
        //             var title = responseData.rows[0].title,
        //                 date = responseData.rows[0].date,
        //                 desc = responseData.rows[0].desc;
   
        //             var titleHtml = $('.lm-title',that.logWrap),
        //                 dateHtml = $('.lm-date',that.logWrap),
        //                 textHtml = $('.lm-text',that.logWrap);  
        //             titleHtml.html(title); 
        //             dateHtml.html(date);
        //             textHtml.html(desc);    
        //         }
        //     }
        // });
    }
}*/