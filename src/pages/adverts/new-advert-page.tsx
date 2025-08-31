import { useState, type ChangeEvent, type FormEvent } from "react";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";
import type { PreAdvert } from "./types";
import RadioSelection from "../../components/ui/radio-selection";
import CheckBoxSelection from "../../components/ui/checkbox-selection";
import "./new-advert-page.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { advertsCreate } from "../../store/actions";
import { getTags } from "../../store/selectors";

function NewAdvertPage() {
  const [advertInfo, setAdvertInfo] = useState({
    name: "",
    price: "",
    sale: "sell",
    photo: [],
  });
  const [tags, setTags] = useState<string[]>([]);
  const availableTags = useAppSelector(getTags);
  const [submitted, setSubmitted] = useState(false);

  const { name, price } = advertInfo;
  const isDisabled = !name || !price || tags.length === 0 || submitted;

  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.type === "file") {
      setAdvertInfo((prevAdvertInfo) => ({
        ...prevAdvertInfo,
        [event.target.name]: event.target.files,
      }));
    } else {
      setAdvertInfo((prevAdvertInfo) => ({
        ...prevAdvertInfo,
        [event.target.name]: event.target.value,
      }));
    }
  }

  function handleTagsChange(event: ChangeEvent<HTMLInputElement>) {
    if (tags.includes(event.target.value)) {
      const removeTag = tags.filter((tag) => tag != event.target.value);
      setTags(removeTag);
    } else {
      setTags([...tags, event.target.value]);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const preAdvert: PreAdvert = {
      name: advertInfo.name,
      sale: (advertInfo.sale === "sell").toString(),
      price: advertInfo.price,
      tags: tags.toString(),
      photo: advertInfo.photo[0],
    };

    await dispatch(advertsCreate(preAdvert));
  }

  return (
    <Page page="new">
      <div className="new-advert-form-container">
        <form onSubmit={handleSubmit} className="new-advert-form">
          <small>Fields marked with (*) are mandatory</small>
          <FormField
            type="text"
            name="name"
            label="Title*"
            value={name}
            onChange={handleChange}
            required
          />
          <FormField
            type="number"
            name="price"
            label="Price*"
            value={price}
            onChange={handleChange}
            required
          />
          <RadioSelection
            options={["sell", "buy"]}
            name={"sale"}
            selectedValue={advertInfo.sale}
            onChange={handleChange}
          />
          <label>
            Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="photo"
            />
          </label>
          <CheckBoxSelection
            options={availableTags}
            name="tags"
            selectedValue={tags}
            onChange={handleTagsChange}
          />
          <div className="submit-container">
            <Button
              id="submitButton"
              type="submit"
              $variant="primary"
              disabled={isDisabled}
            >
              Publish advert
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}

export default NewAdvertPage;
