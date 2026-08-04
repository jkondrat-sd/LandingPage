import BerasIcon from "@/components/_legacy/HargaPanganSvg/BerasIcon";
import JagungIcon from "@/components/_legacy/HargaPanganSvg/JagungIcon";
import BawangMerahIcon from "@/components/_legacy/HargaPanganSvg/BawangMerahIcon";
import BawangPutihIcon from "@/components/_legacy/HargaPanganSvg/BawangPutihIcon";
import CabaiBesarIcon from "@/components/_legacy/HargaPanganSvg/CabaiBesarIcon";
import CabaiRawitIcon from "@/components/_legacy/HargaPanganSvg/CabaiRawitIcon";
import DagingSapiIcon from "@/components/_legacy/HargaPanganSvg/DagingSapiIcon";
import DagingAyamIcon from "@/components/_legacy/HargaPanganSvg/DagingAyamIcon";
import MinyakGorengIcon from "@/components/_legacy/HargaPanganSvg/MinyakGorengIcon";
import GulaPasirIcon from "@/components/_legacy/HargaPanganSvg/GulaPasirIcon";
import TelurAyamIcon from "@/components/_legacy/HargaPanganSvg/TelurAyamIcon";

export const comodityList = {
  3001: "bawang_merah",
  3002: "cabai_besar",
  3003: "cabai_rawit",
  3004: "gula_pasir",
  3005: "minyak_goreng",
  3006: "telur_ayam",
  3007: "daging_sapi",
  3008: "jagung",
  3009: "daging_ayam",
  3010: "beras",
  3011: "bawang_putih",
};

export const comodityColorList = {
  3001: "#808080",
  3002: "#1BACE3",
  3003: "#F5BAC3",
  3004: "#BC293F",
  3005: "#1045B0",
  3006: "#B0C6F0",
  3007: "#711826",
  3008: "#DDC300",
  3009: "#092969",
  3010: "#AAD6C1",
  3011: "#FFA500",
};

export const comodityIconList = {
  3001: "/icons/komoditas/3.svg",
  3002: "/icons/komoditas/2.svg",
  3003: "/icons/komoditas/18.svg",
  3004: "/icons/komoditas/8.svg",
  3005: "/icons/komoditas/7.svg",
  3006: "/icons/komoditas/5.svg",
  3007: "/icons/komoditas/6.svg",
  3008: "/icons/komoditas/22.svg",
  3009: "/icons/komoditas/4.svg",
  3010: "/icons/komoditas/1.svg",
  3011: "/icons/komoditas/15.svg",
};

export const districtOrCityList = {
  3201: "kabupaten_bogor",
  3202: "kabupaten_sukabumi",
  3203: "kabupaten_cianjur",
  3204: "kabupaten_bandung",
  3205: "kabupaten_garut",
  3206: "kabupaten_tasikmalaya",
  3207: "kabupaten_ciamis",
  3208: "kabupaten_kuningan",
  3209: "kabupaten_cirebon",
  3210: "kabupaten_majalengka",
  3211: "kabupaten_sumedang",
  3212: "kabupaten_indramayu",
  3213: "kabupaten_subang",
  3214: "kabupaten_purwakarta",
  3215: "kabupaten_karawang",
  3216: "kabupaten_bekasi",
  3217: "kabupaten_bandung_barat",
  3218: "kabupaten_pangandaran",
  3271: "kota_bogor",
  3272: "kota_sukabumi",
  3273: "kota_bandung",
  3274: "kota_cirebon",
  3275: "kota_bekasi",
  3276: "kota_depok",
  3277: "kota_cimahi",
  3278: "kota_tasikmalaya",
  3279: "kota_banjar",
  3200: "tidak_terafiliasi",
};

export const DATA_MAP = [
  {
    id: 3201,
    nama: "BOGOR",
    latLng: [-6.508447316485744, 106.53664804961812],
    latLngTernak: {
      itik: [-6.423844920941584, 106.55450083232184],
      unggas_lokal: [-6.54392151017818, 106.49682261127904],
      domba: [-6.670789255743269, 106.56960703307112],
      kambing: [-6.427938910578858, 106.66848398343016],
      sapi_perah: [-6.527549117634778, 106.66299081952133],
      sapi_potong: [-6.628503626554303, 106.67535043831622],
      tumbuhan: [-6.437491424865183, 106.99944710893753],
      jasa: [-6.4825222817730515, 107.03652596532218],
      pakan: [-6.500260607740784, 106.96923470743896],
      ikan: [-6.530277886937241, 107.04751229313983],
    },
  },
  {
    id: 3202,
    nama: "SUKABUMI",
    latLng: [-7.184368, 106.690535],
    latLngTernak: {
      itik: [-6.886881708533005, 106.61367963056023],
      unggas_lokal: [-7.010257202331961, 106.78846018950294],
      domba: [-7.0584419152038835, 106.73408401560965],
      kambing: [-7.16828424757726, 106.82147429508102],
      sapi_perah: [-7.228011969397565, 106.58649154361356],
      sapi_potong: [-7.14323480399653, 106.76709812118773],
      kelinci: [-6.821719778841329, 106.90220305113857],
      tumbuhan: [-6.8037168157485715, 106.69647216796874],
      jasa: [-7.147224098111096, 106.56600952148438],
      pakan: [-7.043653285340472, 106.59072875976562],
      ikan: [-7.305260501068479, 106.72119140625],
    },
  },
  {
    id: 3203,
    nama: "CIANJUR",
    latLng: [-7.144841, 107.102518],
    latLngTernak: {
      itik: [-6.843362038952539, 107.15237061674033],
      unggas_lokal: [-6.940161184935159, 107.1331445430594],
      domba: [-7.12552346160471, 107.11117188742405],
      kambing: [-7.25359782468631, 107.14001099794545],
      sapi_perah: [-7.37618808724796, 107.03838746563197],
      sapi_potong: [-7.395254646663009, 107.35424439039004],
      kelinci: [-7.3816357595601465, 106.953243425045],
      tumbuhan: [-6.788716761000514, 107.14691162109375],
      jasa: [-7.320243830434504, 107.37213134765625],
      pakan: [-7.263032055373544, 107.00546264648438],
      ikan: [-7.411495021091383, 107.24578857421875],
    },
  },
  {
    id: 3204,
    nama: "BANDUNG",
    latLng: [-7.11244944502655, 107.6227116052922],
    latLngTernak: {
      itik: [-6.996603407687188, 107.55267376545453],
      unggas_lokal: [-7.068840223546302, 107.50872845418384],
      domba: [-7.166955145374523, 107.44555706923222],
      kambing: [-7.207830145060765, 107.56091351131779],
      sapi_perah: [-7.1247137934939415, 107.68588299024381],
      sapi_potong: [-7.214642287051732, 107.64880413385916],
      kelinci: [-7.266411208820298, 107.69274944512985],
      tumbuhan: [-7.0218459442324646, 107.841796875],
      jasa: [-7.043653285340472, 107.72506713867186],
      pakan: [-7.111794602472421, 107.63031005859375],
      ikan: [-7.178563285655339, 107.37075805664062],
    },
  },
  {
    id: 3205,
    nama: "GARUT",
    latLng: [-7.321447664398725, 107.81656005826011],
    latLngTernak: {
      itik: [-7.092557711168452, 107.96487548379868],
      unggas_lokal: [-7.234265142684405, 107.86874511539406],
      domba: [-7.36367058437879, 107.7520153823313],
      kambing: [-7.427678302702892, 107.53091553500064],
      sapi_perah: [-7.499846033557809, 107.62979248535969],
      sapi_potong: [-7.603310927784169, 107.79046752969313],
      kelinci: [-7.341878610195583, 107.53915528086388],
      tumbuhan: [-7.167662943071209, 107.92556762695312],
      jasa: [-7.50545037003296, 107.85827636718749],
      pakan: [-7.489111760186691, 107.73193359375],
      ikan: [-7.612997502224091, 107.72781372070312],
    },
  },
  {
    id: 3206,
    nama: "TASIKMALAYA",
    latLng: [-7.555114, 108.149324],
    latLngTernak: {
      itik: [-7.526616859126716, 108.23961665786962],
      unggas_lokal: [-7.312815623594527, 108.01027706467572],
      domba: [-7.533424100061934, 108.03087642933386],
      kambing: [-7.642325345161762, 107.96358517145063],
      sapi_perah: [-7.563374688297245, 108.2341234939608],
      sapi_potong: [-7.2610520460044645, 108.051475793992],
      kelinci: [-7.706853580898571, 108.17203973468528],
      tumbuhan: [-7.3883435143555864, 108.02169799804686],
      jasa: [-7.437368794350015, 108.10684204101562],
      pakan: [-7.598024193143836, 108.13568115234375],
      ikan: [-7.719156814632162, 108.09173583984374],
    },
  },
  {
    id: 3207,
    nama: "CIAMIS",
    latLng: [-7.2485557534836005, 108.39988701210962],
    latLngTernak: {
      itik: [-7.10821550735541, 108.31199638956825],
      unggas_lokal: [-7.194059832581667, 108.29414360686454],
      domba: [-7.266265510818234, 108.3216094264087],
      kambing: [-7.222671010003351, 108.44932548728914],
      sapi_perah: [-7.320752687079591, 108.4452056143575],
      sapi_potong: [-7.428345259638123, 108.47541801585612],
      kelinci: [-7.448090523051288, 108.63060064142596],
      tumbuhan: [-7.1908258588492675, 108.39825441129504],
      jasa: [-7.250771440010265, 108.3570556808263],
      pakan: [-7.501365775065815, 108.54107667692006],
      ikan: [-7.267118852885314, 108.24444581754506],
    },
  },
  {
    id: 3218,
    nama: "PANGANDARAN",
    latLng: [-7.6261441787764115, 108.53402200930259],
    latLngTernak: {
      itik: [-7.5390221063330065, 108.39325968413868],
      unggas_lokal: [-7.605045921712073, 108.40905253037658],
      domba: [-7.6996396414566375, 108.36785380106032],
      kambing: [-7.767679635689584, 108.41317240330821],
      sapi_perah: [-7.607087733907197, 108.51685587208749],
      sapi_potong: [-7.609810135050444, 108.64731851492233],
      kelinci: [-7.5485519406804045, 108.68920388972721],
      tumbuhan: [-7.6973827067235465, 108.44769288785756],
      jasa: [-7.732765062729807, 108.4284668136388],
      pakan: [-7.653831138581325, 108.7250976730138],
      ikan: [-7.661997397255226, 108.5438232589513],
    },
  },
  {
    id: 3208,
    nama: "KUNINGAN",
    latLng: [-6.9977623647935445, 108.55255845888517],
    latLngTernak: {
      itik: [-6.836442580298929, 108.45606995048001],
      unggas_lokal: [-6.895752309876328, 108.46705627860501],
      domba: [-6.966641549876569, 108.4334106487222],
      kambing: [-6.950965040915355, 108.5103149455972],
      sapi_perah: [-6.967323125342339, 108.60919189872219],
      sapi_potong: [-7.012986419693207, 108.55082703055814],
      kelinci: [-7.031386781951739, 108.49177551688625],
      tumbuhan: [-7.0218459442324646, 108.64352417411283],
      jasa: [-7.08045084645532, 108.60095215262844],
      pakan: [-7.107706407586725, 108.54670715751125],
      ikan: [-7.070911019259513, 108.69433594169094],
    },
  },
  {
    id: 3209,
    nama: "CIREBON",
    latLng: [-6.869082, 108.67606],
    latLngTernak: {
      itik: [-6.578667368564999, 108.51786804618314],
      unggas_lokal: [-6.616864857159944, 108.40869141044095],
      domba: [-6.646875098291573, 108.48353577079251],
      kambing: [-6.683362354988123, 108.4507141134236],
      sapi_perah: [-6.683362354988123, 108.4507141134236],
      sapi_potong: [-6.814966549403724, 108.66323089809157],
      kelinci: [-6.831670212281932, 108.59078979701735],
      tumbuhan: [-6.851100269668155, 108.72228241176344],
      jasa: [-6.894048110604163, 108.7257156393025],
      pakan: [-6.832011097291446, 108.79026031703688],
      ikan: [-6.946534628338829, 108.73532867641188],
    },
  },
  {
    id: 3210,
    nama: "MAJALENGKA",
    latLng: [-6.810306460871048, 108.27712089510973],
    latLngTernak: {
      itik: [-6.6305061023998135, 108.12002564314751],
      unggas_lokal: [-6.667335576666536, 108.23538208846003],
      domba: [-6.745077583589011, 108.26147461775689],
      kambing: [-6.781898399690813, 108.33013916853815],
      sapi_perah: [-6.764170208924263, 108.18319702986626],
      sapi_potong: [-6.822807116784918, 108.24087525252253],
      kelinci: [-6.863712339483681, 108.29306031111628],
      tumbuhan: [-6.9332431402747, 108.34661866072564],
      jasa: [-6.930516634816176, 108.26559449080378],
      pakan: [-6.987769928155617, 108.29031372908503],
      ikan: [-7.00140063335305, 108.21615601424128],
    },
  },
  {
    id: 3211,
    nama: "SUMEDANG",
    latLng: [-6.809488507233456, 107.99068835854705],
    latLngTernak: {
      itik: [-6.6240028937294335, 107.88837818074497],
      unggas_lokal: [-6.723256519049719, 107.91815186385064],
      domba: [-6.825851471652712, 107.87876514390452],
      kambing: [-6.898796197021624, 107.9357567194587],
      sapi_perah: [-6.911747827484214, 108.09299853634911],
      sapi_potong: [-6.761078141888641, 108.03669360628355],
      kelinci: [-6.824147022267833, 107.96802905742314],
      tumbuhan: [-6.863712339483681, 108.0692138755694],
      jasa: [-6.953691427897033, 108.02114869002253],
      pakan: [-6.916883871079278, 107.86184693221003],
      ikan: [-6.8541681011574, 107.81515503767878],
    },
  },
  {
    id: 3212,
    nama: "INDRAMAYU",
    latLng: [-6.434706093428325, 108.1851436753855],
    latLngTernak: {
      itik: [-6.355550858621065, 108.02858850398368],
      unggas_lokal: [-6.466091832023264, 108.02652856751787],
      domba: [-6.5779728921607346, 107.98944971113323],
      kambing: [-6.36646954966788, 108.2002498761348],
      sapi_perah: [-6.487241992230084, 108.24144860545107],
      sapi_potong: [-6.500886785937588, 108.36367150242269],
      kelinci: [-6.399906595157497, 108.36367150242269],
      tumbuhan: [-6.487254344358055, 108.13101197127253],
      jasa: [-6.319393394223436, 108.27932740096003],
      pakan: [-6.429942184960368, 107.94561768416315],
      ikan: [-6.402648405963884, 108.11453247908503],
    },
  },
  {
    id: 3213,
    nama: "SUBANG",
    latLng: [-6.476111355504447, 107.74140022382953],
    latLngTernak: {
      itik: [-6.285041638017705, 107.66586922008305],
      unggas_lokal: [-6.3955978107310765, 107.63977669151608],
      domba: [-6.585261724055015, 107.63703010956165],
      kambing: [-6.6875684056106355, 107.76474617044208],
      sapi_perah: [-6.499307797415017, 107.77435920728256],
      sapi_potong: [-6.4201626168487715, 107.82379768246207],
      kelinci: [-6.293231795037318, 107.84165046516578],
      tumbuhan: [-6.712345619186963, 107.6572265708819],
      jasa: [-6.625049649563778, 107.7890625083819],
      pakan: [-6.483160834178051, 107.61602784041315],
      ikan: [-6.331677767365065, 107.74649048689751],
    },
  },
  {
    id: 3214,
    nama: "PURWAKARTA",
    latLng: [-6.597152656769715, 107.4229356409659],
    latLngTernak: {
      itik: [-6.5412174020310205, 107.33573166391315],
      unggas_lokal: [-6.602609417549066, 107.32611862707267],
      domba: [-6.657173708822218, 107.39272323946732],
      kambing: [-6.6953651074150375, 107.5115129089959],
      sapi_perah: [-6.618979338768427, 107.50395980862123],
      sapi_potong: [-6.526209314855523, 107.49228683531497],
      kelinci: [-6.587944236686966, 107.43598190524943],
      tumbuhan: [-6.46542190628046, 107.4830932659097],
      jasa: [-6.672791560098641, 107.42884827079251],
      pakan: [-6.678247482748998, 107.29220581473781],
      ikan: [-6.592991771872422, 107.25650024833158],
    },
  },
  {
    id: 3215,
    nama: "KARAWANG",
    latLng: [-6.2265081528856285, 107.39664316574986],
    latLngTernak: {
      itik: [-6.039444174081091, 107.24420786727966],
      unggas_lokal: [-6.087240467563438, 107.32935190786662],
      domba: [-6.18282026653644, 107.37604380109174],
      kambing: [-6.356185059468997, 107.29364634245918],
      sapi_perah: [-6.465361340229717, 107.26892710486943],
      sapi_potong: [-6.327522429054116, 107.47217416949636],
      kelinci: [-6.227873340906972, 107.5257325176075],
      tumbuhan: [-6.309838680093361, 107.39932251395658],
      jasa: [-6.364434665490979, 107.35881042899564],
      pakan: [-6.44358852539394, 107.34988403739408],
      ikan: [-6.242950762610697, 107.33409119071439],
    },
  },
  {
    id: 3216,
    nama: "BEKASI",
    latLng: [-6.162498695212783, 107.08856078375423],
    latLngTernak: {
      itik: [-6.1168355510137635, 107.02590698756676],
      unggas_lokal: [-6.1830568462105875, 107.07259888079186],
      domba: [-6.256095458789616, 107.05611938906534],
      kambing: [-6.328441405021484, 107.07397217176909],
      sapi_perah: [-6.389176881206079, 107.13577026574349],
      sapi_potong: [-6.234935784123396, 107.15774292137883],
      kelinci: [-6.1892006711300915, 107.16186279431047],
      tumbuhan: [-6.336454944694203, 107.17204285087064],
      jasa: [-6.301648784883256, 107.13221741141751],
      pakan: [-6.090714928578195, 107.09651184501125],
      ikan: [-5.998533174329328, 107.04570007743314],
    },
  },
  {
    id: 3217,
    nama: "BANDUNG BARAT",
    latLng: [-6.980956, 107.351078],
    latLngTernak: {
      itik: [-6.763436199763462, 107.40547085031714],
      unggas_lokal: [-6.857524645385242, 107.4123373052032],
      domba: [-6.946823304618484, 107.33199978303645],
      kambing: [-6.995214743521682, 107.29560757214041],
      sapi_perah: [-7.020430832036162, 107.36152553904645],
      sapi_potong: [-6.914105141933398, 107.4329366698613],
      kelinci: [-6.80502829490115, 107.52700710180014],
      tumbuhan: [-6.816671031486219, 107.4446411174722],
      jasa: [-6.956417799055935, 107.39932251395658],
      pakan: [-7.069548170712799, 107.35949707450345],
      ikan: [-7.0395644869027585, 107.30387878837064],
    },
  },
  {
    id: 3271,
    nama: "KOTA BOGOR",
    latLng: [-6.565750531874478, 106.78933358942456],
    latLngTernak: {
      itik: [-6.547251688729926, 106.78093314858896],
      unggas_lokal: [-6.571466090484993, 106.78536477633035],
      domba: [-6.6132881872092755, 106.80309128729594],
      kambing: [-6.628695437169352, 106.80752291503735],
      sapi_perah: [-6.641901268256993, 106.82820384449724],
      sapi_potong: [-6.666844648309299, 106.83189686761507],
      kelinci: [-6.569843366975289, 106.8099329540827],
      tumbuhan: [-6.5616139690377775, 106.75593567313626],
      jasa: [-6.524776635438497, 106.77653503837062],
      pakan: [-6.61277241008524, 106.80674744071439],
      ikan: [-6.6448290035800115, 106.78820801200345],
    },
  },
  {
    id: 3272,
    nama: "KOTA SUKABUMI",
    latLng: [-6.934037645617014, 106.92837326368465],
    latLngTernak: {
      itik: [-6.908113759058315, 106.92102542926139],
      unggas_lokal: [-6.920249279702108, 106.91930972094667],
      domba: [-6.938113189275707, 106.92656275344761],
      kambing: [-6.955153313962992, 106.92278620326029],
      sapi_perah: [-6.960776419517709, 106.91591974837424],
      sapi_potong: [-6.960265230886964, 106.9322275787286],
      kelinci: [-6.962491797420122, 106.8996831597507],
      tumbuhan: [-6.968175093281187, 106.88128280744422],
      jasa: [-6.956588196727861, 106.94651413068641],
      pakan: [-6.944830612386125, 106.951663971995],
      ikan: [-6.931027855791152, 106.94685745344032],
    },
  },
  {
    id: 3273,
    nama: "KOTA BANDUNG",
    latLng: [-6.918912, 107.704445],
    latLngTernak: {
      itik: [-6.880607926716806, 107.58925307756775],
      unggas_lokal: [-6.909238472237899, 107.59028304580066],
      domba: [-6.934459183463044, 107.58719314110193],
      kambing: [-6.923893914437513, 107.61774886534482],
      sapi_perah: [-6.884698110515617, 107.61774886534482],
      sapi_potong: [-6.9252571882587874, 107.66066420838261],
      kelinci: [-6.9228714564864955, 107.6888166734154],
      tumbuhan: [-6.904614047238073, 107.63394928188063],
      jasa: [-6.950965040915355, 107.63978576869704],
      pakan: [-6.955054615454706, 107.68510437221266],
      ikan: [-6.903250713826217, 107.67514801234938],
    },
  },
  {
    id: 3274,
    nama: "KOTA CIREBON",
    latLng: [-6.739622333437783, 108.555754864566],
    latLngTernak: {
      itik: [-6.707912920818534, 108.55747147828752],
      unggas_lokal: [-6.722745000375971, 108.55867310789257],
      domba: [-6.7355309126478735, 108.57137604943176],
      kambing: [-6.741838505284549, 108.54940339379642],
      sapi_perah: [-6.744225140556219, 108.53412553167496],
      sapi_potong: [-6.763999665884042, 108.54545518223694],
      kelinci: [-6.776954950639553, 108.53996201832811],
      tumbuhan: [-6.738429081953197, 108.52923202619422],
      jasa: [-6.766045336823014, 108.54656982526649],
      pakan: [-6.730587142353988, 108.5417633067118],
      ikan: [-6.701093497583645, 108.55995941266883],
    },
  },
  {
    id: 3275,
    nama: "KOTA BEKASI",
    latLng: [-6.279066403894924, 106.96869628734164],
    latLngTernak: {
      itik: [-6.193596217185364, 106.99012131264392],
      unggas_lokal: [-6.236914223521016, 107.01553955408681],
      domba: [-6.267595647441635, 106.964703071201],
      kambing: [-6.2928613480032976, 107.00283043336536],
      sapi_perah: [-6.330757593783075, 106.99556807866739],
      sapi_potong: [-6.334366615283761, 106.93928482975811],
      kelinci: [-6.268250861760114, 106.92823881773256],
      tumbuhan: [-6.218377540534329, 106.98252869071439],
      jasa: [-6.244315907853541, 106.97634888114408],
      pakan: [-6.368529131109202, 106.92416382255033],
      ikan: [-6.313933579167068, 106.94064331473781],
    },
  },
  {
    id: 3276,
    nama: "KOTA DEPOK",
    latLng: [-6.398761813041703, 106.81298817507286],
    latLngTernak: {
      itik: [-6.3753999431889214, 106.7709984533652],
      unggas_lokal: [-6.340911266504874, 106.78732886632736],
      domba: [-6.403800641767778, 106.76028161985879],
      kambing: [-6.423578766816298, 106.7883495171375],
      sapi_perah: [-6.420536028317385, 106.837340756024],
      sapi_potong: [-6.405829202719616, 106.87969776464462],
      kelinci: [-6.352017477562421, 106.84594715852589],
      tumbuhan: [-6.396165918807985, 106.81787109584548],
      jasa: [-6.398895397110041, 106.83915710658766],
      pakan: [-6.409813164433615, 106.7921218893025],
      ikan: [-6.414930787438788, 106.82542419643141],
    },
  },
  {
    id: 3277,
    nama: "KOTA CIMAHI",
    latLng: [-6.854472, 107.543102],
    latLngTernak: {
      itik: [-6.845305423014718, 107.54338073835243],
      unggas_lokal: [-6.857406346308759, 107.54406738386024],
      domba: [-6.870188677947581, 107.54320907697547],
      kambing: [-6.8817776950135325, 107.53462600812782],
      sapi_perah: [-6.883822786318728, 107.54767227277625],
      sapi_potong: [-6.8925143260190636, 107.54389572248328],
      kelinci: [-6.875956758775802, 107.53834408482972],
      tumbuhan: [-6.896945245719411, 107.52724456891883],
      jasa: [-6.903080296873566, 107.54406738386024],
      pakan: [-6.879221318493218, 107.55745697126258],
      ikan: [-6.913475618628448, 107.55471038923133],
    },
  },
  {
    id: 3278,
    nama: "KOTA TASIKMALAYA",
    latLng: [-7.354869113784819, 108.22107722967726],
    latLngTernak: {
      itik: [-7.305494165169421, 108.20082118776345],
      unggas_lokal: [-7.324223238102235, 108.20906093362669],
      domba: [-7.359636060075244, 108.18880489171286],
      kambing: [-7.366786383453284, 108.22142055242156],
      sapi_perah: [-7.364062464335202, 108.25746944057332],
      sapi_potong: [-7.415473607559666, 108.26296260448214],
      kelinci: [-7.4004934950652705, 108.20734431990518],
      tumbuhan: [-7.3549759745921595, 108.23957061977126],
      jasa: [-7.333183573502867, 108.26085663051343],
      pakan: [-7.4036645003981, 108.24575042934156],
      ikan: [-7.30491996501384, 108.17296600551344],
    },
  },
  {
    id: 3279,
    nama: "KOTA BANJAR",
    latLng: [-7.3816741731390305, 108.56796105331364],
    latLngTernak: {
      itik: [-7.360053329045907, 108.49757979365494],
      unggas_lokal: [-7.370608517840623, 108.51594756047511],
      domba: [-7.371970459371129, 108.53448698866744],
      kambing: [-7.376907462302117, 108.54512999374082],
      sapi_perah: [-7.372481186365251, 108.55645964430278],
      sapi_potong: [-7.3655011998102395, 108.57002089270273],
      kelinci: [-7.3629475187864175, 108.62443754934569],
      tumbuhan: [-7.399578956126347, 108.56229400844313],
      jasa: [-7.357359453610965, 108.64263153285718],
      pakan: [-7.369617143392623, 108.60658264369704],
      ikan: [-7.352592482774965, 108.55714416713452],
    },
  },
];

export const strategicCommodityList = [
  {
    key: 3010,
    silindaId: 1,
    commodityTitle: "beras (medium)",
    imageSVG: <BerasIcon />,
  },
  {
    key: 3002,
    silindaId: 2,
    commodityTitle: "cabai merah",
    imageSVG: <CabaiBesarIcon />,
  },

  {
    key: 3001,
    silindaId: 3,
    commodityTitle: "bawang merah",
    imageSVG: <BawangMerahIcon />,
  },

  {
    key: 3009,
    silindaId: 4,
    commodityTitle: "daging ayam (RAS)",
    imageSVG: <DagingAyamIcon />,
  },

  {
    key: 3006,
    silindaId: 5,
    commodityTitle: "telur ayam (RAS)",
    imageSVG: <TelurAyamIcon />,
  },

  {
    key: 3007,
    silindaId: 6,
    commodityTitle: "daging sapi",
    imageSVG: <DagingSapiIcon />,
  },

  {
    key: 3005,
    silindaId: 7,
    commodityTitle: "minyak goreng (kemasan)",
    imageSVG: <MinyakGorengIcon />,
  },

  {
    key: 3004,
    silindaId: 8,
    commodityTitle: "gula pasir (lokal)",
    imageSVG: <GulaPasirIcon />,
  },

  {
    key: 3011,
    silindaId: 15,
    commodityTitle: "bawang putih",
    imageSVG: <BawangPutihIcon />,
  },

  {
    key: 3008,
    silindaId: 22,
    commodityTitle: "jagung",
    imageSVG: <JagungIcon />,
  },

  {
    key: 3003,
    silindaId: 18,
    commodityTitle: "cabai rawit",
    imageSVG: <CabaiRawitIcon />,
  },
];

export const commodityPublicIconPath = [
  {
    key: 3010,
    silindaId: 1,
    path: "/icons/komoditas/1.svg",
  },
  {
    key: 3002,
    silindaId: 2,
    path: "/icons/komoditas/2.svg",
  },

  {
    key: 3001,
    silindaId: 3,
    path: "/icons/komoditas/3.svg",
  },

  {
    key: 3009,
    silindaId: 4,
    path: "/icons/komoditas/4.svg",
  },

  {
    key: 3006,
    silindaId: 5,
    path: "/icons/komoditas/5.svg",
  },

  {
    key: 3007,
    silindaId: 6,
    path: "/icons/komoditas/6.svg",
  },

  {
    key: 3005,
    silindaId: 7,
    path: "/icons/komoditas/7.svg",
  },

  {
    key: 3004,
    silindaId: 8,
    path: "/icons/komoditas/8.svg",
  },

  {
    key: 3011,
    silindaId: 15,
    path: "/icons/komoditas/15.svg",
  },

  {
    key: 3008,
    silindaId: 22,
    path: "/icons/komoditas/22.svg",
  },

  {
    key: 3003,
    silindaId: 18,
    path: "/icons/komoditas/18.svg",
  },
];

export const pphScoreFieldName = {
  Kuesioner: "questionnaires",
  "%": "presentations",
  "% AKE*)": "presentations_AKE",
  "Berat Pangan Gram/Kapita/Hari": "food_weights",
  Bobot: "quality",
  "Kkal/Kapita": "kilocalories",
  "Skor AKE": "scores_AKE",
  "Skor Aktual": "actual_scores",
  "Skor Maks": "max_scores",
  "Skor PPH": "pph_scores",
  Tren: "trends",
};

export const romanToNumber = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
};

export const months = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  mei: 5,
  jun: 6,
  juni: 6,
  jul: 7,
  juli: 7,
  aug: 8,
  agu: 8,
  ags: 8,
  sep: 9,
  oct: 10,
  okt: 10,
  nov: 11,
  dec: 12,
  des: 12,
};

export const monthsLong = {
  januari: 1,
  februari: 2,
  maret: 3,
  april: 4,
  mei: 5,
  juni: 6,
  juli: 7,
  agustus: 8,
  september: 9,
  oktober: 10,
  november: 11,
  desember: 12,
};

export const livestockCommodityMap = [
  "itik",
  "unggas_lokal",
  "domba",
  "kambing",
  "sapi_perah",
  "sapi_potong",
  "kelinci",
  "tumbuhan",
  "jasa",
  "pakan",
  "ikan",
];

export const FARM = {
  farm_population: {
    livestock: [
      {
        key: "sapi_potong",
        value: "Sapi Potong",
      },
      {
        key: "sapi_perah",
        value: "Sapi Perah",
      },
      {
        key: "kerbau",
        value: "Kerbau",
      },
      {
        key: "kuda",
        value: "Kuda",
      },
      {
        key: "kambing",
        value: "Kambing",
      },
      {
        key: "domba",
        value: "Domba",
      },
      {
        key: "babi",
        value: "Babi",
      },
      {
        key: "ayam_buras",
        value: "Ayam Ras Buras",
      },
      {
        key: "ayam_petelur",
        value: "Ayam Ras Petelur",
      },
      {
        key: "ayam_pedaging",
        value: "Ayam Ras Pedaging",
      },
      {
        key: "itik",
        value: "Itik",
      },
      {
        key: "itik_manila",
        value: "Itik Manila",
      },
      {
        key: "merpati",
        value: "Merpati",
      },
      {
        key: "puyuh",
        value: "Puyuh",
      },
      {
        key: "kelinci",
        value: "Kelinci",
      },
      {
        key: "sapi_lokal",
        value: "Sapi Lokal",
      },
      {
        key: "sapi_import",
        value: "Sapi Import",
      },
    ],
  },
};

export const COMMODITY_STOK = {
  keyVal: [
    {
      key: "gkg",
      value: "Gabah Kering Giling",
    },
    {
      key: "beras_m",
      value: "Beras Medium",
    },
    {
      key: "beras_p",
      value: "Beras Premium",
    },
  ],
};

export const VACCINES = {
  keyVal: [
    {
      key: "rabies",
      value: "Rabies",
    },
    {
      key: "avian_influenza",
      value: "Avian Influenza",
    },
    {
      key: "anthrax",
      value: "Anthrax",
    },
    {
      key: "brucellosis",
      value: "Brucellosis",
    },
  ],
};

export const iconTernak = {
  itik: "/icons/ternak/duck.png",
  unggas_lokal: "/icons/ternak/hen.png",
  domba: "/icons/ternak/sheep.png",
  kambing: "/icons/ternak/goat.png",
  sapi_perah: "/icons/ternak/cow.png",
  sapi_potong: "/icons/ternak/cow2.png",
  kelinci: "/icons/ternak/rabbit.png",
  tumbuhan: "/icons/ternak/tree.png",
  jasa: "/icons/ternak/jasa.png",
  pakan: "/icons/ternak/pakan.png",
  ikan: "/icons/ternak/fish.png",
};

export const neraca_status = {
  rise: 1,
  rise_high: 1,
  stagnant: 2,
  fall: 3,
};

export const HARI_RAYA = {
  keyVal: [
    {
      keyIndex: 0,
      key: "lebaran",
      value: "Lebaran",
    },
  ],
};

export const BASE_URL = process.env.NEXT_PUBLIC_SILINDA_API;

export const monthLabels = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const redaksiPrognosa = [
  "Telur ayam menjadi komoditas yang defisit di Minggu ke-3 Nopember 2022. Hal tersebut dikarenakan produksi telur ayam di Jawa Barat tidak terlalu tinggi, sehingga neraca komoditas telur ayam menjadi defisit.",
  "Selain dari produsen di provinsi Jawa Barat, pasokan telur ayam juga berasal dari provinsi di sekitarnya yaitu DKI Jakarta, Jawa Timur, Jawa Tengah, dan Banten. Sehingga pemenuhan defisit neraca telur ayam dapat terpenuhi dari luar daerah.",
  "Terdapat 6 Kabupaten Kota yang mengalami defisit telur ayam, yaitu Kab. Bandung, Kab. Cianjur, Kab. Sumedang, Kab. Indramayu, Kab. Bandung Barat, dan Kota Cimahi.",
];

export const silindaCities = [
  {
    city_id: "10",
    name: "Kab. Bandung",
    bpsCode: 3204,
  },
  {
    city_id: "11",
    name: "Kab. Bandung Barat",
    bpsCode: 3217,
  },
  {
    city_id: "12",
    name: "Kab. Bekasi",
    bpsCode: 3216,
  },
  {
    city_id: "13",
    name: "Kab. Bogor",
    bpsCode: 3201,
  },
  {
    city_id: "14",
    name: "Kab. Ciamis",
    bpsCode: 3207,
  },
  {
    city_id: "15",
    name: "Kab. Cianjur",
    bpsCode: 3203,
  },
  {
    city_id: "16",
    name: "Kab. Cirebon",
    bpsCode: 3209,
  },
  {
    city_id: "17",
    name: "Kab. Garut",
    bpsCode: 3205,
  },
  {
    city_id: "18",
    name: "Kab. Indramayu",
    bpsCode: 3212,
  },
  {
    city_id: "19",
    name: "Kab. Karawang",
    bpsCode: 3215,
  },
  {
    city_id: "20",
    name: "Kab. Kuningan",
    bpsCode: 3208,
  },
  {
    city_id: "21",
    name: "Kab. Majalengka",
    bpsCode: 3210,
  },
  {
    city_id: "22",
    name: "Kab. Pangandaran",
    bpsCode: 3218,
  },
  {
    city_id: "23",
    name: "Kab. Purwakarta",
    bpsCode: 3214,
  },
  {
    city_id: "24",
    name: "Kab. Subang",
    bpsCode: 3213,
  },
  {
    city_id: "25",
    name: "Kab. Sukabumi",
    bpsCode: 3202,
  },
  {
    city_id: "26",
    name: "Kab. Sumedang",
    bpsCode: 3211,
  },
  {
    city_id: "27",
    name: "Kab. Tasikmalaya",
    bpsCode: 3206,
  },
  {
    city_id: "1",
    name: "Kota Bandung",
    bpsCode: 3273,
  },
  {
    city_id: "2",
    name: "Kota Banjar",
    bpsCode: 3279,
  },
  {
    city_id: "3",
    name: "Kota Bekasi",
    bpsCode: 3275,
  },
  {
    city_id: "4",
    name: "Kota Bogor",
    bpsCode: 3271,
  },
  {
    city_id: "5",
    name: "Kota Cimahi",
    bpsCode: 3277,
  },
  {
    city_id: "6",
    name: "Kota Cirebon",
    bpsCode: 3274,
  },
  {
    city_id: "7",
    name: "Kota Depok",
    bpsCode: 3276,
  },
  {
    city_id: "8",
    name: "Kota Sukabumi",
    bpsCode: 3272,
  },
  {
    city_id: "9",
    name: "Kota Tasikmalaya",
    bpsCode: 3278,
  },
];

export const cookieMaxAge = 60 * 60;

export const commodityStockPerDay = [
  {
    key: 3010,
    silindaId: 1,
    commodity: "beras",
    aman: 14,
    waspada: 7,
    rentan: 0,
  },
  {
    key: 3002,
    silindaId: 2,
    commodity: "cabai_besar",
    aman: 2,
    waspada: 1,
    rentan: 0,
  },

  {
    key: 3001,
    silindaId: 3,
    commodity: "bawang_merah",
    aman: 14,
    waspada: 7,
    rentan: 0,
  },

  {
    key: 3009,
    silindaId: 4,
    commodity: "daging_ayam",
    aman: 8,
    waspada: 4,
    rentan: 0,
  },

  {
    key: 3006,
    silindaId: 5,
    commodity: "telur_ayam",
    aman: 8,
    waspada: 4,
    rentan: 0,
  },

  {
    key: 3007,
    silindaId: 6,
    commodity: "daging_sapi",
    aman: 8,
    waspada: 4,
    rentan: 0,
  },

  {
    key: 3005,
    silindaId: 7,
    commodity: "minyak_goreng",
    aman: 30,
    waspada: 14,
    rentan: 0,
  },

  {
    key: 3004,
    silindaId: 8,
    commodity: "gula_pasir",
    aman: 30,
    waspada: 14,
    rentan: 0,
  },

  {
    key: 3011,
    silindaId: 15,
    commodity: "bawang_putih",
    aman: 30,
    waspada: 14,
    rentan: 0,
  },

  {
    key: 3008,
    silindaId: 22,
    commodity: "jagung",
    aman: 60,
    waspada: 30,
    rentan: 0,
  },

  {
    key: 3003,
    silindaId: 18,
    commodity: "cabai_rawit",
    aman: 2,
    waspada: 1,
    rentan: 0,
  },
];

export const EMAIL_REGEX = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
);

export const colors = [
  "#1BACE3",
  "#F5BAC3",
  "#BC293F",
  "#1045B0",
  "#B0C6F0",
  "#711826",
  "#DDC300",
  "#092969",
  "#AAD6C1",
  "#FFA500",
  "#808080",
  "#F44336",
  "#FFB900",
  "#008444",
];

export const kelompok_pangan_list = [
  'padi_padian',
  'umbi_umbian',
  'pangan_hewani',
  'minyak_dan_lemak',
  'buah_biji_berminyak',
  'kacang_kacangan',
  'gula',
  'sayur_dan_buah',
  'lain_lain',
];