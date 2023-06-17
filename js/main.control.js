'use strict'

function onInit(){
    var userData = getUserData()
    if (!userData)return
    _changeScreen(userData)
    displayInfo(userData)

}

function _changeScreen({ bgColor, txtColor }) {
    document.body.style.backgroundColor = bgColor
    document.body.style.color = txtColor
}

function displayInfo({email,age,birthDate,birthTime}){
    // const {email,age,birthDate,birthTime} = getUserData()

    const elTxtBox = document.querySelector('.txt')
    console.log('elTxtBox:', elTxtBox)
    elTxtBox.innerHTML = `Your email: ${email}<br>
    Your Age: ${age}<br>
    Your Date of Birth: ${birthDate}<br>
    Your Time of Birth: ${birthTime}`
    

}