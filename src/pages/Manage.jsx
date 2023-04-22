import { useContext, useEffect, useState } from "react";
import {
  createMachine,
  deleteItem,
  fetchData,
  getAllMatchingItems,
} from "../helper";
import { toast } from "react-toastify";
import { useFetcher, useLoaderData } from "react-router-dom";

import AddMachineTypeForm from "../components/AddMachineTypeForm";
import StateContext from "../store/context";
import { AiOutlineClose } from "react-icons/ai";

const Manage = () => {
  const machine = useLoaderData();

  const fetcher = useFetcher();

  const { setMachines } = useContext(StateContext);

  useEffect(() => {
    if (!machine) {
      setMachines([]);
    } else {
      setMachines([...machine]);
    }
    setShowForm(false);
  }, [machine, setMachines]);

  const [showForm, setShowForm] = useState(false);

  const showStateHandler = () => {
    setShowForm((previous) => !previous);
  };

  // const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="md:flex flex-wrap gap-[2%]">
        {machine &&
          machine.length > 0 &&
          machine.map((item, index) => (
            <div className="container" key={item.id}>
              <div className="bg-gray-300 px-4 py-2 flex justify-between items-center">
                <h3>{item.name}</h3>

                <fetcher.Form method="post">
                  <input type="hidden" value={item.id} name="machineId" />
                  <input type="hidden" name="_action" value="deleteMachine" />
                  {
                    <button>
                      <AiOutlineClose />
                    </button>
                  }
                </fetcher.Form>
              </div>
              <div className="px-6 py-4">
                <AddMachineTypeForm machines={item} index={index} />
              </div>
              {/* <AddMachineTypeForm options={item.others} /> */}
            </div>
          ))}
        {showForm && (
          <div className="container">
            <div className="px-6 py-4">
              <h2 className="text-center">manage machine</h2>

              <AddMachineTypeForm manchines={false} />
            </div>
          </div>
        )}
      </div>
      <button
        className="rounded bg-orange-300 px-16 py-2 mt-3"
        onClick={showStateHandler}
      >
        {showForm ? "Close Form" : "Add Item"}
      </button>
    </>
  );
};

export default Manage;

export const manageAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...formData } = Object.fromEntries(data);

  // console.log(formData);

  if (_action === "addMachine") {
    try {
      createMachine(formData);
      return toast.success("Propertise added successfully");
    } catch (e) {
      throw new Error("Error creating machine");
    }
  }

  if (_action === "deleteMachine") {
    try {
      deleteItem({ key: "machine", id: formData.machineId });
      const existingEquipment = getAllMatchingItems({
        category: "equipment",
        key: "machineId",
        value: formData.machineId,
      });
      console.log(existingEquipment);
      if (existingEquipment.length > 0) {
        existingEquipment.forEach((existing) => {
          deleteItem({ key: "equipment", id: existing.id });
        });
      }
      return toast.success("machine deleted successfully");
    } catch (e) {
      throw new Error("Error deleting");
    }
    // deleteItem({key:"expenses", id:  })
  }

  if (_action === "editMachine") {
    try {
      createMachine(formData);
      return toast.success("Propertise updated successfully");
    } catch (e) {
      throw new Error("Error updating machine");
    }
  }

  // return redirect("/");
};

export const manageLoader = async () => {
  const machine = fetchData("machine");
  return machine;
};
