export const Loader = () => {
  return <span className="loading loading-ring loading-lg text-info"></span>;
};

export const FullLoader = () => {
  return (
    <div className="z-50 w-full grow flex items-center justify-center bg-black/30">
      <Loader />
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black/30">
      <Loader />
    </div>
  );
};

export const AbsoluteLoader = () => {
  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black/30">
      <Loader />
    </div>
  );
};

export default Loader;
