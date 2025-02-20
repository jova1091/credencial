const credencial =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIk9-wyk1WyU_4lTWjLucuXSHAYXGsgu0gAhynPQXccaPfe6ANyGtcxPf1jcLDX0dA2Eb9OiE8N5T5/pub?gid=0&single=true&output=csv";

const cursos =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIk9-wyk1WyU_4lTWjLucuXSHAYXGsgu0gAhynPQXccaPfe6ANyGtcxPf1jcLDX0dA2Eb9OiE8N5T5/pub?gid=1938613270&single=true&output=csv";

window.addEventListener("DOMContentLoaded", init);

const credencialTituloElem = document.querySelector("#credencialTitulo");
const credencialCreditosElem = document.querySelector("#credencialCreditos");
const credencialLogroElem = document.querySelector("#credencialLogro");
const credencialJustificacionElem = document.querySelector("#credencialJustificacion");
const credencialCriteriosElem = document.querySelector("#credencialCriterios");
const labelsElem = document.querySelector("#labels");

let infoCredencial;
let infoCursos;

function init() {
  Papa.parse(credencial, {
    download: true,
    header: true,
    complete: getInfoCredencial,
  });
}

function getInfoCredencial(dataCredencial) {
  Papa.parse(cursos, {
    download: true,
    header: true,
    complete: getInfoCursos,
  });

  infoCredencial = dataCredencial.data;
}

function getInfoCursos(dataCursos) {
  infoCursos = dataCursos.data;
  printInfo(infoCredencial, infoCursos);
}

function printInfo(credencial, cursos) {
  let radios = "";
  let labels = "";

  if (credencial != null || cursos != null) {
    credencialTituloElem.innerHTML = credencial[0].Nombre;
    credencialCreditosElem.innerHTML = credencial[0].Creditos;
    credencialLogroElem.innerHTML = credencial[0].Logro;
    credencialJustificacionElem.innerHTML = createLi(credencial[0].Justificacion);
    credencialCriterios.innerHTML = credencial[0].Criterios;

    for (let index = 0; index < credencial[0].Cursos; index++) {
      const element = cursos[index];
      radios += createRadio(index);
      labels += createLabel(index, cursos[index]);
      console.log("Curso: " + element.Nombre);
    }
    insertBefore(labelsElem, radios);
    labelsElem.innerHTML = labels;
    checkradio();
  }
}

function createLabel(Id, curso) {
  let labelId = Id + 1;
  let labelElement = `
    <label for="tab${labelId}" class="border">
                <h5 class="number obl m-0">${labelId}</h5>
                <p>${curso.Nombre}</p>
                <div class="actions">
                  <span class="ca">
                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                      fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" data-testid="KeyboardArrowDownIcon">
                      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
                    </svg>
                  </span>
                  <span>+</span>
                </div>
              </label>
  `;

  return labelElement;
}

function checkradio() {
  const radioButtons = document.getElementsByName("tabs");
  radioButtons[0].defaultChecked = true;
}

function insertBefore(el, htmlString) {
  el.insertAdjacentHTML("beforebegin", htmlString);
}

function createRadio(Id) {
  let radioId = Id + 1;
  let radioElement = `<input type="radio" id="tab${radioId}" name="tabs">`;

  return radioElement;
}

function createLi(data) {
  let datasplit = data.split("|");
  let liElements = "";
  datasplit.forEach((string) => {
    liElements += `<li>${string}</li>`;
  });
  return liElements;
}
