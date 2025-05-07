let color = "black";
let gridSize = 20;
// 0 = selected color, 1 = random, 2 = darken
let fillType = 0;

function fillGrids(container , n) {
    const gridWidth = container.getBoundingClientRect().width / n;
    container.innerHTML = "";

    for (let i = 0; i < n; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        for (let j = 0; j < n; j++) {
            const grid = document.createElement("div");
            grid.classList.add("grid");
            grid.style.width = `${gridWidth}px`;
            grid.style.height = `${gridWidth}px`;
            gridRow.appendChild(grid);
        }
        container.appendChild(gridRow);
    }

}

function fillColor(element, color) {
    element.style.backgroundColor = color;
}

function randomInt(number) {
    return Math.floor(Math.random() * number);
}

function randomColor() {
    return `rgb(${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)})`;
}

function darken(element) {
    if (element.style.backgroundColor !== "black") {
        element.style.backgroundColor = "black";
        element.style.opacity = "0.1";
    } else {
        element.style.opacity = `${parseFloat(element.style.opacity) + 0.1}`;
    }
}

function handleFill(event) {
    if (event.target.getAttribute("class") === "grid") {
        if (event.buttons === 1) {
            if (fillType === 0) {
                fillColor(event.target, color);
            } else if (fillType === 1) {
                fillColor(event.target, randomColor());
            } else if (fillType === 2) {
                darken(event.target);
            }
        }
    }
}

function handleManualInput(event) {
    fillType = 0;
    color = event.target.value;
}

function handleButtons(event) {
    console.log(event.target.nodeName);
    if (event.target.nodeName === "BUTTON") {
        switch (event.target.id) {
            case "grid-size":
                let size = parseInt(prompt("What grid size do you want? (Max:100):"));
                if (size >= 100) {
                    size = 100;
                };
                gridSize = size;
                fillGrids(container, gridSize);
                break;
            
            case "clear":
                fillGrids(container, gridSize);
                break;
            
            case "random":
                fillType = 1;
                break;
            
            case "darken":
                fillType = 2;
                break;
            default:
                console.log("Something is broken!");
                break;
        }
    }

    // adding a selected class to the color inputs for highlight
    if (Array.from(event.target.classList).includes("color-choice")) {
        const selected = document.querySelector(".selected");
        if (selected) {
            selected.classList.remove("selected");
        }
        event.target.classList.add("selected");
    }
}

const container = document.querySelector(".container");
const colorInput = document.querySelector("#color-input");
const gridBtns = document.querySelector(".grid-btns");

container.addEventListener("mouseover", handleFill);
colorInput.addEventListener("input", handleManualInput);
gridBtns.addEventListener("click", handleButtons);
fillGrids(container, gridSize);