import { getAllPets } from "@/api/pets";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddPetModal } from "../components/AddPetModal";
import { PetCard } from "../components/PetCard";
import { pets as initialPets, Pet } from "../data/pets";

export default function Index() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePetPress = (id: number) => {
    router.push(`/${id}`);
  };

  const handleAddPet = async (newPet: Pet) => {
    setPets([newPet, ...pets]);

    setPets([...(await getAllPets())]);
  };

  // useEffect(() => {
  //   const fetchPets = async () => {
  //     setPets([...(await getAllPets())]);
  //   };
  //   fetchPets();
  // }, []);
  const { data, isPending, refetch } = useQuery({
    queryKey: ["allPets"],
    queryFn: getAllPets,
  });

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.headerButton}
      >
        <Text style={styles.headerButtonText}>Add Pet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          // setPets([...(await getAllPets()), ...pets]);
          setPets([...(await getAllPets())]);
        }}
        style={styles.headerButton}
      >
        <Text style={styles.headerButtonText}>Get All Pets</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {pets.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No pets yet!</Text>
              <Text style={styles.emptySubtext}>Start by adding a new pet</Text>
            </View>
          ) : (
            data?.map((pet: Pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onPress={() => handlePetPress(pet.id)}
              />
            ))
          )}
        </ScrollView>
        <AddPetModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={handleAddPet}
          refetchPets={refetch}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 16,
    flexDirection: "column-reverse",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
  headerButton: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    marginTop: -2,
    textAlign: "center",
  },
});
