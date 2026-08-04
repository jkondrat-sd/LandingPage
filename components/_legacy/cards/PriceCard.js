import _ from "lodash";

const PriceCard = ({ children, trait, data }) => {
  const pricingMethod = (data, f) => {
    if (data.length === 0) {
      return;
    }
    return data.reduce(
      (preVal, curVal) => f(preVal, parseInt(curVal.current_price)),
      data[0].current_price
    );
  };

  const average = (data) => {
    return data.reduce((a, b) => a + parseInt(b.current_price), 0);
  };

  const price =
    trait.name == "max_value"
      ? pricingMethod(data, Math.max)
      : trait.name == "min_value"
      ? pricingMethod(data, Math.min)
      : Math.round(average(data) / data.length);

  const priceyCityTag = (data) => {
    if (data.length === 0) {
      return;
    }
    return trait.name == "max_value" && data.length > 1
      ? _.orderBy(
          data,
          [
            function (o) {
              return parseInt(o.current_price);
            },
          ],
          ["desc"]
        )[0]["name"]
      : trait.name == "min_value"
      ? _.orderBy(
          data,
          [
            function (o) {
              return parseInt(o.current_price);
            },
          ],
          ["asc"]
        )[0]["name"]
      : "Harga rata Kabupaten/Kota";
  };

  return (
    <div className="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-full w-full px-2 mb-4">
      <div className="flex items-center border rounded-2xl p-4">
        {children}
        <div className="ml-4">
          <p className={`text-sm font-sm ${trait.textColor}`}>
            {trait.nameId.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
              letter.toUpperCase()
            )}
          </p>
          <h5 className="text-2xl font-bold text-gray-800 mt-2">
            {"Rp"}
            {price} {"/Kg"}
          </h5>
          <p className={`text-sm font-sm ${trait.textColor}`}>
            {priceyCityTag(data)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
