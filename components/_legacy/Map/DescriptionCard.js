const DescriptionCard = ({ isMobile = false }) => {
  return (
    <div
      className={`md:px-2 sm:px-0  mb-4 z-10 top-2.5 right-0 ${
        !isMobile && "absolute"
      } ${isMobile && "mx-2 w-max"}`}
    >
      <div className="flex flex-col border rounded-2xl p-4 bg-white">
        <p className="text-base font-bold text-green-700">
          Keterangan Surplus dan Defisit
        </p>
        <p className="text-xs italic text-700 mb-4">
          <span className="text-red-600 text-sm">*</span>
          Klik pada area untuk melihat detail
        </p>
        <div className="flex items-center justify-between">
          <div className="flex mr-4">
            <div className="h-5 w-5 mr-2.5 bg-red-dkpp rounded-full" />
            <h5 className="text-sm font-bold text-gray-800">Defisit</h5>
          </div>
          <div className="flex mr-4">
            <div className="h-5 w-5 mr-2.5 bg-yellow-dkpp rounded-full" />
            <h5 className="text-sm font-bold text-gray-800">Aman</h5>
          </div>
          <div className="flex mr-4">
            <div className="h-5 w-5 mr-2.5 bg-green-dkpp rounded-full" />
            <h5 className="text-sm font-bold text-gray-800">Surplus</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;
