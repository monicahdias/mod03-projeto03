import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { PaletaService } from "services/PaletaService";

import "./AdicionaPaletaModal.css";

function AdicionaPaletaModal({ closeModal, onCreatePaleta }) {
  const form = {
    price: "",
    flavor: "",
    filling: "",
    description: "",
    photo: "",
  };

  const [state, setState] = useState(form);
  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const response = !Boolean(
      state.description.length &&
        state.photo.length &&
        state.flavor.length &&
        state.price.length
    );

    setCanDisable(response);
  };

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const createPaleta = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split("\\").pop();

    const { flavor, filling, description, price, photo } = state;

    const title = flavor + (filling && " com " + filling);

    const paleta = {
      flavor: title,
      description,
      price,
      photo: `assets/images/${renomeiaCaminhoFoto(photo)}`,
    };

    const response = await PaletaService.create(paleta);
    onCreatePaleta(response);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaPaletaModal">
        <form autoComplete="off">
          <h2> Adicionar ao Cardápio </h2>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="price">
              Preco:
            </label>
            <input
              id="price"
              placeholder="10,00"
              type="text"
              value={state.price}
              onChange={(e) => handleChange(e, "price")}
              required
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="flavor">
              Sabor:
            </label>
            <input
              id="flavor"
              placeholder="Chocolate"
              type="text"
              value={state.flavor}
              onChange={(e) => handleChange(e, "flavor")}
              required
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="filling">
              Recheio:
            </label>
            <input
              id="filling"
              placeholder="Banana"
              type="text"
              value={state.filling}
              onChange={(e) => handleChange(e, "filling")}
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="description">
              Descricao:
            </label>
            <input
              id="description"
              placeholder="Detalhe o produto"
              type="text"
              value={state.description}
              onChange={(e) => handleChange(e, "description")}
              required
            />
          </div>
          <div>
            <label
              className="AdicionaPaletaModal__text  AdicionaPaletaModal__foto-label"
              htmlFor="photo"
            >
              {!state.photo.length ? "Selecionar Imagem" : state.photo}
            </label>
            <input
              className=" AdicionaPaletaModal__foto"
              id="photo"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              value={state.photo}
              onChange={(e) => handleChange(e, "photo")}
              required
            />
          </div>

          <button
            className="AdicionaPaletaModal__enviar"
            type="button"
            disabled={canDisable}
            onClick={createPaleta}
          >
            Enviar
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaPaletaModal;
