const builds_example = {
    "Aether": {
        "Standard": {               // -
            "constellation": "",    // 0, 1, 2, 3, 4, 5, 6
            "weapon": "",           // Any literal key string in weapons.js
            "set": "",              // Any literal key string in artifacts.js
            "main_stat": {          // HP, HP%, ATK, ATK%, EM, ER, Crit Prob, Crit Damage, DEF, DEF%
                "Sands": "",
                "Goblet": "",
                "Circlet": "",
            },
            "subs_stat": ["", "", "", ""]   // HP, HP%, ATK, ATK%, EM, ER, Crit Prob, Crit Damage, DEF, DEF%
        }
    }
};

const teams_example = {
    "1": {
        "name": "",             // -
        "description": "",      // -
        "rotation": "",         // -
        "archetype": "",        // -
        "viability": "",        // Recommended, viable, for_fun, unique

        "character_1": {
            "name": "",         // Any literal key string in characters.js
            "build": ""         // Any literal key string in builds.js for the previous character
        },
        "character_2": {
            "name": "",         // Any literal key string in characters.js
            "build": ""         // Any literal key string in builds.js for the previous character
        },
        "character_3": {
            "name": "",         // Any literal key string in characters.js
            "build": ""         // Any literal key string in builds.js for the previous character
        },
        "character_4": {
            "name": "",         // Any literal key string in characters.js
            "build": ""         // Any literal key string in builds.js for the previous character
        }
    }
};