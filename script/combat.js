var types = {
        NORMAL:     "NORMAL",
        FIRE:       "FIRE",
        WATER:      "WATER",
        GRASS:      "GRASS",
        ELECTRIC:   "ELECTRIC",
        ICE:        "ICE",
        ARCANE:     "ARCANE"
    },

    effectiveness = {
        "NORMAL":   {
            "ARCANE":   2
        },
        "FIRE":     {
            "FIRE":     0.5,
            "WATER":    0.5,
            "GRASS":    2,
            "ICE":      2
        },
        "WATER": {
            "FIRE":     2,
            "WATER":    0.5,
            "GRASS":    0.5,
            "ELECTRIC": 0.5,
            "ICE":      2,
            "ARCANE":   2
        },
        "GRASS": {
            "FIRE":     0.5,
            "WATER":    2,
            "GRASS":    0.5,
            "ARCANE":   2
        },
        "ELECTRIC": {
            "WATER":    2,
            "ELECTRIC": 0.5,
            "ICE":      0.5,
            "ARCANE":   0.5
        },
        "ICE": {
            "FIRE":     0.5,
            "GRASS":    2,
            "ELECTRIC": 0.5,
            "ICE":      0.5
        },
        "ARCANE": {
            "NORMAL":   2,
            "WATER":    0.5,
            "GRASS":    0.5,
            "ELECTRIC": 2,
            "ARCANE":   0.5
        }
    },

    attacks = {
        "NORMAL": [
            {
                name: "Shockwave",
                type: types.NORMAL,
                description: "Sends a blast of air towards your target"
            }
        ],
        "FIRE": [
            {
                name: "Firestorm",
                type: types.FIRE,
                description: "Engulfs your foe in a spiral of flames",
            }
        ],
        "WATER": [
            {
                name: "Water Gun",
                description: "Fires a high pressure beam of water at your opponent"
            }
        ],
        "GRASS": [
            {
                name: "Leaf Storm",
                description: "Launches a trees worth of razor sharp leaves at your target"
            }
        ],
        "ELECTRIC": [
            {
                name: "Thunderbolt",
                description: "Calls down a massive bolt of lightning, striking your target directly "
            }
        ],
        "ICE": [
            {
                name: "Blizzard",
                description: "Calls forth a storm of hail and snow, buffeting your target"
            }
        ],
        "ARCANE": [
            {
                name: "Arcane Blast",
                description: "Hurls a ball of magical energy at your foe, causing all sorts of unknown damage"
            }
        ],
        "BARRIER": [
            {
                name: "Barrier",
                description: "Erects a magical barrier around you, shielding you from attack"
            }
        ]
    },

    itemEffects = {

    };