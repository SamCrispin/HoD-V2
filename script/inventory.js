var inventoryItems = [];

function pickupLoot(e) {
    var triggerDiv = e.target,
        item = loot.splice(triggerDiv.id.slice(triggerDiv.id.length - 1), 1, null)[0];
    if (triggerDiv.id == "lootItemContainer") return;
    if (!pushItemToInventory(item)) {
        triggerDiv.style.borderColor = "red";
        setTimeout(function() {triggerDiv.style.borderColor = "white";}, 100);
    }
    id("lootItemContainer").removeChild(triggerDiv);
}

function pushItemToInventory(item) {
    switch (item.type) {
        case "WEAPON":
            player.inventory.push(item);
            break;
        case "ITEM":
            if (player.itemSlots.length == 3) return false;
            player.itemSlots.push(item);
            renderItems();
            break;
        case "ARMOUR":
            player.inventory.push(item);
            break;
        case "gold":
            player.changeGold(item.value);
            break;
    }
}

function renderItems() {
    if (player.itemSlots[0]) id("hudItemSlot1").style.backgroundImage = "url(img/" + player.itemSlots[0].value.bgImage + "Icon.png)";
    else id("hudItemSlot1").style.backgroundImage = "none";
    if (player.itemSlots[1]) id("hudItemSlot2").style.backgroundImage = "url(img/" + player.itemSlots[1].value.bgImage + "Icon.png)";
    else id("hudItemSlot2").style.backgroundImage = "none";
    if (player.itemSlots[2]) id("hudItemSlot3").style.backgroundImage = "url(img/" + player.itemSlots[2].value.bgImage + "Icon.png)";
    else id("hudItemSlot3").style.backgroundImage = "none";
}

function populateInventory(type) {
    var item, div, x = 0;
    inventoryItems = [];
    id("inventoryItemContainer").innerHTML = "";
    id("inventoryMessage").innerHTML = type.capitalize();
    for (var i = 0; i < player.inventory.length; i++) {
        item = player.inventory[i];
        if (type == "ALL" || item.type == type || (item.value.piece && item.value.piece == type)) {
            inventoryItems.push(item);
            div = document.createElement("div");
            div.className = "item hasHoverBorder";
            div.id = "inventoryItem" + x;
            div.style.backgroundImage = "url(img/" + ((item.type == "WEAPON") ? "staff" : item.value.piece) + ".png)";
            id("inventoryItemContainer").appendChild(div);
            x++;
        }
    }
}

function equipItem(e) {
    var id = e.target.id,
        item = inventoryItems[id.slice(id.length-1)],
        inventoryItem,
        keys = Object.keys(armourPieces), i;
    if (item.type == "WEAPON") {
        inventoryItem = player.equipped[5];
        player.equipped[5] = item;
    } else if (item.type = "ARMOUR") {
        inventoryItem = player.equipped[keys.indexOf(item.value.piece)];
        player.equipped[keys.indexOf(item.value.piece)] = item;
    }
    var count = 0;
    for (i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].type == item.type) {
            if (count == id.slice(id.length-1)) {
                player.inventory.splice(i, 1);
                break;
            }
            count++;
        }
    }
    player.inventory.push(inventoryItem);
    populateInventory(item.type);
}

function useItem(itemId) {
    if (!player.itemSlots[itemId-1].value.effect()) return;
    player.itemSlots.splice(itemId-1, 1);
    renderItems();
}

function openInventory(e) {
    var divId = e.target.id,
        inventory = divId.slice(6).toUpperCase();
    nav.open("inventory");
    populateInventory(inventory);
    id("inventoryBack").style.display = "block";
}

function playerMouseOverHandler(e) {
    var id = e.target.id,
        key = id.slice(6);
    if (key == "Weapon") playerWeaponHover();
    else if (Object.keys(armourPieces).includes(key.toUpperCase())) playerArmourHover(key.toUpperCase());
}

function playerArmourHover(key) {
    var armour = player.equipped[Object.keys(armourPieces).indexOf(key)];
    id("playerItemStatsMessage").innerHTML = key.capitalize();
    id("playerItemStatsOutput").innerHTML = "Defense: " + armour.value.defense + "<br>"
                                          + "Type: " + armour.value.type.capitalize();
    id("playerItemMoves").innerHTML = "";
}

function playerWeaponHover() {
    var moves = "";
    id("playerItemStatsMessage").innerHTML = "Weapon";
    id("playerItemStatsOutput").innerHTML = "Attack: " + player.equipped[5].value.attack + "<br>"
                                      + "Moves:<br>";
    for (var i = 0; i < 4; i++) {
        moves += player.equipped[5].value.moves[i].name + "<br>";
    }
    id("playerItemMoves").innerHTML = moves;
}

function outputPlayerStats() {
    var output = "", moves = "";
    output += "Health: " + player.health.current + "/" + player.health.max + "\n"
            + "Attack: " + getPlayerAttack() + "\n"
            + "Defense: " + getPlayerDefense() + "\n"
            + "Moves: ";
    id("playerStatsOutput").innerText = output;
    for (var i = 0; i < 4; i++) {
        moves += player.equipped[5].value.moves[i].name + "<br>";
    }
    id("playerMoves").innerHTML = moves;
}

function playerMouseOutHandler() {
    id("playerItemStatsMessage").innerHTML = "Info";
    id("playerItemStatsOutput").innerText = "Hover over an item for more information";
    id("playerItemMoves").innerHTML = "";
}

function inventoryBack() {
    nav.open("player");
}