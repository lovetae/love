/**
 * Created by hao on 2017/3/9.
 */
$(function(){
    $('header').load('header.html');
    $('.footer').load('footer.html');

    //主banner开始
    (function () {
        var oBanner=$('.banner_box');
        var arrBannerOne=oBanner.find('.banner');
        var arrNav=oBanner.find('.banner_li1');
        var oNext=oBanner.find('.next');
        var oPrev=oBanner.find('.prev');
        var index=0;
        arrNav.click(function(){
            index=$(this).index();
            arrBannerOne.stop().fadeOut().eq(index).fadeIn();
            arrNav.find('div').removeClass('banner_now');
            arrNav.find('div').eq(index).addClass('banner_now');
            animate()
        });
        oNext.click(function(){
            index++;
            if(index>2){
                index=0
            }
            arrNav.find('div').removeClass('banner_now');
            arrNav.find('div').eq(index).addClass('banner_now');
            arrBannerOne.stop().fadeOut().eq(index).fadeIn();
            animate()
        });
        oPrev.click(function(){
            index--;
            if(index<0){
                index=2
            }
            arrNav.find('div').removeClass('banner_now');
            arrNav.find('div').eq(index).addClass('banner_now');
            arrBannerOne.stop().fadeOut().eq(index).fadeIn();
            animate()
        });
        animate();
        function animate(){
            arrBannerOne.eq(index).find("img").hide();
            arrBannerOne.eq(index).find('.banner_img1').show().addClass('animated fadeInLeft');
            setTimeout(function(){
                arrBannerOne.eq(index).find('.banner_img2').show().addClass('animated fadeInRight');
                arrBannerOne.eq(index).find('.banner_img3').show().addClass('animated fadeIn');
            },500)
        }
    })();
    //主banner结束
    //主要产品开始
    (function(){
        var oBanner=$('.ourWorks');
        var arrBannerImg=oBanner.find('.ourWorks_banner_img');
        var arrBannerOne=oBanner.find('.ourWorks_banner_one');
        var arrNav=oBanner.find('.ourWorks_bannerbox ul li');
        var oNext=oBanner.find('.next');
        var oPrev=oBanner.find('.prev');
        var index=0;
        arrNav.click(function(){
            var active='';
            if($(this).index()>index){
                active='fadeInLeft'
            }else {
                active='fadeInRight'
            }
            index=$(this).index();
            move(active)
        });
        oNext.click(function() {
            index++;
            if (index >= arrNav.length) {
                index = 0
            }
            move('fadeInLeft')
        });
        oPrev.click(function() {
            index--;
            if (index <0) {
                index = arrNav.length-1
            }
            move('fadeInRight')
        });
        function move(action){
            arrBannerImg.find('img').hide().eq(index).show();
            arrBannerOne.hide().eq(index).show();
            arrNav.removeClass('ourWorks_li1').eq(index).addClass('ourWorks_li1');
            arrBannerImg.find('img').removeClass('fadeInRight fadeInLeft').eq(index).addClass('animated '+action);
            arrBannerOne.removeClass('fadeInRight fadeInLeft').eq(index).addClass('animated '+action);
        }
    })();
    //主要产品结束
    //业务范围的开始
    (function(){
        $('.business_0 .business_03,.business_0 .business_05').hover(
            function(){
                $(this).addClass("tada animated")
            },
            function(){
                $(this).removeClass("tada animated")
            }
        );
        $('.business_0 .business_03').click(function(){
            var index=$(this).index('.business_0 .business_03');
            if($('.business_0').eq(index).hasClass('show')){
                $('.business_06').slideUp(300);
                $('.business_0').removeClass('show');
                $('.business_0 .business_05').removeClass('zhankai');
            }else {
                $('.business_0').removeClass('show').eq(index).addClass('show');
                $('.business_0 .business_05').removeClass('zhankai').eq(index).addClass('zhankai');
                $('.business_06').slideUp(300).eq(index).delay(300).slideDown(300);
            }
        });
        $('.business_0 .business_05').click(function(){
            var index=$(this).index('.business_0 .business_05');
            if($('.business_0').eq(index).hasClass('show')){
                $('.business_06').slideUp(300);
                $('.business_0').removeClass('show');
                $('.business_0 .business_05').removeClass('zhankai');
            }else {
                $('.business_0').removeClass('show').eq(index).addClass('show');
                $('.business_0 .business_05').removeClass('zhankai').eq(index).addClass('zhankai');
                $('.business_06').slideUp(300).eq(index).delay(300).slideDown(300);
            }
        })
    })();
    //业务范围的结束
    (function(){
        var oOurTeam=$('.ourTeam');
        var arrNav=oOurTeam.find('.ourTeam_li').find('li');
        var arrCon=oOurTeam.find('.ourTeam_con');
        var arrC=oOurTeam.find('.ourTeam_c');
        var oNext=oOurTeam.find('.next');
        var oPrev=oOurTeam.find('.prev');
        var index=0;
        oNext.click(function(){
            index++;
            if(index>arrNav.length-1){
                index=0;
            }
            arrCon.stop().animate({left:100}).delay(100).animate({left:-1100},function(){
                arrCon.find('.ourTeam_content').first().appendTo(arrCon);
                arrCon.css("left",0);
                arrNav.find('div').removeClass("ourTeam_now");
                arrNav.eq(index).find('div').addClass("ourTeam_now");
            })
        });
        oPrev.click(function(){
            index--;
            if(index<0){
                index=arrNav.length-1;
            }
            arrCon.find('.ourTeam_content').last().prependTo(arrCon);
            arrCon.css("left",-1130);
            arrCon.stop().animate({left:-1230}).delay(100).animate({left:0},function(){
                arrNav.find('div').removeClass("ourTeam_now");
                arrNav.eq(index).find('div').addClass("ourTeam_now");
            })
        })
    })();
    //返回顶部的开始
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



});