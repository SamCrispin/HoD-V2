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
    cell: null,

    changeHealth: function (health) {
        if (this.health.current == this.health.max && health > 0) return false;
        player.health.current += health;
        if (player.health.current > player.health.max) player.health.current = player.health.max;
        else if (player.health.current <= 0) this.die();
        id("fightHealthBarPlayer").style.width = ((player.health.current / player.health.max)*100) + "%";
        id("fightHealthLabelPlayer").innerHTML = player.health.current + "/" + player.health.max + "hp";
        id("hudHealth").innerHTML = player.health.current + "/" + player.health.max + "hp";
    },

    die: function () {
        fight.battle = false;
    },

    changeGold: function (gold) {
        this.gold += gold;
        id("hudGold").innerHTML = this.gold + " Gold";
    }
};

var canVisitMapOrInvFromLocation = {
    interaction: false,
    inventory: true,
    player: true,
    fight: false,
    loot: false,
    shop: true,
    map: true
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

function hudMapClickHandler() {if(canVisitMapOrInvFromLocation[nav.openDiv]) nav.open("map");}
function hudMapMouseOver() {if(canVisitMapOrInvFromLocation[nav.openDiv]) id("hudMap").style.backgroundImage = "url(img/mapHover.png)";}
function hudMapMouseOut() {if(canVisitMapOrInvFromLocation[nav.openDiv]) id("hudMap").style.backgroundImage = "url(img/map.png)";}

function hudInvClickHandler() {if(canVisitMapOrInvFromLocation[nav.openDiv]) nav.open("player");}
function hudInvMouseOver() {if(canVisitMapOrInvFromLocation[nav.openDiv]) id("hudInventory").style.backgroundImage = "url(img/inventoryHover.png)";}
function hudInvMouseOut() {if(canVisitMapOrInvFromLocation[nav.openDiv]) id("hudInventory").style.backgroundImage = "url(img/inventory.png)";}

function itemClickHandler(e) {
    var divId = e.target.id;
    if (divId.includes("Slots")) return;
    if (fight.battle && fight.playersTurn) useItem(divId.slice(divId.length - 1))
}

function itemRightClickHandler(e) {
    var divId = e.target.id;
    e.preventDefault();
    id(divId + "Discard").style.display = "block";
}

function itemHoverOutHandler(e) {
    var divId = e.target.id;
    if (divId == "hudItemSlots" || (e.screenY == 136)) return;
    if (divId.includes("Discard")) id(divId).style.display = "none";
    else id(divId + "Discard").style.display = "none";
}

function keyDownHandler(e) {
    var key = e.key;
    switch (key) {
        case " ":
            fight.next();
            break;
    }
}

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

    //Fight
    id("fightMoves").addEventListener("mouseover", function() {
        var triggerDiv = event.target,
                divId = triggerDiv.id.slice(triggerDiv.id.length - 1);
        id("fightMoveDescription").innerHTML = player.equipped[5].value.moves[divId-1].description;
    });
    id("fightMoves").addEventListener("mouseout", function() {
        id("fightMoveDescription").innerHTML = "Select a move"
    });
    id("fightMoves").addEventListener("click", function () {
        var triggerDiv = event.target,
                moveId = triggerDiv.id.slice(triggerDiv.id.length - 1);
        fight.attack(player.equipped[5].value.moves[moveId-1]);
    });
    document.addEventListener("keypress", keyDownHandler);

    //Loot
    id("lootItemContainer").addEventListener("click", pickupLoot);
    id("lootForward").addEventListener("click", lootForward);

    //Shop
    id("shopEquipmentContainer").addEventListener("click", buyWeapon);
    id("shopEquipmentContainer").addEventListener("mouseover", shopEquipmentMouseOverHandler);
    id("shopEquipmentContainer").addEventListener("mouseout", shopMouseOutHandler);
    id("shopItemContainer").addEventListener("click", buyItem);
    id("shopItemContainer").addEventListener("mouseover", shopItemMouseOverHandler);
    id("shopItemContainer").addEventListener("mouseout", shopMouseOutHandler);

    //Inventory
    id("inventoryItemContainer").addEventListener("click", equipItem);

    //Player
    id("playerOption").addEventListener("click", openInventory);
    id("playerOption").addEventListener("mouseover", playerMouseOverHandler);
    id("playerOption").addEventListener("mouseout", playerMouseOutHandler);

    //Map
    id("mapContainer").addEventListener("click", mapClick);
    id("mapContainer").addEventListener("mouseover", mapMouseOverHandler);
    id("mapContainer").addEventListener("mouseout", mapMouseOutHandler);

    //Hud
    id("hudMapHover").addEventListener("click", hudMapClickHandler);
    id("hudMapHover").addEventListener("mouseover", hudMapMouseOver);
    id("hudMapHover").addEventListener("mouseout", hudMapMouseOut);
    id("hudInventoryHover").addEventListener("click", hudInvClickHandler);
    id("hudInventoryHover").addEventListener("mouseover", hudInvMouseOver);
    id("hudInventoryHover").addEventListener("mouseout", hudInvMouseOut);
    id("hudItemSlots").addEventListener("click", itemClickHandler);
    id("hudItemSlots").addEventListener("contextmenu", itemRightClickHandler);
    id("hudItemSlots").addEventListener("mouseout", itemHoverOutHandler);

}

function setup() {
    nav.open("map");
    generateMap();
    player.equipped[0] = {type: "ARMOUR", value: new Armour(types.ARCANE, armourPieces.HELMET, 5)};
    player.equipped[1] = {type: "ARMOUR", value: new Armour(types.ICE, armourPieces.AMULET, 5)};
    player.equipped[2] = {type: "ARMOUR", value: new Armour(types.ELECTRIC, armourPieces.CHESTPIECE, 5)};
    player.equipped[3] = {type: "ARMOUR", value: new Armour(types.FIRE, armourPieces.LEGGINGS, 5)};
    player.equipped[4] = {type: "ARMOUR", value: new Armour(types.WATER, armourPieces.BOOTS, 5)};
    player.equipped[5] = genWeapon();
    setupListenersAndAttributes();
}

window.onload = setup;