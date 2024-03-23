var sort_value = "";

var isAscending = false; // Default order direction

document.addEventListener("DOMContentLoaded", (event) => {
    // Default sort mode
    sortTeamsMatchedBy('team_id');
});

function setOrderDirection(order_direction) {
    isAscending = order_direction;

    sortTeamsMatchedBy(sort_value);
}

function sortTeamsMatchedBy(value) {
    // console.log("Sort by " + value);
    document.getElementById("result_container").style.display = "none";

    sort_value = value;

    resetResult();

    printTeams();

    document.getElementById("result_container").style.display = "";
}

function orderKeys(keys) {
    if (sort_value == "team_id") {
        if (isAscending) {
            keys.sort(function (x, y) {
                return parseInt((x.includes("-") ? x.substring(0, x.indexOf("-")) : x)) - parseInt((y.includes("-") ? y.substring(0, y.indexOf("-")) : y));
            });
        }
        else {
            keys.sort(function (x, y) {
                return parseInt((y.includes("-") ? y.substring(0, y.indexOf("-")) : y)) - parseInt((x.includes("-") ? x.substring(0, x.indexOf("-")) : x));
            });
        }
    } else if (sort_value == "viability") {
        keys.sort(function (x, y) {
            return VIABILITIES.indexOf(teams_search_matches[x].viability) - VIABILITIES.indexOf(teams_search_matches[y].viability);
        });
    } else if (sort_value == "archetype") {
        keys.sort(function (x, y) {
            return ARCHETYPES_NAMES.indexOf(teams_search_matches[x].archetype[0]) - ARCHETYPES_NAMES.indexOf(teams_search_matches[y].archetype[0]);
        });
    }

    return keys;
}