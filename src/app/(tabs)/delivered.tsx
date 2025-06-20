import { Service } from "@/src/@types/service";
import { useServiceStore } from "@/src/store/useServiceStore";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { Appbar, Button, Card, Text, TextInput } from "react-native-paper";

export default function FinishedServicesScreen() {
  const getServicesByStatus = useServiceStore(
    (state) => state.getServicesByStatus
  );
  const allServices = useServiceStore((state) => state.services);

  const [search, setSearch] = useState("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  const getServices = useCallback(() => {
    const doingServices = getServicesByStatus("DELIVERED");
    if (search.trim() === "") {
      setFilteredServices(doingServices);
    } else {
      const filtered = doingServices.filter((service) =>
        service.costumerName.toLowerCase().includes(search.trim().toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [search, getServicesByStatus]);

  const handleReturnToFinished = (service: Service) => {
    useServiceStore
      .getState()
      .updateService({ ...service, status: "FINISHED" })
      .then(() =>
        Alert.alert(
          "Sucesso",
          "Serviço retornado para a fila de finalizados com sucesso."
        )
      );
  };

  useEffect(() => {
    getServices();
  }, [getServices, allServices]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Appbar.Header>
        <Appbar.Content title="Serviços Pagos" />
      </Appbar.Header>

      <View style={{ padding: 16, flex: 1 }}>
        <TextInput
          label="Buscar pelo Cliente"
          value={search}
          onChangeText={setSearch}
          mode="outlined"
        />

        <FlatList
          style={{ marginTop: 16 }}
          data={filteredServices}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View style={{ marginTop: 32, alignItems: "center" }}>
              <Text>Nenhum serviço encontrado.</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 16 }}>
              <Card.Title
                title={item.costumerName}
                subtitle={`Profissional: ${item.professionalName}`}
              />
              <Card.Content>
                <Text>Serviço: {item.service}</Text>
                <Text>Cliente: R$ {item.price}</Text>
                <Text>Telefone: {item.costumerPhone}</Text>
                <Button
                  contentStyle={{ justifyContent: "flex-start" }}
                  icon={"arrow-left"}
                  elevation={4}
                  style={{ marginTop: 16 }}
                  mode="text"
                  onPress={() => handleReturnToFinished(item)}
                >
                  Voltar para fila de finalizados
                </Button>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </View>
  );
}
