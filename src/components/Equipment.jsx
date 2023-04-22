import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Equipment = ({ machine, equipment, showDelete }) => {
  const { machineId, options, id } = equipment;
  const fetcher = useFetcher();

  const [fieldOptions, setFieldOptions] = useState([...options]);

  useEffect(() => {
    console.log();
  }, [fieldOptions]);

  const inputChangeHandler = (e, i) => {
    const list = [...fieldOptions];
    list[i].inputValue = e.target.value;
    setFieldOptions([...list]);
  };

  return (
    <>
      {machine
        .filter((item) => item.id === machineId)
        .map((item) => (
          <React.Fragment key={item.id}>
            <div className="bg-slate-200 px-4 py-2 flex justify-between items-center">
              <h3>
                {item.name} -{" "}
                {options
                  .filter((option) => option.name === item.title)
                  .map((item, index) => (
                    <span key={index}>
                      {item.inputValue ? item.inputValue : "No title"}
                    </span>
                  ))}
              </h3>
              {showDelete && (
                <fetcher.Form method="post">
                  <input type="hidden" value={id} name="equipmentId" />
                  <input type="hidden" name="_action" value="deleteEquipment" />
                  {
                    <button>
                      <AiOutlineClose />
                    </button>
                  }
                </fetcher.Form>
              )}
            </div>
            <fetcher.Form method="post">
              <input type="hidden" name="_action" value="editEquipment" />
              <input type="hidden" name="machineId" value={item.id} />
              <input type="hidden" name="equipmentId" value={id} />
              <input type="hidden" name="name" value={item.name} />
              <div className="px-6 py-4">
                {options.map((option, index) => (
                  <div className="input" key={index}>
                    <label htmlFor={option.name}>{option.name}</label>
                    <input
                      type={item.options[index].value}
                      onChange={(e) => inputChangeHandler(e, index)}
                      name={option.name}
                      defaultValue={option.inputValue}
                      required
                    />
                  </div>
                ))}
                <button className="primary w-full py-2 rounded mt-6">
                  Edit Machine
                </button>
              </div>
            </fetcher.Form>
          </React.Fragment>
        ))}
    </>
  );
};

export default Equipment;
