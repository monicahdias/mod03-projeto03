import "./PaletaDetalhesModal.css";
import Modal from "components/Modal/Modal";

function PaletaDetalhesModal({ paleta, closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <div className="PaletaDetalhesModal">
        <div>
          <div className="PaletaDetalhesModal__titulo">{paleta.title}</div>
          <div className="PaletaDetalhesModal__preco">
            R$ {Number(paleta.price).toFixed(2)}
          </div>
          <div className="PaletaDetalhesModal__descricao">
            <b>Sabor: </b>
            {paleta.flavor}
          </div>
          {paleta.filling && (
            <div className="PaletaDetalhesModal__descricao"></div>
          )}
          <div className="PaletaDetalhesModal__descricao">
            <b>Descrição: </b>
            {paleta.description}
          </div>
        </div>
        <img
          src={paleta.photo}
          alt={`Paleta de ${paleta.flavor}`}
          className="PaletaDetalhesModal__foto"
        />
      </div>
    </Modal>
  );
}

export default PaletaDetalhesModal;
