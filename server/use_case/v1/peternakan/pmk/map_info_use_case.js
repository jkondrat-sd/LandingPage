import { getAll as getAllQurban } from "@/server/repository/mongo/peternakan/animals_qurban";
import { getAllPmk } from "@/server/repository/mongo/pmk_mongo";
import { DATA_MAP } from "@/utils/constant";
import _ from "lodash";

/*
  @desc target usecase ini adalah memberikan all in one info untuk page map penyebaran pmk (TODO)
 */

export const getMapInfo = async () => {
  try {
    const qurban = await getAllQurban();
    const qurban_clean = qurban.map((item) => {
      const kab_kot = item.kab_kot.toLowerCase().replace("kabupaten ", "");
      return { ...item, kab_kot };
    });

    const pmk = await getAllPmk();
    const pmk_clean = pmk.map((item) => {
      const kabupaten = item.kabupaten.toLowerCase().replace("kabupaten ", "");
      return { ...item, kab_kot: kabupaten };
    });

    let kabKotClean = DATA_MAP.map((i) => {
      const kab_kot = i.nama.toLowerCase();
      let qurbanList = [];
      let pmkList = [];

      qurbanList = qurban_clean.filter((item) => item.kab_kot === kab_kot);
      pmkList = pmk_clean.filter((item) => item.kab_kot === kab_kot);

      const total_qurban = _.sumBy(pmkList, "jumlah_hewan");
      const total_kasus_pmk = _.sumBy(pmkList, "jumlah_hewan");

      const jabarCoordinate = [-6.922052846332648, 107.62145398077281];

      return {
        id: i.id,
        kab_kot: kab_kot,
        pmk_percent: 0, // not yet implemented
        distributions: {
          sapi_bali: {},
        },
        qurban: {
          list: qurbanList,
          meta: {
            total: total_qurban,
            total_feed_lotter: _.sumBy(qurbanList, "feed_lotter"),
            total_peternak_sapi_potong_besar: _.sumBy(
              qurbanList,
              "peternak_sapi_potong_besar"
            ),
            total_ternak_sapi_potong_kecil: _.sumBy(
              qurbanList,
              "ternak_sapi_potong_kecil"
            ),
            total_peternak_sapi_perah_besar: _.sumBy(
              qurbanList,
              "peternak_sapi_perah_besar"
            ),
            total_ternak_sapi_perah_kecil: _.sumBy(
              qurbanList,
              "ternak_sapi_perah_kecil"
            ),
            total_peternak_domba_besar: _.sumBy(
              qurbanList,
              "peternak_domba_besar"
            ),
            total_ternak_domba_kecil: _.sumBy(qurbanList, "ternak_domba_kecil"),
            total_peternak_kambing_besar: _.sumBy(
              qurbanList,
              "peternak_kambing_besar"
            ),
            total_ternak_kambing_kecil: _.sumBy(
              qurbanList,
              "ternak_kambing_kecil"
            ),
            satuan: qurban_clean[0].satuan,
            created_at: null,
            update_at: null,
          },
        },
        pmk: {
          list: pmkList,
          meta: {
            total_kasus: total_kasus_pmk,
            total_terduga: _.sumBy(pmkList, (e) => {
              if (e.konfirmasi.toLowerCase() === "terduga")
                return e.jumlah_hewan || 0;
            }),
            total_tertular: _.sumBy(pmkList, (e) => {
              if (e.konfirmasi.toLowerCase() === "tertular")
                return e.jumlah_hewan || 0;
            }),
            created_at: null,
            update_at: null,
          },
        },
      };
    });

    return {
      byKabKot: kabKotClean,
      meta: {},
    };
  } catch (error) {
    throw { message: error.message };
  }
};
