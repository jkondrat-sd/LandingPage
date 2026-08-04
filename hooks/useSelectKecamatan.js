import React, { useMemo, useState } from "react";

import kecamatan from "@/utils/constant/kecamatan.json";
import e from "cors";

const Main = () => {
  const [selected, setSelected] = useState(null);
  const [selectedKabKot, setSelectedKabKot] = useState(0);

  const optionsMapped = useMemo(
    () => kecamatan.map((e) => ({ value: e.ID_KEC, label: e.KECAMATAN, ...e })),
    []
  );

  const options = useMemo(() => {
    return selectedKabKot
      ? optionsMapped.filter((e) => e.ID_KAB === selectedKabKot)
      : optionsMapped;
  }, [optionsMapped, selectedKabKot]);

  return {
    selected,
    setSelected,
    options: [
      {
        value: 0,
        label: "Tidak Memilih Kecamatan",
      },
      ...options,
    ],
    setSelectedKabKot,
  };
};
export default Main;
