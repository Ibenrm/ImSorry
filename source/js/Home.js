const modal = document.querySelector('.modal');
const hideIcon = document.querySelector('#hideIcon');
const hideButton = document.querySelector('#hideButton');
const sendButton = document.querySelector('#kirimButton');
const showButton = document.querySelector('.button-56');
var db = [];

hideIcon.addEventListener('click', hideModal);
hideButton.addEventListener('click', hideModal);
document.querySelector('#closeBtn').addEventListener('click', hideModal);
showButton.addEventListener('click', showModal);
sendButton.addEventListener('click', sendLink);
document.querySelector('#nextButton').addEventListener('click', nextModal);

fetch('source/setting/setting.json')
.then(response => response.json())
.then((data) => db = data);

var audio = new Audio("https://feeldreams.github.io/pesanbuatmu/angelbaby.mp3");
audio.loop=true;
function playSound(mode){
    if(mode == true){
        audio.play();
    }else{
        audio.pause();
        audio.currentTime = 0;
    }
}

function startMenu(){
    document.querySelector('#nama').value = '';
    db['count'] = 1;
    document.getElementById('myTitle').innerHTML=db['1']['Title'];
    document.getElementById('myText').innerHTML=db['1']['Text'];
    document.getElementById('myGif').src=db['1']['imgsrc'];
    if(db['1']['Question'] == true){
        document.querySelector('.forms').id='show';
    } else {
        document.querySelector('.forms').id='hide';
    }
    typeButton(db['1']['Type']);
}
function notTarget(){
    if(db['NotTarget']['Question'] == true){
        document.querySelector('.forms').id='show';
    } else {
        document.querySelector('.forms').id='hide';
    }
    typeButton(db['NotTarget']['Type']);
    document.getElementById('myTitle').innerHTML=stringReplace(db['NotTarget']['Title'], {
        'username': db['nama']
    });
    document.getElementById('myText').innerHTML=stringReplace(db['NotTarget']['Text'], {
        'username': db['nama']
    });
    document.getElementById('myGif').src=db['NotTarget']['imgsrc'];
}
function nextMenu(angka){
    if(typeof db[angka] !== "undefined"){
        if(db[angka]['Question'] == true){
            document.querySelector('.forms').id='show';
        } else {
            document.querySelector('.forms').id='hide';
        }
        typeButton(db[angka]['Type']);
        document.getElementById('myTitle').innerHTML=stringReplace(db[angka]['Title'], {
            'username': db['nama']
        });
        document.getElementById('myText').innerHTML=stringReplace(db[angka]['Text'], {
            'username': db['nama']
        });
        document.getElementById('myGif').src=db[angka]['imgsrc'];
    }
}

function hideModal() {
    modal.id = 'hide';
    showButton.id = 'show';
    playSound(false)
    db['count'] = 1;
}
function showModal() {
    modal.id = 'show';
    showButton.id = 'hide';
    playSound(true);
    startMenu();
}

function inputForms(){
    if(document.querySelector("#nama").value.length <= 0){
        document.querySelector(".errno").id='show';
        document.getElementById("errnoText").innerHTML="Pastikan Mengisi Jawaban!";
        return false;
    }
    if(document.querySelector("#nama").value.length > 30){
        document.querySelector(".errno").id='show';
        document.getElementById("errnoText").innerHTML="Jawaban Tidak Boleh Lebih dari 30 Kata";
        return false;
    }
    if(document.querySelector('#nama').value.toLowerCase() == "default"){
        document.querySelector(".errno").id='show';
        document.getElementById("errnoText").innerHTML="Dilarang Kata 'Default' ";
        return false;
    }
    document.querySelector('.errno').id='hide';
    return true;
}

function typeButton(jenis){
    switch(jenis){
        case "close":
            document.querySelector('.close').id='show';
            document.querySelector('.next').id='hide';
            document.querySelector('.sendB').id='hide';
            break;
        case "continue":
            document.querySelector('.close').id='hide';
            document.querySelector('.next').id='show';
            document.querySelector('.sendB').id='hide';
            break;
        case "send":
            document.querySelector('.close').id='hide';
            document.querySelector('.next').id='hide';
            document.querySelector('.sendB').id='show';
            break;
        default:
            document.querySelector('.close').id='show';
            document.querySelector('.next').id='hide';
            document.querySelector('.sendB').id='hide';
            break;
    }
}

function nextModal() {
    var angka = db['count'];
    if(typeof db[angka] !== 'undefined'){
        if(typeof db[angka]['Question'] !== 'undefined'){
            if(db[angka]['Question'] == true){
                if(inputForms() == true){
                    if(document.querySelector('#nama').value != db[angka]['Target']){
                        notTarget();
                        return false;
                    }
                    db['count'] += 1;
                    db['nama'] = document.querySelector('#nama').value;
                    nextMenu(db['count']);
                    return true;
                }
                return false;
            }
            db['count'] += 1;
            nextMenu(db['count']);
            return true;
        }
        db['count'] += 1;
        nextMenu(db['count']);
        return true;
    }
}

function sendLink() {
    window.open(db[db['count']]['link']);
    hideModal();
}

function stringReplace(message, array){
    for(var key in array){
        var result = message.replace("{"+key.toLowerCase()+"}", array[key]);
    }
    return result;
}