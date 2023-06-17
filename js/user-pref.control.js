'use strict'

function onInit() {
    const elForm = document.querySelector('#formRegister')
    // console.log('elForm:', elForm)
    elForm.addEventListener('submit', (event) => {
        event.preventDefault()
        submit()
    })
}

function showAge(age) {
    document.getElementById('age-span').innerHTML = age
}

function submit() {
    const email = document.getElementById('email').value
    const age = document.getElementById('age').value
    const bgColor = document.getElementById('bgColor').value
    const txtColor = document.getElementById('txtColor').value
    const birthDate = document.getElementById('birth-date').value
    const birthTime = document.getElementById('birth-time').value

    const userData = {
        email,
        age,
        txtColor,
        bgColor,
        bgColor,
        birthDate,
        birthTime
    }
    console.log(userData);
  
    saveDataToStorage(userData)

}

