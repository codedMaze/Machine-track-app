import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

const AddMachine = ({ machine }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const { name, options, title, id } = machine;

  useEffect(() => {
    options.forEach((element) => {
      element.inputValue = "";
    });
  }, [options]);

  useEffect(() => {
    const refresh = fieldOption.map((element) => ({
      ...element,
      inputValue: "",
    }));
    // console.log(refresh);
    if (isSubmitting) {
      setFieldOption([...refresh]);
    }
  }, [isSubmitting]);

  const [fieldOption, setFieldOption] = useState([...options]);

  // console.log(fieldOption);

  const inputChangeHandler = (e, i) => {
    const list = [...fieldOption];
    list[i].inputValue = e.target.value;
    setFieldOption([...list]);
  };

  return (
    <fetcher.Form method="post">
      <div className="bg-slate-200 px-4 py-2">
        <h3>
          {name} -{" "}
          {fieldOption
            .filter((item) => item.name === title)
            .map((item) => (
              <span>{item.inputValue ? item.inputValue : "No title"}</span>
            ))}
        </h3>
      </div>
      <input type="hidden" name="_action" value="AddEquipment" />
      <input type="hidden" name="machineId" value={id} />
      <input type="hidden" name="name" value={name} />
      <div className="px-6 py-4">
        {options.map((option, index) => (
          <div className="input" key={index}>
            <label htmlFor={option.name}>{option.name}</label>
            <input
              type={option.value}
              onChange={(e) => inputChangeHandler(e, index)}
              name={option.name}
              value={fieldOption[index].inputValue}
              required
            />
          </div>
        ))}
        <button className="primary w-full py-2 rounded mt-6">
          Add Machine
        </button>
      </div>
    </fetcher.Form>
  );
};

export default AddMachine;
