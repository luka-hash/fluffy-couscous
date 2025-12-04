import { useEffect, useState, useMemo } from "react";
import "./App.css";

function countWords(
  text: string,
  locale: string = "en",
  granularity: "grapheme" | "word" | "sentence" = "word",
): number {
  const segmenter = new Intl.Segmenter(locale, { granularity: granularity });
  return [...segmenter.segment(text)].filter((segment) => segment.isWordLike).length;
}

function WordCounter({ text }: { text: string }) {
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(() => {
    const storedWordsPerMinute = localStorage.getItem("wordsPerMinute");
    return storedWordsPerMinute ? Number(storedWordsPerMinute) : 180;
  });
  const [showConfig, setShowConfig] = useState<boolean>(false);


  useEffect(() => {
    localStorage.setItem("wordsPerMinute", wordsPerMinute.toString());
  }, [wordsPerMinute]);

  const numWords = useMemo(() => countWords(text), [text]);
  const readingTime = useMemo(() => Math.round(numWords / wordsPerMinute), [numWords, wordsPerMinute]);

  return (
    <div className="absolute bottom-2 right-2 flex items-center gap-3 text-sm text-gray-400">
      <span>{numWords} words</span>
      <span>~{readingTime} min</span>

      <button
        onClick={() => setShowConfig(!showConfig)}
        className="text-lg hover:opacity-70 transition-opacity"
        aria-label="Configure reading speed"
      >
        ⚙️
      </button>

      {showConfig && (
        <div className="flex items-center gap-2 ml-1">
          <input
            type="range"
            min={50}
            max={600}
            step={5}
            value={wordsPerMinute}
            onChange={(e) => setWordsPerMinute(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-s font-mono">{wordsPerMinute} wpm</span>
        </div>
      )}
    </div>
  );
}

function App() {
  const [text, setText] = useState<string>("");

  return (
    <div className="relative">
      <textarea
        name="text"
        id="text"
        placeholder="your text here"
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="w-[600px] h-[400px] p-4 border border-gray-300 rounded-md focus:outline-none"
        value={text}
      />
      <WordCounter text={text} />
    </div>
  );
}

export default App;
