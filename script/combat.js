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
    playerBarrier: false,
    enemyBarrier: false,

    setupFight: function(enemy) {
        nav.open("fight");
        this.enemy = this.genEnemy(enemy);
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
        var damage;
        if (this.playersTurn) {
            if (move.name == "Barrier") {
                this.playerBarrier = true;
            } else {
                damage = (player.attack / this.enemy.defense) * player.attack;
                damage *= ((effectiveness[move.type][this.enemy.type]) ? effectiveness[move.type][this.enemy.type] : 1);
                damage = damage << 0;
                if (this.enemyBarrier) damage /= 2 << 0;
                this.enemy.health -= damage;
                this.enemyBarrier = false;
                if (this.enemy.health <= 0) this.victory();
            }
        } else {
            if (move.name == "Barrier") {
                this.enemyBarrier = true;
            } else {
                damage = (this.enemy.attack / player.defense) * this.enemy.attack;
                damage *= ((effectiveness[move.type][player.equipped[0].type]) ? effectiveness[move.type][player.equipped[0].type] : 1);
                damage = damage << 0;
                if (this.playerBarrier) damage /= 2 << 0;
                this.playerBarrier = false;
                player.changeHealth(-damage);
            }
        }
        this.playersTurn = !this.playersTurn;
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