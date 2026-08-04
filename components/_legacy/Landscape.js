/* eslint-disable @next/next/no-img-element */
const landscape = "/media/landscape.svg";

const Landscape = () => {
  return (
    <section>
      <div className="w-full">
        <img
          src={landscape}
          alt="landscape"
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
};

export default Landscape;
