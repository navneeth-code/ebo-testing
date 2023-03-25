import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div className="absolute top-[26%] left-[40%] rounded-md z-20">
      <ClipLoader color="#2136d4" />
    </div>
  );
};

export default Spinner;
