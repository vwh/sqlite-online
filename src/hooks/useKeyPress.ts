import { useEffect } from "react";

const useKeyPress = (
  keyCombo: string,
  callback: () => void,
  caseSensitive = false
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = keyCombo.split("+");
      const isCtrlRequired = keys.includes("ctrl");

      let eventKey = event.key;
      if (!caseSensitive) {
        eventKey = eventKey.toLowerCase();
      }

      const isCtrlPressed = event.ctrlKey || !isCtrlRequired;
      const isKeyMatched = keys.some((key) =>
        key === "ctrl"
          ? false
          : caseSensitive
            ? key === event.key
            : key.toLowerCase() === eventKey
      );

      if (isCtrlPressed && isKeyMatched) {
        event.preventDefault();
        event.stopPropagation();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyCombo, callback, caseSensitive]);

  return;
};

export default useKeyPress;
