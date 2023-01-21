//copy of the json array
var newMovieArray;
var leftButtonClicked = false;
var count = 0; 

window.onload=function(){
    $("#left-button").on("click", function(){
        leftButtonClicked = true;
        nextRound();
    });

    $("#right-button").on("click", function(){
        leftButtonClicked = false;
        nextRound();
    });
}

function shuffleArray(arr){
    let length = arr.length - 1;
    for (let i = length; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
} 

function startGame(rounds){
    shuffleArray(movieArray);
    //select last #rounds movies from array
    newMovieArray = movieArray.slice(movieArray.length - rounds - 1, movieArray.length - 1);

    updateRounds();
    changeMovie();
    count++;
}

function remove(){
    if(leftButtonClicked == true){
        var movieName = $("#right-movie-title").text();
    } else {
        var movieName = $("#left-movie-title").text();
    }

    if(newMovieArray.length > 1){

        for (let i = 0; i < newMovieArray.length; i++){
            if (newMovieArray[i].name == movieName){
                newMovieArray.splice(i, 1);
                break;
            }
        }
    } 

    if(newMovieArray.length == 1){
        $("#game-modal").modal("show");
        winner();
    }
}

function nextRound(){
    if((newMovieArray.length - 1) == (rounds / 2)){
        rounds = rounds / 2;
    }

    //console.log(count, " ", rounds);
    remove();

    if(count == rounds){
        count = 0;
    }

    if(newMovieArray.length > 1){
        changeMovie();
        updateRounds();
        count++;
    }
}


function changeMovie(){
    let embed = "https://www.youtube-nocookie.com/embed/";
    let autoplay = "?loop=1&autoplay=1&mute=1&rel=0&autohide=1&showinfo=0&fs=0&modestbranding=1&playlist=";

    //change left-movie
    $("#left-movie").attr("src", embed + newMovieArray[count]["trailer url"] + autoplay + newMovieArray[count]["trailer url"]);
    $("#left-movie-title").text(newMovieArray[count].name);

    //change right-movie
    $("#right-movie").attr("src", embed + newMovieArray[count+1]["trailer url"] + autoplay + newMovieArray[count+1]["trailer url"]);
    $("#right-movie-title").text(newMovieArray[count+1].name);  
}

function updateRounds(){
    if(rounds / 2 == 4){
        $("#game-rounds").text("QUARTER-FINALS " + "  " + (count+1) + " / " + (rounds/2));
    } else if(rounds / 2 == 2){
        $("#game-rounds").text("SEMI-FINALS " + "  " + (count+1) + " / " + (rounds/2));
    } else if( rounds / 2 == 1){
        $("#game-rounds").text("FINALS");
    } else {
        $("#game-rounds").text("Round of " + rounds + "  " + (count+1) + " / " + (rounds/2)); 
    }
}

//popup
function winner(){
    $("#movieSelections").text("Out of " + localStorage.getItem("rounds") + " random selections");
    $("#winnerMovie").attr("src", newMovieArray[0]["img dir"]);
    $("#winnerTitle").text(newMovieArray[0].name);
}

$("#game-modal").on('hidden.bs.modal', function () {
    location.replace("index.html");
  });

$(".home").click(function(){location.replace("index.html");});