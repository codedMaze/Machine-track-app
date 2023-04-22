import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { dummyOptions } from "../data/dummy_data";

const AddMachineTypeForm = ({ machines, index }) => {
  const objectTypeRef = useRef();
  const inputRef = useRef();

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const [options, setOptions] = useState([{ name: "Title", value: "text" }]);
  const [objTitle, setObjTitle] = useState(options[0].name);
  // console.log(machines);

  useEffect(() => {
    if (machines) {
      setOptions([...machines.options]);
      setObjTitle(machines.title);
    }
  }, [machines]);

  useEffect(() => {
    if (isSubmitting) {
      inputRef.current.reset();
      setOptions([{ name: "title", value: "text" }]);
      // focusRef.current.focus();
    }
  }, [isSubmitting]);

  // const [clear, setClear] = useState();

  const selectChangeHandler = (e) => {
    setObjTitle(e.target.value);
  };

  const addFieldHandler = (e) => {
    setOptions([...options, { name: "", value: e.target.value }]);
    e.target.value = dummyOptions[0].name;
  };

  const inputChangeHandler = (e, index) => {
    // console.log(e, index);
    // console.log();
    const list = [...options];
    list[index].name = e.target.value;

    setOptions([...list]);
  };

  const changeOptionHandler = (e, index) => {
    if (e.target.value === "delete") {
      const list = [...options];
      list.splice(index, 1);
      setOptions([...list]);
    } else {
      const list = [...options];
      list[index].value = e.target.value;

      setOptions([...list]);
    }
  };

  // console.log(options, objTitle);

  return (
    <fetcher.Form method="post" ref={inputRef}>
      <input
        type="hidden"
        name="_action"
        value={machines ? "editMachine" : "addMachine"}
      />

      {machines && <input type="hidden" name="index" value={index} />}

      {/* Object Type  */}

      <div className="input">
        <label htmlFor="objectType">Object Type</label>
        <input
          type="text"
          name="objectType"
          id="objectType"
          ref={objectTypeRef}
          required
          defaultValue={machines ? machines.name : ""}
        />
      </div>

      {/* Object Title */}

      <div className="input">
        <label htmlFor="objectTitle">Object Title</label>
        <select
          name="objectTitle"
          id="objectTitle"
          // defaultValue={options[0].value}
          defaultValue={objTitle}
          value={objTitle}
          required
          onChange={selectChangeHandler}
        >
          {options.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* fields */}

      <h3>Fields</h3>

      <div className="">
        <ul className="">
          {options.map((option, i) => (
            <div key={i} className="flex w-full mb-3">
              <input
                type="text"
                name={option.name}
                value={option.name}
                required
                onChange={(e) => inputChangeHandler(e, i)}
              />
              <select
                name={option.name}
                id={option.name}
                className="bg-gray-700"
                value={option.value}
                required
                onChange={(e) => changeOptionHandler(e, i)}
              >
                {dummyOptions.map(
                  (option, i) =>
                    i > 0 && (
                      <option
                        key={i}
                        value={option.id}
                        // selected={options.value === option.id}
                      >
                        {option.name}
                      </option>
                    )
                )}
                {machines && <option value="delete">Remove</option>}
              </select>
            </div>
          ))}
        </ul>

        {/* Add Fields */}

        <div className="input">
          <select
            // name="selectFieldOption"
            // id="selectFieldOption"
            className="bg-gray-700 text-center"
            onChange={addFieldHandler}
            required
            // value={value}
          >
            {dummyOptions.map((option, i) =>
              i === 0 ? (
                <option key={i} disabled selected hidden>
                  {option.name}
                </option>
              ) : (
                <option
                  key={i}
                  value={option.id}
                  // selected={options.value === option.id}
                >
                  {option.name}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <button className="primary w-full py-2 rounded mt-6">
            {machines ? "Edit" : "Add Machine Type"}
          </button>
        </div>
      </div>
    </fetcher.Form>
  );
};

export default AddMachineTypeForm;
