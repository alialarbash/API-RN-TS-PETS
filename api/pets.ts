import petsApi from ".";

const getAllPets = async () => {
  const response = await petsApi.get("/pets");
  return response.data;
};

const getPetById = async (id: string) => {
  const response = await petsApi.get(`/pets/${id}`);
  return response.data;
};

export { getAllPets, getPetById };
