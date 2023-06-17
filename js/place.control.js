'use strict'

// API KEY AIzaSyD89FSIUPShF_UwiT8WUZLiwK8EQMClDWE
//     AIzaSyD89FSIUPShF_UwiT8WUZLiwK8EQMClDWE

var gMap
var gMarkers = []
function onInit() {
    initMap()
    gMap.addListener('click', ev => {
        const name = prompt('Place name?', 'Place 1')
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()
        addPlace(name, lat, lng, gMap.getZoom())
        renderPlaces()
        renderMarkers()
    })
    renderPlaces()
    renderMarkers()
}

function initMap(lat, lng) {
    var lat = 29.55805
    var lng = 34.94821
    const elMap = document.querySelector('.map')
    const mapOptions = {
        center: { lat, lng },
        zoom: 10
    }
    const map = new google.maps.Map(elMap, mapOptions)
    // const markerOptions = {
    //     position: { lat, lng },
    //     map,
    //     title: 'Hello World!'
    // }
    // const marker = new google.maps.Marker(markerOptions)
    gMap = map
}

function renderPlaces() {
   
    const places = getPlaces()
    var strHTMLs = places.map(place=>`<li class="border border-dark list-group-item list-group-item-success"">
        <button class="btn btn-danger" onclick="onRemovePlace('${place.id}')"><img src="../img/x.png"></button>
        <button class="btn btn-success" onclick="onPanToPlace('${place.id}')"><img src="../img/go.png"></button>
        <h5>${place.name}</h5>
        </li>`
    )
    const elUL = document.querySelector('.places-list')
    document.querySelector('.places-list').innerHTML = strHTMLs.join('')
}

function renderMarkers() {
    const places = getPlaces()
    // remove previous markers
    gMarkers.forEach(marker => marker.setMap(null))
    // every place is creating a marker
    gMarkers = places.map(place => {
        var position = {lat:place.lat,lng:place.lng}
        return new google.maps.Marker({
            position,
            map: gMap,
            title: place.name
        })
    })
}

function panToCurLoc(){
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }
    document.querySelector('.alert').classList.add('show')
   
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
}
function showLocation(position) {
    
    console.log(position)
    const elAlert = document.querySelector('.alert')
    elAlert.innerHTML = 'A few moments please..'
    elAlert.classList.remove('show')
    const { latitude: lat, longitude: lng, accuracy } = position.coords
    gMap.setCenter({ lat, lng })
    gMap.setZoom(14)
    // document.getElementById("latitude").innerHTML = lat
    // document.getElementById("longitude").innerHTML = lng
    // document.getElementById("accuracy").innerHTML = accuracy

    // var date = new Date(position.timestamp)
    // document.getElementById("timestamp").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    
}
function handleLocationError(error) {
    var locationError = document.querySelector('.alert')

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message
            break
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message
            break
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location."
            break
    }
}

function onPanToPlace(placeId) {
    const place = getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}

function onRemovePlace(placeId) {
    removePlace(placeId)
    renderPlaces()
    renderMarkers()
}

