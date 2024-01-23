import { MainContext, MainContextType } from "@contexts/MainProvider";
import { useContext } from "react";
import useDisable from "./useDisable";

const useSnackbar = () => {
  const {
    actions: { openSnackbar },
  } = useContext<MainContextType>(MainContext);
  const { guid, navigateToDetail } = useDisable();

  const handleInfo = (res) => {
    if (res?.status === 400) {
      if (res?.data?.detail === "not enough")
        openSnackbar({ message: "Недостаточно товара на складе", status: "error" });
    } else if (res?.id) {
      openSnackbar({ message: guid ? "Изменено" : "Добавлено", status: "success" });
      navigateToDetail(res?.guid);
    } else openSnackbar({ message: "Ошибка", status: "error" });
  };

  return { handleInfo };
};

export default useSnackbar;
