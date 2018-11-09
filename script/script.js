var player = {
    health: {
        max: 100,
        current: 100
    },
    attack: 10,
    defense: 10,
    charisma: 10,
    gold: 100,
    inventorySlots: [],

    changeHealth: function (health) {
        if (this.health.current == this.health.max && health > 0) return false;
        player.health.current += health;
        if (player.health.current > player.health.max) player.health.current = player.health.max;
        else if (player.health.current <= 0) this.die();
    },

    die: function () {

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

    close: function (divIdToBeClosed) {
        id(divIdToBeClosed).style.display = "none";
        this.lastOpenDiv = divIdToBeClosed;
    },

    back: function () {
        var divToBeOpened = this.lastOpenDiv;
        this.close(this.openDiv);
        this.open(divToBeOpened);
    }
};

function id(id) {
    return document.getElementById(id);
}

function setupListenersAttributes() {
    id("interactionOption1").setAttribute("action", interactions.openingScreen1.options[0].action);
    id("interactionOption1").setAttribute("parameters", interactions.openingScreen1.options[0].parameters);
    id("interactionOption1").addEventListener("click", interactionHandler);
    id("interactionOption2").addEventListener("click", interactionHandler);
    id("interactionOption3").addEventListener("click", interactionHandler);
    id("interactionOption4").addEventListener("click", interactionHandler);
    id("interactionOption5").addEventListener("click", interactionHandler);
}

function setup() {
    nav.open("interaction");
    setupListenersAttributes();
}

window.onload = setup;