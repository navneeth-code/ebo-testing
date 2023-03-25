const Subheading = ({ main, second }) => {
  return (
    <div className="relative after:contents-[''] after:absolute after:w-16 after:h-[2px] after:-bottom-2 after:bg-[#2136d4] text-black">
      <h1 className="text-xl font-bold">{main}</h1>
      <p className="w-[90%] lg:w-[80%] leading-[1.4rem] mt-1">{second}</p>
    </div>
  );
};

export default Subheading;
