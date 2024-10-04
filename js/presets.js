const teamCount = 3;
const players = [
    'Smangol',
    'Stéfano',
    'Lucas',
    'Horse',
    'Rodolfo',
    'Paulo',
    'Felipe',
    'Bazza',
    'Marcos',
    'Léo',
    'Marcus',
    'Rafael',
    'Matheus',
    'Anderson',
    'Paulinho'
];

const rulesByTeamCount = {
    "2": [
        'Marcus, Lúdico',
        'Paulo, Felipe',
        'Anderson, Paulinho'
    ],
    "3": [
        'Marcus, Smangol, Lúdico',
        'Paulo, Rodolfo, Felipe',
        'Anderson, Paulinho, Léo'
    ]
};

function updateRules () {
    document.getElementById('rules-input').value = rulesByTeamCount[this.value].join('\n');
}

document.addEventListener('DOMContentLoaded', function () {
    const teamCountSelect = document.getElementById('team-count-select');
    for (let i = 0; i < teamCountSelect.options.length; i++) {
        if (teamCountSelect.options[i].value === teamCount.toString()) {
            teamCountSelect.selectedIndex = i;
            break;
        }
    }

    const insertNamesTextArea = document.getElementById('names-input');
    insertNamesTextArea.value = players.join('\n');
    updateRules.apply(teamCountSelect);
});

document.getElementById('team-count-select').addEventListener('change', updateRules);