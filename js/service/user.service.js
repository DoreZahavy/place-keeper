'use strict'

const STORAGE_USER = 'userDB'

function getUserData(){
    var userData = loadFromStorage(STORAGE_USER)
    if(!userData) console.log('no localStorage');
    return userData
}


function saveDataToStorage(userData) {
    saveToStorage(STORAGE_USER, userData)
}