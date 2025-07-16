import CarCardBase from "./CarCardBase";

const CarCardPublic = ({ car }) => {
  const status = (
    <span className="text-sm bg-black text-white px-2 py-1 rounded">⭐ 4.5</span>
  );

  const actions = <div />;

  return <CarCardBase car={car} status={status} actions={actions} />;
};

export default CarCardPublic;
