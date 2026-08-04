import React from "react";

const SummaryProvince = ({ data, isMobile = false }) => {
  const neracaColor = React.useMemo(() => {
    if (!data) return;
    return data.ketersediaan / data.kebutuhan <= 89 / 100
      ? "bg-red-dkpp"
      : data.ketersediaan / data.kebutuhan > 110 / 100
      ? "bg-green-dkpp"
      : data.ketersediaan / data.kebutuhan > 89 / 100 &&
        data.ketersediaan / data.kebutuhan <= 110 / 100
      ? "bg-yellow-dkpp"
      : "bg-white";
  }, [data]);

  return (
    <div
      className={`md:px-2 sm:px-0 z-10 ${
        !isMobile && "bottom-2 right-0 absolute"
      } ${isMobile && "mx-2 w-max"}`}
    >
      <div className="sm:w-full w-full px-2 mb-4">
        <div className="flex items-center border rounded-2xl p-4 bg-white">
          <div className="">
            <p className="text-base font-bold text-green-700">
              Neraca Jawa Barat (TON)
            </p>
            <div className="flex items-center justify-between">
              <div className="flex-row mr-4">
                <h5 className="text-sm font-bold text-gray-800">
                  Ketersediaan
                </h5>
                <p className="text-sm font-bold text-gray-900 p-2">
                  {data.ketersediaan.toFixed(2)}
                </p>
              </div>
              <div className="flex-row mr-4">
                <h5 className="text-sm font-bold text-gray-800">Kebutuhan</h5>
                <p className="text-sm font-bold text-gray-900 p-2">
                  {data.kebutuhan.toFixed(2)}
                </p>
              </div>
              <div className="flex-row mr-4">
                <h5 className="text-sm font-bold text-gray-800">Neraca</h5>
                <p
                  className={`text-sm font-bold text-gray-900 rounded-full p-2 ${neracaColor}`}
                >
                  {data.neraca.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryProvince;
