document.addEventListener('DOMContentLoaded', function () {
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
        'Ferrari',
        'Matheus',
        'Anderson',
        'Paulinho'
    ];

    const rules = [
        'Marcus, Smangol, Lúdico',
        'Paulo, Rodolfo, Felipe',
        'Anderson, Paulinho, Léo'
    ]
    
    const insertNamesTextArea = document.getElementById('namesInput');
    insertNamesTextArea.value = names.join('\n');

    const insertRulesTextArea = document.getElementById('rulesInput');
    insertRulesTextArea.value = rules.join('\n');
});
