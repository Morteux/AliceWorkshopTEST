var filters_element = [];
var filters_archetype = [];
var filters_viability = [];
var filters_character = [];

var filter_favorite = false;
var filter_characters_owned = false;

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("extra_filters_container").style.display = "none";

    printExtraFilters();
});

function printExtraFilters() {
    filters_element = ELEMENTS.slice();             // Copy by value, not by reference
    filters_archetype = ARCHETYPES_NAMES.slice();   // Copy by value, not by reference
    filters_viability = VIABILITIES.slice();        // Copy by value, not by reference
    filters_character = CHARACTER_NAMES.slice();    // Copy by value, not by reference

    let extra_filters_container = document.getElementById("extra_filters_container");

    let filters = "";

    filters += `<div class="filters_elements">
    
        <button id="toggle_all_elements_button" class="primary_button" onclick="toggleAllElements()">+</button>
    `;

    for (let element_index in ELEMENTS) {
        let element = ELEMENTS[element_index];

        filters += `
        <div class="checkbox_filter">
            <input type="checkbox" onclick="toggleFilterElement('` + element + `'); resetResult(); searchQuery()" name="filter_element_` + element.toLowerCase() + `" id="filter_element_` + element.toLowerCase() + `" ` + (filters_element.includes(element) ? `checked` : ``) + `>
            <label for="filter_element_` + element.toLowerCase() + `">` + element + `</label></input>
        </div>`;
    }
    filters += `</div>`;



    filters += `<div class="filters_archetypes">
    
    <button id="toggle_all_archetypes_button" class="primary_button" onclick="toggleAllArchetypes()">+</button>
    `;
    for (let archetype_index in ARCHETYPES_NAMES) {
        let archetype = ARCHETYPES_NAMES[archetype_index];

        filters += `
        <div class="checkbox_filter">
            <input type="checkbox" onclick="toggleFilterArchetype('` + archetype + `'); resetResult(); searchQuery()" name="filter_archetype_` + archetype.toLowerCase() + `" id="filter_archetype_` + archetype.toLowerCase() + `" ` + (filters_archetype.includes(archetype) ? `checked` : ``) + `>
            <label for="filter_archetype_` + archetype.toLowerCase() + `">` + archetype + `</label></input>
        </div>`;
    }
    filters += `</div>`;



    filters += `<div class="filters_viabilities">
    
    <button id="toggle_all_viabilities_button" class="primary_button" onclick="toggleAllViabilities()">+</button>
    `;
    for (let viability_index in VIABILITIES) {
        let viability = VIABILITIES[viability_index];

        filters += `
        <div class="checkbox_filter">
            <input type="checkbox" onclick="toggleFilterViability('` + viability + `'); resetResult(); searchQuery()" name="filter_viability_` + viability.toLowerCase() + `" id="filter_viability_` + viability.toLowerCase() + `" ` + (filters_viability.includes(viability) ? `checked` : ``) + `>
            <label for="filter_viability_` + viability.toLowerCase() + `">` + viability + `</label></input>
        </div>`;
    }
    filters += `</div>`;



    filters += `<div class="filters_characters">
    
    <button id="toggle_all_characters_button" class="primary_button" onclick="toggleAllCharacters()">+</button>
    `;
    for (let characters_index = Object.keys(characters_order_priority).length - 1; characters_index >= 0; --characters_index) {
        let character = characters_order_priority[characters_index];

        filters += `
        <div class="checkbox_filter">
            <input type="checkbox" onclick="toggleFilterCharacter('` + character + `'); resetResult(); searchQuery()" name="filter_character_` + character.toLowerCase() + `" id="filter_character_` + character.toLowerCase() + `" ` + (filters_character.includes(character) ? `checked` : ``) + `>
            <label for="filter_character_` + character.toLowerCase() + `">` + character + `</label></input>
        </div>`;
    }
    filters += `</div>`;



    extra_filters_container.innerHTML = filters;
}

function toggleExtraFiltersContainer() {
    if (document.getElementById("extra_filters_container").style.display == "none") {
        document.getElementById("extra_filters_container").style.display = "";
    } else {
        document.getElementById("extra_filters_container").style.display = "none";
    }
}

function doFilter(id, team) {
    let pass = true;

    if (filterByPrerelease(team)) {
        // console.log("filterByCharacter KO" + " in team #" + id);
        pass = false;
    } else if (filterByFavorite(id)) {
        // console.log("filterByFavorite KO" + " in team #" + id);
        pass = false;
    } else if (filterByArchetype(team)) {
        // console.log("filterByArchetype KO" + " in team #" + id);
        pass = false;
    } else if (filterByElement(team)) {
        // console.log("filterByElement KO" + " in team #" + id);
        pass = false;
    } else if (filterByViability(team)) {
        // console.log("filterByViability KO" + " in team #" + id);
        pass = false;
    } else if (filterByUserCharacter(team)) {
        // console.log("filterByUserCharacter KO" + " in team #" + id);
        pass = false;
    } else if (filterByCharacter(team)) {
        // console.log("filterByCharacter KO" + " in team #" + id);
        pass = false;
    }

    return pass;
}

// Filters logic

function filterByPrerelease(team) {
    let hasExcludedCharacter = false;
    let excludedCharacters = Object.keys(characters);

    if (!prerelease_content) {
        if (excludedCharacters.includes(team.character_1.name) ||
            excludedCharacters.includes(team.character_2.name) ||
            excludedCharacters.includes(team.character_3.name))
            hasExcludedCharacter = true;
        else {
            for (let character_index in team.character_4.name) {
                if (excludedCharacters.includes(team.character_4.name[character_index])) {
                    hasExcludedCharacter = true;
                }
            }
        }
    }

    return hasExcludedCharacter;
}

function filterByFavorite(id) {
    return filter_favorite && !favorite_teams.includes(id);
}

function filterByArchetype(team) {
    // return !filters_archetype.includes(team.archetype);
    return !filters_archetype.some(archetype => team.archetype.includes(archetype));
}

function filterByElement(team) {
    let hasExcludedElement = false;

    if ((getCharacter(team.character_1.name).elementText != "None" && !filters_element.includes(getCharacter(team.character_1.name).elementText)) || (team.character_1.build.element != null && !filters_element.includes(team.character_1.build.element)) ||
        (getCharacter(team.character_2.name).elementText != "None" && !filters_element.includes(getCharacter(team.character_2.name).elementText)) || (team.character_2.build.element != null && !filters_element.includes(team.character_2.build.element)) ||
        (getCharacter(team.character_3.name).elementText != "None" && !filters_element.includes(getCharacter(team.character_3.name).elementText)) || (team.character_3.build.element != null && !filters_element.includes(team.character_3.build.element))) {

        hasExcludedElement = true;
    } else {
        for (let character_index in team.character_4.name) {
            if ((getCharacter(team.character_4.name[character_index]).elementText != "None" && !filters_element.includes(getCharacter(team.character_4.name[character_index]).elementText)) || (team.character_4.build[character_index].element != null && !filters_element.includes(team.character_4.build[character_index].element))) {
                hasExcludedElement = true;
            }
        }
    }

    return hasExcludedElement;
}

function filterByViability(team) {
    return !filters_viability.includes(team.viability);
}

function filterByUserCharacter(team) {
    let hasNotUserCharacter = false;
    let user_and_search_characters = user_characters;
    user_and_search_characters[document.getElementById("search_form_text_input_1").value] = {};
    user_and_search_characters[document.getElementById("search_form_text_input_2").value] = {};
    user_and_search_characters[document.getElementById("search_form_text_input_3").value] = {};
    user_and_search_characters[document.getElementById("search_form_text_input_4").value] = {};

    if (filter_characters_owned) {

        hasNotUserCharacter = user_and_search_characters[team.character_1.name] == null || user_and_search_characters[team.character_2.name] == null || user_and_search_characters[team.character_3.name] == null;

        if (!hasNotUserCharacter) {
            for (let character_index in team.character_4.name) {
                if (user_and_search_characters[team.character_4.name[character_index]] == null) {
                    hasNotUserCharacter = true;
                }
            }
        }
    }

    return hasNotUserCharacter;
}

function filterByCharacter(team) {
    let hasNotCharacter = false;

    hasNotCharacter = !filters_character.includes(team.character_1.name) || !filters_character.includes(team.character_2.name) || !filters_character.includes(team.character_3.name);

    if (!hasNotCharacter) {
        for (let character_index in team.character_4.name) {
            if (!filters_character.includes(team.character_4.name[character_index])) {
                hasNotCharacter = true;
            }
        }
    }

    return hasNotCharacter;
}

// Filters togglers

function toggleFilterFavorite() {
    filter_favorite = !filter_favorite;
}

function toggleAllArchetypes() {

    if (filters_archetype.length > 0) {
        document.getElementById("toggle_all_archetypes_button").innerHTML = "-";

        while (filters_archetype[0] != null) {
            document.getElementById("filter_archetype_" + filters_archetype[0].toLowerCase()).checked = false;
            toggleFilterArchetype(filters_archetype[0]);
        }
    } else {
        document.getElementById("toggle_all_archetypes_button").innerHTML = "+";

        for (let archetype_index in ARCHETYPES_NAMES) {
            if (!filters_archetype.includes(ARCHETYPES_NAMES[archetype_index])) {
                document.getElementById("filter_archetype_" + ARCHETYPES_NAMES[archetype_index].toLowerCase()).checked = true;
                toggleFilterArchetype(ARCHETYPES_NAMES[archetype_index]);
            }
        }
    }

    resetResult();
    searchQuery();
}

function toggleFilterArchetype(archetype) {

    if (filters_archetype.includes(archetype)) {
        // console.log(archetype + " not filtered");

        const index = filters_archetype.indexOf(archetype);
        if (index > -1) {           // only splice array when item is found
            filters_archetype.splice(index, 1);   // 2nd parameter means remove one item only
        }

    } else {
        // console.log(archetype + " filtered");
        filters_archetype.push(archetype);
    }

    // console.log(filters_archetype);
}

function toggleAllElements() {

    if (filters_element.length > 0) {
        document.getElementById("toggle_all_elements_button").innerHTML = "-";

        while (filters_element[0] != null) {
            document.getElementById("filter_element_" + filters_element[0].toLowerCase()).checked = false;
            toggleFilterElement(filters_element[0]);
        }
    } else {
        document.getElementById("toggle_all_elements_button").innerHTML = "+";

        for (let element_index in ELEMENTS) {
            if (!filters_element.includes(ELEMENTS[element_index])) {
                document.getElementById("filter_element_" + ELEMENTS[element_index].toLowerCase()).checked = true;
                toggleFilterElement(ELEMENTS[element_index]);
            }
        }
    }

    resetResult();
    searchQuery();
}

function toggleFilterElement(element) {

    if (filters_element.includes(element)) {
        // console.log(element + " not filtered");

        const index = filters_element.indexOf(element);
        if (index > -1) {           // only splice array when item is found
            filters_element.splice(index, 1);   // 2nd parameter means remove one item only
        }

    } else {
        // console.log(element + " filtered");
        filters_element.push(element);
    }

    // console.log(filters_element);
}

function toggleAllViabilities() {

    if (filters_viability.length > 0) {
        document.getElementById("toggle_all_viabilities_button").innerHTML = "-";

        while (filters_viability[0] != null) {
            document.getElementById("filter_viability_" + filters_viability[0].toLowerCase()).checked = false;
            toggleFilterViability(filters_viability[0]);
        }
    } else {
        document.getElementById("toggle_all_viabilities_button").innerHTML = "+";

        for (let viability_index in VIABILITIES) {
            if (!filters_viability.includes(VIABILITIES[viability_index])) {
                document.getElementById("filter_viability_" + VIABILITIES[viability_index].toLowerCase()).checked = true;
                toggleFilterViability(VIABILITIES[viability_index]);
            }
        }
    }

    resetResult();
    searchQuery();
}

function toggleFilterViability(viability) {

    if (filters_viability.includes(viability)) {
        // console.log(viability + " not filtered");

        const index = filters_viability.indexOf(viability);
        if (index > -1) {           // only splice array when item is found
            filters_viability.splice(index, 1);   // 2nd parameter means remove one item only
        }

    } else {
        // console.log(viability + " filtered");
        filters_viability.push(viability);
    }

    // console.log(filters_viability);
}

function toggleFilterCharactersOwned() {
    filter_characters_owned = !filter_characters_owned;
}

function toggleAllCharacters() {

    if (filters_character.length > 0) {
        document.getElementById("toggle_all_characters_button").innerHTML = "-";

        while (filters_character[0] != null) {
            document.getElementById("filter_character_" + filters_character[0].toLowerCase()).checked = false;
            toggleFilterCharacter(filters_character[0]);
        }
    } else {
        document.getElementById("toggle_all_characters_button").innerHTML = "+";

        for (let character_index in CHARACTER_NAMES) {
            if (!filters_character.includes(CHARACTER_NAMES[character_index])) {
                document.getElementById("filter_character_" + CHARACTER_NAMES[character_index].toLowerCase()).checked = true;
                toggleFilterCharacter(CHARACTER_NAMES[character_index]);
            }
        }
    }

    resetResult();
    searchQuery();
}

function toggleFilterCharacter(character) {

    if (filters_character.includes(character)) {
        // console.log(character + " not filtered");

        const index = filters_character.indexOf(character);
        if (index > -1) {           // only splice array when item is found
            filters_character.splice(index, 1);   // 2nd parameter means remove one item only
        }

    } else {
        // console.log(character + " filtered");
        filters_character.push(character);
    }

    // console.log(filters_character);
}