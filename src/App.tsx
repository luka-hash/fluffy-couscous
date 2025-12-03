import { useState } from "react";
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
  const count = countWords(text);
  return <div className="absolute bottom-2 right-2">{count} words, ~{Math.round(count / 180)} minutes</div>;
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
