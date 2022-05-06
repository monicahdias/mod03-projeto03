import { ActionMode } from "components/constants/index.js";
import "./PaletaListaItem.css";

function PaletaListaItem({
  paleta,
  quantidadeSelecionada,
  index,
  onRemove,
  onAdd,
  clickItem,
  mode,
}) {
  const removeButton = (canRender, index) =>
    Boolean(canRender) && (
      <button
        disabled={mode !== ActionMode.NORMAL}
        className="Acoes__remover"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        remover
      </button>
    );

  const badgeCounter = (canRender) =>
    Boolean(canRender) && (
      <span className="PaletaListaItem__badge">{quantidadeSelecionada}</span>
    );

  const badgeAction = (canRender) => {
    if (canRender)
      return (
        <span
          className={`PaletaListaItem__tag ${
            mode === ActionMode.DELETAR && "PaletaListaItem__tag--deletar"
          }`}
        >
          {mode}
        </span>
      );
  };

  return (
    <div
      className={`PaletaListaItem
        ${mode !== ActionMode.NORMAL && "PaletaListaItem--disable"}
        ${mode === ActionMode.DELETAR && "PaletaListaItem--deletar"}
    `}
      onClick={() => clickItem(paleta.id)}
    >
      {badgeCounter(quantidadeSelecionada, index)}
      {badgeAction(mode !== ActionMode.NORMAL)}
      <div>
        <div className="PaletaListaItem__titulo">{paleta.title}</div>
        <div className="PaletaListaItem__preco">
          R$ {paleta.price.toFixed(2)}
        </div>
        <div className="PaletaListaItem__descricao">{paleta.description}</div>
        <div className="PaletaListaItem__acoes Acoes">
          <button
            disabled={mode !== ActionMode.NORMAL}
            className={`Acoes__adicionar ${
              !quantidadeSelecionada && "Acoes__adicionar--preencher"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(index);
            }}
          >
            adicionar
          </button>
          {removeButton(quantidadeSelecionada, index)}
        </div>
      </div>
      <img
        className="PaletaListaItem__foto"
        src={paleta.photo}
        alt={`Paleta de ${paleta.flavor}`}
      />
    </div>
  );
}

export default PaletaListaItem;
