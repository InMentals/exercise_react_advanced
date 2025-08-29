import { useState, type FormEvent } from "react";
import Page from "../../components/layout/page";
import { useParams, useNavigate } from "react-router";
import { deleteAdvert } from "./service";
import Button from "../../components/ui/button";
import Dialog from "../../components/ui/dialog";
import AdvertItem from "./advert-item";
import "./advert-page.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdvert } from "../../store/selectors";
import { advertsDeleteFulfilled, advertsDetail } from "../../store/actions";
import { useEffect } from "react";

function AdvertPage() {
  const params = useParams();
  const [displayDialog, setDisplayDialog] = useState<string>("none");
  const navigate = useNavigate();
  const advert = useAppSelector(getAdvert(params.advertId));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    dispatch(advertsDetail(params.advertId));
  }, [params.advertId, dispatch]);

  function showDialog() {
    setDisplayDialog("flex");
  }
  function handleCancel() {
    setDisplayDialog("none");
  }

  async function handleDelete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await deleteAdvert(params.advertId!);
    dispatch(advertsDeleteFulfilled());
    navigate("/", { replace: true });
    //TODO: manage delete error
  }

  return (
    <Page page="advert">
      <div className="item-detail-container">
        {advert && <AdvertItem advert={advert} detail={true} />}
      </div>
      <div className="delete-button-container">
        <Button $variant="primary" onClick={showDialog}>
          Delete advert
        </Button>
      </div>
      <Dialog
        display={displayDialog}
        text="Are you sure?"
        onSubmit={handleDelete}
        onCancel={handleCancel}
      />
    </Page>
  );
}

export default AdvertPage;
