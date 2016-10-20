const Cell = require('./cell.js');

const NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5",
               "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6"].reverse();



class Grid {
  constructor(container, synth) {
    this.element = document.createElement("DIV");
    this.element.id = "grid";
    container.appendChild(this.element);
    this.cells = new Array(16);
    this.synth = synth;
    this.createGrid();
    this.mousedown = false;
  }

  createGrid () {
    for (var i = 0; i < 16; i++) {
      this.cells[i] = [];
      for (var j = 0; j < 16; j++) {
        const cellDiv = document.createElement("DIV");
        const cell = new Cell(NOTES[i], this.synth, cellDiv);
        cellDiv.cell = cell;
        this.cells[i][j] = cell;
        this.addListener(cellDiv);
        cellDiv.className = "cell";
        this.element.appendChild(cellDiv);
      }
    }
  }

  addListener (cellDiv) {
    cellDiv.addEventListener('mouseenter', (e) => {
      if (this.mousedown) {
        e.currentTarget.cell.toggleActive();
      }
    });
    cellDiv.addEventListener('click', (e) => {
      e.currentTarget.cell.toggleActive();
    });
  }
}

module.exports = Grid;
