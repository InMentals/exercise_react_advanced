import { getLatestAdverts } from "./service";
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
  const [filteredAdverts, setFilteredAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    async function getAdverts() {
      const adverts = await getLatestAdverts();
      dispatch(advertsLoaded(adverts));
      setFilteredAdverts(adverts);
    }
    getAdverts();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string).trim().toLowerCase();
    const sale = data.get("sale") as string;

    let applyFilter = adverts.filter((ad) =>
      ad.name.toLowerCase().includes(name),
    );
    if (sale === "sell") applyFilter = applyFilter.filter((ad) => ad.sale);
    if (sale === "buy") applyFilter = applyFilter.filter((ad) => !ad.sale);

    setFilteredAdverts(applyFilter);
  }

  function handleReset() {
    setFilteredAdverts(adverts);
  }

  return (
    <Page page="adverts">
      <div>
        <FilterForm onSubmit={handleSubmit} onReset={handleReset} />
        {adverts.length ? (
          <ul className="adverts-container">
            {filteredAdverts.map((advert) => (
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
