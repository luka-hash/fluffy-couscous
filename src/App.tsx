import { useEffect, useState } from "react";
import { WordCounter } from "./Components/WordCounter.tsx";
import "./App.css";

function App() {
  const [text, setText] = useState<string>(() => {
    const storetext = localStorage.getItem("text");
    return storetext ? storetext : "";
  });

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  return (
    <div className="relative">
      <textarea
        name="text"
        id="text"
        placeholder="your text here"
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const idx = e.currentTarget.selectionStart;
            if (idx !== null) {
              const front = text.slice(0, idx);
              const back = text.slice(idx);
              setText(front + "    " + back);
              e.currentTarget.setSelectionRange(idx + 4, idx + 4);
            }
          }
        }}
        className="w-[600px] h-[400px] p-4 border border-gray-300 rounded-md focus:outline-none"
        value={text}
      />
      <WordCounter text={text} />
    </div>
  );
}

export default App;
