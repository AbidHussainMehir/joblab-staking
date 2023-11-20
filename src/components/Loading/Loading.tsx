const Loading = ({ fullscreen }: { fullscreen?: boolean }) => {
  return (
    <div
      className={`"relative flex items-center justify-center w-full ${
        fullscreen ? 'min-h-screen' : 'py-20'
      }`}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
