const ELEMENT_COLORS = {
    Pyro: "rgb(177, 46, 48)",
    Electro: "rgb(132, 16, 233)",
    Dendro: "rgb(145, 201, 14)",
    Anemo: "rgb(14, 192, 103)",
    Cryo: "rgb(163, 227, 239)",
    Geo: "rgb(255, 216, 59)",
    Hydro: "rgb(1, 229, 255)",
    Flex: "rgb(255, 100, 172)",

    color_pyro: "rgb(177, 46, 48)",
    color_electro: "rgb(132, 16, 233)",
    color_dendro: "rgb(145, 201, 14)",
    color_anemo: "rgb(14, 192, 103)",
    color_cryo: "rgb(163, 227, 239)",
    color_geo: "rgb(255, 216, 59)",
    color_hydro: "rgb(1, 229, 255)",
    color_flex: "rgb(255, 100, 172)",
    color_hypercarry: "#5c5470"
};

const VIABILITIES_COLORS = {
    Recommended: "#dc1414",
    Viable: "#00c0e2",
    "For fun": "#b1c51b",
    Unique: "#ff6701"
}

const regex_color_start_tag = /<color=\#........>/g;
const regex_color_end_tag = /<\/color>/g;

var character_ascension;
var character_talents;
// var character_constellations;
var character_weapon;
var character_teams;
var character_builds;
var character_charts;

var teams_keys = shuffle(Object.keys(teams));

var ranking_by_viability_chart = "ranking_by_viability_chart_bar";

document.addEventListener("DOMContentLoaded", (event) => {
    // Chart JS config
    Chart.defaults.color = "aliceblue";
    Chart.defaults.font.family = "GenshinImpact";

    resetMenuCharacters();
    printAllCharacters();

    document.getElementById("tab_character_search").addEventListener("input", filterByCharacterName);
});

function swapRankingByViabilityChart() {
    document.getElementById(ranking_by_viability_chart).style.display = "none";

    if (ranking_by_viability_chart == "ranking_by_viability_chart_bar") {
        ranking_by_viability_chart = "ranking_by_viability_chart_pie";
    } else {
        ranking_by_viability_chart = "ranking_by_viability_chart_bar";
    }

    document.getElementById(ranking_by_viability_chart).style.display = "";
}

function filterByCharacterName() {
    let input = document.getElementById("tab_character_search").value;

    if (input.length > 0) {
        for (let char of CHARACTER_NAMES) {
            if (char.toLowerCase().includes(input)) {
                document.getElementById("character_" + char).style.display = "";
            } else {
                document.getElementById("character_" + char).style.display = "none";
            }
        }
    } else {
        for (let char of CHARACTER_NAMES) {
            document.getElementById("character_" + char).style.display = "";
        }
    }
}

function activateMenuContent(element, content_id) {
    let siblings_buttons = document.querySelector('.right_menu_buttons').children;

    for (let sibling of siblings_buttons) {
        if (sibling.classList.contains("active_menu_character_button")) {
            sibling.classList.remove("active_menu_character_button");
        }

        if (!sibling.classList.contains("disabled_menu_character_button")) {
            sibling.classList.add("disabled_menu_character_button");
        }
    }

    if (!element.classList.contains("active_menu_character_button")) {
        element.classList.add("active_menu_character_button");
    }

    if (element.classList.contains("disabled_menu_character_button")) {
        element.classList.remove("disabled_menu_character_button");
    }


    let siblings_content = document.querySelector('.right_menu_content').children;

    for (let content of siblings_content) {
        if (!content.classList.contains("hide_menu_character_container")) {
            content.classList.add("hide_menu_character_container");
        }
    }

    document.getElementById(content_id).classList.remove("hide_menu_character_container");
}

function getMenuCharacterHTML(character_data) {
    if (character_data) {
        return `
        <div id="character_` + character_data.name + `" class="character_container" onclick="printCharacterInfoHTML('` + character_data.name + `')">
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

function printAllCharacters() {
    let menu_characters = `
        <div class="tab_character_search">
            <input id="tab_character_search" type="text" placeholder="Name..." class="search_form_text_input small_input">
        </div>
    `;

    for (let index = Object.keys(characters_order_priority).length - 1; index >= 0; --index) {
        menu_characters += getMenuCharacterHTML(getCharacter(characters_order_priority[index]));
    }

    document.getElementById("menu_characters").innerHTML = menu_characters;
}

function resetMenuCharacters() {
    document.getElementById("menu_characters").style.display = "";
    document.getElementById("menu_characters_info").innerHTML = `<button class="primary_button reset_menu_characters_button" onclick="resetMenuCharacters()">Go to characters</button>`;
    document.getElementById("menu_characters_info").style.display = "none";
}

function getNewRandomTeamByCharacterBuild(container, character, build) {
    teams_keys = shuffle(Object.keys(teams));
    document.getElementById(container).innerHTML = getRandomTeamByCharacterBuild(character, build, character);
}

function getRandomTeamByCharacterBuild(character, build, builds_name) {
    let team_output = "";

    let team_index = -1;
    let team_index_char_4 = -1;
    let index = 0;

    while (team_index == -1 && index < Object.keys(teams).length) {
        if (!filterByPrerelease(teams[teams_keys[index]])) {
            if ((teams[teams_keys[index]].character_1.name == builds_name && teams[teams_keys[index]].character_1.build == build) ||
                (teams[teams_keys[index]].character_2.name == builds_name && teams[teams_keys[index]].character_2.build == build) ||
                (teams[teams_keys[index]].character_3.name == builds_name && teams[teams_keys[index]].character_3.build == build)) {

                team_index = teams_keys[index];
            }

            // If character with build is in char_4 position
            for (let char_4_index = 0; char_4_index < teams[teams_keys[index]].character_4.name.length; ++char_4_index) {
                if (teams[teams_keys[index]].character_4.name[char_4_index] == builds_name && teams[teams_keys[index]].character_4.build[char_4_index] == build) {
                    team_index = teams_keys[index];
                    team_index_char_4 = char_4_index;
                }
            }
        }

        ++index;
    }

    if (team_index > -1) {

        let team = teams[team_index];
        let character_4_int_index = 1;
        if (team_index_char_4 == -1) {
            character_4_int_index = Math.floor(Math.random() * Object.keys(team.character_4.name).length);
        } else {
            character_4_int_index = team_index_char_4;
        }
        let character_4_index = Object.keys(team.character_4.name)[character_4_int_index];

        let character_4 = {
            "name": team.character_4.name[character_4_index],
            "build": team.character_4.build[character_4_index]
        };

        let team_id = team_index + (team.character_4.name.length > 1 ? `-` + (character_4_int_index + 1) : ``);
        team_output = getTeamHTML(team, team_index, team_id, character_4);
    }
    else {
        // team_output = '<div class="build_no_info">No teams for ' + character + ' with build ' + build + ' found.</div>';
        team_output = 'No teams for ' + character + ' with build ' + build + ' found';
    }

    return team_output;
}

function getMaterialHTML(material_cost) {
    let material = GenshinDb.material(material_cost.name);
    let materialHTML = ``;

    let rarity_class = "material_1_stars";
    let material_name = material_cost.name;
    let material_icon = "";

    if (material) {
        rarity_class = material.rarity ? `material_` + material.rarity + `_stars` : `material_1_stars`;

        material_name = material.name;
        material_icon = material.images.filename_icon;
    }

    materialHTML = `
        <div class="material_container tooltip">
            <img class="material_icon ` + rarity_class + `" src="https://api.ambr.top/assets/UI/` + material_icon + `.png" alt="Material icon for ` + material_name + `" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + material_icon + `.png', 'images/icons/Icon_Inventory_Materials.webp')">

            <div class="material_count">
            ` + material_cost.count + `
            </div>
            
            <span class="tooltiptext">` + material_name + `</span>
        </div>
    `;

    return materialHTML;
}

function getMaterialSmallHTML(material_cost) {
    let material = GenshinDb.material(material_cost.name);
    let materialHTML = ``;

    let rarity_class = material.rarity ? `material_` + material.rarity + `_stars` : `material_1_stars`;

    materialHTML = `
        <div class="material_container tooltip">
            <img class="material_icon_small ` + rarity_class + `" src="https://api.ambr.top/assets/UI/` + material.images.filename_icon + `.png" alt="Material icon for ` + material.name + `" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + material.images.filename_icon + `.png', 'images/icons/Icon_Inventory_Materials.webp')">

            <div class="material_count_small">
            ` + material_cost.count + `
            </div>
            
            <span class="tooltiptext">` + material.name + `</span>
        </div>
    `;

    return materialHTML;
}

function updateAscension(character_name) {
    let slider_ascend = [
        "",
        "",
        "ascend1",
        "ascend1",
        "ascend2",
        "ascend3",
        "ascend4",
        "ascend5",
        "ascend6",
    ];

    let slider_value = document.getElementById("menu_slider_ascension").value;
    let character = getCharacter(character_name);

    // Ascension Value in the Ascension Phase = Total Section in the Ascension Phase * Max Ascension Value
    let ascension_value_hp = character_section_scaling[slider_value] * characters_attributes[character_name].max_ascension_value_HP;
    let ascension_value_atk = character_section_scaling[slider_value] * characters_attributes[character_name].max_ascension_value_ATK;
    let ascension_value_def = character_section_scaling[slider_value] * characters_attributes[character_name].max_ascension_value_DEF;

    // Base Attribute Value = Base Value * Level Multiplier + Ascension Value
    let level_multiplier = character_level_multiplier[character.rarity][slider_value * 10 - 1];

    let attribute_value_hp = characters_attributes[character_name].HP * level_multiplier + ascension_value_hp;
    let attribute_value_atk = characters_attributes[character_name].ATK * level_multiplier + ascension_value_atk;
    let attribute_value_def = characters_attributes[character_name].DEF * level_multiplier + ascension_value_def;

    // Bonus Attribute Value = Base Value * Ascension Multiplier
    let attribute_value_bonus = character_bonus_base_value[character.rarity][character.substatText] * character_bonus_ascension_multiplier[slider_value];

    document.getElementById("character_attributes").innerHTML = `
        <div class="attribute_info">
            <img class="attribute_img" src="images/attribute/` + character_bonus_icon.HP + `">
            HP: ` + attribute_value_hp.toFixed(0) + `
        </div>
        <div class="attribute_info">
            <img class="attribute_img" src="images/attribute/` + character_bonus_icon.ATK + `">
            ATK: ` + attribute_value_atk.toFixed(0) + `
        </div>
        <div class="attribute_info">
            <img class="attribute_img" src="images/attribute/` + character_bonus_icon.DEF + `">
            DEF: ` + attribute_value_def.toFixed(0) + `
        </div>
        <div class="attribute_info">
            <img class="attribute_img" src="images/attribute/` + character_bonus_icon[character.substatText] + `">
            ` + character.substatText + `: ` + toFixedIfNecessary(attribute_value_bonus, 2) + character_bonus_unit[character.substatText] + `
        </div>
    `;

    let output = ``;

    document.getElementById("menu_slider_ascension_output").innerHTML = slider_value * 10;

    if (Array.isArray(character_ascension[slider_ascend[parseInt(slider_value) - 1]])) {
        for (let material of character_ascension[slider_ascend[parseInt(slider_value) - 1]]) {
            output += getMaterialHTML(material);
        }
    } else {
        output = `<div class="menu_panel">No items needed to upgrade!</div>`;
    }

    document.getElementById("materials_output").innerHTML = output;
}


function getMenuContentAscension(character_name) {
    let content = ``;
    let character_data = getCharacter(character_name);

    character_ascension = character_data.costs;

    content += `
        <div class="menu_panel">` + character_data.description + `</div>
        <div id="character_attributes" class="attribute_panel"></div>

        <div class="slider_container">
            <div>
                Lvl. <span id="menu_slider_ascension_output" class="menu_slider_output">20</span>
            </div>

            <input type="range" min="2" max="9" step="1" value="9" class="menu_slider" id="menu_slider_ascension" oninput="updateAscension('` + character_name + `')">
        </div>

        <div id="materials_output" class="slider_output">
        </div>
    `;

    return content;
}

function updateTalents() {
    let talents = ["combat1", "combat2", "combat3", "combatsp", "passive1", "passive2", "passive3", "passive4"];

    for (let talent of talents) {
        updateTalent(talent);
    }
}

function updateTalent(talent_id) {
    if (document.getElementById("menu_slider_" + talent_id)) {
        let slider_value = document.getElementById("menu_slider_" + talent_id).value;
        let output = ``;

        document.getElementById("menu_slider_" + talent_id + "_output").innerHTML = slider_value;

        output += `<div class="talent_table">`;

        const param_regex = /\{param\d*:[^\{\}]*\}/g;

        let isDark = true;
        for (let label of character_talents[talent_id].attributes.labels) {
            let label_text = label.split("|")[0];

            let label_number = label.split("|")[1].replaceAll(param_regex, (match, capturedGroup) => {
                const param_match = match.match(/param\d*/g);

                let param_value;
                if (capturedGroup < param_match.length) {
                    param_value = character_talents[talent_id].attributes.parameters[param_match[capturedGroup]][slider_value - 1];
                }
                else {
                    param_value = character_talents[talent_id].attributes.parameters[param_match[0]][slider_value - 1];
                }

                // let param_tag = Number.isInteger(param_value) ? "" : "%";
                param_value = Number.isInteger(param_value) ? param_value : param_value * 100;
                param_value = Math.round(param_value * 100) / 100;

                // return param_value + param_tag;
                return param_value;
            });

            output += `
            <div class="talent_row ` + (isDark ? `menu_character_row_dark` : `menu_character_row_light`) + `">
                <div class="talent_data talent_data_left">
                ` + label_text + `
                </div>
                <div class="talent_data talent_data_right">
                ` + label_number + `
                </div>
            </div>
            `;

            isDark = !isDark;
        }

        output += `</div>`;

        output += `<div class="material_row">`;

        if (Array.isArray(character_talents.costs["lvl" + slider_value])) {
            for (let material of character_talents.costs["lvl" + slider_value]) {
                output += getMaterialSmallHTML(material);
            }
        } else {
            output += `No items needed to upgrade!`;
        }

        output += `</div>`;

        document.getElementById("talent_" + talent_id + "_output").innerHTML = output;
    }
}

function getMenuContentTalents(character_name) {
    let content = ``;
    character_talents = getTalent(character_name);

    let talents = ["combat1", "combat2", "combat3", "combatsp", "passive1", "passive2", "passive3", "passive4"];

    if (character_talents) {
        for (let talent of talents) {

            if (character_talents[talent]) {

                let talent_postprocessed = character_talents[talent].descriptionRaw.replaceAll(regex_color_start_tag, (match, capturedGroup) => {
                    const color = match.match(/\#......../g);
                    return '<span class="talent_subtitle" style="color: ' + color + '">';
                }).replaceAll(regex_color_end_tag, "</span>").replaceAll("\n", "<br>").replaceAll("{LAYOUT_MOBILE#Tap}{LAYOUT_PC#Press}{LAYOUT_PS#Press}", "Press");

                content += `
                <div class="menu_panel_column">
                    <div class="talent_name_container">
                        <img class="talent_img" src="images/UI/` + character_talents.images["filename_" + talent] + `.png" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + character_talents.images["filename_" + talent] + `.png', 'images/icons/paimon_emoji_01.webp')">
                    
                        <div class="talent_name">
                            ` + character_talents[talent].name + `
                        </div>
                    </div>
                    <div class="talent_info_container">
                        <div class="talent_info">
                            ` + talent_postprocessed + `
                        </div>
                    </div>

                    ` + (["combat1", "combat2", "combat3"].includes(talent) ? `<div class="slider_container">
                        <div>
                            Lvl. <span id="menu_slider_` + talent + `_output" class="menu_slider_output">1</span>
                        </div>
            
                        <input type="range" min="1" max="15" step="1" value="10" class="menu_slider menu_slider_2" id="menu_slider_` + talent + `" oninput="updateTalent('` + talent + `')">
                    </div>

                    <div id="talent_` + talent + `_output" class="slider_output">
                    </div>` : ``) + `
                </div>
            `;
            }
        }
    } else {
        content = `<div class="menu_panel">No talents found...</div>`;
    }

    return content;
}

function getMenuContentTalentsTravelerElement(character_name) {
    document.getElementById("talents_traveler").innerHTML = getMenuContentTalents(character_name);
    updateTalents();
}

function getMenuContentTalentsTraveler() {

    let content = `<div class="traveler_elements_buttons">
    `;

    for (let element of ELEMENTS) {
        let character_name = "Traveler (" + element + ")";

        content += `
            <img class="traveler_button_element_icon traveler_button_` + element + `" src="images/elements/` + element.toLowerCase() + `.png" onclick="getMenuContentTalentsTravelerElement('` + character_name + `')">
        `;
    }

    content += `
        </div>
        <div id="talents_traveler">
            ` + getMenuContentTalents("Traveler (Anemo)") + `
        </div>
    `;

    return content;
}


function getMenuContentConstellations(character_name) {
    let content = ``;
    let character_constellations = getConstellation(character_name);

    if (character_constellations) {

        for (let index = 1; index < 7; ++index) {

            let cons_postprocessed = character_constellations["c" + index].descriptionRaw.replaceAll(regex_color_start_tag, (match, capturedGroup) => {
                const color = match.match(/\#......../g);
                return '<span class="talent_subtitle" style="color: ' + color + '">';
            }).replaceAll(regex_color_end_tag, "</span>").replaceAll("\n", "<br>").replaceAll("{LAYOUT_MOBILE#Tap}{LAYOUT_PC#Press}{LAYOUT_PS#Press}", "Press");

            content += `
            <div class="menu_panel_column">
                <div class="talent_name_container">
                    <img class="talent_img" src="images/UI/` + character_constellations.images["filename_c" + index] + `.png" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + character_constellations.images["filename_c" + index] + `.png', 'images/icons/paimon_emoji_01.webp')">
                
                    <div class="talent_name">
                        ` + character_constellations["c" + index].name + `
                    </div>
                </div>
                <div class="talent_info_container">
                    <div class="talent_info">
                        ` + cons_postprocessed + `
                    </div>
                </div>
            </div>
            `;
        }
    } else {
        content = `<div class="menu_panel">No constellations found...</div>`;
    }

    return content;
}

function getMenuContentConstellationsTravelerElement(character_name) {
    document.getElementById("constellations_traveler").innerHTML = getMenuContentConstellations(character_name);
}

function getMenuContentConstellationsTraveler() {

    let content = `<div class="traveler_elements_buttons">
    `;

    for (let element of ELEMENTS) {
        let character_name = "Traveler (" + element + ")";

        content += `
            <img class="traveler_button_element_icon traveler_button_` + element + `" src="images/elements/` + element.toLowerCase() + `.png" onclick="getMenuContentConstellationsTravelerElement('` + character_name + `')">
        `;
    }

    content += `
        </div>
        <div id="constellations_traveler">
            ` + getMenuContentConstellations("Traveler (Anemo)") + `
        </div>
    `;

    return content;
}

function getWeaponHTML(weapon_name) {
    let weapon = getWeapon(weapon_name);
    let weaponHTML = ``;

    let rarity_class = weapon.rarity ? `material_` + weapon.rarity + `_stars` : `material_1_stars`;

    weaponHTML = `
        <div class="weapon_container tooltip">
            <img class="build_material_icon_small ` + rarity_class + `" src="images/weapons/` + weapon.images.filename_awakenIcon + `.png" alt="Weapon icon for ` + weapon.name + `" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + weapon.images.filename_icon + `.png', 'images/icons/Icon_Inventory_Weapons.webp')">
            
            <span class="tooltiptext">` + weapon.name + `</span>
        </div>
    `;

    return weaponHTML;
}

function updateWeaponRefinement() {
    let slider_value = document.getElementById("menu_slider_weapon_refinement").value;
    document.getElementById("menu_slider_weapon_refinement_output").innerHTML = slider_value;

    let values = character_weapon["r" + slider_value].values;

    let effect_postprocessed = character_weapon.effectTemplateRaw;

    for (let index = 0; index < values.length; ++index) {
        effect_postprocessed = effect_postprocessed.replace("{" + index + "}", values[index]);
    }

    effect_postprocessed = effect_postprocessed.replaceAll(regex_color_start_tag, (match, capturedGroup) => {
        const color = match.match(/\#......../g);
        return '<span class="talent_subtitle" style="color: ' + color + '">';
    }).replaceAll(regex_color_end_tag, "</span>").replaceAll("\n", "<br>").replaceAll("{LAYOUT_MOBILE#Tap}{LAYOUT_PC#Press}{LAYOUT_PS#Press}", "Press");

    document.getElementById("weapon_refinement_output").innerHTML = effect_postprocessed;
}

function updateWeaponMaterial() {
    let slider_ascend = [
        "",
        "",
        "ascend1",
        "ascend1",
        "ascend2",
        "ascend3",
        "ascend4",
        "ascend5",
        "ascend6",
    ];

    let slider_value = document.getElementById("menu_slider_weapon_material").value;

    // Main Stat Value = Base Value * Level Multiplier + Ascension Value
    let level_multiplier = weapon_level_multiplier[character_weapon.rarity][weapon_tiers[character_weapon.rarity][toFixedIfNecessary(character_weapon.baseAtkValue, 4)]][slider_value * 10 - 1];
    let ascension_value = weapon_ascension_value[character_weapon.rarity][slider_value];
    let main_stat_value = character_weapon.baseAtkValue * level_multiplier + ascension_value;

    // Sub Stat Value = Base Value * Level Multiplier
    let substat_base_value = character_weapon.baseStatText.replace("%", "");
    let substat_value = substat_base_value * weapon_substat_level_multiplier[slider_value * 10];

    document.getElementById("weapons_stats_container").innerHTML = `
        <div id="weapon_stat"class="weapon_stat">
            <img class="attribute_img" src="images/attribute/` + character_bonus_icon.HP + `">
            ATK: ` + toFixedIfNecessary(main_stat_value) + `
        </div>

        <div class="vertical_separator"></div>

        <div id="weapon_substat" class="weapon_substat">
            <img class="attribute_img" src="images/attribute/` + character_bonus_icon[character_weapon.mainStatText] + `">
            ` + character_weapon.mainStatText + `: ` + toFixedIfNecessary(substat_value, 2) + (character_weapon.mainStatText.includes("%") ? `%` : ``) + `
        </div>
    `;

    let output = ``;

    document.getElementById("menu_slider_weapon_material_output").innerHTML = slider_value * 10;

    if (Array.isArray(character_weapon.costs[slider_ascend[parseInt(slider_value) - 1]])) {
        for (let material of character_weapon.costs[slider_ascend[parseInt(slider_value) - 1]]) {
            output += getMaterialSmallHTML(material);
        }
    } else {
        output = `<div class="menu_panel">No items needed to upgrade!</div>`;
    }

    if (slider_value > 5) {
        document.getElementById("signature_weapon_icon").src = `images/weapons/` + character_weapon.images.filename_awakenIcon + `.png`;
    } else {
        document.getElementById("signature_weapon_icon").src = `images/weapons/` + character_weapon.images.filename_icon + `.png`;
    }

    document.getElementById("weapon_material_output").innerHTML = output;
}

function getMenuContentWeapon(character_name) {
    let content = ``;
    character_weapon = getWeapon(characters_signature_weapons[character_name]);

    if (character_weapon) {

        let weapon_postprocessed = character_weapon.descriptionRaw.replaceAll(regex_color_start_tag, (match, capturedGroup) => {
            const color = match.match(/\#......../g);
            return '<span class="talent_subtitle" style="color: ' + color + '">';
        }).replaceAll(regex_color_end_tag, "</span>").replaceAll("\n", "<br>").replaceAll("{LAYOUT_MOBILE#Tap}{LAYOUT_PC#Press}{LAYOUT_PS#Press}", "Press");

        content += `
                <div class="menu_panel_column">
                    <div class="talent_name_container">
                        <img id="signature_weapon_icon" class="talent_img" src="images/weapons/` + character_weapon.images.filename_icon + `.png" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + character_weapon.images.filename_icon + `.png', 'images/icons/Icon_Inventory_Weapons.webp')">
                    
                        <div class="talent_name">
                            ` + character_weapon.name + `
                        </div>
                    </div>
                    <div class="talent_info_container">
                        <div class="talent_info">
                            ` + weapon_postprocessed + `
                        </div>
                    </div>

                    <div class="slider_container">
                        <div>
                            Lvl. <span id="menu_slider_weapon_material_output" class="menu_slider_output">1</span>
                        </div>
            
                        <input type="range" min="2" max="9" step="1" value="9" class="menu_slider menu_slider_2" id="menu_slider_weapon_material" oninput="updateWeaponMaterial()">
                    </div>

                    <div id="weapons_stats_container" class="weapons_stats_container"></div>

                    <div id="weapon_material_output" class="slider_output"></div>

                    <div class="slider_container">
                        <div>
                            R <span id="menu_slider_weapon_refinement_output" class="menu_slider_output">1</span>
                        </div>
            
                        <input type="range" min="1" max="5" step="1" value="1" class="menu_slider menu_slider_2" id="menu_slider_weapon_refinement" oninput="updateWeaponRefinement()">
                    </div>

                    <div class="talent_name_container" style="color: #FFD780FF">
                        <div class="talent_info">
                        ` + character_weapon.effectName + `
                        </div>
                    </div>

                    <div id="weapon_refinement_output" class="slider_output_text">
                    </div>
                </div>
            `;

        content += `
            <div class="menu_panel_column">
                ` + character_weapon.story.replaceAll('\n', '<br>') + `
            </div>
        `;
    } else {
        content = `<div class="menu_panel">No signature weapon found...</div>`;
    }

    return content;
}

function printCharacterTeam(team) {
    let team_HTML = `
        ` + printElement(team.composition[0]) + `
        ` + printElement(team.composition[1]) + `
        ` + printElement(team.composition[2]) + `
        ` + printElement(team.composition[3]) + `
    `;

    return team_HTML;
}

function getMenuContentTeams(character_name) {
    let teams_name = character_name;

    if (character_name == "Lumine") {
        teams_name = "Aether";
    }

    let content = ``;

    for (let character_team_name in characters_teams[teams_name]) {
        let team = JSON.parse(JSON.stringify(characters_teams[teams_name][character_team_name]));

        // Special checks for travelers
        for (let i = 0; i < team.composition.length; ++i) {
            if (character_name == "Lumine" && team.composition[i] == "Aether") {
                team.composition[i] = "Lumine";
            }
        }

        content += `
            <div class="menu_panel_column">
            
                <div class="character_team_title">
                ` + character_team_name + `
                </div>

                <div class="team_elements_container">
                ` + printCharacterTeam(team) + `
                </div>

                <div class="character_team_description">
                ` + team.description + `
                </div>
            </div>
        `;
    }

    content += `
    <div class="menu_panel_column">
        <div class="character_team_title">
            Clarification
        </div>

        <div class="character_team_description">
            ` + characters_teams_info[teams_name] + `
        </div>
    </div>
    `;

    return content;
}

function getArtifactHTML(artifact_name, artifact_piece) {
    let artifact = GenshinDb.artifact(artifact_name);
    let artifactHTML = ``;

    if (artifact) {
        artifactHTML = `
            <div class="weapon_container tooltip">
                <img class="build_material_icon_small material_5_stars" src="https://api.ambr.top/assets/UI/reliquary/` + artifact.images["filename_" + artifact_piece] + `.png" alt="Artifact ` + artifact_piece + ` icon for ` + artifact.name + `" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/reliquary/` + artifact.images["filename_" + artifact_piece] + `.png', 'images/icons/Icon_Inventory_Artifacts.webp')">
                
                <span class="tooltiptext">` + artifact.name + `</span>
            </div>
        `;
    }

    return artifactHTML;
}

function getMenuContentBuilds(character_name) {
    let builds_name = character_name;

    if (character_name == "Lumine") {
        builds_name = "Aether";
    }

    let content = ``;

    for (let build_name in builds[builds_name]) {
        let build = builds[builds_name][build_name];

        let weapons_build = ``;
        if (build.weapon.length > 0) {
            for (let weapon of build.weapon) {

                let weapon_data = getWeapon(weapon);

                if (weapon_data) {
                    weapons_build += `
                    <div class="build_weapon_info">
                        ` + getWeaponHTML(weapon_data.name) + `
                    </div>`;
                }
            }
        } else {
            // weapons_build = `<div class="build_no_info">No weapon recommended</div>`;
            weapons_build = `No weapon recommended`;
        }

        let talents_priority = [];

        if (build.talent_priority.length > 0) {
            for (let talent of build.talent_priority) {

                let talent_data = getTalent(character_name);

                if (talent_data) {
                    talents_priority.push(`
                        <div class="build_talent_info">
                            <img class="talent_img_small" src="images/UI/` + talent_data.images["filename_combat" + talent] + `.png" alt="Talent ` + talent + `" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + talent_data.images["filename_combat" + talent] + `.png', 'images/icons/paimon_emoji_01.webp')">
                        </div>
                    `);
                } else {
                    talents_priority.push(`
                        <div class="build_talent_info">
                            Talent ` + talent + `
                        </div>
                    `);
                }
            }

            let separator = `<div class="build_talent_separator">></div>`;

            talents_priority = talents_priority.join(separator);
        } else {
            // talents_priority = `<div class="build_no_info">No talent priority</div>`;
            talents_priority = `No talent priority`;
        }

        let sets_build = [];
        if (build.set.length > 0) {
            for (let set of build.set) {

                let artifacts_build = [];

                for (let artifact of set.artifacts) {
                    let artifact_data = GenshinDb.artifact(artifact);

                    if (artifact_data) {
                        artifacts_build.push(`
                        <div class="build_set_info">
                            <div class="build_artifact_info">
                            ` + getArtifactHTML(artifact_data.name, "flower") + `
                            </div>
                            <div class="">
                                ` + set.pc + `
                            </div>
                        </div>
                        `);
                    }
                }
                sets_build.push(artifacts_build.join(`<div class="build_artifact_separator">+</div>`));
            }

            sets_build = sets_build.join(`<div class="build_set_separator"></div>`);
        } else {
            // sets_build = `<div class="build_no_info">No artifacts recommended</div>`;
            sets_build = `No artifacts recommended`;
        }

        let er_build = ``;
        if (build.er_requirement != "") {
            er_build = build.er_requirement;
        } else {
            // er_build = `<div class="build_no_info">No minimum ER required</div>`;
            er_build = `No minimum ER required`;
        }

        let substats_build = ``;
        if (build.subs_stat.length > 0) {
            substats_build = build.subs_stat.join(" > ");
        } else {
            // substats_build = `<div class="build_no_info">No substats recommended</div>`;
            substats_build = `No substats recommended`;
        }

        let constellation_build = ``;
        if (build.constellation != "") {
            constellation_build = `Constellation required: ` + build.constellation;
        } else {
            // constellation_build = `<div class="build_no_info">No minimun constellation required</div>`;
            constellation_build = `No minimun constellation required`;
        }


        content += `
                <div class="menu_panel_column">
                    <div class="build_title">
                        ` + build_name + ` ` + (build.element ? `<img class="menu_row_img" src="images/elements/` + build.element.toLowerCase() + `.png"></img>` : ``) + `
                    </div>
                    <div class="build_description">
                        ` + build.description + `
                    </div>
                    <div class="build_subtitle">
                        Recommended weapon
                    </div>
                    <div class="build_weapon_container">
                        ` + weapons_build + `
                    </div>
                    <div class="build_subtitle">
                        Artifacts
                    </div>
                    <div class="build_artifacts_container">
                        ` + sets_build + `
                    </div>
                    <div class="build_subtitle">
                        Main Stats
                    </div>
                    <div class="build_set_container">
                        <div class="build_set_info">
                            <img class="artifact_img_small" src="images/artifacts/Icon_Flower_of_Life.webp">
                            <div class="artifact_substat">
                                HP
                            </div>
                        </div>
                        <div class="build_set_info">
                            <img class="artifact_img_small" src="images/artifacts/Icon_Plume_of_Death.webp">
                            <div class="artifact_substat">
                                ATK
                            </div>
                        </div>
                        <div class="build_set_info">
                            <img class="artifact_img_small" src="images/artifacts/Icon_Sands_of_Eon.webp">
                            <div class="artifact_substat">
                                ` + build.main_stat.sands + `
                            </div>
                        </div>
                        <div class="build_set_info">
                            <img class="artifact_img_small" src="images/artifacts/Icon_Goblet_of_Eonothem.webp">
                            <div class="artifact_substat">
                                ` + build.main_stat.goblet + `
                            </div>
                        </div>
                        <div class="build_set_info">
                            <img class="artifact_img_small" src="images/artifacts/Icon_Circlet_of_Logos.webp">
                            <div class="artifact_substat">
                                ` + build.main_stat.circlet + `
                            </div>
                        </div>
                    </div>
                    
                    <div class="build_row">
                        <div>
                            <div class="build_subtitle">
                                ER requirement
                            </div>
                            <div class="build_substats">
                                ` + er_build + `
                            </div>
                        </div>

                        <div>
                            <div class="build_subtitle">
                                Substats priority
                            </div>
                            <div class="build_substats">
                                ` + substats_build + `
                            </div>
                        </div>
                    </div>
                    
                    <div class="build_row">
                        <div>
                            <div class="build_subtitle">
                                Talent priority
                            </div>
                            <div class="build_talent_info">
                                ` + talents_priority + `
                            </div>
                        </div>
                        
                        <div>
                            <div class="build_subtitle">
                                Constellation
                            </div>
                            <div class="build_constellation_info">
                                ` + constellation_build + `
                            </div>
                        </div>
                    </div>

                    <div class="build_subtitle">
                        <button type="submit" class="search_random_button build_search_random_button" onclick="getNewRandomTeamByCharacterBuild('random_` + build_name + `', '` + character_name + `', '` + build_name + `')"></button>
                        
                        <div class="build_subtitle">
                            Random team
                        </div>
                    </div>
                    <div id="random_` + build_name + `">
                        ` + getRandomTeamByCharacterBuild(character_name, build_name, builds_name) + `
                    </div>
                </div>
            `;
    }

    return content;
}

function getChartTeams(character_name) {
    let stats_name = character_name;

    if (character_name == "Lumine") {
        stats_name = "Aether";
    }

    let character = getCharacter(character_name);
    let color = (character.elementText != 'None' ? ELEMENT_COLORS[character.elementText] : ELEMENT_COLORS['Flex']);
    let colors = [color, 'gray'];

    let total = STATS.team_count_flex;
    let character_total = STATS.characters[stats_name].team_count;

    let character_perc = ((character_total / total) * 100).toFixed(2);
    let total_perc = (100.0 - character_perc).toFixed(2);

    new Chart(document.getElementById('ranking_by_team_chart'), {
        type: 'pie',
        data: {
            labels: [character_name + ' (' + character_perc + '%)', 'All (' + total_perc + '%)'],
            datasets: [{
                label: 'Teams',
                data: [character_total, total - character_total],
                backgroundColor: colors,
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: '',
                }
            }
        }
    });
}

function getChartArchetypes(character_name) {
    let stats_name = character_name;

    if (character_name == "Lumine") {
        stats_name = "Aether";
    }

    let labels = [];
    let data = [];
    let data_all = [];
    let character = getCharacter(character_name);
    let color = (character.elementText != 'None' ? ELEMENT_COLORS[character.elementText] : ELEMENT_COLORS['Flex']);

    for (let archetype of ARCHETYPES_NAMES) {
        if (STATS.characters[stats_name].by_archetype[archetype] && STATS.characters[stats_name].by_archetype[archetype] > 0) {
            labels.push(archetype);
            data.push(STATS.characters[stats_name].by_archetype[archetype]);
            data_all.push(STATS.team_count_by_archetype[archetype] - STATS.characters[stats_name].by_archetype[archetype]);
        }
    }

    new Chart(document.getElementById('ranking_by_archetype_chart'), {
        type: 'bar',
        data: {
            axis: 'y',
            labels: labels,
            datasets: [{
                label: character_name,
                data: data,
                backgroundColor: color,
                hoverOffset: 4,
                stack: "Stack 0",
                yAxisID: 'y'
            },
            {
                label: 'All',
                data: data_all,
                backgroundColor: 'gray',
                hoverOffset: 4,
                stack: "Stack 0",
                yAxisID: 'y'
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: '',
                }
            }
        }
    });
}

function getChartElements(character_name) {
    let stats_name = character_name;

    if (character_name == "Lumine") {
        stats_name = "Aether";
    }

    let labels = [];
    let data = [];
    let data_all = [];
    let character = getCharacter(character_name);
    let color = (character.elementText != 'None' ? ELEMENT_COLORS[character.elementText] : ELEMENT_COLORS['Flex']);

    if (!["Aether", "Lumine"].includes(character_name)) {
        let element = character.elementText;
        labels.push(element);
        data.push(STATS.global_element_ranking[element][stats_name].team_count);
        data_all.push(STATS.team_count_by_element[element] - STATS.global_element_ranking[element][stats_name].team_count);
    } else {
        for (let element of ELEMENTS) {
            if (STATS.characters[stats_name].team_count_by_element[element] && STATS.characters[stats_name].team_count_by_element[element] > 0) {
                labels.push(element);
                data.push(STATS.characters[stats_name].team_count_by_element[element]);
                data_all.push(STATS.team_count_by_element[element] - STATS.characters[stats_name].team_count_by_element[element]);
            }
        }
    }

    new Chart(document.getElementById('ranking_by_element_chart'), {
        type: 'bar',
        data: {
            axis: 'y',
            labels: labels,
            datasets: [{
                label: character_name,
                data: data,
                backgroundColor: color,
                hoverOffset: 4,
                stack: "Stack 0",
                yAxisID: 'y'
            },
            {
                label: 'All',
                data: data_all,
                backgroundColor: 'gray',
                hoverOffset: 4,
                stack: "Stack 0",
                yAxisID: 'y'
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: '',
                }
            }
        }
    });
}

function getChartViabilities(character_name) {
    let stats_name = character_name;

    if (character_name == "Lumine") {
        stats_name = "Aether";
    }

    let labels = [];
    let data = [];
    let data_all = [];

    let character = getCharacter(character_name);
    let color = (character.elementText != 'None' ? ELEMENT_COLORS[character.elementText] : ELEMENT_COLORS['Flex']);

    let colors = [];

    for (let viability of VIABILITIES) {
        labels.push(viability);
        data.push(STATS.characters[stats_name].by_viability[viability]);
        data_all.push(STATS.team_count_by_viability[viability] - STATS.characters[stats_name].by_viability[viability]);
        colors.push(VIABILITIES_COLORS[viability]);
    }

    new Chart(document.getElementById('ranking_by_viability_chart_bar'), {
        type: 'bar',
        data: {
            axis: 'y',
            labels: labels,
            datasets: [{
                label: character_name,
                data: data,
                backgroundColor: color,
                hoverOffset: 4,
                stack: "Stack 0",
                yAxisID: 'y'
            },
            {
                label: 'All',
                data: data_all,
                backgroundColor: 'gray',
                hoverOffset: 4,
                stack: "Stack 0",
                yAxisID: 'y'
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: '',
                }
            }
        }
    });




    new Chart(document.getElementById('ranking_by_viability_chart_pie'), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: character_name,
                data: data,
                backgroundColor: colors,
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: false,
                    text: '',
                }
            }
        }
    });
}

function getRankingTeams(character_name) {
    let stats_name = character_name;

    if (character_name == "Lumine") {
        stats_name = "Aether";
    }

    let teams_table = ``;

    let total_characters = CHARACTER_NAMES.length - 1; //-1 because there are two travelers
    let total_teams = STATS.team_count_flex;

    let team_count_ranking_class = `low_rank`;
    let team_count_class = `low_rank`;

    if (STATS.characters[stats_name].team_count_ranking < (total_characters * 0.25)) {
        team_count_ranking_class = `high_rank`;
    } else if (STATS.characters[stats_name].team_count_ranking < (total_characters * 0.75)) {
        team_count_ranking_class = `medium_rank`;
    }

    if (STATS.characters[stats_name].team_count > (total_teams * 0.25)) {
        team_count_class = `high_rank`;
    } else if (STATS.characters[stats_name].team_count > (total_teams * 0.05)) {
        team_count_class = `medium_rank`;
    }

    teams_table = `
    <div class="rank_container">
        <div class="rank_tag">
            Rank
        </div>

        <div class="rank_value">
        <span class="` + team_count_ranking_class + `">` + STATS.characters[stats_name].team_count_ranking + `</span>/` + total_characters + `
        </div>
    </div>

    <div class="rank_container">
        <div class="rank_tag">
            Teams
        </div>

        <div class="rank_value">
        <span class="` + team_count_class + `">` + STATS.characters[stats_name].team_count + `</span>/` + total_teams + ` (` + ((STATS.characters[stats_name].team_count / total_teams) * 100).toFixed(2) + `%)
        </div>
    </div>`;

    return teams_table;
}

function getRankingArchetypes(character_name) {
    let stats_name = character_name;

    if (character_name == "Lumine") {
        stats_name = "Aether";
    }

    let archetype_table = ``;

    let total_characters = CHARACTER_NAMES.length - 1; //-1 because there are two travelers

    let is_first_row = true;

    for (let archetype of ARCHETYPES_NAMES) {

        let archetype_count = STATS.characters[stats_name].by_archetype[archetype];
        let global_archetype_count = STATS.team_count_by_archetype[archetype];
        let rank = STATS.global_archetype_ranking[archetype][stats_name].rank;

        let team_count_ranking_class = `low_rank`;
        let team_count_class = `low_rank`;

        if (rank < (total_characters * 0.25)) {
            team_count_ranking_class = `high_rank`;
        } else if (rank < (total_characters * 0.75)) {
            team_count_ranking_class = `medium_rank`;
        }

        if (archetype_count > (global_archetype_count * 0.25)) {
            team_count_class = `high_rank`;
        } else if (archetype_count > (global_archetype_count * 0.05)) {
            team_count_class = `medium_rank`;
        }

        if (archetype_count > 0) {
            archetype_table += `
            <div class="rank_row ` + (is_first_row ? `rank_row_top` : ``) + `">
                <div class="rank_data_long">
                    ` + archetype + `
                </div>
                <div class="rank_data">
                    <span class="` + team_count_ranking_class + `">` + rank + `</span>/` + total_characters + `
                </div>
                <div class="rank_data">
                    <span class="` + team_count_class + `">` + archetype_count + `</span>/` + global_archetype_count + `
                </div>
                <div class="rank_data">
                    <span class="">` + ((archetype_count / global_archetype_count) * 100).toFixed(2) + `%
                </div>
            </div>`;

            is_first_row = false;
        }
    }

    return archetype_table;
}

function getRankingElements(character_name) {
    let stats_name = character_name;

    if (character_name == "Lumine") {
        stats_name = "Aether";
    }

    let element_table = ``;

    let total_characters = CHARACTER_NAMES.length - 1; //-1 because there are two travelers

    let is_first_row = true;

    for (let element of ELEMENTS) {

        if (STATS.global_element_ranking[element][stats_name]) {

            let element_count = STATS.global_element_ranking[element][stats_name].team_count;
            let global_element_count = STATS.team_count_by_element[element];
            let rank = STATS.global_element_ranking[element][stats_name].rank;

            let team_count_ranking_class = `low_rank`;
            let team_count_class = `low_rank`;

            if (rank < (total_characters * 0.25)) {
                team_count_ranking_class = `high_rank`;
            } else if (rank < (total_characters * 0.75)) {
                team_count_ranking_class = `medium_rank`;
            }

            if (element_count > (global_element_count * 0.25)) {
                team_count_class = `high_rank`;
            } else if (element_count > (global_element_count * 0.05)) {
                team_count_class = `medium_rank`;
            }

            if (element_count > 0) {
                element_table += `
                <div class="rank_row ` + (is_first_row ? `rank_row_top` : ``) + `">
                    <div class="rank_data_long">
                        ` + element + `
                    </div>
                    <div class="rank_data">
                        <span class="` + team_count_ranking_class + `">` + rank + `</span>/` + STATS.count_characters_by_element[element] + `
                    </div>
                    <div class="rank_data">
                        <span class="` + team_count_class + `">` + element_count + `</span>/` + global_element_count + `
                    </div>
                    <div class="rank_data">
                        <span class="">` + ((element_count / global_element_count) * 100).toFixed(2) + `%
                    </div>
                </div>`;

                is_first_row = false;
            }
        }
    }

    return element_table;
}

function getRankingViabilities(character_name) {
    let stats_name = character_name;

    if (character_name == "Lumine") {
        stats_name = "Aether";
    }

    let viability_table = ``;

    let total_characters = CHARACTER_NAMES.length - 1; //-1 because there are two travelers

    let is_first_row = true;

    for (let viability of VIABILITIES) {

        let viability_count = STATS.characters[stats_name].by_viability[viability];
        let global_viability_count = STATS.team_count_by_viability[viability];
        let rank = STATS.global_viability_ranking[viability][stats_name].rank;

        let team_count_ranking_class = `low_rank`;
        let team_count_class = `low_rank`;

        if (rank < (total_characters * 0.25)) {
            team_count_ranking_class = `high_rank`;
        } else if (rank < (total_characters * 0.75)) {
            team_count_ranking_class = `medium_rank`;
        }

        if (viability_count > (global_viability_count * 0.25)) {
            team_count_class = `high_rank`;
        } else if (viability_count > (global_viability_count * 0.05)) {
            team_count_class = `medium_rank`;
        }

        if (viability_count > 0) {
            viability_table += `
            <div class="rank_row ` + (is_first_row ? `rank_row_top` : ``) + `">
                <div class="rank_data_long">
                    ` + viability + `
                </div>
                <div class="rank_data">
                    ` + (viability_count > 0 ? `<span class="` + team_count_ranking_class + `">` + rank + `</span>` : `<span>-</span>`) + `/` + total_characters + `
                </div>
                <div class="rank_data">
                    <span class="` + team_count_class + `">` + viability_count + `</span>/` + global_viability_count + `
                </div>
                <div class="rank_data">
                    <span class="">` + ((viability_count / global_viability_count) * 100).toFixed(2) + `%
                </div>
            </div>`;

            is_first_row = false;
        } else {
            viability_table += `
            <div class="rank_row ` + (is_first_row ? `rank_row_top` : ``) + `">
                <div class="rank_data_long">
                    ` + viability + `
                </div>
                <div class="rank_data">
                    <span>-</span>/` + total_characters + `
                </div>
                <div class="rank_data">
                    <span class="` + team_count_class + `">` + viability_count + `</span>/` + global_viability_count + `
                </div>
                <div class="rank_data">
                    <span class="">` + ((viability_count / global_viability_count) * 100).toFixed(2) + `%
                </div>
            </div>`;

            is_first_row = false;
        }
    }

    return viability_table;
}

function getMenuContentCharts(character_name) {
    let content = ``;

    content += `
        <div id="ranking_by_team" class="ranking_panel warning_panel">
            <div class="ranking_title">
                Disclaimer
            </div>

            <div class="ranking_row">
                <img class="warning_img" src="images/icons/paimon_glasses.png" alt="Paimon with glasses">

                <div>
                    Please, be aware that all data, tables and charts displayed in this section is purely subjective to our site data gathered until now... i.e., play whatever character you like and chill out...
                </div>
            </div>
        </div>
    `;

    content += `
        <div id="ranking_by_team" class="ranking_panel">
            <div class="ranking_title">
                Ranking by teams
            </div>

            <div class="ranking_row">
                <div class="rank_column">
                ` + getRankingTeams(character_name) + `
                </div>

                <div class="rank_chart_container">
                    <canvas id="ranking_by_team_chart" class="ranking_chart"></canvas>
                </div>
            </div>
        </div>
    `;

    content += `
        <div id="ranking_by_archetype" class="ranking_panel">
            <div class="ranking_title">
                Ranking by archetype
            </div>

            <div class="ranking_row">
                <div class="rank_column">
                    ` + getRankingArchetypes(character_name) + `
                </div>

                <div class="rank_chart_container">
                    <canvas id="ranking_by_archetype_chart" class="ranking_chart_long"></canvas>
                </div>
            </div>
        </div>
    `;

    content += `
        <div id="ranking_by_element" class="ranking_panel">
            <div class="ranking_title">
                Ranking by element
            </div>
            
            <div class="ranking_row">
                <div class="rank_column">
                    ` + getRankingElements(character_name) + `
                </div>

                <div class="rank_chart_container">
                    <canvas id="ranking_by_element_chart" class="` + (!["Aether", "Lumine"].includes(character_name) ? `ranking_chart_short` : `ranking_chart_long`) + `"></canvas>
                </div>
            </div>
        </div>
    `;

    content += `
        <div id="ranking_by_viability" class="ranking_panel">
            <div class="ranking_title">
                Ranking by viability
            </div>
            
            <div class="ranking_row">
                <div class="rank_column">
                    ` + getRankingViabilities(character_name) + `
                </div>

                <div class="rank_chart_container">
                    <button class="primary_button" onclick="swapRankingByViabilityChart()">Bar / Pie</button>

                    <canvas id="ranking_by_viability_chart_bar" class="ranking_chart_long"></canvas>

                    <canvas id="ranking_by_viability_chart_pie" class="ranking_chart"></canvas>
                </div>
            </div>
        </div>
    `;

    return content;
}


function printCharacterInfoHTML(character_name) {
    let character_data = getCharacter(character_name);
    let menu_characters_info = ``;

    document.getElementById("menu_characters").style.display = "none";
    document.getElementById("menu_characters_info").style.display = "";

    document.getElementById("menu_characters_info").innerHTML = `<button class="primary_button reset_menu_characters_button" onclick="resetMenuCharacters()">Go to characters</button>`;

    menu_characters_info = `
        <div id="menu_characters_image" class="menu_characters_image"></div>

        <div class="left_menu_info">

            <div class="menu_character_name_container">
                <div class="menu_character_name ` + (character_data.name.length < SHORT_NAME_LENGTH ? "menu_character_name_short" : (character_data.name.length < MEDIUM_NAME_LENGTH ? "menu_character_name_medium" : "menu_character_name_long")) + `">
                    ` + character_data.name + `
                </div>
                <div class="menu_character_title">
                    ` + character_data.title + `
                </div>
            </div>

            <img class="menu_character_icon menu_character_` + character_data.rarity + `_stars" src="images/characters/` + character_data.images.filename_icon + `.png" alt="Character icon for ` + character_data.name + `" onerror="useBackupResource(this, 'https://api.ambr.top/assets/UI/` + character_data.images.filename_icon + `.png', 'images/icons/user.png', '` + character_data.name + `')" style="background-image: url('images/regions/Emblem_` + character_data.region + `_` + (character_data.rarity == "5" ? `White` : `Night`) + `_Opacity_05.png');">

            <div class="menu_character_row_info menu_character_row_dark">
                Rarity:
                <div class="menu_value_container">
                    <img class="rarity" src="images/rarity/star.svg">
                    <img class="rarity" src="images/rarity/star.svg">
                    <img class="rarity" src="images/rarity/star.svg">
                    <img class="rarity" src="images/rarity/star.svg">
                    ` + (character_data.rarity == "5" ? `<img class="rarity" src="images/rarity/star.svg">` : ``) + `
                </div>
            </div>
            <div class="menu_character_row_info menu_character_row_light">
                Substat:
                <div class="menu_value_container">
                    ` + character_data.substatText + `
                </div>
            </div>
            <div class="menu_character_row_info menu_character_row_dark">
                Weapon:
                <div class="menu_value_container">
                ` + character_data.weaponText + `<img class="menu_row_img_small" src="images/weapon_types/Weapon-class-` + character_data.weaponText.toLowerCase() + `-icon.webp">
                </div>
            </div>
            <div class="menu_character_row_info menu_character_row_light">
                Element:
                <div class="menu_value_container">
                ` + character_data.elementText + (character_data.elementText != "None" ? `<img class="menu_row_img_small" src="images/elements/` + character_data.elementText.toLowerCase() + `.png">` : ``) + `
                </div>
            </div>
            <div class="menu_character_row_info menu_character_row_dark">
                Region:
                <div class="menu_value_container">
                ` + character_data.region + `
                </div>
            </div>
            <div class="menu_character_row_info menu_character_row_light">
                Affiliation:
                <div class="menu_value_container">
                ` + character_data.affiliation + `
                </div>
            </div>
            <div class="menu_character_row_info menu_character_row_dark">
                Constellation:
                <div class="menu_value_container">
                ` + character_data.constellation + `
                </div>
            </div>
            <div class="menu_character_row_info menu_character_row_light">
                Birthday:
                <div class="menu_value_container">
                ` + character_data.birthday + `
                </div>
            </div>
            <div class="menu_character_column_info menu_character_row_dark">
                Character voice:
                <div class="menu_cv_container">
                    English: ` + character_data.cv.english + `
                </div>
                <div class="menu_cv_container">
                    Chinese: ` + character_data.cv.chinese + `
                </div>
                <div class="menu_cv_container">
                    Japanese: ` + character_data.cv.japanese + `
                </div>
                <div class="menu_cv_container">
                    Korean: ` + character_data.cv.korean + `
                </div>
            </div>

        </div>

        <div class="right_menu_info">

            <div class="right_menu_buttons">
                <div class="active_menu_character_button" onclick="activateMenuContent(this, 'menu_content_ascension')">Ascension</div>
                <div class="disabled_menu_character_button" onclick="activateMenuContent(this, 'menu_content_talents')">Talents</div>
                <div class="disabled_menu_character_button" onclick="activateMenuContent(this, 'menu_content_constellations')">Constellations</div>
                <div class="disabled_menu_character_button" onclick="activateMenuContent(this, 'menu_content_weapon')">Weapon</div>
                <div class="disabled_menu_character_button" onclick="activateMenuContent(this, 'menu_content_teams')">Teams</div>
                <div class="disabled_menu_character_button" onclick="activateMenuContent(this, 'menu_content_builds')">Builds</div>
                <div class="disabled_menu_character_button" onclick="activateMenuContent(this, 'menu_content_charts')">Charts</div>
            </div>

            <div id="right_menu_content" class="right_menu_content">
                <div id="menu_content_ascension" class="menu_container">
                ` + getMenuContentAscension(character_name) + `
                </div>
                <div id="menu_content_talents" class="menu_container hide_menu_character_container">
                ` + (!["Aether", "Lumine"].includes(character_name) ? getMenuContentTalents(character_name) : getMenuContentTalentsTraveler()) + `
                </div>
                <div id="menu_content_constellations" class="menu_container hide_menu_character_container">
                ` + (!["Aether", "Lumine"].includes(character_name) ? getMenuContentConstellations(character_name) : getMenuContentConstellationsTraveler()) + `
                </div>
                <div id="menu_content_weapon" class="menu_container hide_menu_character_container">
                ` + getMenuContentWeapon(character_name) + `
                </div>
                <div id="menu_content_teams" class="menu_container hide_menu_character_container">
                ` + getMenuContentTeams(character_name) + `
                </div>
                <div id="menu_content_builds" class="menu_container hide_menu_character_container">
                ` + getMenuContentBuilds(character_name) + `
                </div>
                <div id="menu_content_charts" class="menu_container hide_menu_character_container">
                ` + getMenuContentCharts(character_name) + `
                </div>
            </div>
        </div>
    `;

    document.getElementById("menu_characters_info").innerHTML += menu_characters_info;

    let filename_gachaSplash = character_data.images.filename_gachaSplash ? character_data.images.filename_gachaSplash : `UI_Gacha_AvatarImg_` + character_data.name;
    document.getElementById("menu_characters_image").style.backgroundImage = "url('images/characters/" + filename_gachaSplash + ".png')";

    // Initialize tabs
    updateAscension(character_name);
    updateTalents();
    if (characters_signature_weapons[character_name]) {
        updateWeaponRefinement();
        updateWeaponMaterial();
    }

    // Print charts after HTML is loaded
    getChartTeams(character_name);
    getChartArchetypes(character_name);
    getChartElements(character_name);
    getChartViabilities(character_name);

    swapRankingByViabilityChart();
}