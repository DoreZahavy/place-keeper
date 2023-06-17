'use strict'


const STORAGE_PLACES = 'placesDB'

var gPlaces
_createPlaces()

function getPlaces() {
    console.log('gPlaces:', gPlaces)
    return gPlaces
}

function removePlace(placeId) {
    const placeIdx = getPlaceIdxById(placeId)
    gPlaces.splice(placeIdx, 1)
    savePlacesToStorage()
}

function addPlace(name, lat, lng, zoom) {
    gPlaces.push(_createPlace(name, lat, lng, zoom))
    savePlacesToStorage()
}

function getPlaceById(placeId) {
return gPlaces.find(place => placeId === place.id)
}

function getPlaceIdxById(placeId) {
return gPlaces.findIndex(place => placeId === place.id)
}

function _createPlace(name, lat, lng, zoom) {
    return {

        id: makeId(),
        lat,
        lng,
        name,
        zoom

    }
}

function _createPlaces() {
    var places = loadFromStorage(STORAGE_PLACES)
    if (!places || !places.length) {
        places = [
            _createPlace('Tel Aviv', 32.08088, 34.78057, 10),
            _createPlace('Jerusalem', 31.76904, 35.21633, 10),


        ]
    }
    gPlaces = places
    savePlacesToStorage()
}

function savePlacesToStorage() {
    saveToStorage(STORAGE_PLACES, gPlaces)
}