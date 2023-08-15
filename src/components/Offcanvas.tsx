import { ReactNode, useRef, useState, useEffect } from "react";

interface OffcanvasProps {
  position?: "left" | "right" | "bottom" | "top";
  backdrop?: boolean;
  transparent?: boolean;
  override?: boolean;
  overrideOpen?: boolean;
  children: JSX.Element;
}

function Offcanvas({
  children,
  position = "right",
  backdrop = true,
  transparent = false,
  override = false,
  overrideOpen = false,
}: OffcanvasProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const offcanvasRef = useRef<HTMLDivElement>(null);
  const [offcanvasSize, setOffcanvasSize] = useState(0);

  useEffect(() => {
    if (offcanvasRef.current) {
      if (position === "left" || position === "right")
        setOffcanvasSize(offcanvasRef.current.offsetWidth);
      else setOffcanvasSize(offcanvasRef.current.offsetHeight);
    }
  }, [isOpen]);

  const toggleButtonBaseClasses =
    "fixed z-450 bg-green-600 text-white rounded px-4 py-1 transition-transform duration-500 ease-in-out";

  const toggleButtonPositionClasses = {
    right: "top-1/2 translate-x-1/2 right-0",
    left: "top-1/2 translate-x-1/2 left-0",
    bottom: "bottom-0 left-1/2 translate-y-1/2",
    top: "top-0 left-1/2 translate-y-1/2",
  };

  const toggleButtonClasses = `${toggleButtonBaseClasses} ${toggleButtonPositionClasses[position]}`;

  const toggleButtonStyle = {
    left: {
      transform: isOpen ? `translateX(${offcanvasSize}px)` : "translateX(0)",
    },
    right: {
      transform: isOpen ? `translateX(-${offcanvasSize}px)` : "translateX(0)",
    },
    bottom: {
      transform: isOpen ? `translateY(-${offcanvasSize}px)` : "translateY(0)",
    },
    top: {
      transform: isOpen ? `translateY(${offcanvasSize}px)` : "translateY(0)",
    },
  };

  const backdropClasses = `fixed bg-gray-900 bg-opacity-25 overflow-hidden inset-0 transform ease-in-out z-450`;

  const offCanvasBaseClasses =
    `absolute shadow-xl delay-400 duration-500 ease-in-out transition-all transform z-450 p-2 ${transparent ? "bg-transparent" : "bg-white"}`;

  const offcanvasPositionClasses = {
    left: "w-1/6 max-w-lg left-0 top-0 h-full",
    right: "w-1/6 max-w-lg right-0 top-0 h-full",
    bottom: "w-full max-h-lg bottom-0 left-0 h-1/6",
    top: "w-full max-h-lg top-0 left-0 h-1/6",
  };

  const offcanvasClasses = `${offCanvasBaseClasses} ${offcanvasPositionClasses[position]}`;

  const offcanvasStyle = {
    right: {
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
    },
    left: {
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    },
    bottom: {
      transform: isOpen ? "translateY(0)" : "translateY(100%)",
    },
    top: {
      transform: isOpen ? "translateY(0)" : "translateY(-100%)",
    },
  };

  const handleToggle = () => {
    if (!override) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (override) {
      setIsOpen(overrideOpen);
    }
  }, [override, overrideOpen]);

  return (
    <>
      {/* Toggle Button */}
      {!override && (
        <button
          style={{ ...toggleButtonStyle[position] }}
          className={toggleButtonClasses}
          onClick={handleToggle}>
          {isOpen ? "Close" : "Open"}
        </button>
      )}
      {/* Backdrop */}
      {backdrop && isOpen && <div className={backdropClasses} />}
      {/* Offcanvas */}
      <section
        ref={offcanvasRef}
        style={offcanvasStyle[position]}
        className={offcanvasClasses}>
        {children}
      </section>
    </>
  );
}

export default Offcanvas;
