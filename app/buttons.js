import KEYS from './key_constants.js';

class Buttons {
  constructor(grid) {
    this.element = document.createElement('div');
    this.element.id = 'buttons';
    this.grid = grid;
    this.makeButtons();
    const container = document.getElementById('grid-and-buttons');
    container.appendChild(this.element);
  }

  makeButtons () {
    Object.keys(KEYS).forEach((key) =>{
      const keyButton = document.createElement('button');
      keyButton.innerHTML = key;
      keyButton.className = 'button';
      keyButton.addEventListener('click', (e) => {
        this.grid.changeKey(key);
        this.select(e.currentTarget);
      });
      this.element.appendChild(keyButton);
    });
    Array.from(this.element.children)[0].classList.add('selected');
  }

  select (target) {
    const selected = this.element.getElementsByClassName('selected')[0];
    selected.classList.toggle('selected');
    target.classList.toggle('selected');
  }
}

export default Buttons;
