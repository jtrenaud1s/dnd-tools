import React from "react";

export const Spinner = () => {
  return <div className="spinner"></div>;
};

const Loadscreen = () => {
  return (
    <div className="loadscreen">
      <Spinner />
    </div>
  );
};

export default Loadscreen;
