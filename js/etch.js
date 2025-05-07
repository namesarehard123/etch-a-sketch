function fillGrids(container , n) {
    const gridWidth = container.getBoundingClientRect().width / n;
    container.innerHtml = "";

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

const container = document.querySelector(".container");
fillGrids(container, 20);