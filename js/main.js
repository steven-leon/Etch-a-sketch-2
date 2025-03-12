const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");
const content = document.getElementById("content");
const btnColorMode = document.getElementById("btnColorMode");
const btnRainbowMode = document.getElementById("btnRainbowMode");
const btnEraser = document.getElementById("btnEraser");
const btnClear = document.getElementById("btnClear");
const colorPicker = document.getElementById("colorPicker");
const rainbowColor = [
  "#9400D3",
  "#4B0082",
  "#0000FF",
  "#00FF00",
  "#FFFF00",
  "#FF7F00",
  "#FF0000",
];
let isPainting = false;
let isRainbowMode = false;
let selectedColor = "#000";

// Cuando se cargue el DOM, fijamos el valor por defecto:, esto lo hice para que el valor por defecto que es 14, sea predeterminado ni bien se actualice la pagina
document.addEventListener("DOMContentLoaded", () => {
  sizeValue.textContent = sizeSlider.value + " x " + sizeSlider.value;
  updateGrid(sizeSlider.value);
});

sizeSlider.addEventListener("input", function () {
  let sliderValue = this.value;
  sizeValue.textContent = sliderValue + " x " + sliderValue;
  updateGrid(sliderValue);
});

// Evento para cambiar el color cuando el usuario elija uno
colorPicker.addEventListener("input", (e) => {
  selectedColor = e.target.value; // Guardamos el color seleccionado
});

btnColorMode.addEventListener("click", function () {
  isRainbowMode = false;
  colorPicker.click();
});

function updateGrid(size) {
  content.innerHTML = ""; // Limpiar la cuadrícula existente
  content.style.display = "grid";
  content.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  content.style.gridTemplateRows = `repeat(${size}, 1fr)`;


  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    content.appendChild(cell);

    cell.addEventListener("mousedown", function () {
      isPainting = true;
      if (isRainbowMode) {
        cell.style.backgroundColor = rainbowColor[Math.floor(Math.random() * rainbowColor.length)];;
        i++;
      } else {
        cell.style.backgroundColor = selectedColor;
      }
    });

    cell.addEventListener("mousemove", function () {
      if (isPainting) {
        if (isRainbowMode) {
          cell.style.backgroundColor = rainbowColor[Math.floor(Math.random() * rainbowColor.length)];;
          i++;
        } else {
          cell.style.backgroundColor = selectedColor;
        }
      }
    });

    cell.addEventListener("mouseup", function () {
      isPainting = false;
    });

    btnClear.addEventListener("click", function(){
      cell.style.backgroundColor = "#ffffff";
  });

  }
}



btnRainbowMode.addEventListener("click", function () {
  isRainbowMode = !isRainbowMode;
});

btnEraser.addEventListener("click", function(){
  isRainbowMode = false;
  selectedColor =  "#ffffff";
})
