var filters_tab_archetype = [];

// declare the function 
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

var teams_keys = shuffle(Object.keys(teams));

document.addEventListener("DOMContentLoaded", (event) => {

    filters_tab_archetype = ARCHETYPES_NAMES.slice();   // Copy by value, not by reference

    printTabArchetypesFilters();

    printArchetypes();
});

function printTabArchetypesFilters() {
    let filters = `<div class="filters_archetypes">
    
        <button id="show_all_archetypes_button" class="primary_button" onclick="showAllTabArchetypes()">+</button>
        `;

    for (let archetype_index in ARCHETYPES_NAMES) {
        let archetype = ARCHETYPES_NAMES[archetype_index];

        filters += `
        <div class="checkbox_filter">
            <input type="checkbox" onclick="showFilterArchetype('` + archetype + `');" name="filter_tab_archetype_` + archetype.toLowerCase() + `" id="filter_tab_archetype_` + archetype.toLowerCase() + `" ` + (filters_tab_archetype.includes(archetype) ? `checked` : ``) + `>
            <label for="filter_tab_archetype_` + archetype.toLowerCase() + `">` + archetype + `</label></input>
        </div>
        `;
    }

    filters += `</div>`;

    document.getElementById("archetypes_container_filters").innerHTML = filters;
}

function showFilterArchetype(archetype) {
    let archetype_container = document.getElementById("archetype_container_" + archetype.toLowerCase());

    if (filters_tab_archetype.includes(archetype)) {
        archetype_container.style.display = "none";

        const index = filters_tab_archetype.indexOf(archetype);
        if (index > -1) {           // only splice array when item is found
            filters_tab_archetype.splice(index, 1);   // 2nd parameter means remove one item only
        }
    }
    else {
        archetype_container.style.display = "flex";

        filters_tab_archetype.push(archetype);
    }
}

function showAllTabArchetypes() {
    if (filters_tab_archetype.length > 0) {
        document.getElementById("show_all_archetypes_button").innerHTML = "-";

        while (filters_tab_archetype[0] != null) {
            document.getElementById("filter_tab_archetype_" + filters_tab_archetype[0].toLowerCase()).checked = false;
            showFilterArchetype(filters_tab_archetype[0]);
        }
    } else {
        document.getElementById("show_all_archetypes_button").innerHTML = "+";

        for (let archetype_index in ARCHETYPES_NAMES) {
            if (!filters_tab_archetype.includes(ARCHETYPES_NAMES[archetype_index])) {
                document.getElementById("filter_tab_archetype_" + ARCHETYPES_NAMES[archetype_index].toLowerCase()).checked = true;
                showFilterArchetype(ARCHETYPES_NAMES[archetype_index]);
            }
        }
    }
}

function getNewRandomTeamByArchetype(container, archetype) {
    teams_keys = shuffle(Object.keys(teams));
    document.getElementById(container).innerHTML = getRandomTeamByArchetype(archetype);
}

function getRandomTeamByArchetype(archetype) {
    let team_output = "";

    let team_index = -1;
    let index = 0;

    while (team_index == -1 && index < Object.keys(teams).length) {
        if (!filterByPrerelease(teams[teams_keys[index]])) {
            if (teams[teams_keys[index]]["archetype"].includes(archetype)) {
                team_index = teams_keys[index];
            }
        }

        ++index;
    }

    if (team_index > -1) {

        let team = teams[team_index];
        let character_4_int_index = Math.floor(Math.random() * Object.keys(team.character_4.name).length);
        let character_4_index = Object.keys(team.character_4.name)[character_4_int_index];

        let character_4 = {
            "name": team.character_4.name[character_4_index],
            "build": team.character_4.build[character_4_index]
        };

        let team_id = team_index + (team.character_4.name.length > 1 ? `-` + (character_4_int_index + 1) : ``);
        team_output = getTeamHTML(team, team_index, team_id, character_4);
    }
    else {
        team_output = '<div class="archetype_subtitle">No teams for archetype ' + archetype + ' found.</div>';
    }

    return team_output;
}

function printElement(element) {
    let element_HTML = "";

    if (!Array.isArray(element)) {
        if (ELEMENTS.includes(element)) {
            element_HTML = `
            <div class="element_container">
                <img class="archetype_element_icon" src="images/elements/` + element.toLowerCase() + `.png" alt="Element icon for ` + element + `">
            </div>
        `;
        } else if (CHARACTER_NAMES.includes(element)) {
            let character = getCharacter(element);

            element_HTML = `
            <div class="element_character_container">
                <img class="archetype_character_icon" src="images/characters/` + character.images.filename_icon + `.png" alt="Flex icon" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + character.images.filename_icon + `.png', 'images/icons/user.png', '` + character.name + `')">
            </div>
        `;
        } else {
            element_HTML = `
            <div class="element_container">
                <img class="archetype_element_icon" src="images/icons/user.png" alt="Flex icon">
            </div>
        `;
        }

    } else if (element.length == 2) {
        element_HTML = `
            <div class="double_element_container">
                <img class="" src="images/elements/` + element[0].toLowerCase() + `.png" alt="Element icon for ` + element[0] + `">
                
                <svg class="svg_divisor_line">
                    <line class="divisor_line" x1='0' y1='100%' x2='100%' y2='0' />
                </svg>

                <img class="" src="images/elements/` + element[1].toLowerCase() + `.png" alt="Element icon for ` + element[1] + `">
            </div>
        `;
    } else {
        element_HTML = `
            <div class="element_container">
                <img class="archetype_element_icon" src="images/icons/user.png" alt="Flex icon">
            </div>
        `;
    }

    return element_HTML;
}

function printElementsOrForcedCharacter(archetype) {
    let elements_HTML = "";

    elements_HTML = `
        ` + printElement(archetype["elements"][0]) + `
        ` + printElement(archetype["elements"][1]) + `
        ` + printElement(archetype["elements"][2]) + `
        ` + printElement(archetype["elements"][3]) + `
    `;

    return elements_HTML;
}

function printRecommendedCharacters(recommended_characters) {
    let characters_HTML = "";

    for (let index in recommended_characters) {
        let character = getCharacter(recommended_characters[index]);

        characters_HTML += `
            <div class="character_container ` + character.name.replaceAll(" ", "_") + `" onclick="setTabActive('tab_characters'); printCharacterInfoHTML('` + character.name + `')">
            <img class="character_icon character_` + character.rarity + `_stars" src="images/characters/` + character.images.filename_icon + `.png" alt="Character icon for ` + character.name + `" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + character.images.filename_icon + `.png', 'images/icons/user.png', '` + character.name + `')" style="background-image: url('images/regions/Emblem_` + character.region + `_` + (character.rarity == "5" ? `White` : `Night`) + `_Opacity_05.png');">
            <img class="element_icon" src="images/elements/glow_` + (character.elementText != "None" ? character.elementText.toLowerCase() : builds[character_team.name][character_team.build].element.toLowerCase()) + `.png">
                <div class="rarity_container">` + STAR_SVG + STAR_SVG + STAR_SVG + STAR_SVG + (character.rarity == "5" ? STAR_SVG : "") + `</div>
                <div class="character_name ` + (character.name.length < SHORT_NAME_LENGTH ? "character_name_short" : (character.name.length < MEDIUM_NAME_LENGTH ? "character_name_medium" : "character_name_long")) + `">` + character.name + `</div>
            </div>
        `;
    }

    if (characters_HTML == "") {
        characters_HTML = "No recommended character for this archetype.";
    }

    return characters_HTML;
}

function printArchetypes() {
    // Reset Archetypes container
    document.getElementById("archetypes_container").innerHTML = ``;

    let archetypes_HTML = "";

    for (let archetype_index in archetypes) {

        let archetype = archetypes[archetype_index];

        // Special checks for travelers
        if (archetype.element) {
            for (let i = 0; i < archetype.element.length; ++i) {
                if (!Array.isArray(archetype.element[i])) {
                    if (["Aether", "Lumine"].includes(archetype.element[i])) {
                        archetype.element[i] = traveler;
                    }
                } else {
                    for (let j = 0; j < archetype.element[i].length; ++j) {
                        if (["Aether", "Lumine"].includes(archetype.element[i][j])) {
                            archetype.element[i][j] = traveler;
                        }
                    }
                }
            }
        }

        archetypes_HTML += `
        <div id="archetype_container_` + archetype_index.toLowerCase() + `" class="archetype_container">

            <div class="teams_example">
                <div class="archetype_title">
                    <button class="link_archetypes_button" onclick="copyTextToClipboard('` + window.location.origin + window.location.pathname + `?archetype=` + archetype_index + `');">
                        <img src="images/icons/link.png">
                    </button>

                    ` + archetype_index + `
                    
                    <button type="submit" class="search_random_button" onclick="getNewRandomTeamByArchetype('random_` + archetype_index + `', '` + archetype_index + `')"></button>
                </div>
                <div class="team_elements_container">
                    ` + printElementsOrForcedCharacter(archetype) + `
                </div>

                <div id="random_` + archetype_index + `">
                    ` + getRandomTeamByArchetype(archetype_index) + `
                </div>
            </div>
            
            <div class="archetype_info">
    
                <div>
                    <div class="archetype_subtitle">
                        Description:
                    </div>
                    ` + archetypes[archetype_index]["description"] + `
                </div>
    
                <div>
                    <div class="archetype_subtitle">
                        Pros/Cons:
                    </div>
                    <div scrollable_div="">
                        ` + archetypes[archetype_index]["pros_cons"] + `
                    </div>
                </div>
    
                <div>
                    <div class="archetype_subtitle">
                        Recommended characters:
                    </div>
                    <div class="recommended_characters_container">
                        ` + printRecommendedCharacters(archetypes[archetype_index]["recommended_characters"]) + `
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    document.getElementById("archetypes_container").innerHTML = archetypes_HTML;
}