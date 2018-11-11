function Weapon(type, moves, attack) {
    this.type = type;
    this.moves = moves;
    this.attack = attack;
}

function Item(name, description, effect) {
    this.name = name;
    this.description = description;
    this.effect = effect;
}

function genWeapon() {
    var type = getRandomType(),
        thisMoves = [],
        attack = (Math.random() * 10) << 0,
        moveTypes = [type];

    for (var i = 0; i < 2; i++) {
        moveTypes.push(getRandomType(moveTypes));
    }
    for (var x in moveTypes) {
        thisMoves.push(moves[moveTypes[x]][0])
    }
    thisMoves.push(moves["BARRIER"][0]);
    return new Weapon(type, thisMoves, attack)
}

function genItem() {
    var keys = Object.keys(items), item;
    item = items[keys[(Math.random() * keys.length) << 0]];
    return new Item(item.name, item.description, item.effect);
}

function getRandomType(blackList) {
    var keys = Object.keys(types),
        type;
    do {
        type = types[keys[(Math.random() * keys.length) << 0]];
        for (var x in blackList) {
            if (type == blackList[x]) {
                type = null;
                break;
            }
        }
    } while (!type);
    return type;
}