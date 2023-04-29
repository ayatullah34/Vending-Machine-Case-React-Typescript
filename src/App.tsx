import React from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import Header from "./components/Header";
import i18n from './i18n';
import VendingMachine from "./components/VendingMachine";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const { t } = useTranslation(); // i18n çevirilerine erişmek için useTranslation() özelliğini kullanın
  return (
    <I18nextProvider i18n={i18n}>
      <Header title={t("vending_machine")} />
      <VendingMachine/>
      <ToastContainer position="bottom-right" />
    </I18nextProvider>
  );
}

export default App;

