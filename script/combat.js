function displayFightOptions() {
    id("fightOpeningBanner").style.display = "none";
    id("fightMovesBanner").style.display = "block";
    id ("fightBack").style.display = "block";
}

function displayWeapons() {
    id("fightOpeningBanner").style.display = "none";
    id("fightWeaponsBanner").style.display = "block";
    id ("fightBack").style.display = "block";
}

function displayMessage(message) {
    id("fightMovesBanner").style.display = "none";
    id("fightMessageBanner").innerHTML = message;
    id("fightMessageBanner").style.display = "block";
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

    setupFight: function(enemy, type) {
        nav.open("fight");
        this.enemy = this.genEnemy(enemy, type);
        this.setupMoves();
        id("fightTypeIconEnemy").style.backgroundImage = "url(img/" + this.enemy.type + ".png)";
        id("fightTypeIconPlayer").style.backgroundImage = "url(img/" + player.equipped[0].type + ".png)";
    },

    setupMoves: function() {
        for (var i = 0; i < 4; i++) {
            id("fightMove" + (i+1)).innerHTML = player.equipped[0].moves[i].name;
        }
        id("fightMoveLabelEnemy1").innerHTML = this.enemy.moves[0].name;
        id("fightMoveLabelEnemy2").innerHTML = this.enemy.moves[1].name;
    },

    genEnemy: function(name, type) {
        var health = (Math.random() * 20 + 30) << 0,
            attack = (Math.random() * 5 + 5) << 0,
            defense = (Math.random() * 5 + 5) << 0,
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
                damage = (player.attack / this.enemy.defense) * player.attack;
                if (effectiveness[move.type][this.enemy.type]) {
                    damage *= effectiveness[move.type][this.enemy.type];
                    if (effectiveness[move.type][this.enemy.type] > 1) message += "<br>You hit and it was super effective!";
                    else message += "<br>You hit but it wasn't very effective!";
                } else {
                    message += "<br>You hit!";
                }
                if (this.enemyBarrier) {
                    damage /= 2 << 0;
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
                damage = (this.enemy.attack / player.defense) * this.enemy.attack;
                if (effectiveness[move.type][player.equipped[0].type]) {
                    damage *= effectiveness[move.type][player.equipped[0].type];
                    if (effectiveness[move.type][player.equipped[0].type] > 1) message += "<br>You were hit and it was super effective!";
                    else message += "<br>You were hit but it wasn't very effective!";
                } else {
                    message += "<br>You were hit";
                }
                if (this.playerBarrier) {
                    damage /= 2 << 0;
                    message += "<br>Your barrier mitigated some damage!";
                }
                damage = damage << 0;
                this.playerBarrier = false;
                player.changeHealth(-damage);
            }
        }
        this.playersTurn = !this.playersTurn;
        displayMessage(message);
        if (!this.playersTurn) this.enemyTurn();
    },

    enemyTurn: function() {
        var move = this.enemy.moves[Math.random() * (this.enemy.moves.length-1) << 0];
        this.attack(move);
    },

    victory: function() {
        nav.open("loot");
        genLoot();
    }
};