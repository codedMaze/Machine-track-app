import StateContext from "./context";
import { useState } from "react";

const ContextProvider = ({ children }) => {
  const [machine, setMachines] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const stateContext = {
    machines: machine,
    equipment: equipment,
    setEquipment,
    setMachines,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;
