import useFormNavigation from "@/src/hooks/useFormNavigation";
import { useServiceStore } from "@/src/store/useServiceStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Appbar, Button, HelperText, TextInput } from "react-native-paper";
import * as yup from "yup";

// Schema de validação
const schema = yup
  .object({
    costumerName: yup.string().required("Nome do Cliente é obrigatório"),
    professionalName: yup.string().required("Profissional é obrigatória"),
    service: yup.string().required("Serviço é obrigatório"),
    price: yup.string().required("Preço do Serviço é obrigatório"),
    costumerPhone: yup.string().required("Telefone é obrigatório"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function AddServiceScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const addService = useServiceStore((state) => state.addService);
  const updateService = useServiceStore((state) => state.updateService);
  const getById = useServiceStore((state) => state.getById);

  const isEditForm = useMemo(() => !!id, [id]);

  const { register, toNext } = useFormNavigation<FormData>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      costumerName: "",
      professionalName: "",
      service: "",
      price:"",
      costumerPhone: "",
    },
  });

  const onSubmit = (data: FormData) => {
    if (isEditForm) {
      updateService({
        id: id!,
        ...data,
        status: "DOING",
      })
        .then(() => router.back())
        .catch(() => {
          alert("Ocorreu um erro ao adicionar o serviço");
        });
    } else {
      addService({
        ...data,
        status: "DOING",
      })
        .then(() => router.back())
        .catch((error) => {
          alert("Ocorreu um erro ao adicionar o serviço");
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (isEditForm) {
      const serviceToEdit = getById(id!);
      if (serviceToEdit) {
        reset({
          costumerName: serviceToEdit.costumerName,
          professionalName: serviceToEdit.professionalName,
          service: serviceToEdit.service,
          price: serviceToEdit.price,
          costumerPhone: serviceToEdit.costumerPhone
        });
      }
    }
  }, [id, reset]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title={isEditForm ? "Editar Serviço" : "Adicionar Serviço"}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/** Campo Modelo */}
        <Controller
          control={control}
          name="costumerName"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Nome do Cliente"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.costumerName}
                style={{ marginBottom: 8 }}
                ref={register("costumerName")}
                onSubmitEditing={toNext("professionalName")}
                autoFocus
              />
              <HelperText type="error" visible={!!errors.costumerName}>
                {errors.costumerName?.message}
              </HelperText>
            </>
          )}
        />

        {/** Campo Placa */}
        <Controller
          control={control}
          name="professionalName"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Nome do Profissional"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.professionalName}
                style={{ marginBottom: 8 }}
                ref={register("professionalName")}
                onSubmitEditing={toNext("service")}
              />
              <HelperText type="error" visible={!!errors.professionalName}>
                {errors.professionalName?.message}
              </HelperText>
            </>
          )}
        />

        {/** Campo Serviço */}
        <Controller
          control={control}
          name="service"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Serviço"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.service}
                style={{ marginBottom: 8 }}
                ref={register("service")}
                onSubmitEditing={toNext("price")}
              />
              <HelperText type="error" visible={!!errors.service}>
                {errors.service?.message}
              </HelperText>
            </>
          )}
        />

        {/** Campo Data de Entrega */}
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value, onBlur } }) => (
            <>
             <TextInput
                label="Preço"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.service}
                style={{ marginBottom: 8 }}
                ref={register("price")}
                onSubmitEditing={toNext("costumerPhone")}
              />
              <HelperText type="error" visible={!!errors.price}>
                {errors.price?.message}
              </HelperText>
            </>
          )}
        />

        {/** Campo Nome do Cliente */}
        <Controller
          control={control}
          name="costumerPhone"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Telefone do cliente"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.costumerPhone}
                style={{ marginBottom: 8 }}
                ref={register("costumerPhone")}
              />
              <HelperText type="error" visible={!!errors.costumerPhone}>
                {errors.costumerPhone?.message}
              </HelperText>
            </>
          )}
        />
        
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Salvar Serviço
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
