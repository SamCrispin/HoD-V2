var interactions = {
    "startingScreen1": {
        text: "Your name is Evandar Hrothgar. Your grandfather, a once decorated Warlord, brought dishonour to your family's name by deserting the scene of a great battle between your homeland of " +
        "Demaxius and the Dark Elves of the south beyond the Dead Plains. 2 generations later, you wish to bring back honour to your family by recovering a powerful relic lost during the Great War. " +
        "You have heard rumours of it being among the abandoned mines of the southern elves and decided to start there.",
        options: [
            {
                text: "Continue",
                action: "openInteraction",
                parameters: ["startingScreen2"]
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
                parameters: ["map"]
            }
        ]
    },
    'openingScreenBoss': {                        //Boss Fight
        text: "The cave you've meandered into seems darker than any others that you've seen before, you can barely see your hand in front of your face. A creeping sense of dread is accompanying the intense surrounding black. You continue deeper nonetheless. " +
        "You turn a corner and start to hear a periodic rumbling, the sound is reverberating around you and even shaking the rock beneath your feet.",
        options: [
            {
                text: "Continue",
                action: "openInteraction",
                parameters: ["boss1"]
            }
        ]
    },
    'boss1': {
        text: "Much against your better judgement, you tentatively carry on forwards, making sure to keep your footing on the rumbling ground beneath you. A painfully loud crashing behind you makes you jump out of your skin and you spin around to see " +
        "a massive stalactite shattered on the floor blocking your exit. You don't wait around to see if any other fancy rock formations are dropping from the ceiling and hastily make your way to the other end of the rocky corridor.",
        options: [
            {
                text: "Continue",
                action: "openInteraction",
                parameters: ["boss2"]
            }
        ]
    },
    'boss2': {
        text: "Passing under the naturally formed rock arch, you see it. The Heart Of Demaxius. Sitting on top of a pile of other treasure, the redemption for your family's name, your ticket for a role in the army, what you've dedicated years of your life " +
        "researching and looking for. You now stand in front of it, separated only by a 15 feet tall cave troll that was just woken up by the falling stalactite that only narrowly missed you. You don't know much about cave trolls, but one thing you do " +
        "know is the fact that waking up a cave troll before it wants to is a death sentence. You didn't wake him up... but he doesn't know that...",
        options: [
            {
                text: "Oh no...",
                action: "fight.setupFight",
                parameters: ["Cave Troll"]
            }
        ]
    },
    "victory1": {
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
                parameters: ["player"]                        //Final screen
            }
        ]
    },
    "inn": {
        text: "You walk into the inn, everyone seems cheery enough, chatting over mugs of ale and cups of wine. You see the inn keeper behind the bar, an upbeat looking man who also seems like he's broken up enough bar brawls in his time. You walk over to the "
        + "bar and wait to be served. The keeper walks over to you, \"What can i get for you?\" he said in his jolly voice.",
        options: [
            {
                text: "\"A room for the night and a jug of your finest ale please\" (heals you for 50% of your missing hp - " + (player.health.max - player.health.current) / 2 + ", costs 100g)",
                action: "stayNight",
                parameters: []
            },
            {
                text: "\"Hmm... Maybe another time\"",
                action: "nav.open",
                parameters: ["map"]
            }
        ]
    },
    "innStayed": {
        text: "\"Certainly sir! Coming right up! 100 gold please\". You cough up the 100g and the inn keeper hands you a mug of ale and a room key. You're tired so you decide " +
        "to quickly drink your ale and head to your room for a much needed nights sleep.",
        options: [
            {
                text: "Continue",
                action: "nav.open",
                parameters: ["map"]
            }
        ]
    },
    "innNotStayed": {
        text: "\"Certainly sir! Coming right up! 100 gold please\". You quickly realise that you don't have enough gold to stay, you let out a long sigh, \"Sorry, I don't "
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
                parameters: ["Giant Spider"]
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
    },
    'openingScreen3': {						//Interaction 3
        text: "You wander into the old mine shaft, hands poised to draw your weapon in case of trouble. You find a hooded figure sitting next to a fire, watching the flames dance in front of him. " +
        "As you draw your weapon, he says quietly \"I mean you no harm, but I will defend myself if needs be. Who are you and what are you doing down here?\".",
        options: [
            {
                text: "Tell him of your backstory and your quest",
                action: "openInteractionChance",
                parameters: ["intrigued3", "bored3", 0.5]
            },
            {
                text: "He could have loot! He lives in a cave on his own, no one will know he's gone right? Attack him!",
                action: "fight.setupFight",
                parameters: ["Odd Man"]
            }
        ]
    },
    "intrigued3": {
        text: "He seems intrigued by your story, \"I wish I could help you more but I don't have much myself\", he offers you some of his loot, \"Looted these off of a dead guard a while back, no use " +
        "for 'em my self, take 'em and leave\".",
        options: [
            {
                text: "You thank the man, take the loot and quickly take your leave",
                action: "genLoot",
                parameters: []
            }
        ]
    },
    'bored3': {
        text: "He\'s bored by your story and makes no comment, he goes back to being entranced by the dancing flames infront of him. After a short while, he looks up at you, \"You can leave now...\" " +
        "he snaps.",
        options: [
            {
                text: "You leave the odd man to himself, he clearly won't offer you anything",
                action: "nav.open",
                parameters: ["map"]
            }
        ]
    },
    'openingScreen4': {						//Interaction 4
        text: "You walk into the cave ready for anything, only to discover that the cave is completely empty save for some shiny rocks dotted around. You admire the rocks momentarily before leaving " +
        "the desolate cave. There's nothing here for you. Unless you really like rocks.",
        options: [
            {
                text: "Continue",
                action: "nav.open",
                parameters: ["map"]
            }
        ]
    },
    "openingScreen5": {
        text: "You walk into a small abandoned keep. It clearly hasn't been used since the war and time has taken its toll, walls are crumbling, doors are rotting and the paving cobbles are worn. The " +
        "amount of nooks and crannies that a secret assailant could be hiding in concerns you however. As you cautiously walk through the corridors of the place, you spot a suspiciously placed chest " +
        "and walk over to it.",
        options: [
            {
                text: "Open the chest. You can't resist the possibility of loot!",
                action: "openInteractionChance",
                parameters: ["trap5", "loot5", 0.5]
            },
            {
                text: "This is clearly a trap, only a fool would fall for something so obvious!",
                action: "openInteraction",
                parameters: ["leave5"]
            }
        ]
    },
    'leave5': {
        text: "You walk away with a smug smile on your face. Knowing you've just avoided a potentially deadly trap fills you with a subtle sense of confidence for the rest of your journey as you " +
        "continue out of the keep.",
        options: [
            {
                text: "Continue",
                action: "nav.open",
                parameters: ["map"]
            }
        ]
    },
    'trap5': {
        text: "You open the chest and a crudely made flashbang goes off. Temporarily blinded and deafened a loud ringing, you stumble back and try to draw your sword. As you start to be able to see " +
        "again, an armed man runs round the corner and sees you stumbling around trying to regain your senses. \"Wow! That worked?! I didn't think anyone would be so foolish to fall for something so " +
        "obvious\". The man charges you with sword overhead.",
        options: [
            {
                text: "Fight",
                action: "fight.setupFight",
                parameters: ["Bandit"]
            }
        ]
    },
    'loot5': {
        text: "You open the chest to find loot, result! Still being suspicious you look around. Seeing no prying eyes, you grab the loot and hurry away.",
        options: [
            {
                text: "Continue",
                action: "genLoot",
                parameters: []
            }
        ]
    },
    "openingScreen6": {
        text: "As you cautiously walk through the entrance to the castle on top of the hill you just spent ages scaling, you clearly weren't cautious enough because you immediately fall through a hole " +
        "covered up by the ragged red carpet leading your way through the castle. Thankfully the fall wasn't far enough to break anything, just wind you a little and annoy you a lot. As you pick " +
        "yourself up you are immediately faced by a heavily armoured man with a two handed great sword taller than you.",
        options: [
            {
                text: "Oh dear...",
                action: "fight.setupFight",
                parameters: ["Knight"]
            }
        ]
    },
    'openingScreen7': {						//Interaction 9
        text: "You're wandering past a cave that looks so uninteresting you can't really even be bothered to explore inside of it, so you carry on wandering. Or you would have if a child, no more than 10 " +
        "or so, hadn't ran out of the cave desperately asking for your help. \"Please! My mother's hurt! She needs help quick!\". He gestures you to follow and runs back inside.",
        options: [
            {
                text: "You can't just leave a kid's mother to die can you? Go in and help",
                action: "openInteraction",
                parameters: ["help7"]
            },
            {
                text: "Hmmm... Seems oddly suspicious, keep walking",
                action: "openInteraction",
                parameters: ["walk7"]
            }
        ]
    },
    'walk7': {
        text: "You feel bad for potentially leaving a kid to be destined an orphan but you don't know what was in that cave, there was as much chance of you dying in there from an ambush than a helping kids mother " +
        "who you owe nothing to.",
        options: [
            {
                text: "Continue",
                action: "nav.open",
                parameters: ["map"]
            }
        ]
    },
    'help7': {
        text: "You follow the child into the dark cave, he's waiting at the end of the first tunnel. As he sees you, he hurries down the right of a split path. \"Hurry!\", You hear his echo rebounding off of the walls" +
        "making it sound as if you're surrounded. You round the final corner and you see the boy standing there.",
        options: [
            {
                text: "\"Where is she?\"",
                action: "openInteractionChance",
                parameters: ["trap7", "notTrap7", 0.5]
            }
        ]
    },
    'trap7': {
        text: "The child starts beaming with a menacingly evil smile. \"Good work laddie\", you hear a gruff voice behind you say. You turn to a man, quite a bit taller than you, staring at you with an " +
        "extremely disturbing grin from ear to ear and a sword in each hand start running towards you. You draw your sword and prepare for a fight",
        options: [
            {
                text: "Well you don't look injured, or like a mother for that matter",
                action: "fight.setupFight",
                parameters: ["Bandit"]
            }
        ]
    },
    'notTrap7': {
        text: "\"Just round here, hurry!\", you catch up to him to see his mother resting on the floor with a nasty gash in her stomach. You you remember you're grand father telling you about a wound not" +
        "too dissimilar to this one from his time in the war and how he saved the injured persons life. You spend some time tending to her wound as best you can.",
        options: [
            {
                text: "Continue",
                action: "openInteraction",
                parameters: ["helping7"]
            }
        ]
    },
    'helping7': {
        text: "After a while, the mother wakes up having recovered a little. The two of them thank you, \"Please\" she said, \"Take this, we haven't got a need for it\". You thank the pair and open up " +
        "the bundle of cloth you got and see what it is.",
        options: [
            {
                text: "Continue",
                action: "genLoot",
                parameters: []
            }
        ]
    },
    'openingScreen8': {                       //Interaction 11
        text: "You are walking along a forest path, nothing interesting has happened for hours. As if the world read your thoughts, two people fly out of the foliage beside you and onto the path. Without a second " +
        "look at you they roll around on the path in a fierce attempt to get a proper hit in on the other. One of them has the colours and the badge of the Imperial Elf Army whereas the other is in rough raggedy " +
        "clothes. You feel like you should help one of them...",
        options: [
            {
                text: "Help the soldier, you don't want to get on the wrong side of the Imperials",
                action: "openInteractionChance",
                parameters: ["soldierGood8", "soldierBad8", 0.5]
            },
            {
                text: "Help the other man, you've been in his shoes before, he likely just got caught stealing food to feed his family",
                action: "openInteractionChance",
                parameters: ["outlawGood8", "outlawBad8", 0.5]
            }
        ]
    },
    'soldierGood8': {
        text: "You run over to the tussle and separate the two then immediately land a hefty punch onto the commoners face, knocking him out. The Imperial catches his breath before thanking you for your help, " +
        "\"I\'m not quite sure how I almost let him best me there but thank you for you help, take this as a thanks\". He hands you something from his backpack and gets back to dealing with the criminal.",
        options: [
            {
                text: "Continue",
                action: "genLoot",
                parameters: []
            }
        ]
    },
    'soldierBad8': {
        text: "You run over to the tussle and separate the two then immediately land a hefty punch onto the commoners face, knocking him out. The Imperial catches his breath quickly before addressing you, " +
        "\"You shouldn't go around meddling in every fight you see kid, I'm no good guy\". He clearly killed an Imperial and stole his jacket, like he's looking to do you with you, although you doubt " +
        "he'll take your jacket.",
        options: [
            {
                text: "Why are they never the good guys...",
                action: "fight.setupFight",
                parameters: ["Bandit"]
            }
        ]
    },
    'outlawGood8': {
        text: "You run over to the fight and separate the two then immediately land a punch onto the Imperials face, knocking him out. The man stands up thanking you, \"That blasted elf has been chasing me " +
        "for ages, I saw him take out a small patrol of Imperial Guards and steal one of their clothes. He noticed me and chased me immediately, clearly didn't want any witnesses.\" You relax, knowing " +
        "you've made the right decision, \"Take this as thanks\".",
        options: [
            {
                text: "Continue",
                action: "genLoot",
                parameters: []
            }
        ]
    },
    'outlawBad8': {
        text: "You run over to the fight and separate the two then immediately land a punch onto the Imperials face, knocking him out. The man scrambles for the elf's sword, which was still on his hilt " +
        "for some reason, and jumps to attack you.",
        options: [
            {
               text: "Wrong choice it seems",
               action: "fight.setupFight",
               parameters: ["Bandit"]
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

function openInteraction(interactionId) {
    var interaction = interactions[interactionId];
    id("interactionOutput").innerHTML = interaction.text;
    for (var i = 1; i < 6; i++) {
        if (interaction.options[i-1]) assignAttributes(i, interaction);
        else id("interactionOption" + i).innerHTML = "";
    }
}

function openInteractionChance(parameters) {
    var interaction = (Math.random() > parameters[2]) ? interactions[parameters[0]] : interactions[parameters[1]];
    id("interactionOutput").innerHTML = interaction.text;
    for (var i = 1; i < 6; i++) {
        if (interaction.options[i-1]) assignAttributes(i, interaction);
        else id("interactionOption" + i).innerHTML = "";
    }
}

function assignAttributes(optionNumber, interaction) {
    var optionDiv = id("interactionOption" + optionNumber),
        option = interaction.options[optionNumber - 1];
    optionDiv.innerHTML = option.text;
    optionDiv.setAttribute("action", option.action);
    optionDiv.setAttribute("parameters", option.parameters);
}