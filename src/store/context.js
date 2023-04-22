import { createContext } from "react";

const StateContext = createContext({
  machines: [],
  equipment: [],
  setEquipment: () => {},
  setMachines: () => {},
});

export default StateContext;
