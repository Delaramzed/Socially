import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 flex-row gap-6 px-4 md:grid-cols-5">
      {children}
    </div>
  );
};

export default Container;
