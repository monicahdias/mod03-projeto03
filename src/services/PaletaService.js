import { Api } from "helpers/Api";

const parseResponse = (response) => response.json();

const transformPaleta = (paleta) => {
  const [flavor, filling] = paleta.flavor.split(" com ");
  return {
    ...paleta,
    id: paleta._id,
    title: paleta.flavor,
    flavor,
    ...(filling && { filling }),
    possuiRecheio: Boolean(filling),
  };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((paletas) => paletas.map(transformPaleta));

const parseTransformItem = (response) =>
  parseResponse(response).then(transformPaleta);

export const PaletaService = {
  getLista: () =>
    fetch(Api.paletaLista(), { method: "GET" }).then(parseTransformLista),
  getById: (id) =>
    fetch(Api.paletaById(id), { method: "GET" }).then(parseTransformItem),
  create: (paleta) =>
    fetch(Api.createPaleta(), {
      method: "POST",
      body: JSON.stringify(paleta),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseTransformItem),
  updateById: (id, paleta) =>
    fetch(Api.updatePaletaById(id), {
      method: "PUT",
      body: JSON.stringify(paleta),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deletePaletaById(id), { method: "DELETE" }).then(parseResponse),
};
