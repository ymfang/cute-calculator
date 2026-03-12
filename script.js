let happiness = 0
let lastUsed = Date.now()

const display = document.getElementById("display")

function press(value){
    if(display.value.length > 20) return 
    display.value += value
}

function clearDisplay(){
    display.value = ""
    setFace("normal")
}

function backspace() {
    display.value = display.value.slice(0, -1)
}

function calculate(){
    try {
        let result = Function('"use strict";return (' + display.value + ')')()
        display.value = result
        increaseHappiness()
    } catch {
        display.value = "Error"
        setFace("sad")
        setTimeout(clearDisplay,1500)
    }
}

function increaseHappiness(){
    happiness++
    lastUsed = Date.now()

    if(happiness > 5){
        setFace("happy")
    }else{
        setFace("normal")
    }
}

function setFace(state){
    let face = document.getElementById("face")
    let moodText = document.getElementById("faceMood")

    if(state === "happy"){
        face.src = "assets/face_happy.svg"
        moodText.innerText = "Mood: Happy 😄"
    }

    if(state === "sad"){
        face.src = "assets/face_sad.svg"
        moodText.innerText = "Mood: Sad 😢"
    }

    if(state === "normal"){
        face.src = "assets/face_normal.svg"
        moodText.innerText = "Mood: Normal 🙂"
    }

}

setInterval(()=>{
    let now = Date.now()
    if(now - lastUsed > 20000){
        setFace("sad")
    }
},5000)

//keyboard support
document.addEventListener("keydown", (e)=>{
    if(!isNaN(e.key) || "+-*/.".includes(e.key)){
        press(e.key)
    }

    if(e.key === "Enter"){
        calculate()
    }

    if(e.key === "Backspace"){
        backspace()
    }

    if(e.key === "Escape"){
        clearDisplay()
    }
})

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.blur()
    })
})