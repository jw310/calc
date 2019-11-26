let tempstr = '0';  // 紀錄運算字串
let calcstr = ''; // 數字暫放字串
let answerstr = '';  // 顯示答案
let isAnswer = false; // 處理按完等於之後的狀況

$('.button').click(function() {  // 選取類別 button 的元素
let text = $(this).text();   // 取得 $(this)是當下按下的那個按鈕的 dom 實體的text 例如：1-9 運算鍵
    //console.log(text);   // 測試有沒有抓到 text 值 
    //console.log(typeof(text));  // text 是 string
if (isAnswer) {
    calcstr = '';
    tempstr = '0';
    isAnswer = false;
}
    // 00 情況處理
if ( calcstr === '0' && text === '0') {
        return ;
} 

    // 有輸入數字而且不是運算子
if ( text !== '' && !$(this).hasClass('op') && !$(this).hasClass('equal') && !$(this).hasClass('slice')){
    calcstr += text;
    answerstr = calcstr;
} else if ( $(this).hasClass('op') && calcstr !== '' ) //如果 text 是運算子且calcstr不是空字串的話
{
    if ( tempstr != 0) {
        tempstr += calcstr;
    } else {
        tempstr = calcstr;
    }
    switch(text) {
        case '+':
            op = '+';
            break;
        case '-':
            op = '-';
            break;
        case 'x':
            op = '*';
            break;
        case '÷':
            op = '/';
            break;
    }
       tempstr += op;
       calcstr = '';
} else if ( text === "⌫"){
    answerstr = answerstr.slice(0,-1);  // 字串處理退一位
} else if ( text === "=" ){
    tempstr += calcstr;
    let answer = eval(tempstr);  // 字串運算完，是數值
    calcstr = `${answer}`;  // 轉成字串型態
    answerstr = calcstr;
    isAnswer = true;
}
if ( text === "AC") {   // 狀態歸零
    tempstr = '0';
    calcstr = '';
    answerstr = '';
}
//  在 calc 顯示 text 的內容  jQuery text() 用法  乘除號置換，加上千分位 , 正規式
$('.calc').text(tempstr.replace(/\*/g, '×').replace(/\//g, '÷').replace(/\B(?=(\d{3})+(?!\d))/g, ","));

if (answerstr.indexOf(".") === -1) { // 如果字串沒有包含小數點,加上千分號
$('.answer').text(answerstr.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); 
   } else {  
    $('.answer').text(answerstr);
}
 

});

// $('.real').css('font-size', '56px');
// while(($('.real')[0].scrollWidth) > $('.real').width()) {
// 	var fontSize = $('.real').css('font-size').slice(0, -2);
// 	fontSize = parseInt(fontSize);
// 	fontSize -= 2;
// 	$('.real').css('font-size', fontSize + 'px');
// }
// });


// isNaN() 判斷是不是數值  NaN 基本上只要結果不是數值的就是NaN，但有一些「特別的」例外，例如空字串或真假(true/false)
// .replace(/\*/g, '×').replace(/\//g, '÷').replace(/\B(?=(\d{3})+(?!\d))/g, ",")) 
// 乘除號轉換跟千分位加逗號  str.replace(regexp|substr, newSubstr|function)  g表示Global ，並導致replace呼叫替換所有匹配，而不僅僅是第一個。
// 用 if 條件式去做點擊後的字串累加,如果沒有的話就只有產生一次而已