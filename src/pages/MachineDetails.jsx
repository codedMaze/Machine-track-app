import React, { useEffect, useState } from "react";

import { createEquipment, deleteItem, fetchData } from "../helper";
import { useLoaderData } from "react-router-dom";
import Equipment from "../components/Equipment";
import AddMachine from "../components/AddMachine";
import { toast } from "react-toastify";

const MachineDetails = () => {
  const { machine, equipment } = useLoaderData();
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => {
    setShowForm((previous) => !previous);
  };
  useEffect(() => {
    setShowForm(false);
  }, [equipment]);

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
        {showForm && (
          <div className="container">
            {machine.map((main, index) => (
              <AddMachine machine={main} key={index} />
            ))}
          </div>
        )}
      </div>

      <button
        className="rounded bg-gray-500 px-16 py-2 mt-3"
        onClick={showFormHandler}
      >
        Add {machine[0].name}
      </button>
    </>
  );
};

export default MachineDetails;

export const detailsLoader = async ({ params }) => {
  const machines = fetchData("machine");
  const equipments = fetchData("equipment") ?? [];

  const machine = machines.filter((machine) => machine.id === params.machineId);
  const equipment = equipments.filter(
    (equipment) => equipment.machineId === params.machineId
  );
  // console.log(machine, equipment);

  return { machine, equipment };
};

export const detailAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...formData } = Object.fromEntries(data);
  // console.log(formData);
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
