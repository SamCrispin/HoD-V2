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

    }
};

var nav = {
    lastOpenDiv: null,
    openDiv: null,

    open: function(divIdToBeOpened) {
        if (this.openDiv) this.close(this.openDiv);
        document.getElementById(divIdToBeOpened).style.display = "block";
        this.openDiv = divIdToBeOpened;
    },

    close: function (divIdToBeClosed) {
        document.getElementById(divIdToBeClosed).style.display = "none";
        this.lastOpenDiv = divIdToBeClosed;
    },

    back: function () {
        var divToBeOpened = this.lastOpenDiv;
        this.close(this.openDiv);
        this.open(divToBeOpened);
    }
};

function setup() {
    nav.open("inventory");
}

window.onload = setup;