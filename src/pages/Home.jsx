import React, { useContext, useEffect, useState } from "react";
import { createEquipment, deleteItem, fetchData } from "../helper";
import { useLoaderData } from "react-router-dom";
import AddMachine from "../components/AddMachine";
import StateContext from "../store/context";
import { toast } from "react-toastify";
import Equipment from "../components/Equipment";

const Home = () => {
  const { machine, equipment } = useLoaderData();
  const [selectedMachine, setSelectedMachine] = useState();
  const [showForm, setShowForm] = useState(false);

  const { setEquipment, setMachines } = useContext(StateContext);

  useEffect(() => {
    if (!equipment) {
      setEquipment([]);
    } else {
      setEquipment([...equipment]);
    }
    if (!machine) {
      setMachines([]);
    } else {
      setMachines([...machine]);
    }
    setShowForm(false);
  }, [machine, equipment, setEquipment, setMachines]);

  const selectedMachineHandler = (e) => {
    setSelectedMachine(e.target.value);
    // console.log(selectedMachine);
    e.target.value = "";
    setShowForm(true);
  };

  useEffect(() => {
    console.log(selectedMachine);
  }, [selectedMachine]);
  // console.log(equipment);

  return (
    <>
      <div className="md:flex flex-wrap gap-[2%]">
        {equipment &&
          equipment.length > 0 &&
          equipment.map((item) => (
            <div className="container" key={item.id}>
              <Equipment
                machine={machine}
                // key={item.id}
                equipment={item}
                showDelete={true}
              />
            </div>
          ))}

        {/* {equipment &&
          equipment.length > 0 &&
          equipment.map((item, index) => (
            <AddMachine machine={item} key={index} />
          ))} */}

        {/* add equipment form */}

        {showForm && (
          <div className="container">
            {machine
              .filter((item) => item.id === selectedMachine)
              .map((main, index) => (
                <AddMachine machine={main} key={index} />
              ))}
          </div>
        )}
      </div>
      <select
        name=""
        id=""
        className="rounded bg-gray-500 px-16 py-2 mt-3"
        onChange={selectedMachineHandler}
      >
        <option value="" selected disabled hidden>
          Add item
        </option>
        {machine &&
          machine.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
      </select>
    </>
  );
};

export default Home;

export const homeLoader = async () => {
  const machine = fetchData("machine");
  const equipment = fetchData("equipment");

  return { machine, equipment };
};

export const homeAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...formData } = Object.fromEntries(data);

  if (_action === "AddEquipment") {
    try {
      createEquipment(formData);
      return toast.success("Equipment added successfully");
    } catch (e) {
      throw new Error("Error creating equipment");
    }
  }
  if (_action === "deleteEquipment") {
    try {
      deleteItem({ key: "equipment", id: formData.equipmentId });
      return toast.success("Equipment deleted successfully");
    } catch (e) {
      throw new Error("Error deleting equipment");
    }
  }

  if (_action === "editEquipment") {
    try {
      createEquipment(formData);
      return toast.success("Equipment added successfully");
    } catch (e) {
      throw new Error("Error creating equipment");
    }
  }
};
