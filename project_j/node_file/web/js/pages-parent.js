// "use strict";

var openWin;
function openWindow(i) {
    var number = test[i].Number;
    var price = test[i].price;
    var UserName = test[i].UserName;
    var Mdate = test[i].Mdate;

    // window.name = "부모창 이름"; 
    window.name = "parentForm";
    // window.open("open할 window", "자식창 이름", "팝업창 옵션");
    openWin = window.open("./pages-productbill.html?a="+number+"&b="+price+"&c="+UserName+"&d="+Mdate, "childForm", "width=1024, height=768, resizable = no, scrollbars = no");
    //setChildText();
}