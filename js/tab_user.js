var team_count = Object.keys(teams).length;

var menu_tabs = ["menu_configuration", "menu_characters_check", "menu_teams_creator", "menu_json_validator", "menu_stats_calculator", "menu_team_json_sort"];

var team_creator_recommended;
var team_creator_viable;
var team_creator_for_fun;
var team_creator_unique;

var favorite_teams = [];

// Must be JSON object to make easier filtering
var user_characters = {};

var traveler = "Aether";

var prerelease_content = false;

var welcome_accepted = false;

var declined_cookies = false;

window.addEventListener("beforeunload", function (e) {
    if (!declined_cookies) {
        localStorage.setItem('favorite_teams', JSON.stringify(favorite_teams));
        localStorage.setItem('user_characters', JSON.stringify(user_characters));
        localStorage.setItem('traveler', traveler);
        localStorage.setItem('welcome_accepted', welcome_accepted);
        localStorage.setItem('prerelease_content', prerelease_content);
    }
});

if (localStorage.getItem("favorite_teams") !== null && localStorage.getItem("favorite_teams") != "[]") {
    favorite_teams = JSON.parse(localStorage.getItem("favorite_teams"));
    // console.log(favorite_teams);
}

if (localStorage.getItem("user_characters") !== null && localStorage.getItem("user_characters") != "{}") {
    user_characters = JSON.parse(localStorage.getItem("user_characters"));
    // console.log(user_characters);
}

if (localStorage.getItem("traveler") !== null && localStorage.getItem("traveler") != "") {
    traveler = localStorage.getItem("traveler");
    // console.log(traveler);
}

if (localStorage.getItem("welcome_accepted") !== null && localStorage.getItem("welcome_accepted") != "") {
    welcome_accepted = localStorage.getItem("welcome_accepted") == "true";
    // console.log(welcome_accepted);
}

if (localStorage.getItem("prerelease_content") !== null && localStorage.getItem("prerelease_content") != "") {
    prerelease_content = localStorage.getItem("prerelease_content") == "true";
    // console.log(prerelease_content);
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function deleteAllLocalStorage() {
    declined_cookies = true;
    prerelease_content = false;

    favorite_teams = [];
    user_characters = {};
    traveler = "Aether";

    localStorage.removeItem("cookies_accepted");
    localStorage.removeItem("welcome_accepted");

    localStorage.removeItem("favorite_teams");
    localStorage.removeItem("user_characters");

    localStorage.removeItem("traveler");
    
    location.reload();
}

function deleteFavoriteTeams() {
    favorite_teams = [];

    localStorage.removeItem("favorite_teams");

    location.reload();
}

function deleteUserCharacters() {
    user_characters = {};
    traveler = "Aether";

    localStorage.removeItem("user_characters");

    localStorage.removeItem("traveler");

    location.reload();
}

function acceptWelcome() {
    document.getElementById("welcome_background").style.display = "none";
    localStorage.setItem("welcome_accepted", "true");
    welcome_accepted = true;
}

function acceptCookies() {
    document.getElementById("cookies_background").style.display = "none";
    localStorage.setItem("cookies_accepted", "true");
}

function declineCookies() {
    declined_cookies = true;

    deleteAllCookies();
    deleteAllLocalStorage();

    window.close();
}

function togglePrereleaseContent() {
    prerelease_content = !prerelease_content;

    location.reload();
}

document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem("cookies_accepted") == "true") {
        document.getElementById("cookies_background").style.display = "none";
    }

    if (localStorage.getItem("welcome_accepted") == "true") {
        document.getElementById("welcome_background").style.display = "none";
    }

    // Characters
    printCharactersCheck();

    // Team creator
    printTeamCreator();

    // Team user configuration
    for (let menu_index in menu_tabs) {
        // Set on click event listener for each tab button
        if (document.getElementById(menu_tabs[menu_index] + "_button")) {
            document.getElementById(menu_tabs[menu_index] + "_button").addEventListener('click', function (event) {
                setMenuTabActive(document.getElementById(menu_tabs[menu_index]), document.getElementById(menu_tabs[menu_index] + "_button"));
            });
        }
    }

    // Hide all tabs. Activate default tab
    setMenuTabActive(document.getElementById("menu_configuration"), document.getElementById("menu_configuration_button"));

    setTraveler(traveler);

    printPrereleaseSwitch();
});

function setTraveler(name) {
    let uncheck = "Aether";

    traveler = name;

    if (name == "Aether") {
        uncheck = "Lumine";
    }

    if (!document.getElementById("traveler_" + uncheck).classList.contains("character_unchecked")) {
        document.getElementById("traveler_" + uncheck).classList.add("character_unchecked");
    }

    document.getElementById("traveler_" + traveler).classList.remove("character_unchecked");

}

function removeTraveler(array) {
    const index = array.indexOf(traveler);
    if (index > -1) {
        array.splice(index, 1);
    }

    return array;
}

function getViability() {
    let viability = "Recommended";

    if (team_creator_viable.checked) {
        viability = team_creator_viable.value;
    } else if (team_creator_for_fun.checked) {
        viability = team_creator_for_fun.value;
    } else if (team_creator_unique.checked) {
        viability = team_creator_unique.value;
    }

    return viability;
}

function setMenuTabActive(menu_tab, menu_tab_button) {
    if (!menu_tab.classList.contains('active_tab_button')) {
        for (let tab_index in menu_tabs) {
            if (document.getElementById(menu_tabs[tab_index]) && document.getElementById(menu_tabs[tab_index] + "_button")) {
                disableMenuTab(document.getElementById(menu_tabs[tab_index]), document.getElementById(menu_tabs[tab_index] + "_button"));
            }
        }

        activateMenuTab(menu_tab, menu_tab_button);
    }
}

function activateMenuTab(tab, tab_button) {
    // Show this tab
    tab.style.display = "";

    // Change tab button border
    tab_button.classList.add('active_tab_button');
    tab_button.classList.remove('disabled_tab_button');
}

function disableMenuTab(tab, tab_button) {
    // Hide this tab
    tab.style.display = "none";

    // Change tab button border
    tab_button.classList.remove('active_tab_button');
    tab_button.classList.add('disabled_tab_button');
}

function printTeamCreator() {
    if (document.getElementById("menu_teams_creator")) {
        team_creator_recommended = document.getElementById("team_creator_recommended");
        team_creator_viable = document.getElementById("team_creator_viable");
        team_creator_for_fun = document.getElementById("team_creator_for_fun");
        team_creator_unique = document.getElementById("team_creator_unique");

        document.getElementById("id_input").value = team_count + 1;

        autocomplete(document.getElementById("character_1_select"), CHARACTER_NAMES);
        autocomplete(document.getElementById("character_2_select"), CHARACTER_NAMES);
        autocomplete(document.getElementById("character_3_select"), CHARACTER_NAMES);
        autocomplete(document.getElementById("character_4_select"), CHARACTER_NAMES);
    }
}

function printTeamJSON() {
    if (document.getElementById("id_input").value != team_count - 1) {
        team_count = document.getElementById("id_input").value;
    }

    document.getElementById("id_input").value = team_count;

    document.getElementById("json_result").value += `
    "` + team_count++ + `": {
        "name": "` + document.getElementById("team_name_select").value + `",
        "description": "` + document.getElementById("description_select").value + `",
        "rotation": "` + document.getElementById("rotation_select").value + `",
        "archetype": "` + document.getElementById("archetype_select").value + `",
        "viability": "` + getViability() + `",

        "character_1": {
            "name": "` + document.getElementById("character_1_select").value + `",
            "build": "` + document.getElementById("build_1_select").value + `"
        },
        "character_2": {
            "name": "` + document.getElementById("character_2_select").value + `",
            "build": "` + document.getElementById("build_2_select").value + `"
        },
        "character_3": {
            "name": "` + document.getElementById("character_3_select").value + `",
            "build": "` + document.getElementById("build_3_select").value + `"
        },
        "character_4": {
            "name": ["` + document.getElementById("character_4_select").value + `"],
            "build": ["` + document.getElementById("build_4_select").value + `"]
        }
    },
    `;

    // copyToClipboardFromElementValue("json_result");
}

function storeFavoriteTeam(id) {
    // console.log("Stored favorite " + id);
    // console.log(teams[id]);

    favorite_teams.push(id);
}

function removeFavoriteTeam(id) {
    // console.log("Removed favorite " + id);
    // console.log(favorite_teams.includes(id));

    const index = favorite_teams.indexOf(id);
    if (index > -1) {
        favorite_teams.splice(index, 1);
    }
}

function getCharacterCheckHTML(character_data) {
    if (character_data) {
        return `
        <div id="character_check_` + character_data.name + `" class="character_container ` + (user_characters[character_data.name] == null ? "character_unchecked" : "") + `" onclick="toggleCharacterUser('` + character_data.name + `')">
        <img class="character_icon character_` + character_data.rarity + `_stars" src="images/characters/` + character_data.images.filename_icon + `.png" alt="Character icon for ` + character_data.name + `" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + character_data.images.filename_icon + `.png', 'images/icons/user.png', '` + character_data.name + `')" style="background-image: url('images/regions/Emblem_` + character_data.region + `_` + (character_data.rarity == "5" ? `White` : `Night`) + `_Opacity_05.png');">
        ` + (character_data.elementText != "None" ? `<img class="element_icon" src="images/elements/glow_` + character_data.elementText.toLowerCase() + `.png">` : "") + `
            <div class="rarity_container">` + STAR_SVG + STAR_SVG + STAR_SVG + STAR_SVG + (character_data.rarity == "5" ? STAR_SVG : "") + `</div>
            <div class="character_name ` + (character_data.name.length < SHORT_NAME_LENGTH ? "character_name_short" : (character_data.name.length < MEDIUM_NAME_LENGTH ? "character_name_medium" : "character_name_long")) + `">` + character_data.name + `</div>
        </div>
        `;
    } else {
        return ``;
    }
}

function printCharactersCheck() {
    let menu_characters_check = "";

    for (let index = Object.keys(characters_order_priority).length - 1; index >= 0; --index) {
        menu_characters_check += getCharacterCheckHTML(getCharacter(characters_order_priority[index]));
    }

    document.getElementById("menu_characters_check").innerHTML = menu_characters_check;
}

function toggleCharacterUser(character_name) {
    if (user_characters[character_name] != null) {
        delete user_characters[character_name];
    } else {
        user_characters[character_name] = {};
    }

    document.getElementById("character_check_" + character_name).classList.toggle("character_unchecked");
}

function printPrereleaseSwitch() {
    document.getElementById("menu_configuration_prerelease").innerHTML += `
    <label class="switch">
        <input id="prerelease_switch" type="checkbox"
            onclick="togglePrereleaseContent()" ` + (prerelease_content ? `checked` : ``) + `>
        <span class="slider"></span>
    </label>
    `;
}


















































function isJSONObjectEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

function validateJSON() {

    let json_validator_result = ``;

    json_validator_result += testArtifacts();
    json_validator_result += testBestTeams();
    json_validator_result += testBuilds();
    json_validator_result += testCharactersOrderPriority();
    json_validator_result += testCharacters();
    json_validator_result += testTeams();
    json_validator_result += testWeapons();
    json_validator_result += testJSONSyntax();

    document.getElementById("json_validator_result").innerHTML = json_validator_result;
}


function testArtifacts() {
    let json_validator_result = "";
    return json_validator_result;
}

function testBestTeams() {
    let json_validator_result = "";
    return json_validator_result;
}

function testBuilds() {
    let json_validator_result = "";
    let test_separator = "";

    try {
        // Test if Aether and Lumine has "element" field in each build
        for (let build_index in builds["Aether"]) {
            if (!builds["Aether"][build_index].hasOwnProperty("element")) {
                json_validator_result += "<br>testBuilds: Aether build " + build_index + " has no \"element\" field ";
            }
        }

        for (let build_index in builds["Lumine"]) {
            if (!builds["Lumine"][build_index].hasOwnProperty("element")) {
                json_validator_result += "<br>testBuilds: Lumine build " + build_index + " has no \"element\" field ";
            }
        }
    } catch (error) {
        json_validator_result += "Execution error while checking: Test if Aether and Lumine has 'element' field in each build. " + error;
    }

    try {
        for (let character in builds) {

            // Test if each character has at least one build
            if (isJSONObjectEmpty(builds[character])) {
                json_validator_result += "<br>testBuilds: No build found for " + character;
            }
        }
    } catch (error) {
        json_validator_result += "Execution error while checking: Test if each character has at least one build. " + error;
    }

    try {
        for (let character in builds) {

            // Test if each weapon in build exits
            for (let build_index in builds[character]) {
                for (let weapon of builds[character][build_index].weapon) {
                    if (!GenshinDb.weapon(weapon)) {
                        json_validator_result += "<br>testBuilds: No weapon " + weapon + " found for " + character;
                    }
                }
            }
        }
    } catch (error) {
        json_validator_result += "Execution error while checking: Test if each weapon in build exists. " + error;
    }

    try {
        // Check if builds in team exists
        for (let team_index in teams) {
            if (builds.hasOwnProperty(teams[team_index]["character_1"]["name"]) && !builds[teams[team_index]["character_1"]["name"]].hasOwnProperty(teams[team_index]["character_1"]["build"])) {
                json_validator_result += "<br>Team " + team_index + " - ERROR: " + teams[team_index]["character_1"]["name"] + " build 1 does not exist: " + teams[team_index]["character_1"]["build"];
            }

            if (builds.hasOwnProperty(teams[team_index]["character_2"]["name"]) && !builds[teams[team_index]["character_2"]["name"]].hasOwnProperty(teams[team_index]["character_2"]["build"])) {
                json_validator_result += "<br>Team " + team_index + " - ERROR: " + teams[team_index]["character_2"]["name"] + " build 2 does not exist: " + teams[team_index]["character_2"]["build"];
            }

            if (builds.hasOwnProperty(teams[team_index]["character_2"]["name"]) && !builds[teams[team_index]["character_3"]["name"]].hasOwnProperty(teams[team_index]["character_3"]["build"])) {
                json_validator_result += "<br>Team " + team_index + " - ERROR: " + teams[team_index]["character_3"]["name"] + " build 3 does not exist: " + teams[team_index]["character_3"]["build"];
            }

            for (let build_4_index in teams[team_index]["character_4"]["name"]) {
                if (builds.hasOwnProperty(teams[team_index]["character_4"]["name"][build_4_index]) && !builds[teams[team_index]["character_4"]["name"][build_4_index]].hasOwnProperty(teams[team_index]["character_4"]["build"][build_4_index])) {
                    json_validator_result += "<br>Team " + team_index + " - ERROR: " + teams[team_index]["character_4"]["name"][build_4_index] + " build 4 with index " + build_4_index + " does not exist: " + teams[team_index]["character_4"]["build"][build_4_index];
                }
            }
        }
    } catch (error) {
        json_validator_result += "Execution error while checking: Check if builds in team exists. " + error;
    }

    test_separator = "<br>=================== " + (json_validator_result == "" ? "OK - testBuilds" : "KO - testBuilds") + " ===================<br><br>";

    return "<div class='" + (json_validator_result == "" ? "test_ok" : "test_ko") + "'>" + json_validator_result + test_separator + "</div>";
}

function testCharactersOrderPriority() {
    let json_validator_result = "";
    return json_validator_result;
}

function testCharacters() {
    let json_validator_result = "";
    return json_validator_result;
}

function testTeams() {
    let json_validator_result = "";

    try {
        // Check if characters in team exists
        for (let team_index in teams) {

            for (let archetype_index in teams[team_index]["archetype"]) {
                if (!ARCHETYPES_NAMES.includes(teams[team_index]["archetype"][archetype_index])) {
                    json_validator_result += "<br>Team " + team_index + " - ERROR: archetype does not exist: " + teams[team_index]["archetype"];
                }
            }

            if (!VIABILITIES.includes(teams[team_index]["viability"])) {
                json_validator_result += "<br>Team " + team_index + " - ERROR: viability does not exist: " + teams[team_index]["viability"];
            }

            if (!CHARACTER_NAMES.includes(teams[team_index]["character_1"]["name"])) {
                json_validator_result += "<br>Team " + team_index + " - ERROR: character 1 does not exist: " + teams[team_index]["character_1"]["name"];
            }

            if (!CHARACTER_NAMES.includes(teams[team_index]["character_2"]["name"])) {
                json_validator_result += "<br>Team " + team_index + " - ERROR: character 2 does not exist: " + teams[team_index]["character_2"]["name"];
            }

            if (!CHARACTER_NAMES.includes(teams[team_index]["character_3"]["name"])) {
                json_validator_result += "<br>Team " + team_index + " - ERROR: character 3 does not exist: " + teams[team_index]["character_3"]["name"];
            }

            for (let character_4_index in teams[team_index]["character_4"]["name"]) {
                if (!CHARACTER_NAMES.includes(teams[team_index]["character_4"]["name"][character_4_index])) {
                    json_validator_result += "<br>Team " + team_index + " - ERROR: character 4 with index " + character_4_index + " does not exist: " + teams[team_index]["character_4"]["name"][character_4_index];
                }
            }
        }
    } catch (error) {
        json_validator_result += "Execution error while checking: Check if characters in team exists. " + error;
    }


    try {
        // Check for repeated teams
        for (let actual_index in teams) {
            let teams_indexes = Object.keys(teams);
            for (let index = parseInt(actual_index) + 1; index < Object.keys(teams).length; ++index) {
                for (let character_4_index in teams[actual_index]["character_4"]["name"]) {
                    for (let actual_character_4_index in teams[teams_indexes[index]]["character_4"]["name"]) {
                        let temp_actual_team = [teams[actual_index]["character_1"]["name"], teams[actual_index]["character_2"]["name"], teams[actual_index]["character_3"]["name"], teams[actual_index]["character_4"]["name"][character_4_index]].sort();
                        let temp_team = [teams[teams_indexes[index]]["character_1"]["name"], teams[teams_indexes[index]]["character_2"]["name"], teams[teams_indexes[index]]["character_3"]["name"], teams[teams_indexes[index]]["character_4"]["name"][actual_character_4_index]].sort();
                        let areEquals = true;

                        for (let i = 0; i < temp_actual_team.length; i++) {
                            if (temp_actual_team[i] !== temp_team[i]) {
                                areEquals = false;
                            }
                        }

                        if (areEquals && actual_index != teams_indexes[index]) {
                            json_validator_result += "<br>Team " + actual_index + (teams[actual_index]["character_4"]["name"].length > 1 ? "-" + (parseInt(actual_character_4_index) + 1) : "") + " is equal to " + teams_indexes[index] + (teams[teams_indexes[index]]["character_4"]["name"].length > 1 ? "-" + (parseInt(character_4_index) + 1) : "");
                        }
                    }
                }
            }
        }
    } catch (error) {
        json_validator_result += "Execution error while checking: Check for repeated teams. " + error;
    }

    try {
        // Check if teams keys has skipped a number
        for (let index = 0; index < Object.keys(teams).length; ++index) {
            if (teams[index + 1] == undefined) {
                json_validator_result += "<br>Team index #" + (index + 1) + " has been not found - There are " + Object.keys(teams).length + " team indexes, but last one is " + Object.keys(teams)[Object.keys(teams).length - 1];
            }
        }
    } catch (error) {
        json_validator_result += "Execution error while checking: Check if teams keys has skipped a number. " + error;
    }

    test_separator = "<br><br>=================== " + (json_validator_result == "" ? "OK - testTeams" : "KO - testTeams") + " ===================<br><br>";

    return "<div class='" + (json_validator_result == "" ? "test_ok" : "test_ko") + "'>" + json_validator_result + test_separator + "</div>";
}

function testWeapons() {
    let json_validator_result = "";
    return json_validator_result;
}

function testJSONSyntax() {
    let json_validator_result = "";

    let teams_string = JSON.stringify(teams);
    let duplicate_index = check_json_for_dupes(teams_string);

    // console.log(duplicate_index);

    if (duplicate_index != -1) {
        json_validator_result = "<br>Duplicate keys exists: <br>" + teams_string.substring(duplicate_index, duplicate_index + 30) + "<br>";
    }

    test_separator = "<br><br>=================== " + (json_validator_result == "" ? "OK - testJSONSyntax" : "KO - testJSONSyntax") + " ===================<br><br>";

    return "<div class='" + (json_validator_result == "" ? "test_ok" : "test_ko") + "'>" + json_validator_result + test_separator + "</div>";
}

// This function will return -1 if 's' is a valid JSON string with no duplicate keys. It will return an index into 's' of the problem if there are duplicate keys. And it will throw an exception if 's' is not valid JSON.
function check_json_for_dupes(s) {
    let ob = JSON.parse(s);
    let s2 = JSON.stringify(ob);
    let a = 0;
    let b = 0;
    while (a < s.length && b < s2.length) {
        if (s[a] === s2[b]) {
            a++;
            b++;
        } else if (s[a] === ' ' ||
            s[a] === '\n' ||
            s[a] === '\r' ||
            s[a] === '\t' ||
            s[a] === '\v') {
            a++;
        } else if (s2[b] === ' ' ||
            s2[b] === '\n' ||
            s2[b] === '\r' ||
            s2[b] === '\t' ||
            s2[b] === '\v') {
            b++;
        } else {
            return a;
        }
    }
    return -1;
}









































// TEAM JSON SORT

function sortObject(o) {
    var sorted = {},
        key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function sortTeamsJSON() {
    let total = Object.keys(teams).length;

    let sorted_teams = {};
    let sorted_index = total;

    let unsorted_teams = structuredClone(teams);

    while (total > 0) {
        let max_priority = -1;
        let max_unsorted_index = -1;
        let max_team = -1;

        let unsorted_keys = Object.keys(unsorted_teams);
        let unsorted_index = 0;

        let team = unsorted_teams[unsorted_keys[unsorted_index]];

        while (unsorted_index < unsorted_keys.length) {
            let priority = -1;

            team = unsorted_teams[unsorted_keys[unsorted_index]];

            let priority_1 = parseInt(getKeyByValue(characters_order_priority, team["character_1"]["name"]));
            if (priority_1 > priority) {
                priority = priority_1;
            }

            let priority_2 = parseInt(getKeyByValue(characters_order_priority, team["character_2"]["name"]));
            if (priority_2 > priority) {
                priority = priority_2;
            }

            let priority_3 = parseInt(getKeyByValue(characters_order_priority, team["character_3"]["name"]));
            if (priority_3 > priority) {
                priority = priority_3;
            }

            for (let index_4 in team["character_4"]["name"]) {
                let priority_4 = parseInt(getKeyByValue(characters_order_priority, team["character_4"]["name"][index_4]));
                if (priority_4 > priority) {
                    priority = priority_4;
                }
            }

            if (priority > max_priority) {
                max_priority = priority;
                max_unsorted_index = unsorted_keys[unsorted_index];
                max_team = team;
            }

            ++unsorted_index;
        }

        // console.log(max_unsorted_index + ": new " + sorted_index + ": " + max_priority);

        delete unsorted_teams[max_unsorted_index];
        sorted_teams[sorted_index--] = max_team;

        --total;
    }

    console.log(sortObject(sorted_teams));
}








































































let stats_temp = {
    team_count: 0,
    team_count_flex: 0,
    team_count_by_archetype: {},
    team_count_by_element: {},
    team_count_by_viability: {},

    characters: {}
};

function initializeStats() {
    console.log("Initializing stats_temp...");

    for (let character in CHARACTER_NAMES) {
        stats_temp.characters[CHARACTER_NAMES[character]] = {};
        stats_temp.characters[CHARACTER_NAMES[character]]["team_count_ranking"] = 0;
        stats_temp.characters[CHARACTER_NAMES[character]]["team_count"] = 0;

        stats_temp.characters[CHARACTER_NAMES[character]]["by_archetype"] = {};
        stats_temp.characters[CHARACTER_NAMES[character]]["by_viability"] = {};

        for (let archetype of ARCHETYPES_NAMES) {
            stats_temp.characters[CHARACTER_NAMES[character]]["by_archetype"][archetype] = 0;
        }

        for (let viability of VIABILITIES) {
            stats_temp.characters[CHARACTER_NAMES[character]]["by_viability"][viability] = 0;
        }

        if (["Aether", "Lumine"].includes(CHARACTER_NAMES[character])) {
            stats_temp.characters[CHARACTER_NAMES[character]].team_count_by_element = {};

            for (let element of ELEMENTS) {
                stats_temp.characters[CHARACTER_NAMES[character]].team_count_by_element[element] = 0;
            }
        }
    }

    for (let character in builds) {
        stats_temp.characters[character]["by_build"] = {};

        for (let build in builds[character]) {
            stats_temp.characters[character]["by_build"][build] = 0;
        }
    }

    for (let archetype of ARCHETYPES_NAMES) {
        stats_temp.team_count_by_archetype[archetype] = 0;
    }

    for (let element of ELEMENTS) {
        stats_temp.team_count_by_element[element] = 0;
    }

    for (let viability of VIABILITIES) {
        stats_temp.team_count_by_viability[viability] = 0;
    }
}

function updateStatCharacterTeam(character, team) {
    // Team count
    stats_temp.characters[character.name].team_count = stats_temp.characters[character.name].team_count + 1;

    // Team archetypes
    for (let archetype of team.archetype) {
        stats_temp.characters[character.name].by_archetype[archetype] = stats_temp.characters[character.name].by_archetype[archetype] + 1;
    }

    // Team viability
    stats_temp.characters[character.name].by_viability[team.viability] = stats_temp.characters[character.name].by_viability[team.viability] + 1;

    // Character build
    stats_temp.characters[character.name].by_build[character.build] = stats_temp.characters[character.name].by_build[character.build] + 1;

    if (["Aether", "Lumine"].includes(character.name)) {
        let build = builds[character.name][character.build];
        stats_temp.characters[character.name].team_count_by_element[build.element] = stats_temp.characters[character.name].team_count_by_element[build.element] + 1;
    }
}

function updateStatTeamCountByElement(character) {
    let element = null;

    if (!["Aether", "Lumine"].includes(character.name)) {
        element = getCharacter(character.name).elementText;
    } else {
        element = builds[character.name][character.build].element;
    }

    return element;
}

function calculateCountCharactersByElement() {
    stats_temp.count_characters_by_element = {};

    for (let element of ELEMENTS) {
        stats_temp.count_characters_by_element[element] = 0;
    }

    for (let character_name of CHARACTER_NAMES) {
        let character = getCharacter(character_name);
        if (character.elementText != 'None') {
            stats_temp.count_characters_by_element[character.elementText] = stats_temp.count_characters_by_element[character.elementText] + 1;
        } else {
            for (let element of ELEMENTS) {
                stats_temp.count_characters_by_element[element] = stats_temp.count_characters_by_element[element] + 1;
            }
        }
    }
}

function calculateCharactersTeams() {
    console.log("calculateCharactersTeams");

    stats_temp.team_count = Object.keys(teams).length;

    // Stats for teams
    for (let team_index in teams) {

        let team = teams[team_index];
        let elements_in_team = new Set();

        // Character 1
        elements_in_team.add(updateStatTeamCountByElement(team.character_1));

        // Character 2
        elements_in_team.add(updateStatTeamCountByElement(team.character_2));

        // Character 3
        elements_in_team.add(updateStatTeamCountByElement(team.character_3));

        // Each flex per team count as different team
        for (let char_4 in team.character_4.name) {

            stats_temp.team_count_flex = stats_temp.team_count_flex + 1;

            // Character 1
            updateStatCharacterTeam(team.character_1, team);

            // Character 2
            updateStatCharacterTeam(team.character_2, team);

            // Character 3
            updateStatCharacterTeam(team.character_3, team);

            // Character 4
            updateStatCharacterTeam({ name: team.character_4.name[char_4], build: team.character_4.build[char_4] }, team);

            elements_in_team.add(updateStatTeamCountByElement({ name: team.character_4.name[char_4], build: team.character_4.build[char_4] }));
        }

        for (let archetype of team.archetype) {
            stats_temp.team_count_by_archetype[archetype] = stats_temp.team_count_by_archetype[archetype] + team.character_4.name.length;
        }

        for (let element of elements_in_team) {
            stats_temp.team_count_by_element[element] = stats_temp.team_count_by_element[element] + team.character_4.name.length;
        }

        stats_temp.team_count_by_viability[team.viability] = stats_temp.team_count_by_viability[team.viability] + team.character_4.name.length;
    }
}

function calculateRankingByTeam() {
    console.log("calculateRankingByTeam");

    let ranking = [];
    let global_team_ranking = {};

    // Initialize ranking stat
    for (let character in stats_temp.characters) {
        ranking.push(stats_temp.characters[character].team_count);
    }

    // Get ordered ranking
    ranking = ranking.sort(function (a, b) {
        return a - b;
    }).reverse();

    // Get individual character ranking
    for (let character in stats_temp.characters) {
        let rank = 0;

        while (rank < ranking.length && stats_temp.characters[character].team_count < ranking[rank]) {
            ++rank;
        }

        stats_temp.characters[character].team_count_ranking = rank + 1;
        while (global_team_ranking[rank + 1]) {
            ++rank;
        }

        global_team_ranking[rank + 1] = { name: character, team_count: stats_temp.characters[character].team_count };
        global_team_ranking[character] = { rank: rank + 1, team_count: stats_temp.characters[character].team_count };
    }

    // Store result
    stats_temp["global_team_ranking"] = global_team_ranking;
}

function calculateRankingByArchetype() {
    console.log("calculateRankingByArchetype");

    let ranking = {};
    let global_archetype_ranking = {};

    // Initialize ranking stat
    for (let archetype of ARCHETYPES_NAMES) {
        ranking[archetype] = [];
    }

    for (let character in stats_temp.characters) {
        stats_temp.characters[character].ranking_by_archetype = {};

        for (let archetype of ARCHETYPES_NAMES) {
            stats_temp.characters[character].ranking_by_archetype[archetype] = 0;
            ranking[archetype].push(stats_temp.characters[character].by_archetype[archetype]);
        }
    }

    // Get ordered ranking
    for (let archetype of ARCHETYPES_NAMES) {
        global_archetype_ranking[archetype] = {};

        ranking[archetype] = ranking[archetype].sort(function (a, b) {
            return a - b;
        }).reverse();
    }

    // Get individual character ranking
    for (let archetype of ARCHETYPES_NAMES) {
        for (let character in stats_temp.characters) {
            let rank = 0;

            while (rank < ranking[archetype].length && stats_temp.characters[character].by_archetype[archetype] < ranking[archetype][rank]) {
                ++rank;
            }

            if (stats_temp.characters[character].by_archetype[archetype] > 0) {
                stats_temp.characters[character].ranking_by_archetype[archetype] = rank + 1;
            } else {
                stats_temp.characters[character].ranking_by_archetype[archetype] = 0;
            }

            while (global_archetype_ranking[archetype][rank + 1]) {
                ++rank;
            }

            global_archetype_ranking[archetype][rank + 1] = { name: character, team_count: stats_temp.characters[character].by_archetype[archetype] };
            global_archetype_ranking[archetype][character] = { rank: rank + 1, team_count: stats_temp.characters[character].by_archetype[archetype] };
        }
    }

    // Store result
    stats_temp["global_archetype_ranking"] = global_archetype_ranking;
}

function calculateRankingByElement() {
    console.log("calculateRankingByElement");

    let ranking = [];
    let global_element_ranking = {};

    // Initialize ranking stat
    for (let element of ELEMENTS) {
        ranking[element] = [];
    }

    for (let character in stats_temp.characters) {
        if (!["Aether", "Lumine"].includes(character)) {
            stats_temp.characters[character].ranking_by_element = 0;
            let element = getCharacter(character).elementText;
            // for (let element of ELEMENTS) {
            ranking[element].push(stats_temp.characters[character].team_count);
            // }
        } else {
            stats_temp.characters[character].ranking_by_element = {};
            for (let element of ELEMENTS) {
                stats_temp.characters[character].ranking_by_element[element] = 0;
                ranking[element].push(stats_temp.characters[character].team_count_by_element[element]);
            }
        }
    }

    // Get ordered ranking
    for (let element of ELEMENTS) {
        global_element_ranking[element] = {};

        ranking[element] = ranking[element].sort(function (a, b) {
            return a - b;
        }).reverse();
    }

    // Get individual character ranking
    for (let character in stats_temp.characters) {
        if (!["Aether", "Lumine"].includes(character)) {
            let element = getCharacter(character).elementText;

            let rank = 0;

            while (rank < ranking[element].length && stats_temp.characters[character].team_count < ranking[element][rank]) {
                ++rank;
            }

            stats_temp.characters[character].ranking_by_element = rank + 1;

            while (global_element_ranking[element][rank + 1]) {
                ++rank;
            }

            global_element_ranking[element][rank + 1] = { name: character, team_count: stats_temp.characters[character].team_count };
            global_element_ranking[element][character] = { rank: rank + 1, team_count: stats_temp.characters[character].team_count };
        } else {
            for (let element of ELEMENTS) {

                let rank = 0;

                while (rank < ranking[element].length && stats_temp.characters[character].team_count_by_element[element] < ranking[element][rank]) {
                    ++rank;
                }

                stats_temp.characters[character].ranking_by_element = rank + 1;

                while (global_element_ranking[element][rank + 1]) {
                    ++rank;
                }

                global_element_ranking[element][rank + 1] = { name: character, team_count: stats_temp.characters[character].team_count_by_element[element] };
                global_element_ranking[element][character] = { rank: rank + 1, team_count: stats_temp.characters[character].team_count_by_element[element] };
            }
        }
    }

    // Store result
    stats_temp["global_element_ranking"] = global_element_ranking;
}

function calculateRankingByViability() {
    console.log("calculateRankingByViability");

    let ranking = {};
    let global_viability_ranking = {};

    // Initialize ranking stat
    for (let viability of VIABILITIES) {
        ranking[viability] = [];
    }

    for (let character in stats_temp.characters) {
        stats_temp.characters[character].ranking_by_viability = {};

        for (let viability of VIABILITIES) {
            stats_temp.characters[character].ranking_by_viability[viability] = 0;
            ranking[viability].push(stats_temp.characters[character].by_viability[viability]);
        }
    }

    // Get ordered ranking
    for (let viability of VIABILITIES) {
        global_viability_ranking[viability] = {};

        ranking[viability] = ranking[viability].sort(function (a, b) {
            return a - b;
        }).reverse();
    }

    // Get individual character ranking
    for (let viability of VIABILITIES) {
        for (let character in stats_temp.characters) {
            let rank = 0;

            while (rank < ranking[viability].length && stats_temp.characters[character].by_viability[viability] < ranking[viability][rank]) {
                ++rank;
            }

            if (stats_temp.characters[character].by_viability[viability] > 0) {
                stats_temp.characters[character].ranking_by_viability[viability] = rank + 1;
            } else {
                stats_temp.characters[character].ranking_by_viability[viability] = 0;
            }

            while (global_viability_ranking[viability][rank + 1]) {
                ++rank;
            }

            global_viability_ranking[viability][rank + 1] = { name: character, team_count: stats_temp.characters[character].by_viability[viability] };
            global_viability_ranking[viability][character] = { rank: rank + 1, team_count: stats_temp.characters[character].by_viability[viability] };
        }
    }

    // Store result
    stats_temp["global_viability_ranking"] = global_viability_ranking;
}

function calculateStats() {

    initializeStats();

    // Calculate stats_temp
    calculateCharactersTeams();

    calculateCountCharactersByElement();
    calculateRankingByTeam();
    calculateRankingByArchetype();
    calculateRankingByElement();
    calculateRankingByViability();

    console.log(stats_temp);
}