var gMap;
var score = 0;
var hints = [

    "This city in japan is known for its temples!",
    "This city is the current capital of japan!",
    "This small island in south america is famous for its beaches!",
    "This city is known for its casinos!",
    "This cities hockey team won the 2021 Stanley Cup!",
    "Tourists love to take pictures with a famous tower here!",
    "The capital of korea!",
    "The city that never sleeps!",
    "archipelago in america!",
    "The most famous city close to home!"
]   
let favoritePlaces;
var currentPlace;
var currentPlaceIndex;
initApplication();
var currentHintIndex = hints.length-1;
var currentHint = hints[currentHintIndex];


async function initApplication() {
    console.log('MapManiav1 - Starting!') 
     await fetch('/favorite-places')
    .then(response => response.json())
    .then(data =>{
        favoritePlaces = data;
        currentPlaceIndex = hints.length-1;
        currentPlace = favoritePlaces[currentPlaceIndex];
        
    })
    console.log(favoritePlaces);
    setScore(score);
    setHint(currentHint);
}


function initMap() {
    gMap = new google.maps.Map(document.getElementById("myMapID"), {
        center: {lat: 41.878, lng: 10}, zoom: 3});
    google.maps.event.addListener(gMap, 'idle', function() {
        updateGame()
    });
}



  function updateGame() {
    var zoomLevel = gMap.getZoom();
    var inBounds = false
       if (gMap.getBounds().contains(currentPlace.coordinates)) {
        inBounds = true;
        console.log("Inbounds");
    }
    
    
  

    if ((zoomLevel >= 8) &&(inBounds)){
        console.log("You Found a Location! now for the next one!");
        addMarker(currentPlace);
        setScore(score += 1);
        nextLocation();
    }
}

function nextLocation() {
    currentPlaceIndex = currentHintIndex-1;
    currentPlace = favoritePlaces[currentPlaceIndex];
    currentHintIndex = currentHintIndex -1;
    currentHint = hints[currentPlaceIndex];
    setHint();

    
}

function addMarker(markerContent){
    var marker = new google.maps.Marker(
        {position:markerContent.coordinates, map:gMap}
    );
}

function setScore() {
    document.getElementById("score-id").value = score;  
  }

  function setHint() {
    document.getElementById("hint-id").value = currentHint;  
  }
function win() {
    score += 10; 
    setScore()
    currentHint = "You won!! congratulations cheater!"
    setHint()
    var places; 
    for (places = 0; places < favoritePlaces.length; places++){
        var markerwin = new google.maps.Marker(
            {position:favoritePlaces[places].coordinates, map:gMap}
        );

    }

}