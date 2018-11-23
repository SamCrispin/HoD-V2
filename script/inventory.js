function pickupLoot(e) {
    var triggerDiv = e.target,
        item = loot.splice(triggerDiv.id.slice(triggerDiv.id.length - 1), 1, null)[0];
    pushItemToInventory(item);
    id("lootItemContainer").removeChild(triggerDiv);
}

function pushItemToInventory(item) {
    switch (item.type) {
        case "weapon":
            player.inventory.push(item.value);
            break;
        case "item":
            //pickup item
            player.itemSlots.push(item.value);
            break;
        case "armour":
            player.inventory.push(item.value);
            break;
        case "gold":
            player.changeGold(item.value);
            break;
    }
}

function populateInventory() {

}