import { Api } from "Helpers/Api";

const parseResponse = (response) => response.json();

export const PaletaService = {
  getLista: () =>
    fetch(Api.paletaLista(), { method: "GET" }).then(parseResponse),
  getById: (id) =>
    fetch(Api.paletaById(id), { method: "GET" }).then(parseResponse),
  create: () =>
    fetch(Api.createPaleta(), { method: "POST" }).then(parseResponse),
  updtateById: (id) =>
    fetch(Api.updatePaletaById(id), { method: "PUT" }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deletePaletaById(id), { method: "DELETE" }).then(parseResponse),
};
