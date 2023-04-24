console.log('bolu');
const colorPicker = document.querySelector('#color');
const modeEl = document.querySelector('.mode');
const btnColor = document.querySelector('.getScheme');
const colorContainer = document.querySelector('section');

// console.log(hex, modeType);

const url =
  'https://www.thecolorapi.com/scheme?hex=0047AB&format=json&mode=analogic&count=6';

const getColorScheme = async () => {
  const hex = colorPicker.value.slice(1);
  const modeType = modeEl.value;
  const res = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${modeType}&count=5`
  );
  const data = await res.json();
  //   console.log(data);
  return data;
};

// getColorScheme();

// const renderColors = function (data) {
//   const html = data.map((color) => {
//     const element = document.createElement('figure');
//     element.innerHTML = `
//           <div class="color-box color-0" style="background-color : ${color.hex.value}"></div>
//           <div class="color-code"><p>${color.hex.value}</p></div>`;
//     // element.style.backgroundColor = color.hex.value;
//     console.log(element);
//     colorContainer.insertAdjacentHTML('beforeend', element);
//   });
// };

const renderColors = function (datas) {
  const html = datas
    .map((data) => {
      return `
            <figure>
          <div class="color-box color-0" style="background-color : ${data.hex.value}" data-color="${data.hex.value}"></div>
          <div class="color-code"><p>${data.hex.value}</p></div>
        </figure>
    `;
    })
    .join('');
  colorContainer.innerHTML = html;
};

btnColor.addEventListener('click', async () => {
  const data = await getColorScheme();
  //   console.log(data.colors);
  renderColors(data.colors);
});

colorContainer.addEventListener('click', (e) => {
  const element = e.target.closest('.color-box');
  navigator.clipboard.writeText(element.dataset.color);
  console.log(element);
  alert(`copied ${element.dataset.color} to clipboard`);
});
