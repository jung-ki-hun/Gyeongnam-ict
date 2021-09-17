function _GET(search) {
    var obj = {};
    var uri = decodeURI(search);
        uri = uri.slice(1,uri.length);

    var param = uri.split('&');
    
    for (var i = 0; i < param.length; i++) {
        var devide = param[i].split('=');
        obj[devide[0]] = devide[1];
    }

    return obj;
}

window.onload = function () {
    var search = window.location.search;
    var getData =  _GET(search);
    document.getElementById("div_number").innerHTML = `<h4 class="pull-right font-16"><strong>주문번호 : #${getData.a}</strong></h4>
    <h3 class="m-t-0">
        <img src="assets/images/1logo.png" alt="logo" height="26"/>
    </h3>`;

    document.getElementById("div_Date").innerHTML = `<address><strong>Order Date:</strong><br>${getData.d}<br><br></address>`;

    document.getElementById("div_total").innerHTML = `<table class="table">
    <thead>
    <tr>
        <td><strong>Item</strong></td>
        <td class="text-right"><strong>Totals</strong></td>
    </tr>
    </thead>
    <tbody>
  
    <tr>
        <td>${getData.c}</td>
        <td class="text-right">${getData.b}&nbsp;&#8361;</td>
    </tr>
    
    <tr>
        <td class="no-line"></td>
        <td class="no-line"></td>
        <td class="no-line text-center">
            <strong>Total</strong></td>
        <td class="no-line text-right"><h4 class="m-0">${getData.b}&nbsp;&#8361;</h4></td>
    </tr>
    </tbody>
</table>`;



    // var sender = document.getElementById('tttest');
    // sender.value = getData.val;

}