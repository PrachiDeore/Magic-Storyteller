import { useState, useEffect } from "react";
import Header from "./components/Header";
import StoryForm from "./components/StoryForm";
import StoryDisplay from "./components/StoryDisplay";
import { endings } from "./data/storyData";
import "./App.css";

function App() {
  const [character, setCharacter] = useState("");
  const [place, setPlace] = useState("");
  const [story, setStory] = useState("");

  useEffect(() => {
    const savedCharacter = localStorage.getItem("character");
    const savedPlace = localStorage.getItem("place");

    if (savedCharacter) setCharacter(savedCharacter);
    if (savedPlace) setPlace(savedPlace);
  }, []);

  const generateStory = () => {
    if (!character || !place) {
      setStory("⚠️ Please select both character and place.");
      return;
    }

    const randomEnding = endings[Math.floor(Math.random() * endings.length)];

    const finalStory = `Once upon a time, a ${character} went to a magical ${place}. 
They had many adventures and ${randomEnding}`;

    setStory(finalStory);

    localStorage.setItem("character", character);
    localStorage.setItem("place", place);
  };

  return (
    <div className="app">
      <Header />
      <StoryForm
        setCharacter={setCharacter}
        setPlace={setPlace}
        generateStory={generateStory}
      />
      <StoryDisplay story={story} />
    </div>
  );
}

export default App;
