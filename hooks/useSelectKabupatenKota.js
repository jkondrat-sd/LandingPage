import React, { useMemo, useState } from "react";

import { DATA_MAP } from "@/utils/constant";

const Main = () => {
  const [selected, setSelected] = useState(null);

  const options = useMemo(
    () => DATA_MAP.map((e) => ({ value: e.id, label: e.nama, ...e })),
    []
  );

  return { selected, setSelected, options };
};
export default Main;
