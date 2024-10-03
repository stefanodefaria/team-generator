document.addEventListener('DOMContentLoaded', function () {
    const teamCount = 3;
    const names = [
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

    const rules = [
        'Marcus, Smangol, Lúdico',
        'Paulo, Rodolfo, Felipe',
        'Anderson, Paulinho, Léo'
    ]

    const teamCountSelect = document.getElementById('team-count-select');
    for (let i = 0; i < teamCountSelect.options.length; i++) {
        console.log(teamCountSelect.options[i].value);
        if (teamCountSelect.options[i].value === teamCount.toString()) {
            teamCountSelect.selectedIndex = i;
            break;
        }
    }

    const insertNamesTextArea = document.getElementById('names-input');
    insertNamesTextArea.value = names.join('\n');

    const insertRulesTextArea = document.getElementById('rules-input');
    insertRulesTextArea.value = rules.join('\n');
});
