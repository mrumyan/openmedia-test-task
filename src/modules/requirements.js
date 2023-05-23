const serverTypesElement = document.querySelector(".requirements__server-types");
const requirementElements = document.querySelectorAll(".requirements__item");

const requirements = {
    own: {
        "OS + apps": "Unix/OSX + docker + nvidia-docker",
        "Free space": "100 GB of free space",
        "CPU": "4 cores or more (e.g. intel core i5)",
        "Graphics hardware": "GPU: NVidia only 2Gb+",
        "Memory": "16 GB RAM"
    },
    amazon: {
        "Instance": "g4dn.xlarge",
        "Memory": "16 GB RAM",
        "GPU": 1,
        "Storage": "125 GB",
        "vCPUs": 4
    }
};

const removeSelections = () => {
    for (let type of serverTypesElement.children) {
        type.classList.remove("requirements__server-type_active");
    }
};

const replaceRequirements = (serverType) => {
    for (let i = 0; i < requirementElements.length; i++) {
        const requirementItems = Object.entries(requirements[serverType]);
        requirementElements[i].children[0].textContent = requirementItems[i][0];
        requirementElements[i].children[1].textContent = requirementItems[i][1];
    }
}

const addEventListener = () => {
    serverTypesElement.addEventListener("click", (event) => {
        if (event.target.classList.contains("requirements__server-type")) {
            removeSelections();
            event.target.classList.add("requirements__server-type_active");
            replaceRequirements(event.target.dataset.server);
        }
    });
};

export const addRequirements = () => {
    addEventListener();
}