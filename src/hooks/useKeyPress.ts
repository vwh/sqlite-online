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

      const isKeyMatched = keys.some((key) => {
        if (key === "ctrl") return false;
        if (caseSensitive) {
          return key === event.key;
        } else {
          return key.toLowerCase() === eventKey;
        }
      });

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
};

export default useKeyPress;
