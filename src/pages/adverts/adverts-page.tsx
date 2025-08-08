import { useEffect, useState } from "react";
import type { Advert } from "./types";
import AdvertItem from "./advert-item";
import { Link } from "react-router";
import FilterForm from "./filter-form";
import Page from "../../components/layout/page";
import "./adverts-page.css";
import LinkButton from "../../components/ui/link-button";
import { getAdverts } from "../../store/selectors";
import { advertsLoaded } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store";

function AdvertsPage() {
  const dispatch = useAppDispatch();
  const adverts = useAppSelector(getAdverts);
  const [filter, setFilter] = useState({
    name: "",
    sale: "all",
  });

  useEffect(() => {
    dispatch(advertsLoaded());
  }, [dispatch]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string).trim().toLowerCase();
    const sale = data.get("sale") as string;
    setFilter({ name, sale });
  }

  function handleReset() {
    setFilter({ name: "", sale: "all" });
  }

  function filterAdverts(adverts: Advert[]) {
    let filteredAdverts: Advert[];
    if (filter.name != "") {
      filteredAdverts = adverts.filter((ad) =>
        ad.name.toLowerCase().includes(filter.name),
      );
      if (filter.sale === "sell")
        filteredAdverts = filteredAdverts.filter((ad) => ad.sale);
      if (filter.sale === "buy")
        filteredAdverts = filteredAdverts.filter((ad) => !ad.sale);
      return filteredAdverts;
    } else {
      switch (filter.sale) {
        case "sell":
          filteredAdverts = adverts.filter((ad) => ad.sale);
          break;
        case "buy":
          filteredAdverts = adverts.filter((ad) => !ad.sale);
          break;
        default:
          return adverts;
      }
      return filteredAdverts;
    }
  }

  return (
    <Page page="adverts">
      <div>
        <FilterForm onSubmit={handleSubmit} onReset={handleReset} />
        {adverts.length ? (
          <ul className="adverts-container">
            {filterAdverts(adverts).map((advert: Advert) => (
              <li key={advert.id}>
                <Link to={`/adverts/${advert.id}`} className="advert-container">
                  <AdvertItem advert={advert} detail={false} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-adverts-container">
            <h2>There are no adverts published</h2>
            <div className="no-adverts-button-container">
              <LinkButton $variant="primary" to="/adverts/new">
                Publish new advert
              </LinkButton>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

export default AdvertsPage;
