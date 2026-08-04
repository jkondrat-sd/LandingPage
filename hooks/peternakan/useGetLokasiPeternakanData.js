import React, { useEffect } from "react";

function useGetLokasiPeternakanData(
  selectedKabKot,
  selectedKec,
  dataSebaran,
  locationSectionData
) {
  const [dataExtraSelected, setDataExtraSelected] = React.useState({
    feedlotter: [],
    uptd: [],
    cattleMarket: [],
    RPH_TPH: [],
  });

  useEffect(() => {
    if (!selectedKabKot) return;

    if (!selectedKec?.value) {
      setDataExtraSelected({
        feedlotter: [],
        uptd: [],
        cattleMarket: [],
        RPH_TPH: [],
      });

      //fedlotter sidbar data
      if (locationSectionData?.feedlotter?.list) {
        const dataFlKabKot = locationSectionData.feedlotter.list.filter(
          (efl) =>
            efl.kab_kot.toLowerCase() === selectedKabKot.nama.toLowerCase()
        );

        const setFieldFl = dataFlKabKot.map((edf) => ({
          name: edf.nama_badan_usaha,
          address: edf.alamat,
        }));

        setDataExtraSelected((prev) => ({
          ...prev,
          feedlotter: setFieldFl || [],
        }));
      }

      //uptd sidbar data
      // clean kabkot non standard
      if (locationSectionData?.perbibitan_dan_pengembangan?.list) {
        const fixedUPTDKabKot =
          locationSectionData.perbibitan_dan_pengembangan.list.map((e) => ({
            ...e,
            name: e.nama,
            address: e.alamat,
            kab_kot: e.kab_kot.toLowerCase().replace("kabupaten ", ""),
          }));
        const dataUptd = fixedUPTDKabKot.filter(
          (edu) =>
            edu.kab_kot.toLowerCase() === selectedKabKot.nama.toLowerCase()
        );
        setDataExtraSelected((prev) => ({
          ...prev,
          uptd: dataUptd || [],
        }));
      }

      // pasar ternak sidebar data
      if (locationSectionData?.pasar_ternak?.list) {
        const fixedPasarHewan = locationSectionData.pasar_ternak.list.map(
          (e) => ({
            ...e,
            name: e.market_name,
            kab_kot: e.kab_kot.toLowerCase().replace("kabupaten ", ""),
          })
        );
        const dataPasarHewan = fixedPasarHewan.filter(
          (edu) =>
            edu.kab_kot.toLowerCase() === selectedKabKot.nama.toLowerCase()
        );
        setDataExtraSelected((prev) => ({
          ...prev,
          cattleMarket: dataPasarHewan || [],
        }));
      }

      // RPH_TPH / slaughterHouse sidebar data
      if (locationSectionData?.RPH_TPH?.list) {
        const fixedRPH_TPH = locationSectionData.RPH_TPH.list.map((e) => ({
          ...e,
          kab_kot: e.kab_kot.toLowerCase().replace("kabupaten ", ""),
        }));
        const dataPasarHewan = fixedRPH_TPH.filter(
          (edu) =>
            edu.kab_kot.toLowerCase() === selectedKabKot.nama.toLowerCase()
        );
        setDataExtraSelected((prev) => ({
          ...prev,
          RPH_TPH: dataPasarHewan || [],
        }));
      }
    } else {
      setDataExtraSelected({
        feedlotter: [],
        uptd: [],
        cattleMarket: [],
        RPH_TPH: [],
      });
      //fedlotter sidbar data
      if (locationSectionData?.feedlotter?.list) {
        const dataFlKabKot = locationSectionData.feedlotter.list.filter(
          (efl) =>
            efl.kab_kot.toLowerCase() === selectedKabKot.nama.toLowerCase() &&
            efl?.kecamatan?.toLowerCase() ===
              selectedKec?.KECAMATAN?.toLowerCase()
        );

        const setFieldFl = dataFlKabKot.map((edf) => ({
          name: edf.nama_badan_usaha,
          address: edf.alamat,
        }));

        setDataExtraSelected((prev) => ({
          ...prev,
          feedlotter: setFieldFl || [],
        }));
      }

      //uptd sidbar data
      // clean kabkot non standard
      if (locationSectionData?.perbibitan_dan_pengembangan?.list) {
        const fixedUPTDKabKot =
          locationSectionData.perbibitan_dan_pengembangan.list.map((e) => ({
            ...e,
            name: e.nama,
            address: e.alamat,
            kab_kot: e.kab_kot.toLowerCase().replace("kabupaten ", ""),
          }));
        const dataUptd = fixedUPTDKabKot.filter(
          (edu) =>
            edu.kab_kot.toLowerCase() === selectedKabKot.nama.toLowerCase() &&
            edu?.kecamatan?.toLowerCase() ===
              selectedKec?.KECAMATAN?.toLowerCase()
        );
        setDataExtraSelected((prev) => ({
          ...prev,
          uptd: dataUptd || [],
        }));
      }

      // pasar ternak sidebar data
      if (locationSectionData?.pasar_ternak?.list) {
        const fixedPasarHewan = locationSectionData.pasar_ternak.list.map(
          (e) => ({
            ...e,
            name: e.market_name,
            kab_kot: e.kab_kot.toLowerCase().replace("kabupaten ", ""),
          })
        );
        const dataPasarHewan = fixedPasarHewan.filter(
          (ept) =>
            ept.kab_kot.toLowerCase() === selectedKabKot.nama.toLowerCase() &&
            ept?.kecamatan?.toLowerCase() ===
              selectedKec?.KECAMATAN?.toLowerCase()
        );
        console.log("dataPasarHewan : ", dataPasarHewan);
        setDataExtraSelected((prev) => ({
          ...prev,
          cattleMarket: dataPasarHewan || [],
        }));
      }

      // RPH_TPH / slaughterHouse sidebar data
      if (locationSectionData?.RPH_TPH?.list) {
        const fixedRPH_TPH = locationSectionData.RPH_TPH.list.map((e) => ({
          ...e,
          kab_kot: e.kab_kot.toLowerCase().replace("kabupaten ", ""),
        }));
        const dataRPH_TPH = fixedRPH_TPH.filter(
          (ertph) =>
            ertph.kab_kot.toLowerCase() === selectedKabKot.nama.toLowerCase() &&
            ertph?.kecamatan?.toLowerCase() ===
              selectedKec?.KECAMATAN?.toLowerCase()
        );
        setDataExtraSelected((prev) => ({
          ...prev,
          RPH_TPH: dataRPH_TPH || [],
        }));
      }
    }
  }, [selectedKabKot, selectedKec, locationSectionData]);

  return { dataExtraSelected, setDataExtraSelected };
}

export default useGetLokasiPeternakanData;
