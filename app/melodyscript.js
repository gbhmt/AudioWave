import Grid from './grid.js';
import Tone from 'Tone';
import Buttons from './buttons.js';

document.addEventListener("DOMContentLoaded", () => {
  const freeverb = new Tone.Freeverb(0.9).toMaster();
  const synth = new Tone.PolySynth(6).connect(freeverb);
  synth.volume.value = -10;

  const gridAndButtons = document.getElementById('grid-and-buttons');
  const aside = document.querySelector('aside');

  const grid = new Grid(gridAndButtons, synth);
  const slider = document.getElementById("slider");
  const buttons = new Buttons(grid);
  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', () => {
    grid.clear();
  });

  slider.addEventListener('change', () => {
    Tone.Transport.bpm.value = slider.value;
  });

  document.body.addEventListener('mousedown', (e) => {
    grid.mousedown = true;
  });
  document.body.addEventListener('mouseup', (e) => {
    grid.mousedown = false;
  });

  const columns = grid.cells[0].map((col, idx) => {
    return grid.cells.map((row) => {
      return row[idx];
    });
  });

  const loop = new Tone.Sequence((time, col) => {
    const column = columns[col];
    for (var i = 0; i < 16; i++) {
      if (column[i].active) {
        column[i].play();
      }
    }
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n");

  Tone.Transport.start();
  Tone.Transport.bpm.value = 130;
  loop.start();
});
