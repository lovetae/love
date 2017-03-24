var GLOBAL=GLOBAL||{};
$(function(){
    $(".header").load("header.html");
    $(".footer").load("footer.html");
    //alert(getUrlParams("articleid"));
    //alert(getUrlParams("type"));
    GLOBAL.articleid=getUrlParams("articleid");
    GLOBAL.type=getUrlParams("type");

    loadArticleData();

    var arrayRanSkip=["娘娘威武","皇上万岁，万万岁","爱死你啦、MUA~","再点一下试试~"];
    GLOBAL.firstClick=true;//表示第一次点击

    $(".xin").click(function(){
        //判断是否是第一次点击
        if(GLOBAL.firstClick){
            GLOBAL.firstClick=false;
            var index=Math.floor(Math.random()*arrayRanSkip.length);
            var content=arrayRanSkip[index];
            $(".xin_tips").html(content);
            doMove();
        }else if( $(".xin_tips").html()=="再点一下试试~"){
            $(".xin_tips").html("让你点，你就点哈。。");
            doMove();
        }
        //不是第一次   再点一下试试
    });
    function doMove(){
           //让小块移动到上面
        $(".xin_tips").animate({top:0,opacity:1},600,"elasticOut")
            .delay(600)
            .animate({left:-400,opacity:0},600,"backIn",function(){
                $(".xin_tips").css({top:370,left:258});
                $(".xin").css({"background-position":"0 -73px"})
            })
    }

    //var name="articleid";

    //方法1
    // var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");

    //方法2  new  RegExp();
    //   var rex="c";
    //   new RegExp(rex);

    //json.constructor()
    //json[""]
});
function loadArticleData(){
    if(GLOBAL.type){
        //可以将json文件转换成php   通过ajax请求
    var articleData1=articleData[GLOBAL.type+GLOBAL.articleid];
        //alert(JSON.stringify(articleData1));
        $("#title_big").html(articleData1.data.typeTitle);
        $("#typeEntitle").html(articleData1.data.typeEntitle);
        $("#title_list").html(articleData1.data.title);
        $("#auther").html(articleData1.data.creatByFullName);
        $("#cover").attr("src",articleData1.data.coverImg);
        $("#content").html(articleData1.data.content);
    }
}




//获取页面url传过来的参数
function getUrlParams(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return  r[2];
    else
        return "";
}