// 輪播
var bann = function () {
    this.slideId = 1;
    this.slideObj = null;
    this.slideMax = 0;
    this.slidePlayer = new Array();
    this.slideWaiting = 10;
};
bann.prototype.ez2o_Banner_Slide = function (obj) {
    var objThis = this;
    var li_len = 0;

    objThis.slideObj = obj;
    li_len = objThis.slideObj.find("ul li").length;
    objThis.slideObj.find("ul").css({ "width": (li_len + 1) * 100 + "%" });
    objThis.slideObj.find("ul li").css({ "width": 100 / (li_len + 1) + "%" });

    console.log(objThis.slideObj);
    if (li_len > 1) {
        objThis.slideObj.find(".left, .right").show("slow");
        var dotstr = "<ol>";
        for (var x = 0; x < li_len; x++) {
            dotstr += "<li><a href=\"javascript:void(0)\" class=\"" + (x === 0 ? "active" : "") + "\" data-id=\"" + x + "\"></a></li>";
        }
        dotstr += "</ol>";
        objThis.slideObj.append(dotstr);
        objThis.slideObj.find("ol li a").click(function () {
            objThis.slideId = parseInt($(this).data("id"), 10);
            objThis.slideObj.find(".right").click();
        });
        objThis.slideObj.find("ul").append(objThis.slideObj.find("ul li:eq(0)")[0].outerHTML);
        objThis.slideMax = li_len+1;
        var x = 0;
        objThis.slideObj.find(".videoiframe").each(function () {
            x++;
            $(this).find(".videoplayer").attr("id", "videoplayer" + x);
            if (isMobile.any()) $(this).find(".playbutton").hide();
        });
        objThis.slideObj.find(".right").click(function () {
            objThis.slideId++;
            if (objThis.slideId >= objThis.slideMax) {
                objThis.slideId = objThis.slideMax;
                var w = (objThis.slideId - 1) * -100 / (li_len + 1);
                objThis.slideObj.find("ul").css({ "-webkit-transform": "translate(" + w + "%, 0)", "-ms-transform": "translate(" + w + "%, 0)", "transform": "translate(" + w + "%, 0)" });
                objThis.slideId = 1;
                w = (objThis.slideId - 1) * -100 / (li_len + 1);
                objThis.slideObj.find("ol li a").removeClass("active");
                objThis.slideObj.find("ol li:eq(" + (objThis.slideId - 1) + ") a").addClass("active");
                setTimeout(function () {
                    objThis.slideObj.find("ul").css({ "-moz-transition-duration": "0s", "-webkit-transition-duration": "0s", "-o-transition-duration": "0s", "transition-duration": "0s", "-webkit-transform": "translate(" + w + "vw, 0)", "-ms-transform": "translate(" + w + "vw, 0)", "transform": "translate(" + w + "vw, 0)" });
                    setTimeout(function () {
                        objThis.slideObj.find("ul").css({ "-moz-transition-duration": "0.5s", "-webkit-transition-duration": "0.5s", "-o-transition-duration": "0.5s", "transition-duration": "0.5s" });
                    }, 100);
                }, 500);
            }
            else {
                var w = (objThis.slideId - 1) * -100 / (li_len + 1);
                objThis.slideObj.find("ul").css({ "-webkit-transform": "translate(" + w + "%, 0)", "-ms-transform": "translate(" + w + "%, 0)", "transform": "translate(" + w + "%, 0)" });
                objThis.slideObj.find("ol li a").removeClass("active");
                objThis.slideObj.find("ol li:eq(" + (objThis.slideId - 1) + ") a").addClass("active");
            }
        });
        objThis.slideObj.find(".left").click(function () {
            objThis.slideId--;
            if (objThis.slideId < 1) {
                objThis.slideId = objThis.slideMax;
                var w = (objThis.slideId - 1) * -100 / (li_len + 1);
                objThis.slideObj.find("ul").css({ "-moz-transition-duration": "0s", "-webkit-transition-duration": "0s", "-o-transition-duration": "0s", "transition-duration": "0s", "-webkit-transform": "translate(" + w + "%, 0)", "-ms-transform": "translate(" + w + "%, 0)", "transform": "translate(" + w + "%, 0)" });
                objThis.slideId--;
                w = (objThis.slideId - 1) * -100 / (li_len + 1);
                objThis.slideObj.find("ol li a").removeClass("active");
                objThis.slideObj.find("ol li:eq(" + (objThis.slideId - 1) + ") a").addClass("active");
                setTimeout(function () {
                    objThis.slideObj.find("ul").css({ "-moz-transition-duration": "0.5s", "-webkit-transition-duration": "0.5s", "-o-transition-duration": "0.5s", "transition-duration": "0.5s", "-webkit-transform": "translate(" + w + "%, 0)", "-ms-transform": "translate(" + w + "%, 0)", "transform": "translate(" + w + "%, 0)" });
                }, 100);
            }
            else {
                var w = (objThis.slideId - 1) * -100 / (li_len + 1);
                objThis.slideObj.find("ul").css({ "-webkit-transform": "translate(" + w + "%, 0)", "-ms-transform": "translate(" + w + "%, 0)", "transform": "translate(" + w + "%, 0)" });
                objThis.slideObj.find("ol li a").removeClass("active");
                objThis.slideObj.find("ol li:eq(" + (objThis.slideId - 1) + ") a").addClass("active");
            }
        });
        setInterval(function () {
            if (objThis.slideWaiting > 0) {
                objThis.slideWaiting--;
            } else {
                objThis.slideWaiting = 10;
                objThis.slideObj.find(".right").click();
            }
        }, 1000);
    }
}
$(function () {
    var bannersItem_len = $(".bannersBox .bannersItem");

    for (let i = 0; i < bannersItem_len.length; i++) {
        a = new bann();
        a.ez2o_Banner_Slide( bannersItem_len.eq(i) );
    }
});
// 輪播 end