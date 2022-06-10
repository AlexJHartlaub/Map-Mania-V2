let gMap;
let score = 0;
let favoritePlaces
let currentPlaceIndex = favoritePlaces.length-1;
let currentPlace = favoritePlaces[currentPlaceIndex];
let currentHintIndex = hints.length-1;
let currentHint = hints[currentHintIndex];


async function initApplication() {
    console.log('MapManiav1 - Starting!') 
     const response = await fetch ('https://mmv2ah.azurewebsites.net/favorite-places')
     favoritePlaces = response.json()
}


function initMap() {
    gMap = new google.maps.Map(document.getElementById('myMapId'),{
      center: {lat:41.878, lng: -50}, zoom :3});
      google.maps.event.addListener(gMap, 'idle', function() { updateGame()});
      SetScore(score);
  }


  function updateGame() {
    let zoomLevel = gMap.getZoom();
    let inBounds = false;
    if (gMap.getBounds().contains(currentPlace.coordinates)) {
        let inBounds = true;
        console.log("Inbounds");
    }

    if ((zoomlevel >= 8) &&(inbounds)){
        console.log("You Found a Location! now for the next one!");
        addMarker(currentPlace);
        SetScore(Score += 1);
        nextLocation();
    }
}

function nextLocation() {
    if (currentPlaceIndex == 0 ){
        window.alert("Congratulations you have won!");
    }
    currentPlaceIndex--;
    currentPlace = favoritePlaces[currentPlaceIndex];
    currentHintIndex--;
    currentHint = hints[currentHintIndex];

    
}

let hints = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
]


function addMarker(markerContent){
    var marker = new google.maps.Marker(
        {position:markerContent.coordinates, map:gMap}
    );
}

function SetScore(score) {
    document.getElementById("score-id").value = score;  
  }

  function SetHint(currentHint) {
    document.getElementById("hint-id").value = currentHint;  
  }