/* Author: Nikola Cekic, 000333667 */

var playerStats = [];
var player = 1;
var msgArray = [[],[]];
var timeToChangeTurns = true;
var randNum = 0;
var counter = 0;
var flag = false;

var arrayOfBodyPArts = ["tail", "ears", "eyes", "whiskers", "nose"];

for(var i = 0; i < 2; i++){
    for(var j = 0; j < 6; j++){

        msgArray[i][j] = arrayOfBodyPArts[j] + " missing";
        msgArray[i][j].fontcolor("yellow");
    }
}

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

// function createImage(){

//     var imgTag = document.createElement("img");
//     var container = document.getElementsByClassName("box")[0].children[0];
//     container.appendChild(imgTag);
//     imgTag.id = "img";
//     alert("upo");
// }

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
    imgTag.setAttribute("src", "images/die.gif");
    imgTag.setAttribute("height", "100px");
    imgTag.setAttribute("weight", "100px");
    imgTag.style.marginTop = "0px";
    imgTag.id = "img";

    var container = document.getElementsByClassName("box")[0].children[0];
    container.appendChild(imgTag);
}

function stopRoll(stopButton){
    
    //temp
    rollButton = stopButton.parentElement.parentElement.children[0].children[0];
    
    rollButton.disabled = false;
    stopButton.disabled = true;

    var imgTag = document.getElementById("img");
    imgTag.setAttribute("src", "images/die.png");
    imgTag.setAttribute("height", "60px");
    imgTag.setAttribute("weight", "60px");

    var randNum = Math.floor((Math.random() * 6) + 1);
    
    //the commented out code below can be uncommented and used to automatically make player 1
    //win the game. This can be useful for testing and debugging.
    // randNum = 6;

    // switch(counter){
    //     case 1:
    //         randNum = 1;
    //         break;
    //     case 2:
    //         randNum = 2;
    //         break;
    //     case 3:
    //         randNum = 3;
    //         break;
    //     case 4:
    //         randNum = 4;
    //         break;
    //     case 5:
    //         randNum = 5;
    // }

    // counter++;
    

    var bodyPart = "";
    
    switch(randNum){

        case 1:

            bodyPart = "tail";

            if(playerStats[player].one == "true"){

                createDivsInBoxes(1, "You have already drawn a " + bodyPart + ". Miss your turn.");
            }
            else if(playerStats[player].bodySelected == "true"){

                playerStats[player].one = "true";
                timeToChangeTurns = false;
            }

            break;

        case 2:

            bodyPart = "ears";

            if(playerStats[player].two == "true"){

                createDivsInBoxes(1, "You have already drawn " + bodyPart + ". Miss your turn.");
            }
            else if(playerStats[player].bodySelected == "true"){

                playerStats[player].two = "true";
                timeToChangeTurns = false;
            }

            break;

        case 3:

            bodyPart = "eyes";

            if(playerStats[player].three == "true"){

                createDivsInBoxes(1, "You have already drawn " + bodyPart + ". Miss your turn.");
            }
            else if(playerStats[player].bodySelected == "true"){

                playerStats[player].three = "true";
                timeToChangeTurns = false;
            }

            break;

        case 4:

            bodyPart = "whiskers";

            if(playerStats[player].four == "true"){

                createDivsInBoxes(1, "You have already drawn " + bodyPart + ". Miss your turn.");
            }
            else if(playerStats[player].bodySelected == "true"){

                playerStats[player].four = "true";
                timeToChangeTurns = false;
            }

            break;

        case 5:

            bodyPart = "nose";

            if(playerStats[player].five == "true"){

                createDivsInBoxes(1, "You have already drawn a " + bodyPart + ". Miss your turn.");
            }
            else if(playerStats[player].bodySelected == "true"){

                playerStats[player].five = "true";
                timeToChangeTurns = false;
            }

            break;

        case 6:

            var bodyPart = "body";

            if(playerStats[player].bodySelected == "true"){

                createDivsInBoxes(1, "You have already drawn a " + bodyPart + ". Miss your turn.");
            }
            else{

                createDivsInBoxes(1, "Congratulations! You have drawn the body. You can now draw the rest of the mouse.");
                playerStats[player].bodySelected = "true";
                timeToChangeTurns = false;
            }

            break;
    }    

    createDivsInBoxes(0, "You have rolled the number: " + randNum + "<br>(" + bodyPart + ")");
    
    //game can start, body is selected/rolled...everything after goes in here
    if(playerStats[player].bodySelected == "true"){

        playerStats[player].msg[randNum-1] = bodyPart + " added!";
        var message = "";

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
                playAgainBtn.className = "btn btn-success";
                playAgainBtn.style.marginTop = "25px";
                playAgainBtn.onclick = reLoad;

                var x = document.getElementById("boxContainer").children[1];
                console.log()
                x.appendChild(playAgainBtn);

        } 
        else{

            for(var i = 0; i < playerStats[player].msg.length; i++)
                message = message + playerStats[player].msg[i] + "<br>";

            createDivsInBoxes(1, message);
        }
    }
    else{

        createDivsInBoxes(1, "Oops! You must draw the body before you can draw the rest of the mouse.");
    }
}

function createDivsInBoxes(indexOfBox, msg){

    var divTag = document.getElementsByClassName("box")[indexOfBox].children[0];
    
    if(indexOfBox == 0){

        divTag.innerHTML = divTag.innerHTML + "<br><br>" + msg;
        divTag.style.marginTop = "25px";
        divTag.style.color = "white";
    }
    else{

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
                }
                else if(!msg[i].includes("Congratulations")){

                    p.style.color = "white";
                    divTag.appendChild(p);
                }

                
            }
        }
    }

    var container = document.getElementsByClassName("box")[indexOfBox];
    container.appendChild(divTag);
}

function clearDivsInBoxes(){

    for(var i = 0; i < 2; i++)
        document.getElementsByClassName("box")[i].children[0].innerHTML = "";
}

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