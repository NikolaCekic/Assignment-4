var playerStats = [];
var player = 1;
var msgArray = [[],[]];
var timeToChangeTurns = true;
//var m = [][];
var randNum;
var counter = 0;
var flag = false;

var arrayOfBodyPArts = ["tail", "ears", "eyes", "whiskers", "nose"];

for(var i = 0; i < 2; i++){
    for(var j = 0; j < 6; j++){

        //msgArray[i][j] = (j + 1) + ":";
        msgArray[i][j] = arrayOfBodyPArts[j] + " missing";
        msgArray[i][j].fontcolor("yellow");
    }
}
//alert(msgArray[1]);

for(var i = 0; i < 2; i++){

    playerStats.push({

        one: "false",
        two: "false",
        three: "false",
        four: "false",
        five: "false",
        bodySelected: "false",
        gameWon: "false",
        msg: msgArray[i]

    });
}

function createImage(){

    var imgTag = document.createElement("img");
    var container = document.getElementsByClassName("box")[0].children[0];
    container.appendChild(imgTag);
    imgTag.id = "img";
    alert("upo");
}

function startRoll(rollButton){

    if(timeToChangeTurns)
        changePlayer();
    else
        timeToChangeTurns = true;

    clearDivsInBoxes();

    //disable roll button, enable stop button
    rollButton.parentElement.parentElement.children[1].children[0].disabled = false;
    rollButton.disabled = true;

    var imgTag = document.createElement("img");
    //var imgTag = document.getElementById("img");
    //var imgTag = document.getElementsByTagName("img")[0];
    imgTag.setAttribute("src", "images/die.gif");
    imgTag.setAttribute("height", "100px");
    imgTag.setAttribute("weight", "100px");
    imgTag.style.marginTop = "0px";
    imgTag.id = "img";
    // imgTag.setAttribute("margin-top", "500px");

    var container = document.getElementsByClassName("box")[0].children[0];
    container.appendChild(imgTag);
}

function stopRoll(stopButton){

    // .pause {
    //     animation-play-state: paused;
    // }
    
    //temp
    rollButton = stopButton.parentElement.parentElement.children[0].children[0];
    
    rollButton.disabled = false;
    stopButton.disabled = true;

    var imgTag = document.getElementById("img");
    //var imgTag = document.getElementsByTagName("img")[0];
    imgTag.setAttribute("src", "images/die.png");
    imgTag.setAttribute("height", "60px");
    imgTag.setAttribute("weight", "60px");
    //imgTag.style.marginTop = "15px";

    //var randNum = Math.floor((Math.random() * 6) + 1);
    
    //var randNum = 6;
    randNum = 6;
    //counter=0;
    switch(counter){
        case 1:
            randNum = 1;
            break;
        case 2:
            randNum = 2;
            break;
        case 3:
            randNum = 3;
            break;
        case 4:
            randNum = 4;
            break;
        case 5:
            randNum = 5;
    }

    counter++;
    

    var bodyPart = "";
    
    //alert("player " + player);
    switch(randNum){
        case 1:

            //msg[0] = "s";
            bodyPart = "tail";

            if(playerStats[player].one == "true")
                createDivsInBoxes(1, "You have already drawn a " + bodyPart + ". Miss your turn.");
            else if(playerStats[player].bodySelected == "true"){
                playerStats[player].one = "true";
                timeToChangeTurns = false;
            }
            break;

        case 2:

            //msg[1] = "s";
            bodyPart = "ears";

            if(playerStats[player].two == "true")
                createDivsInBoxes(1, "You have already drawn " + bodyPart + ". Miss your turn.");
            else if(playerStats[player].bodySelected == "true"){
                playerStats[player].two = "true";
                timeToChangeTurns = false;
            }
            break;

        case 3:

            //msg[2] = "s";
            bodyPart = "eyes";

            if(playerStats[player].three == "true")
                createDivsInBoxes(1, "You have already drawn " + bodyPart + ". Miss your turn.");
            else if(playerStats[player].bodySelected == "true"){
                playerStats[player].three = "true";
                timeToChangeTurns = false;
            }
            break;

        case 4:

            //msg = "s";
            bodyPart = "whiskers";

            if(playerStats[player].four == "true")
                createDivsInBoxes(1, "You have already drawn " + bodyPart + ". Miss your turn.");
            else if(playerStats[player].bodySelected == "true"){
                playerStats[player].four = "true";
                timeToChangeTurns = false;
            }
            break;

        case 5:

            //msg = "s";
            bodyPart = "nose";

            if(playerStats[player].five == "true")
                createDivsInBoxes(1, "You have already drawn a " + bodyPart + ". Miss your turn.");
            else if(playerStats[player].bodySelected == "true"){
                playerStats[player].five = "true";
                timeToChangeTurns = false;
            }
            break;

        case 6:

            var bodyPart = "body";

            if(playerStats[player].bodySelected == "true")
                createDivsInBoxes(1, "You have already drawn a " + bodyPart + ". Miss your turn.");
            else{
                createDivsInBoxes(1, "Congratulations! You have drawn the body. You can now draw the rest of the mouse.");
                playerStats[player].bodySelected = "true";
                timeToChangeTurns = false;
            }
            break;
    }

    //playerStats[player].msg[randNum-1] = randNum + ": " + bodyPart + " added!";
    

    createDivsInBoxes(0, "You have rolled the number: " + randNum + "<br>(" + bodyPart + ")");


    
    //game can start, body is selected/rolled...everything after goes in here
    if(playerStats[player].bodySelected == "true"){

        playerStats[player].msg[randNum-1] = bodyPart + " added!";
        //alert(player);
        var message = "";


        //alert("body selected");
        if(playerStats[player].one == "true" && 
            playerStats[player].two == "true" && 
            playerStats[player].three == "true" && 
            playerStats[player].four == "true" && 
            playerStats[player].five == "true"){

                var img = document.createElement("img");
                img.src = "images/minionCelebrating.gif";
                img.style.height = "150px";
                img.style.width = "100px";

                var divTag = document.getElementsByClassName("box")[0].children[0];
                divTag.innerHTML = "";
                divTag.appendChild(img);

                if(player == 0){

                    var score = localStorage.getItem("player1");
                    score++;
                    localStorage.setItem("player1", score);
                }
                else{

                    var score = localStorage.getItem("player2");
                    score++;
                    localStorage.setItem("player2", score);
                }
                
                function reLoad(){
                    location.reload();
                }
                


                playerStats[player].gameWon = true;
                flag = true;
                createDivsInBoxes(1, "Congratulations, Player " + (player + 1) + "!<br>You Win!");
                rollButton.disabled = true;

                //create and append play again button
                var playAgainBtn = document.createElement("button");
                playAgainBtn.innerHTML = "Play Again"
                //playAgainBtn
                //playAgainBtn.setAttribute("class", "btn btn-success");
                playAgainBtn.className = "btn btn-success";
                playAgainBtn.style.marginTop = "25px";
                //
                //playAgainBtn.onclick = window.location.reload;
                //playAgainBtn.setAttribute("click", location.reload);
                //playAgainBtn.setAttribute("click", reLoad());
                playAgainBtn.onclick = reLoad;

                //alert(document.getElementById("boxContainer").children[1].innerHTML);
                //document.getElementById("boxContainer").children[1].appendChild = playAgainBtn;
                var x = document.getElementById("boxContainer").children[1];
                console.log()
                x.appendChild(playAgainBtn);

            } 
        //else if(timeToChangeTurns == "false"){
        else{
            //var message = "";

            for(var i = 0; i < 6; i++)
                //m=

            for(var i = 0; i < playerStats[player].msg.length; i++){
                message = message + playerStats[player].msg[i] + "<br>";
                //message.fontcolor("yellow");
            }

            createDivsInBoxes(1, message);
        }
        //alert("message");
        //createDivsInBoxes(1, message);
    }
    else{

        createDivsInBoxes(1, "Oops! You must draw the body before you can draw the rest of the mouse.");
    }
}

function createDivsInBoxes(indexOfBox, msg){

    //var divTag = document.createElement("div");
    var divTag = document.getElementsByClassName("box")[indexOfBox].children[0];
    
    //divTag.style.color = "white";
    if(indexOfBox == 0){

        divTag.innerHTML = divTag.innerHTML + "<br><br>" + msg;
        divTag.style.marginTop = "25px";
        divTag.style.color = "white";
        //divTag.innerHTML = msg;
    }
    else{

        //alert(msg);
        if(flag){

            divTag.innerHTML = msg;
            divTag.style.marginTop = "25px";
            divTag.style.color = "white";
        }
        else{
            
            msg = msg.split("<br>");

            for(var i = 0; i < msg.length; i++){

                divTag.style.marginTop = "15px";
                var p = document.createElement("p");
                p.innerHTML = msg[i];

                if(msg[i].includes("missing")){

                    
                    p.style.color = "pink";
                    divTag.appendChild(p);
                    //msg[i].color("red");
                    //alert(msg[i]);
                }
                else if(!msg[i].includes("Congratulations")){

                    p.style.color = "white";
                    divTag.appendChild(p);
                }

                
            }
    }
            //alert(msg[i]);
        //divTag.innerHTML = msg;
    }

    var container = document.getElementsByClassName("box")[indexOfBox];
    container.appendChild(divTag);
}

function clearDivsInBoxes(){

    for(var i = 0; i < 2; i++)
        document.getElementsByClassName("box")[i].children[0].innerHTML = "";
}

    // var divTag1 = document.createElement("div");
    // divTag1.style.marginTop = "25px";
    // divTag1.style.color = "white";
    // divTag1.innerHTML = "You have rolled the number: " + randNum;

    // var divTag2 = document.createElement("div");
    // divTag2.style.marginTop = "25px";
    // divTag2.style.color = "white";
    // divTag2.innerHTML = msg;


    // var container1 = document.getElementById("box1");
    // container1.appendChild(divTag1);

    // var container2 = document.getElementById("box2");
    // container2.appendChild(divTag2);

    // alert(container.innerHTML);
    // container.setAttribute("padding-top", "100px !important");
    
    
    // alert(img);
    // img.setAttribute("animation-play-state", "paused !important");

    // var imgTag = document.createElement("img");
    // imgTag.setAttribute("src", "die.jpg");
    // imgTag.setAttribute("height", "100px");
    // imgTag.setAttribute("weight", "100px");
    // imgTag.setAttribute("margin-top", "500px");

    // var container = document.getElementById("box");
    // container.appendChild(imgTag);

function changePlayer(){

    var whosTurn = document.getElementById("player").children[0];

    if(player == 0){

        player = 1;
        whosTurn.innerHTML = "Player 2's turn";
    }
    else{

        player = 0;
        whosTurn.innerHTML = "Player 1's turn";
    }
}
