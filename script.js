let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;

let fighting;
let monsterhealth;
let inventory = ["stick"];

const button1  = document.querySelector("#b1");
const button2  = document.querySelector("#b2");
const button3  = document.querySelector("#b3");
const text  = document.querySelector("#text");
const xpText  = document.querySelector("#xpText");
const healthText  = document.querySelector("#healthText");
const goldText  = document.querySelector("#goldText");
const monsterHealthText  = document.querySelector("#monsterhealth");
const monsterStats  = document.querySelector("#monsterStats");
const monstername  = document.querySelector("#monstername");
const weapons = [
    {
        name : "stick",
        power : 5
    },
    {
        name : "dagger",
        power : 30
    },
    {
        name : "claw hammer",
        power : 50
    },
    {
        name : "sword",
        power : 100
    }
]
const locations = [
    {
        name : "town square", 
        "buttontext":["Go to Store", "Go to Cave", "Fight Dragon"],
        "buttonfunc": [goStore, goCave, fightDragon],
        text : "You are in Town Square. You see a sign that says \"Store\""
    },
    {
        name : "Store", 
        "buttontext":["Buy 10 Health (10 Gold)", "Buy Weapon (30 Gold)", "Go to Town Square"],
        "buttonfunc": [Gethealth, GetWeapon, Gotown],
        text : "You Entered the Store."
    },
    {
        name : "Cave", 
        "buttontext":["Fight Slime", "Fight fanged Beast", "Go to Town Square"],
        "buttonfunc": [fightSlime, fightfbeast, Gotown],
        text : "You Entered the Store."
    },
    {
        name : "Fight", 
        "buttontext":["Attack", "Dodge", "Run"],
        "buttonfunc": [attack, dodge, Gotown],
        text : "You Entered the Store."
    },
    {
        name: "Killed Monster",
        "buttontext":["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        "buttonfunc" :[Gotown, Gotown, easteregg],
        text: "Monster Screams aaaahhhhh... and Dies. You Gain Experience and Find Gold"
    },
    {
        name: "Lost",
        "buttontext":["Replay?", "Replay?", "Replay?"],
        "buttonfunc" :[restart, restart, restart],
        text: "You DIED."
    },
    {
        name: "Complete",
        "buttontext":["Replay?", "Replay?", "Replay?"],
        "buttonfunc" :[restart, restart, restart],
        text: "You DEFEATED THE DRAGON YOU WON."
    },
    {
        name: "Easter Egg",
        "buttontext":["2", "8", "Go to Town Square?"],
        "buttonfunc" :[pick2, pick8, Gotown],
        text: "Yo found a Secret Game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
    
];
const monsters = [
    {
        name:"slime", 
        level:2,
        health:15
    },
    {
        name:"fanged beast", 
        level:8,
        health:60
    },
    {
        name:"dragon", 
        level:20,
        health:300
    }
]
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["buttontext"][0];
    button2.innerText = location["buttontext"][1];
    button3.innerText = location["buttontext"][2];
    button1.onclick = location["buttonfunc"][0];
    button2.onclick = location["buttonfunc"][1];
    button3.onclick = location["buttonfunc"][2];
    text.innerText = location.text;
}

function Gotown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1])
}
function goCave(){
    update(locations[2])
}
function Gethealth(){
    if(gold>=10){
        health+=10;
        healthText.innerText = health;
        gold-=10;
        goldText.innerText = gold;
    }
    else{
        text.innerText = "Not enough Gold";
    }
}
function GetWeapon(){
    if(currentWeapon<weapons.length-1){
        if(gold>=30){
            gold-=30;
            goldText.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "Obtained a " + newWeapon+ "."
            inventory.push(newWeapon)
            text.innerText += "In your inventory you have: " + inventory;
        }
        else{
            text.innerText = "Not enough Gold.";
        }
    }
    else{
        text.innerText() = "You Already have the most powerful weapon";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length>1){
        gold+=15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You Sold a " + currentWeapon + ".";
        text.innerText += "In your inventory you have: " + inventory;
    }
}
function fightSlime(){
    fighting = 0
    gofight(monsters[0]);
    
}
function fightfbeast(){
    fighting = 1
    gofight(monsters[1]);
    
}
function fightDragon(){
    fighting = 2
    gofight(monsters[2]);
}
function gofight(){
    update(locations[3])
    monsterhealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monstername.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterhealth
}
function attack(){
    text.innerText = "The " + monsters[fighting].name + " attack.";
    text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
    if(isMonsterHit() || health<20){
        health -= getMonsterattackdmg(monsters[fighting].level);
    }
    else{
        text.innerText += "You Miss";
    }
    monsterhealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
    monsterHealthText.innerText = monsterhealth;
    healthText.innerText = health
    if(health<=0){
        lose();
    }
    else if(monsterhealth<=0){
        (fighting===2)?wingame():win();
    }
    if(Math.random()<=.1 || inventory.length!==1){
        text.innerText += "Your" + inventory.pop() + "broke."
        currentWeapon--;
    }
}

function getMonsterattackdmg(level){
    let hit = (level*5) - (Math.floor(Math.random()*xp));
    console.log(hit);
    return hit;
}

function isMonsterHit(){
    return Math.random() > 0.2;
}

function dodge(){
    text.innerText = "You dodged the attack from the " + monsters[fighting].name + ".";
}
function win(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose(){
    update(locations[5]);
}
function wingame(){
    update(locations[6]);
}
function restart(){
    xp = 0
    xpText.innerText = xp
    health = 100
    healthText.innerText = health
    gold = 50
    goldText.innerText = gold
    inventory = ['stick']
    currentWeapon = 0
    Gotown();
}

function easteregg(){
    update(locations[7]);
}

function pick2(){
    pick(2);
}
function pick8(){
    pick(8);
}
function pick(guess){
    let numbers = [];
    while(numbers.length<10){
        numbers.push(Math.floor(Math.random()*10))
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers: \n";
    for(let i=0;i<10;i++){
        text.innerText += numbers[i] + "\n";
    }
    if(numbers.indexOf(guess) !== -1){
        text.innerText +="Right ! You win 20 gold";
        gold+=20
        goldText.innerText = gold
    }
    else{
        text.innerText +="Wrong ! You lose 10 health";
        health-=20
        healthText.innerText = health

    }
}