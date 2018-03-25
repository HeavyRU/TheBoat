var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var boatX = 350, boatY = 470, coinAng = 0, coinCount = 0, coinSpeed = 1, myTimer = 0, reversTime = 3599, scrollY = 1400
screen1 = true, screen2 = false, scrollBoatX = 0, front = true, revers = false, timeSpeed = 0, endTime = 60, sturw = 0; 

var coinArr = [];
coinArr.push ({x:350, y:100});

function menu() {
    if (screen1 == true) {
        var scr1 = new Image();
        scr1.src = "res/screen1.jpg";
        scr1.onload = function() {
            context.drawImage(scr1, 0, 0, 700, 700);
            }
        }
        if (screen2 == true) {
            var scr2 = new Image();
            scr2.src = "res/screen2.jpg";
            scr2.onload = function() {
                context.drawImage(scr2, 0, 0, 700, 700);
            }
        }
            window.onkeydown = function(event) {
                if (event.keyCode == 13) {
                    screen1 = false;
                    screen2 = false;
                    var audioW = new Audio();
                    audioW.src = "res/wind.mp3";
                    audioW.play();
                }  
                if (event.keyCode == 32)
                    screen2 = true;
                   
                        
                    
            }
}

function UI() {
    /*var reversTimeStat = document.getElementById('reversTime');
        reversTime--;
    reversTimeStat.innerHTML = "Осталось времени: " + reversTime;
    var coinStat = document.getElementById('count');
        coinStat.innerHTML = "Количество монет: " + coinCount + " из 200";
    */
   var coinCountImg = new Image();
   coinCountImg.src = "res/coinCountImg.png";
   context.drawImage(coinCountImg, -5, 500, 120, 120); 

   var clockImg = new Image();
   clockImg.src = "res/clockImg.png";
   context.drawImage(clockImg, 10, 600, 90, 90);

   var st = new Image();
   st.src = "res/st.png";
   context.save();
   context.translate(600, 600);
   context.rotate(sturw);
   context.drawImage(st, 0-100, 0-100, 200, 200); 
   context.restore();
//coinAng = coinAng + Math.PI / 360 / 2;

        if(myTimer%60 == 0)
        endTime--;
        context.fillStyle = "#800000";
        context.font = 'bold 30px sans-serif';
            context.fillText(coinCount, 28, 566);
            context.fillText(endTime, 35, 653);
}

function coin() {
    coinSpeed += 0.005;
    for (var i in coinArr) { 
        //coinSpeed += 0.0001;
        coinArr[i].y += coinSpeed;
        if (coinArr[i].x + 30 < boatX + 134 && coinArr[i].x - 30 > boatX - 134 && coinArr[i].y + 30 >= boatY - 134) {
            var audioC = new Audio();
                audioC.src = "res/coin.mp3";
                audioC.play();
                    coinArr.splice(i, 1);
                    coinCount++; 
        }
        /*if (coinCount >= 100) { //вторая стадия игры иногда сваливается в ошибку
            while (coinArr.length < 3){
                coinRandX = Math.random() * 700;
                    coinRandX = coinRandX - coinRandX % 1;
                coinRandY = Math.random() * -500;
                    coinRandY = coinRandY - coinRandY % 1;
                    coinArr.push ({x:coinRandX, y:coinRandY});              
            }
        }*/
        //if (coinCount < 100) { //первая стадия игры
            while (coinArr.length < 15) { 
                coinRandX = Math.random() * 700;
                    coinRandX = coinRandX - coinRandX % 1;
                coinRandY = Math.random() * -1000;
                    coinRandY = coinRandY - coinRandY % 1;
                    coinArr.push ({x:coinRandX, y:coinRandY});
           }
        //}

        if (coinArr[i].y > 800)
            coinArr.splice(i, 1);

                /*for (var i in coinArr){
                    if (coinArr[i].y > 800)
                    coinArr.splice(i, 1);
                 }*/
    }
}

function drawCoin(imgCoin) {
    var coin = new Image();
    coin.src = imgCoin;
    for (var i in coinArr){
        context.save();
        context.translate(coinArr[i].x, coinArr[i].y);
        context.rotate(coinAng);
        context.drawImage(coin, -coin.width/2, -coin.height/2);
        context.restore();
        coinAng = coinAng + Math.PI / 360 / 2;
    };
}

function drawBG(imgBG) {
    var bg = new Image();
        bg.src = imgBG;
        context.drawImage(bg, 0, scrollY, 700, 700, 0, 0, 700, 700);
            scrollY = scrollY - (coinSpeed - (coinSpeed%1)) / 2;
                if (scrollY <= 0)
                    scrollY = 1400;    
}

function drawBoat(imgBoat) {
    //if (timeSpeed % 2 == 0) {
    var boat = new Image();
        boat.src = imgBoat;
        context.drawImage(boat, scrollBoatX, 0, 110, 280, boatX-55, boatY-55, 110, 280);  
        if (scrollBoatX <= 1100 && front == true) {
			scrollBoatX += 110;
			if (scrollBoatX == 1100){
				front = false;
				revers = true;
			}
		}
		if (scrollBoatX <= 1100 && revers == true) {
			scrollBoatX -= 110;	
		if (scrollBoatX == 0){
				front = true;
				revers = false;
			}
		}
    }
//}

function render() {
    //context.clearRect(0, 0, 700, 700);
    
    drawBG("res/bg.jpg");
    drawBoat("res/seg.png");
    drawCoin("res/coin.jpg") 
}

function control(keyCode) {
    if (keyCode == 87) { //W 
        //boatY--;
    }
    if (keyCode == 83) { //S
        //boatY++;
    }
    if (keyCode == 65) { //A
        boatX -= 5; 
        sturw = sturw - Math.PI / 3;   
    }
    if (keyCode == 68) { //D
        boatX += 5;
        sturw = sturw + Math.PI / 3; 
    }
}

function gameOver() {
        if (coinCount <= 199) { //просрал
            var scrLOL = new Image();
                scrLOL.src = "res/screenLOL.jpg";
                scrLOL.onload = function() {
                context.drawImage(scrLOL, 0, 0, 700, 700);
                }
        } 
        if (coinCount >= 200 && coinCount < 225) { //бронза
            var scrBronz = new Image();
                scrBronz.src = "res/screenBronz.jpg";
                scrBronz.onload = function() {
                context.drawImage(scrBronz, 0, 0, 700, 700);
                }
            }
                if (coinCount >= 225 && coinCount < 250) { //серебро
                    var scrSilver = new Image();
                        scrSilver.src = "res/screenSilver.jpg";
                        scrSilver.onload = function() {
                        context.drawImage(scrSilver, 0, 0, 700, 700);
                        }
                    }
                        if (coinCount >= 250) { //золото
                            var scrGold = new Image();
                                scrGold.src = "res/screenGold.jpg";
                                scrGold.onload = function() {
                                context.drawImage(scrGold, 0, 0, 700, 700);
                                }    
                            }
                        }                

function gameLoop() {
setTimeout(function() {
    if (myTimer >= 3599)
        gameOver();

    if (myTimer < 3599) {
        if (screen1 == true || screen2 == true);
            menu();

    if (screen1 == false) {
    myTimer++;
    render();
    coin();
    UI();

    window.onkeydown = function (event) {
        control(event.keyCode);
        };
    }
}
    console.log(timeSpeed);
        window.requestAnimationFrame(gameLoop);
}, 1000/60);
}
