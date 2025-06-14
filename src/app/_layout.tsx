import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

import { pt, registerTranslation } from "react-native-paper-dates";
registerTranslation("pt", pt);

registerTranslation("pt", {
  save: "Salvar",
  selectSingle: "Selecionar data",
  selectMultiple: "Selecionar datas",
  selectRange: "Selecionar período",
  notAccordingToDateFormat: (inputFormat) =>
    `O formato da data deve ser ${inputFormat}`,
  mustBeHigherThan: (date) => `Deve ser posterior a ${date}`,
  mustBeLowerThan: (date) => `Deve ser anterior a ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Deve estar entre ${startDate} e ${endDate}`,
  dateIsDisabled: "Dia não permitido",
  previous: "Anterior",
  next: "Próximo",
  typeInDate: "Digite a data",
  pickDateFromCalendar: "Escolher data do calendário",
  close: "Fechar",
  hour: "Hora",
  minute: "Minuto",
});

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000' ,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
    </PaperProvider>
  );
}
