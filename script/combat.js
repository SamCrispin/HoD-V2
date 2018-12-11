function displayFightMoves() {
    id("fightOpeningBanner").style.display = "none";
    id("fightMovesBanner").style.display = "block";
    id ("fightBack").style.display = "block";
}

function displayWeapons() {
    id("fightOpeningBanner").style.display = "none";
    id("fightWeaponsBanner").style.display = "block";
    id ("fightBack").style.display = "block";
    getWeapons();
}

function displayMessage(message) {
    id("fightMovesBanner").style.display = "none";
    id("fightMessageBanner").innerHTML = message;
    id("fightMessageBanner").style.display = "block";
    fight.messageOpen = true;
}

function displayFightOptions() {
    id("fightOpeningBanner").style.display = "block";
    id("fightMovesBanner").style.display = "none";
    id ("fightBack").style.display = "none";
    id ("fightMessageBanner").style.display = "none";

}

function fightBack() {
    id("fightOpeningBanner").style.display = "block";
    id("fightMovesBanner").style.display = "none";
    id("fightWeaponsBanner").style.display = "none";
    id ("fightBack").style.display = "none";
}

var fight = {
    enemy: null,
    playersTurn: true,
    playerBarrier: false,
    enemyBarrier: false,
    messageOpen: false,
    battle: false,

    setupFight: function(parameters) {
        var health, attack, defense, bossMoves, type;
        nav.open("fight");

        if (player.cell.layer == 16) {
            health = (Math.random() * 30 + 30) << 0;
            attack = (Math.random() * 20 + 5) << 0;
            defense = (Math.random() * 10 + 5) << 0;
            bossMoves = [];

            type = (parameters[1]) ? parameters[1] : getRandomType();
            bossMoves.push(moves[type][0]);
            bossMoves.push(moves[getRandomType(type)][0]);
            bossMoves.push(moves["BARRIER"][0]);
            this.enemy = new Enemy(parameters[0], type, health, attack, defense, bossMoves)
        } else {
            this.enemy = this.genEnemy(parameters[0], parameters[1]);
        }
        this.setupMoves();
        displayFightOptions();
        id("fightNameEnemy").innerHTML = parameters[0];
        id("fightTypeIconEnemy").style.backgroundImage = "url(img/" + this.enemy.type + ".png)";
        id("fightTypeIconPlayer").style.backgroundImage = "url(img/" + player.equipped[5].value.type + ".png)";
        id("fightHealthBarPlayer").style.width = ((player.health.current / player.health.max)*100) + "%";
        id("fightHealthLabelPlayer").innerHTML = player.health.current + "/" + player.health.max + "hp";
        id("fightHealthBarEnemy").style.width = "100%";
        this.battle = true;
        this.playersTurn = true;
    },

    setupMoves: function() {
        for (var i = 0; i < 4; i++) {
            id("fightMove" + (i+1)).innerHTML = player.equipped[5].value.moves[i].name;
        }
        id("fightMoveLabelEnemy1").innerHTML = this.enemy.moves[0].name;
        id("fightMoveLabelEnemy2").innerHTML = this.enemy.moves[1].name;
    },

    genEnemy: function(name, type) {
        var health = (Math.random() * 30 + 30) << 0,
            attack = (Math.random() * 20 + 5) << 0,
            defense = (Math.random() * 10 + 5) << 0,
            thisMoves = [];

        type = (type) ? type : getRandomType();
        thisMoves.push(moves[type][0]);
        thisMoves.push(moves[getRandomType(type)][0]);
        thisMoves.push(moves["BARRIER"][0]);

        return new Enemy(name, type, health, attack, defense, thisMoves)
    },

    attack: function(move) {
        var damage, message;
        if (this.playersTurn) {
            message = "You used " + move.name;
            if (move.name == "Barrier") {
                if (this.playerBarrier) {
                    message += "<br>The move failed: You already have a barrier up!";
                }
                this.playerBarrier = true;
            } else {
                damage = (getPlayerAttack() / this.enemy.defense) * getPlayerAttack();
                if (effectiveness[move.type][this.enemy.type]) {
                    damage *= effectiveness[move.type][this.enemy.type];
                    if (effectiveness[move.type][this.enemy.type] > 1) message += "<br>You hit and it was super effective!";
                    else message += "<br>You hit but it wasn't very effective!";
                } else {
                    message += "<br>You hit!";
                }
                if (this.enemyBarrier) {
                    damage /= 2;
                    message += "<br>The enemy's barrier mitigated some damage!";
                }
                damage = damage << 0;
                this.enemy.health.current -= damage;
                this.enemyBarrier = false;
                id("fightHealthBarEnemy").style.width = ((this.enemy.health.current / this.enemy.health.max) * 100) + "%";
                if (this.enemy.health.current <= 0) this.victory();
            }
        } else {
            message = "The enemy used " + move.name;
            if (move.name == "Barrier") {
                if (this.enemyBarrier) {
                    message += "<br>The move failed: The enemy already has a barrier up!";
                }
                this.enemyBarrier = true;
            } else {
                damage = (this.enemy.attack / getPlayerDefense()) * this.enemy.attack;
                if (effectiveness[move.type][player.equipped[5].type]) {
                    damage *= effectiveness[move.type][player.equipped[5].type];
                    if (effectiveness[move.type][player.equipped[5].type] > 1) message += "<br>You were hit and it was super effective!";
                    else message += "<br>You were hit but it wasn't very effective!";
                } else {
                    message += "<br>You were hit";
                }
                if (this.playerBarrier) {
                    damage /= 2;
                    message += "<br>Your barrier mitigated some damage!";
                }
                damage = damage << 0;
                this.playerBarrier = false;
                player.changeHealth(-damage);
            }
        }
        this.playersTurn = !this.playersTurn;
        displayMessage(message);
    },

    enemyTurn: function() {
        var move = this.enemy.moves[Math.random() * (this.enemy.moves.length-1) << 0];
        this.attack(move);
    },

    victory: function() {
        if (player.cell.layer != 16) genLoot();
        else {
            openInteraction("victory1");
            nav.open("interaction")
        }
        this.battle = false;
    },

    next: function () {
        if (!fight.messageOpen) return;
        fight.messageOpen = false;
        if (!fight.playersTurn) fight.enemyTurn();
        else displayFightOptions();
    }
};

function getPlayerAttack() {
    return player.attack + player.equipped[5].value.attack;
}

function getPlayerDefense() {
    var defense = 0;
    for (var i = 0; i < 5; i++) {
        defense += player.equipped[i].value.defense;
    }
    return defense;
}

function getWeapons() {
    var div;
    for (var i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].type == "WEAPON") {
            div = document.createElement("div");
            div.className = "item fightWeapon";
            div.id = "fightWeapon" + i;
            id("fightWeaponsBanner").appendChild(div);
        }
    }
}