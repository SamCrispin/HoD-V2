function pickupLoot(e) {
    var triggerDiv = e.target,
        item = loot[triggerDiv.id.slice(triggerDiv.id.length - 1)];
    switch (item.type) {
        case "weapon":
            player.inventory.push(item.value);
            break;
        case "item":
            player.itemSlots.push(item.value);
            break;
        case "gold":
            player.changeGold(item.value);
            break;
    }
}