import React, { ReactNode, useRef, useState, useEffect } from "react";

interface OffcanvasProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  position?: "left" | "right";
}

const Offcanvas = ({
  children,
  isOpen,
  setIsOpen,
  position = "right",
}: OffcanvasProps): JSX.Element => {
  const offcanvasRef = useRef<HTMLDivElement>(null);
  const [offcanvasWidth, setOffcanvasWidth] = useState(0);

  useEffect(() => {
    if (offcanvasRef.current) {
      setOffcanvasWidth(offcanvasRef.current.offsetWidth);
    }
  }, [isOpen]);

  const toggleButtonBaseClasses =
    "fixed z-450 bg-green-600 text-white rounded px-4 py-1 transition-transform duration-500 ease-in-out";

  const toggleButtonPositionClasses = {
    right: "top-1/2 translate-x-1/2 right-0",
    left: "top-1/2 translate-x-1/2 left-0",
  };

  const toggleButtonClasses = `${toggleButtonBaseClasses} ${toggleButtonPositionClasses[position]}`;

  const backdropClasses =
    "fixed overflow-hidden bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out z-450";

  const offcanvasClasses = {
    left: "w-screen max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform",
    right:
      "w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform",
  };
  const toggleButtonStyle = {
    left: {
      transform: isOpen ? `translateX(${offcanvasWidth}px)` : "translateX(0)",
    },
    right: {
      transform: isOpen ? `translateX(-${offcanvasWidth}px)` : "translateX(0)",
    },
  };

  const offcanvasStyle = {
    right: {
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
    },
    left: {
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    },
  };

  const backdropTransitions = {
    right: isOpen
      ? " transition-opacity opacity-100 duration-500 translate-x-0"
      : " transition-all duration-500 opacity-0 translate-x-full",
    left: isOpen
      ? " transition-opacity opacity-100 duration-500 translate-x-0"
      : " transition-all  duration-500 opacity-0 -translate-x-full",
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        style={{ ...toggleButtonStyle[position] }}
        className={toggleButtonClasses}
        onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>
      {/* Backdrop */}
      <main className={backdropClasses + backdropTransitions[position]}>
        {/* Offcanvas */}
        <section
          ref={offcanvasRef}
          style={{ ...offcanvasStyle[position] }}
          className={offcanvasClasses[position]}>
          {children}
        </section>
        <section
          className="w-screen h-full cursor-pointer"
          onClick={() => {
            setIsOpen(false);
          }}></section>
      </main>
    </>
  );
};

export default Offcanvas;
