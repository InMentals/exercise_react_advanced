import type { FormEventHandler } from "react";

import "./filter-form.css";

interface FilterFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onReset: FormEventHandler<HTMLFormElement>;
}

const FilterForm = ({ onSubmit, onReset }: FilterFormProps) => {
  return (
    <div className="filter-form-container">
      <form onSubmit={onSubmit} onReset={onReset}>
        <fieldset>
          <legend>Filter</legend>
          <label>
            Advert name
            <input type="text" name="name" />
          </label>
          <div>
            <label>
              <input type="radio" name="sale" value="all" defaultChecked />
              All
            </label>
            <label>
              <input type="radio" name="sale" value="sell" />
              Sell
            </label>
            <label>
              <input type="radio" name="sale" value="buy" />
              Buy
            </label>
          </div>
          <div>
            <button type="submit">Apply filter</button>
            <button type="reset">Clear filter</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default FilterForm;
