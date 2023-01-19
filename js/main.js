$(".start-game").click(function(){start();});

window.onscroll = function() {scrollBtnShowHide()};
let btn = document.getElementById("scrollBtn");


function scrollBtnShowHide(){
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 && $(window).width() > 600)
    {
        btn.style.display = "block";
    }
    else {
        btn.style.display = "none";
    }
}

function scrollUp(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function changeList($number){
    let text = $number.text();
    //clear div
    $("#refresh").text("");
    //reset rank
    rank = 1;
    $(".leaderboard-list").text(text);
    displayMovies(text);
}

function displayMovies($number){
    movieList.sort(function (a, b) {
        if(a["games played"] == b["games played"] && a.wins == b.wins)     
            return a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0;   
        else if(a.wins == b.wins){
            return a["games played"] > b["games played"] ? 1 : -1;
        }                                
        else{
            return a.wins > b.wins ? -1 : 1; 
        }         
    });

    for (let i = 0; i < $number; i++){
        let winrate = 0;
        if(movieList[i].wins != 0 || movieList[i]["games played"] != 0){
            winrate = Math.round((movieList[i].wins / movieList[i]["games played"]) * 100, 2);
        }

        let movieContainer = `
            <div class="movie-container d-flex col-xl-4">
                <div class="rank text-center align-self-start rounded-circle d-flex align-items-center justify-content-center">${rank++}</div>
                <div class="d-flex flex-column well rounded">
                    <div class="d-flex flex-row">
                        <img src="${movieList[i]["img dir"]}" alt="Movie Img" class="movie-img img-fluid img-responsive">
                        <div class="extend d-flex flex-column align-items-start">
                            <h3 class="movie-title mb-auto">${movieList[i].name}  (${movieList[i].year})</h3>
                            <h3 class="wins-number">Wins: ${movieList[i].wins}</h3>
                            <h3 class="win-rate-header">Win Rate</h3>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${winrate}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h3 class="win-rate-percent">${winrate}%<h3>
                        </div>
                    </div>
                    <div class="movie-info-flex d-flex flex-column">
                        <p class="movie-info">${movieList[i].info}</p>
                        <input class="expand align-self-center rounded text-center" type="checkbox" data-toggle="movie-info">
                    </div>
                </div>
            </div>`;
        
        
        $("#refresh").append(movieContainer);
    }
}

function start(){
    var value = $("input[name='radiobtn']:checked").val();
    localStorage.setItem("rounds", value);
    location.replace("gamepage.html");
}