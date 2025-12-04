import { useEffect, useState } from "react";
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
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(180);
  const [showConfig, setShowConfig] = useState<boolean>(false);

  // useEffect(() => {
  //   const storedWordsPerMinute = localStorage.getItem("wordsPerMinute");
  //   if (storedWordsPerMinute) {
  //     setWordsPerMinute(Number(storedWordsPerMinute));
  //   }
  // }, []);

  useEffect(() => {
    (() => {
      const storedWordsPerMinute = localStorage.getItem("wordsPerMinute");
      if (storedWordsPerMinute) {
        setWordsPerMinute(Number(storedWordsPerMinute));
      }
    })();

  }, [wordsPerMinute]);

  const numWords = countWords(text);
  return (
    <div className="absolute bottom-2 right-2">
      <span>{numWords} words</span>,
      <span>
        ~{Math.round(numWords / wordsPerMinute)} minutes
        <span onClick={() => setShowConfig(!showConfig)}>⚙️</span>
      </span>
      {showConfig && (
        <div className="inline">
          <input
            type="range"
            min={50}
            max={600}
            value={wordsPerMinute}
            onChange={(e) => {
              setWordsPerMinute(Number(e.target.value));
              localStorage.setItem("wordsPerMinute", e.target.value.toString());
            }}
          />
          <span>{wordsPerMinute}</span>
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
