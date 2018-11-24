var player = {
    health: {
        max: 100,
        current: 100
    },
    attack: 10,
    defense: 10,
    charisma: 10,
    gold: 100,
    itemSlots: [],
    inventory: [],
    equipped: [],

    changeHealth: function (health) {
        if (this.health.current == this.health.max && health > 0) return false;
        player.health.current += health;
        if (player.health.current > player.health.max) player.health.current = player.health.max;
        else if (player.health.current <= 0) this.die();

        id("fightHealthBarPlayer").style.width = ((player.health.current / player.health.max)*100) + "%";
        id("fightHealthLabelPlayer").innerHTML = player.health.current + "/" + player.health.max + "hp";
    },

    die: function () {

    },

    changeGold: function (gold) {
        this.gold += gold;
    }
};

var nav = {
    lastOpenDiv: null,
    openDiv: null,

    open: function(divIdToBeOpened) {
        if (this.openDiv) this.close(this.openDiv);
        id(divIdToBeOpened).style.display = "block";
        this.openDiv = divIdToBeOpened;
    },

    close: function(divIdToBeClosed) {
        id(divIdToBeClosed).style.display = "none";
        this.lastOpenDiv = divIdToBeClosed;
    },

    back: function() {
        var divToBeOpened = this.lastOpenDiv;
        this.close(this.openDiv);
        this.open(divToBeOpened);
    }
};

function id(id) {
    return document.getElementById(id);
}

function setupListenersAndAttributes() {
    //Interactions
    id("interactionOption1").setAttribute("action", interactions.startingScreen1.options[0].action);
    id("interactionOption1").setAttribute("parameters", interactions.startingScreen1.options[0].parameters);
    id("interactionOption1").addEventListener("click", interactionHandler);
    id("interactionOption2").addEventListener("click", interactionHandler);
    id("interactionOption3").addEventListener("click", interactionHandler);
    id("interactionOption4").addEventListener("click", interactionHandler);
    id("interactionOption5").addEventListener("click", interactionHandler);

    //Moves
    id("fightMoves").addEventListener("mouseover", function() {
        var triggerDiv = event.target,
                divId = triggerDiv.id.slice(triggerDiv.id.length - 1);
        id("fightMoveDescription").innerHTML = player.equipped[0].value.moves[divId-1].description;
    });
    id("fightMoves").addEventListener("mouseout", function() {
        id("fightMoveDescription").innerHTML = "Select a move"
    });
    id("fightMoves").addEventListener("click", function () {
        var triggerDiv = event.target,
                moveId = triggerDiv.id.slice(triggerDiv.id.length - 1);
        fight.attack(player.equipped[0].value.moves[moveId-1]);
    });

    //Loot
    id("lootItemContainer").addEventListener("click", pickupLoot);

    //Shop
    id("shopEquipmentContainer").addEventListener("click", buyWeapon);
    id("shopEquipmentContainer").addEventListener("mouseover", shopEquipmentHoverHandler);
    id("shopEquipmentContainer").addEventListener("mouseout", shopClearHover);
    id("shopItemContainer").addEventListener("click", buyItem);
    id("shopItemContainer").addEventListener("mouseover", itemHover);
    id("shopItemContainer").addEventListener("mouseout", shopClearHover);

    //Inventory
    id("inventoryItemContainer").addEventListener("click", equipItem);

    //Player
    id("playerOption").addEventListener("click", openInventory);
    id("playerOption").addEventListener("mouseover", playerHoverHandler);
    id("playerOption").addEventListener("mouseout", playerClearHover);
}

function setup() {
    nav.open("player");
    player.equipped[0] = new Armour(types.ARCANE, armourPieces.HELMET, 5);
    player.equipped[1] = new Armour(types.ICE, armourPieces.AMULET, 5);
    player.equipped[2] = new Armour(types.ELECTRIC, armourPieces.CHESTPIECE, 5);
    player.equipped[3] = new Armour(types.FIRE, armourPieces.LEGGINGS, 5);
    player.equipped[4] = new Armour(types.WATER, armourPieces.BOOTS, 5);
    player.equipped[5] = genWeapon();
    setupListenersAndAttributes();
}

window.onload = setup;