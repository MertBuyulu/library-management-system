import Skeleton from "./Skeleton";

const StatCard = (props) => {
  if (props.Amount && props.Name) {
    return (
      <div className="flex flex-col items-center w-80 h-80 bg-[#6D696A] rounded-lg">
        <div className="text-white font-semibold p-2">{props.Name}</div>
        <div className="mt-20 text-white text-4xl font-bold">
          {props.Amount}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-80 h-80 bg-[#6D696A] rounded-lg">
      <Skeleton />
    </div>
  );
};

export default StatCard;
