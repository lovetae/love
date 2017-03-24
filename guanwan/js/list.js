/**
 * Created by hao on 2017/3/9.
 */
var GLOBAL=GLOBAL||{};
$(function(){
    $('.header').load('header.html');
    $('.footer').load('footer.html');
    //pen的动画
    (function(){
        $('.aboutCompany_list_pen').click(function(){
            $('.aboutCompany_list').css({'width':'200px','background-position-x':' -800px'})
                .stop().animate({'width':'1100px','background-position-x':' 0'},1000)
        })
    })();
    (function(){
        var oRight=$('.right');
        var oTop=oRight.find('.right_top');
        $(window).scroll(function(){
            if($(this).scrollTop()>500){
                oRight.fadeIn()
            }else {
                oRight.fadeOut(0)
            }
        });
        oTop.click(function(){
            $(this).parent().animate({"bottom":1000,"opacity":0},400,function(){
                oRight.css("opacity",1).fadeOut(0).css("bottom",200);
            });
            $('body,html').animate({
                scrollTop:0
            },400)
        })
    })();
    loadArticleList();
    $('.aboutCompany_click_bottom').click(function(){
        if(GLOBAL.pageStart<GLOBAL.pageCount){
            loadArticleList();
        }
    });
});
function loadArticleList(){
    //第一次加载数据     将列表清空
    if(!GLOBAL.pageStart){
        GLOBAL.pageStart=0;
        $('.aboutCompany_content').html("");
    }
    //var result=listData["listData0"+GLOBAL.pageStart];
    //var list=result.data.list;
    //if(!list||!list.length){
    //    $('.aboutCompany_click_bottom').html('没有数据可以加载');
    //}
    //for(var i=0;i<list.length;i++){
    //    var model=$('#model').html();
    //    model=model.replace("$articleID$",list[i].sysId)
    //        .replace("$articleCover$",list[i].coverImg)
    //        .replace("$articleTitle$",list[i].title)
    //        .replace("$articleTime$",list[i].creatAt)
    //        .replace("$describe$",list[i].describe);
    //    $('.aboutCompany_content').append(model)
    //}
    //GLOBAL.pageStart++;
    ////判断是否有数据可以继续加载
    //var count=result.data.count;
    //GLOBAL.pageCount=Math.ceil(count/result.data.pageSize);
    //
    //if(GLOBAL.pageStart>=GLOBAL.pageCount){
    //    $('.aboutCompany_click_bottom').fadeTo(100,0.3);
    //
    //}

    $.ajax({
//        url:"http://localhost/phph.php",//自己的
        url:"http://localhost/php.php",
        type:"get",
        data:{
            page:GLOBAL.pageStart
        },
        success:function(data){
            //alert(typeof data);
            //string->json
            showData(JSON.parse(data));
        }
    });
    $(".aboutCompany_content").delegate(".aboutCompany_content_c","click",function(){
        var articleId=$(this).attr("articleid");
        window.open("article1.html?articleid="+articleId+"&type=xiaoniaoNews");
    });
}
function showData(data){
    var list=data.data.list;
    for(var i=0;i<list.length;i++){
        //获取模板
        var modal=$("#model").html();

    //updateTime=list[i].creatAt||list[i].updateDateTime();
        modal=modal.replace("$articleID$",list[i].sysId)
            .replace("$articleCover$",list[i].coverImg)
            .replace("$articleTitle$",list[i].title)
            .replace("$describe$",list[i].describe)
            .replace("$articleTime$",list[i].creatAt);
        $(".aboutCompany_content").append(modal);
    }
    GLOBAL.pageStart++;
    var count=data.data.count;
    GLOBAL.pageCount=Math.ceil(count/data.data.pageSize);
}