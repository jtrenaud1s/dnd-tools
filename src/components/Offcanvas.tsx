import { useState } from "react";

interface OffcanvasProps {
  title: string;
  side?: "top" | "left" | "bottom" | "right";
  backdrop?: boolean;
  children: React.ReactNode;
}

const Offcanvas = ({
  title,
  side = "right",
  backdrop = true,
  children,
}: OffcanvasProps): JSX.Element => {
  const [show, setShow] = useState(false);

  const onToggle = () => {
    setShow(!show);
  };

  const tabClasses =
    side === "right"
      ? "fixed top-1/2 right-0 -translate-y-1/2 w-8 h-16 bg-red-800 cursor-pointer flex items-center justify-center z-450"
      : side === "left"
      ? "fixed top-1/2 left-0 -translate-y-1/2 w-8 h-16 bg-red-800 cursor-pointer flex items-center justify-center z-450"
      : side === "top"
      ? "fixed top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-red-800 cursor-pointer flex items-center justify-center z-450"
      : "fixed bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-red-800 cursor-pointer flex items-center justify-center z-450";

  const offcanvasClasses =
    side === "right"
      ? "absolute top-0 left-full h-full w-1/2 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white transition-transform transform pointer-events-none z-450"
      : side === "left"
      ? "absolute top-0 right-full h-full w-1/2 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white transition-transform transform pointer-events-none z-450"
      : side === "top"
      ? "absolute top-full left-0 h-full w-full px-4 py-5 overflow-y-auto bg-white transition-transform transform pointer-events-none z-450"
      : "absolute bottom-full left-0 h-full w-full px-4 py-5 overflow-y-auto bg-white transition-transform transform pointer-events-none z-450";

  const contentClasses =
    side === "right"
      ? "absolute top-0 left-full h-full w-full px-4 py-5 overflow-y-auto z-450"
      : side === "left"
      ? "absolute top-0 right-full h-full w-full px-4 py-5 overflow-y-auto z-450"
      : side === "top"
      ? "absolute top-full left-0 h-full w-full px-4 py-5 overflow-y-auto z-450"
      : "absolute bottom-full left-0 h-full w-full px-4 py-5 overflow-y-auto z-450";

  return (
    <>
      <div className={tabClasses} onClick={onToggle}>
        <span className="text-white text-xl">
          {side === "right"
            ? "→"
            : side === "left"
            ? "←"
            : side === "top"
            ? "↓"
            : "↑"}
        </span>
      </div>
      {backdrop && show && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-450"
          onClick={onToggle}></div>
      )}
      <div
        className={
          offcanvasClasses +
          (show
            ? " translate-x-0"
            : ` ${
                side === "right"
                  ? "translate-x-1/2 sm:translate-x-2/3 md:translate-x-1/2 lg:translate-x-1/3 xl:translate-x-1/4"
                  : side === "left"
                  ? "-translate-x-1/2 sm:-translate-x-2/3 md:-translate-x-1/2 lg:-translate-x-1/3 xl:-translate-x-1/4"
                  : side === "top"
                  ? "-translate-y-1/2 sm:-translate-y-2/3 md:-translate-y-1/2 lg:-translate-y-1/3 xl:-translate-y-1/4"
                  : "translate-y-1/2 sm:translate-y-2/3 md:translate-y-1/2 lg:translate-y-1/3 xl:translate-y-1/4"
              }`)
        }>
        <div className={contentClasses}>
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Offcanvas;
