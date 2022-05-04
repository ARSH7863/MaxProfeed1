import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent border-dotted rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
