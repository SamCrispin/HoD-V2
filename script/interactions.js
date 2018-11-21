var interactions = {
    "startingScreen1": {
        text: "Your name is Evandar Hrothgar. Your grandfather, a once decorated Warlord, brought dishonour to your family's name by deserting the scene of a great battle between your homeland of " +
        "Demaxius and the Dark Elves of the south beyond the Dead Plains. 2 generations later, you wish to bring back honour to your family by recovering a powerful relic lost during the Great War. " +
        "You have heard rumours of it being among the abandoned mines of the southern elves and decided to start there.",
        options: [
            {
                text: "Continue",
                action: "openInteraction",
                parameters: ["openingScreen2"]
            }
        ]
    },
    "startingScreen2": {
        text: "After making the treacherous journey across the Dead Plains, the only things left in your possession are your trusty oak staff, a few gold pieces left over from your time in Demaxius " +
        "and the now rusty broadsword passed down from your grandfather. You arrive in the town of Elaris and after finding an innkeeper generous enough to offer you a room for the night in " +
        "exchange for he little gold you have, you awake ready to explore!",
        options: [
            {
                text: "Continue",
                action: "nav.open",
                parameters: ["inventory"]
            }
        ]
    },
    "victory": {
        text: "You land your last blow onto the troll, and it staggers. It falls to its knees, and then to to its front with a tremendous crash. As the adrenaline starts draining from your veins " +
        "and you regain composure, you remember what you came here for. You step over the giant body of your fallen foe and towards the Heart of Demaxius.",
        options: [
            {
                text: "Shiny...",
                action: "openInteraction",
                parameters: ["victory2"]
            }
        ]
    },
    "victory2": {
        text: "Holding your prize in your hands almost doesn't feel real, you stare in awe at the gemstones' detail, even after all these years its been sitting in a cave. Snapping out of your " +
        "entrancement, you hurry to the exit not wanting to wait for any more cave trolls. They may be solitary beasts but you'd rather not risk it. You dig your way out of the cave and make the " +
        "long journey back to the town to rest up before the longer journey back home. You can't wait to see the looks on your family's faces...",
        options: [
            {
                text: "Continue",
                action: "nav.open",
                parameters: [""]                        //Final screen
            }
        ]
    },
    "openingScreen1": {                                 //Interaction 1
        text: "You enter the cave to hear the cackling of a small band of cave goblins and see the flickering light of a campfire round the corner. One of the goblins shockingly acute sense of smell " +
        "catches onto your intrusion and before you can react, leaps round the corner, ready to fight.",
        options: [
            {
                text: "Fight",
                action: "fight.setupFight",
                parameters: ["Goblin"]
            }
        ]
    },
    "openingScreen2": {
        text: "You slowly walk into the abandoned mine, you don't notice anything amiss but that doesn't lessen the gradual feeling of dread growing inside your stomach. You hear a gentle scuttling " +
        "behind you and turn to see a hugely oversized spider hanging from an equally oversized web, using all 8 of its eyes to stare at you.",
        options: [
            {
                text: "Stand and fight",
                action: "fight.setupFight",
                parameters: ["Giant Spider"]
            },
            {
                text: "Run into the cave and try to hide",
                action: "openInteractionChance",
                parameters: ["hide2", "fall2", 0.5]
            }
        ]
    },
    "hide2": {
        text: "You turn and run to try and find a place to hide. After a minute or so you find a small indent in the cave and try and hide there. You hear the spider approaching. You close your eyes " +
        "and pray to the gods that it doesn't notice you hiding.",
        options: [
            {
                text: "Hold your breath",
                action: "openInteractionChance",
                parameters: ["pass2", "spotted2", 0.5]
            }
        ]
    },
    "fall2": {
        text: "You turn to try and run but lose your footing in the uneven cave and fall, landing hard on the rocky floor. Before you've regained your composure, the spider is upon you.",
        options: [
            {
                text: "Fight",
                action: "fight.setupFight",
                parameters: ["Giant Spider"]
            }
        ]
    },
    "spotted2": {
        text: "The spider immediately spots your terrible hiding spot and attacks.",
        options: [
            {
                text: "You curse your own stupidity and ready your weapon",
                action: "fight.setupFight",
                parameters: ["Giant Spider"],
            }
        ]
    },
    "pass2": {
        text: "You hear the spider pass you and take a peek out of one eye to have a look. The oversized arachnid is still heading off in the wrong direction. You wait a while to make sure it " +
        "doesn't return and then start walking back to the entrance of the cave. You notice some less fortunate adventurers rotting on the floor, you hold your nose and rummage around for some " +
        "loot before scurrying away.",
        options: [
            {
                text: "Continue",
                action: "genLoot",
                parameters: []
            }
        ]
    }
};

function interactionHandler(e) {
    var target = e.target,
        action = target.getAttribute("action");
    if (!action) return;
    var parameters = target.getAttribute("parameters").split(",");
    if (action.includes(".")) {
        action = action.split(".");
        window[action[0]][action[1]](parameters);
    } else {
        window[action](parameters);
    }
}

function openInteraction(parameters /*interactionId*/) {
    var interaction = interactions[parameters[0]];
    id("interactionOutput").innerHTML = interaction.text;
    for (var i = 1; i < 6; i++) {
        if (interaction.options[i-1]) assignAttributes(i, interaction)
    }
}

function openInteractionChance(parameters/*interactionId1, interactionId2, chance*/) {
    var interaction = (Math.random() > parameters[2]) ? interactions[parameters[0]] : interactions[parameters[1]];
    id("interactionOutput").innerHTML = interaction.text;
    for (var i = 1; i < 6; i++) {
        if (interaction.options[i-1]) assignAttributes(i, interaction)
    }
}

function assignAttributes(optionNumber, interaction) {
    var optionDiv = id("interactionOption" + optionNumber),
        option = interaction.options[optionNumber - 1];
    optionDiv.innerHTML = option.text;
    optionDiv.setAttribute("action", option.action);
    optionDiv.setAttribute("blue", option.blue);
    optionDiv.setAttribute("parameters", option.parameters);
}