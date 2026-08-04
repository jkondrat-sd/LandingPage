import { getAllPmk as getAll } from "@/server/repository/mongo/pmk_mongo";
import _ from "lodash";

export const getAllPmk = async () => {
  try {
    const res = await getAll();
    const shorted = _.sortBy(res, "tanggal", "desc");
    const mapped = res.map((e) => {
      return {
        _id: e._id,
        jumlah: e.jumlah_hewan,
        hewan: e.spesies,
        kabupaten: e.kabupaten,
        kecamatan: e.kecamatan,
        desa: e.desa,
        konfirmasi: e.konfirmasi,
        tanggal: e.tanggal,
        kordinat: {
          x: e.x,
          y: e.y,
        },
        mati: e.mati,
        potong_paksa: e.potong_paksa,
        sembuh: e.sembuh,
        belum_sembuh: e.belum_sembuh,
        KABKOT_ID: e.Kab_kot_short_id,
        KECAMATAN_ID: e.kecamatan_short_id,
        DESA_ID: e.desa_short_id,
      };
    });

    return {
      list: mapped,
      meta: { last_data: mapped[mapped.length - 1].tanggal },
    };
  } catch (error) {
    getAllPmk;
    throw { message: error.message };
  }
};

export const getAllPmkGrouped = async () => {
  try {
    const { list: data } = await getAllPmk();

    let bucket = [];
    const sorted = _.sortBy(data, ["kabupaten", "kecamatan"]);

    if (sorted.length) {
      for (let index = 0; index < sorted.length; index++) {
        const element = sorted[index];

        if (index === 0) {
          bucket.push({
            kecamatan: element.kecamatan,
            kabupaten: element.kabupaten,
            member: [element],
          });
        } else {
          const prevElement = sorted[index - 1];
          if (
            element.kabupaten === prevElement.kabupaten &&
            element.kecamatan === prevElement.kecamatan
          ) {
            let indexTarget = bucket.findIndex(
              (ed) =>
                ed.kecamatan === element.kecamatan &&
                ed.kabupaten === element.kabupaten
            );
            let cache = bucket[indexTarget];
            cache.member.push(element);
            bucket[indexTarget] = cache;
          } else {
            bucket.push({
              kecamatan: element.kecamatan,
              kabupaten: element.kabupaten,
              member: [element],
            });
          }
        }
      }
    }

    const final = bucket.map((e, i) => {
      let total_kasus = 0;
      let sapi = 0;
      let kambing = 0;
      let mati = 0;
      let potong_paksa = 0;
      let sembuh = 0;
      let belum_sembuh = 0;
      let KABKOT_ID = null;
      let KECAMATAN_ID = null;

      e.member.map((ee) => {
        total_kasus = total_kasus + ee.jumlah;

        if (ee.hewan === "sapi") {
          sapi = sapi + ee.jumlah;
        } else if (ee.hewan === "kambing") {
          kambing = kambing + ee.jumlah;
        } else if (ee.hewan === "domba") {
          kambing = kambing + ee.jumlah;
        }
        mati = mati + ee.mati;
        potong_paksa = potong_paksa + ee.potong_paksa;
        sembuh = sembuh + ee.sembuh;
        belum_sembuh = belum_sembuh + ee.belum_sembuh;
        KABKOT_ID = ee.KABKOT_ID;
        KECAMATAN_ID = ee.KECAMATAN_ID;
      });

      return {
        ...e,
        sapi: sapi,
        kambing: kambing,
        mati: mati,
        potong_paksa: potong_paksa,
        sembuh: sembuh,
        belum_sembuh: belum_sembuh,
        total_kasus: total_kasus,
        total_kasus: total_kasus,
        KABKOT_ID: KABKOT_ID,
        KECAMATAN_ID: KECAMATAN_ID,
      };
    });

    return {
      list: final,
    };
  } catch (error) {
    throw { message: error.message };
  }
};
