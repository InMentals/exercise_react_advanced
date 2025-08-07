import type { Advert } from "./types";
import "./advert-item.css";

interface AdvertItemProps {
  advert: Advert;
  detail: boolean;
}
const AdvertItem = ({ advert, detail }: AdvertItemProps) => {
  const { name, sale, price, tags, photo, createdAt } = advert;
  let hover = "";
  if (!detail) hover = "hover";
  const advertClass = `advert ${hover}`;
  return (
    <article className={advertClass}>
      <h2>{name}</h2>
      <strong className={sale ? "sell" : "buy"}>{sale ? "Sell" : "Buy"}</strong>
      <data value={price}>
        {new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR",
        }).format(price)}
      </data>
      {detail && (
        <div className="photo-container">
          <img src={photo} alt={name} className="photo" />
        </div>
      )}
      <ul aria-label="Tags" className="tags-container">
        {tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
      {detail && (
        <p className="created-at">Created at: {createdAt.substring(0, 10)}</p>
      )}
    </article>
  );
};

export default AdvertItem;
