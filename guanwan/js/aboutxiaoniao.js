/**
 * Created by hao on 2017/3/9.
 */
var GLOBAL=GLOBAL||{};
$(function(){
    $('.aboutOne111').eq($('.aboutOne111').length-1).click(function(){
       window.open("index.html")
    });
    complateSize();
    setTimeout(complateSize,1);
    $('.aboutOne111').click(function () {
        var index=$(this).index();
        if(index==3){
            GLOBAL.mouseScollIndex=4;
        }else if(index==4){
            return;
        }else {
            GLOBAL.mouseScollIndex=index+1;
        }
        //$('.aboutTop li').removeClass("aboutTopLi");
        //$(this).addClass('aboutTopLi');
        mouseScrollMove();
    });

    function complateSize(){
        $('.aboutWarp,.aboutMain,.aboutSlide').width($(window).width());
        GLOBAL.height=$(window).height()-50;
        $('.aboutWarp,.aboutMain').height($(window).height()-50);
    }
    $(window).resize(function(){
        complateSize();
        setTimeout(complateSize,1);
        mouseScrollMove();
    });

    //鼠标滚动事件
    //ie  chorme
    window.onmousewheel=mouserScoll;
    //火狐
    window.addEventListener("DOMMouseScroll",mouserScoll);

    function mouserScoll(ev){
        //判断滚轴滚动方向
        //事件对象
        var oEvent=ev||window.event;
        //兼容性问题    判断方向:ie chorme  wheelDelta      火狐  detail
        if(oEvent.wheelDelta){
            if(oEvent.wheelDelta<0){
                //向下滚动
                mouseScollDown()
            }else {
                //向上滚动
                mouseScollUp()
            }
        }else {
            if(oEvent.detail>0){
                //向下滚动
                mouseScollDown()
            }else {
                //向上滚动
                mouseScollUp()
            }
        }
    }
    GLOBAL.mouseScollIndex=0;
    var oAboutMain=$('.aboutMain');
    var oAboutSlide=$('.aboutSlide');
    //控制没2000能切换一页；
    GLOBAL.slideingTimer=null;
    GLOBAL.slideingDelay=1000;
    GLOBAL.slideingGoing=false;

    //第一次滚动，不允许翻页
    GLOBAL.isFirstSlide=true;
    GLOBAL.firstSlideTimer=null;
    //向上滚动
    function mouseScollUp(){
        if(!GLOBAL.slideingGoing){
            GLOBAL.slideingGoing=true;
            GLOBAL.slideingTimer=setTimeout(function(){
                GLOBAL.slideingGoing=false;
            },GLOBAL.slideingDelay)
        }else {
            return;
        }
        if (GLOBAL.isFirstSlide){
            if(!GLOBAL.firstSlideTimer){
                GLOBAL.firstSlideTimer=setTimeout(function(){
                    GLOBAL.isFirstSlide=false;
                    GLOBAL.firstSlideTimer=null
                },100);
            }
            return;
        }
        GLOBAL.isFirstSlide=true;
        GLOBAL.mouseScollIndex--;
        if(GLOBAL.mouseScollIndex<0){
            GLOBAL.mouseScollIndex=0;
        }
        mouseScrollMove()
    }
    //向下滚动
    function mouseScollDown(){
        if(!GLOBAL.WelcomeAnimateOver){
            return;
        }
        if(!GLOBAL.slideingGoing){
            GLOBAL.slideingGoing=true;
            GLOBAL.slideingTimer=setTimeout(function(){
                GLOBAL.slideingGoing=false;
            },GLOBAL.slideingDelay)
        }else {
            return;
        }
        if (GLOBAL.isFirstSlide){
            if(!GLOBAL.firstSlideTimer){
                GLOBAL.firstSlideTimer=setTimeout(function(){
                    GLOBAL.isFirstSlide=false;
                    GLOBAL.firstSlideTimer=null
                },80);
            }
            return;
        }
        GLOBAL.isFirstSlide=true;
        GLOBAL.mouseScollIndex++;
        if(GLOBAL.mouseScollIndex>oAboutMain.length-1){
            GLOBAL.mouseScollIndex=oAboutMain.length-2;
        }
        mouseScrollMove()
    }
    function mouseScrollMove(){
        oAboutSlide.animate({top:GLOBAL.mouseScollIndex*-GLOBAL.height});
        $('.aboutOne111').eq(GLOBAL.mouseScollIndex).addClass('aboutTopLi');


    if(GLOBAL.mouseScollIndex==0||GLOBAL.mouseScollIndex==1){
        $('.aboutOne111').removeClass("aboutTopLi");
        $('.aboutOne111').eq(0).addClass('aboutTopLi');
    }else if(GLOBAL.mouseScollIndex==4){
        $('.aboutOne111').removeClass('aboutTopLi');
        $('.aboutOne111').eq(3).addClass('aboutTopLi');
        $('.aboutOne111').eq(4).addClass('aboutTopLi');
    }
    else {
        $('.aboutOne111').removeClass("aboutTopLi");
        $('.aboutOne111').eq(GLOBAL.mouseScollIndex-1).addClass('aboutTopLi');
    };
    }
    GLOBAL.WelcomeAnimateOver=false;
    doWelcomeAnimate();
    function doWelcomeAnimate(){
        setTimeout(function(){
            $('.aboutOneImg').animate({top:"0"},function(){
                $('.aboutOneMove').each(function(index){
                    var $this=$(this);
                    setTimeout(function(){
                        $this.show().addClass("animated fadeInUp")
                    },200*index)
                })
            })
        },4500);
        setTimeout(function(){
            $(".aboutOne").slideUp();
            GLOBAL.WelcomeAnimateOver=true;
        },8000);
    }
    $('.aboutOne').dblclick(function(){
        $(".aboutOne").slideUp();
        GLOBAL.WelcomeAnimateOver=true;
    });

    //当动画结束之前，滚轮能够操纵轮播图
    //当屏幕放大或者缩小时，能够修正到正确位置
    //导航
    //双击
    (function () {
        var index=0;
        aaa();
        $('.aboutOnePrev').click(function(){
            if(index<=0){
                return
            }
            index--;
            aaa();
            $('.aboutOneBanner').fadeOut(500).eq(index).fadeIn(1000);
        });
        $('.aboutOneNext').click(function(){
            if(index>=$('.aboutOneBanner').length-1){
                return
            }
            index++;
            aaa();
            $('.aboutOneBanner').fadeOut(500).eq(index).fadeIn(1000);
        });
        function aaa(){
            if(index<=0){
                $('.aboutOnePrev').css("opacity","0.5");
            }else {
                $('.aboutOnePrev').css("opacity","1");
            }
            if(index>=$('.aboutOneBanner').length-1){
                $('.aboutOneNext').css("opacity","0.5");
            }else {
                $('.aboutOneNext').css("opacity","1");
            }
        }
    })();
    (function(){
        var index=0;
        $('.aboutOneR').click(function(){
            if(index>=$('.aboutOneTxt2').length-1){
                return
            }
            index++;
            $('.aboutOneTxt2').fadeOut(500).eq(index).fadeIn(1000);
            $('.aboutOneL .aboutOneBlue').animate({right:-78},1000);
            setTimeout(function(){
                $('.aboutOneR .aboutOneBlue').animate({left:0},1000);
            },500)
        });
        $('.aboutOneL').click(function(){
            if(index<=0){
                return
            }
            index--;
            $('.aboutOneTxt2').fadeOut(500).eq(index).fadeIn(1000);
            $('.aboutOneR .aboutOneBlue').animate({left:-78},1000);
            setTimeout(function(){
                $('.aboutOneL .aboutOneBlue').animate({right:0},1000);
            },500)
        })
    })();


    //确定到底点击了那一页
    (function(){
    var index=location.hash.substr(1);
    //  如果存在页码，则跳过欢迎页
    if(index){
        //取消蓝色欢迎页
        $('.aboutOne').hide();
        GLOBAL.doWelcomeAnimateOver=true;
        GLOBAL.mouseScollIndex=index;
        mouseScrollMove();
    }
    })();
});