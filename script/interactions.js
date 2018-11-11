var interactions = {
    "openingScreen1": {
        text: "Opening screen output text",
        options: [
            {
                text: "Option 1",
                action: "openInteraction",
                parameters: ["openingScreen2"]
            }
        ]
    },
    "openingScreen2": {
        text: "Opening screen output text 2",
        options: [
            {
                text: "Option 1",
                action: null,
                blue: false,
                parameters: ["fight"]
            }
        ]
    }
};

function interactionHandler(e) {
    var target = e.target,
        action = target.getAttribute("action");
    if (!action) return;
    var parameters = target.getAttribute("parameters").split(",");
    if (action.includes(".")) {
        action = action.split(".");
        window[action[0]][action[1]](parameters);
    } else {
        window[action](parameters);
    }
}

function openInteraction(interactionId) {
    var interaction = interactions[interactionId];
    if (!interactionId) return;
    id("interactionOutput").innerHTML = interaction.text;
    for (var i = 1; i < 6; i++) {
        if (interaction.options[i-1]) assignAttributes(i, interaction)
    }
}

function assignAttributes(optionNumber, interaction) {
    var optionDiv = id("interactionOption" + optionNumber),
        option = interaction.options[optionNumber - 1];
    optionDiv.innerHTML = option.text;
    optionDiv.setAttribute("action", option.action);
    optionDiv.setAttribute("blue", option.blue);
    optionDiv.setAttribute("parameters", option.parameters);
}