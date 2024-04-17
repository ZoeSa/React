import { useState } from "react";

const useFilter = () => {
  const [filtro, setFiltro] = useState("");

  return { filtro, setFiltro };
};

export default useFilter;
