const urlParams = new URLSearchParams(window.location.search);

const paramTeam = urlParams.get('team');
const paramArchetype = urlParams.get('archetype');
const paramCharacter = urlParams.get('character');

document.addEventListener("DOMContentLoaded", (event) => {
    const onlyOneNotNull = (paramTeam !== null) + (paramArchetype !== null) + (paramCharacter !== null) === 1;

    if (onlyOneNotNull) {
        if (paramTeam) {
            linkTeam();
        }
        else if (paramArchetype) {
            linkArchetype();
        }
        else if (paramCharacter) {
            linkCharacter();
        }
    } else {
        // console.log('No params or more than one search in link params');
    }
});

function linkTeam() {
    setTabActive("tab_teams_search");

    document.getElementById("search_form_text_input_id").value = paramTeam;
    document.getElementById("search_form_text_input_id_button").click();
}

function linkArchetype() {
    setTabActive("tab_archetype_search");

    document.getElementById("show_all_archetypes_button").click();
    document.getElementById("filter_tab_archetype_" + paramArchetype.toLowerCase()).click();
}

function linkCharacter() {
    setTabActive("tab_characters");

    document.getElementById("character_check_" + paramCharacter).click();
}