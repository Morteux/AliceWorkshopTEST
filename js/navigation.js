var tabs_id = ["tab_archetype_search", "tab_teams_search", "tab_characters", "tab_user"];

document.addEventListener("DOMContentLoaded", (event) => {
    setButtonsEventListeners();

    // Hide all tabs. Activate default 
    setTabActive("tab_teams_search");   // Active by default
});

function setButtonsEventListeners() {
    // Set on click event listener for each tab button
    for (let index in tabs_id) {
        document.getElementById(tabs_id[index] + "_button").addEventListener('click', function (event) {
            setTabActive(tabs_id[index]);
        });
    }
}

function setTabActive(tab_id) {
    // Hide all tabs except tab_id
    for (let index in tabs_id) {
        if (tabs_id[index] != tab_id) {
            hideTab(tabs_id[index]);
        }
    }

    // Show this tab
    showTab(tab_id)
}

function showTab(tab_id) {
    document.getElementById(tab_id).style.display = "";

    if (!document.getElementById(tab_id + "_button").classList.contains('active_tab_button')) {
        document.getElementById(tab_id + "_button").classList.add('active_tab_button');
    }

    document.getElementById(tab_id + "_button").classList.remove('disabled_tab_button');
}

function hideTab(tab_id) {
    document.getElementById(tab_id).style.display = "none";

    document.getElementById(tab_id + "_button").classList.remove('active_tab_button');

    if (!document.getElementById(tab_id + "_button").classList.contains('disabled_tab_button')) {
        document.getElementById(tab_id + "_button").classList.add('disabled_tab_button');
    }
}