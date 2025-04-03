import { useEffect } from "react";

const useKeyPress = (
  keyCombo: string,
  callback: () => void,
  caseSensitive = false
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = keyCombo.split("+");
      const ctrlPressed = keys.includes("ctrl") ? event.ctrlKey : true;

      let eventKey = event.key;
      if (!caseSensitive) {
        eventKey = eventKey.toLowerCase();
      }

      const keyPressed = keys.some((key) =>
        key === "ctrl"
          ? false
          : caseSensitive
            ? key === event.key
            : key.toLowerCase() === eventKey
      );

      if (ctrlPressed && keyPressed) {
        event.preventDefault();
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
