let happiness = 0
let lastUsed = Date.now()

function press(value){
    document.getElementById("display").value += value
}

function clearDisplay(){
    document.getElementById("display").value = ""
}

function calculate(){
    let display = document.getElementById("display")
    try {
        let result = eval(display.value)
        display.value = result
        increaseHappiness()
    } catch {
        display.value = "Error"
        setFace("sad")
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