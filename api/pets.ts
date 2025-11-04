import petsApi from ".";

const getAllPets = async () => {
  const response = await petsApi.get("/pets");
  return response.data;
};

const getPetById = async (id: string) => {
  const response = await petsApi.get(`/pets/${id}`);
  return response.data;
};

const createPet = async (
  name: string,
  type: string,
  adopted: string,
  image: string
) => {
  const response = await petsApi.post("/pets", {
    name, // name: name,
    type: type,
    adopted: adopted,
    image: image,
  });
  return response.data;
};

const deletePet = async (id: string) => {
  const response = await petsApi.delete(`/pets/${id}`);
  return response.data;
};
export { createPet, getAllPets, getPetById, deletePet };
