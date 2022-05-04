const CardContainer: React.FunctionComponent = ({ children }) => {
  return (
    <div className="flex justify-center min-h-screen sm:h-screen sm:py-72">
      <div className="card overflow-visible w-[30rem] min-h-screen sm:min-h-full sm:px-5 py-5 bg-white self-center rounded-md">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

export default CardContainer;
