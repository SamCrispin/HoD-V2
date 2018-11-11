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

function fightBack() {
    id("fightOpeningBanner").style.display = "block";
    id("fightMovesBanner").style.display = "none";
    id("fightWeaponsBanner").style.display = "none";
    id ("fightBack").style.display = "none";
}

var fight = {

    enemy: null,
    playersTurn: true,

    setupFight: function(enemy) {
        nav.open("fight");
        this.enemy = enemy;
        this.setupMoves();
    },

    setupMoves: function() {
        for (var i = 0; i < 4; i++) {
            id("fightMove" + (i+1)).innerHTML = player.equipped[0].moves[i].name;
        }
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

    }
};