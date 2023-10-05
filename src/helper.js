export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteData = (key) => {
  return localStorage.removeItem(key);
};

export const createMachine = (formdata) => {
  const { objectType, objectTitle, index, ...others } = formdata;

  const options = [];
  for (const key in others) {
    options.push({ name: key, value: others[key] });
  }

  const newItem = {
    id: crypto.randomUUID(),
    name: objectType,
    title: objectTitle,
    index: +index,
    options,
  };
  if (newItem.index >= 0) {
    const existingMachine = fetchData("machine");
    const existingEquipment = fetchData("equipment");

    let existing = existingMachine[newItem.index];

    // const selectedEquipment = getAllMatchingItems({
    //   category: "equipment",
    //   key: "manchineId",
    //   value: existing.id,
    // });

    // existingEquipment.filter(
    //   (equipment) => equipment.manchineId === existing.id
    // );

    // selectedEquipment.map((element) => {
    //   existingEquipment.forEach((item) => {
    //     if(item.id === element.id){
    //       item.options.forEach(select =>{

    //       })
    //     }
    //   })
    // });

    const updateExisting = {
      ...existing,
      name: newItem.name,
      title: objectTitle,
      options: newItem.options,
    };
    existingMachine[newItem.index] = updateExisting;
    return localStorage.setItem(
      "machine",
      JSON.stringify([...existingMachine])
    );
  } else {
    const existingMachine = fetchData("machine") ?? [];
    return localStorage.setItem(
      "machine",
      JSON.stringify([...existingMachine, newItem])
    );
  }
};

export const createEquipment = (formData) => {
  const { name, machineId, equipmentId, ...others } = formData;

  const options = [];
  for (const key in others) {
    options.push({
      name: key,
      inputValue: others[key],
    });
  }

  const newItem = {
    name,
    machineId,
    id: crypto.randomUUID(),
    options,
  };

  if (equipmentId) {
    const existingEquipment = fetchData("equipment");
    const index = existingEquipment.findIndex((i) => i.id === equipmentId);
    let existing = existingEquipment[index];
    const updatedEquipment = {
      ...existing,
      name: newItem.name,
      options: newItem.options,
    };
    existingEquipment[index] = updatedEquipment;
    return localStorage.setItem(
      "equipment",
      JSON.stringify([...existingEquipment])
    );
  } else {
    const existingEquipment = fetchData("equipment") ?? [];
    // console.log(existingEquipment);
    return localStorage.setItem(
      "equipment",
      JSON.stringify([...existingEquipment, newItem])
    );
  }
};

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  if (data.length > 0) {
    return data.filter((item) => item[key] === value);
  } else {
    return data;
  }
};
