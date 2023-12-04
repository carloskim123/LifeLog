/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import '../styles/sheet.css';

interface FontSettings {
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
}

interface SheetSettings {
  id: string;
  name: string;
  font: FontSettings;
  content: string;
}

interface SheetMeasurements {
  rows: number;
  cols: number;
}

const Sheet = (): JSX.Element => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const currentDate = new Date().toLocaleDateString();
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialSheetSettings: SheetSettings = {
    id: currentDate,
    name: 'Daily Journal',
    font: {
      fontSize: 23,
      fontWeight: 'normal',
      fontFamily: 'Space Mono',
    },
    content: '',
  };

  const [sheetSettings, setSheetSettings] = useState<SheetSettings>(() => {
    const storedSheet = localStorage.getItem(currentDate);
    return storedSheet ? JSON.parse(storedSheet) : initialSheetSettings;
  });

  const sheetMeasurements: SheetMeasurements = { rows: 30, cols: 100 };

  const adjustFontSize = (amount: number, direction: 'increase' | 'decrease') => {
    setSheetSettings((prevSettings) => ({
      ...prevSettings,
      font: {
        ...prevSettings.font,
        fontSize: direction === 'increase'
          ? prevSettings.font.fontSize + amount
          : prevSettings.font.fontSize - amount,
      },
    }));
  };

  const increaseFontSize = () => {
    adjustFontSize(1, 'increase');
  };

  const decreaseFontSize = () => {
    adjustFontSize(1, 'decrease');
  };

  const changeFontWeight = () => {
    setSheetSettings((prevSettings) => ({
      ...prevSettings,
      font: {
        ...prevSettings.font,
        fontWeight: prevSettings.font.fontWeight === 'bold' ? 'normal' : 'bold',
      },
    }));
  };

  const changeFontFamily = () => {
    const availableFontFamilies = [
      'Arial', 'Times New Roman', 'Verdana', 'Special Elite', 'Delius', 'Orbitron',
      'Poppins', 'Cursive', 'Space Mono', 'Monospace', 'Fira Code', 'Jetbrains Mono',
    ];

    const currentFontFamilyIndex = availableFontFamilies.indexOf(sheetSettings.font.fontFamily);
    const nextFontFamilyIndex = (currentFontFamilyIndex + 1) % availableFontFamilies.length;
    const nextFontFamily = availableFontFamilies[nextFontFamilyIndex];

    setSheetSettings((prevSettings) => ({
      ...prevSettings,
      font: {
        ...prevSettings.font,
        fontFamily: nextFontFamily,
      },
    }));
  };

 

  const calculateCharCount = () => {
    setCharCount(sheetSettings.content.length);
  };

  const calculateWordCount = () => {
    const words = sheetSettings.content.trim().split(/\s+/);
    const wordCount = words.length;
    setWordCount(wordCount);
  };

  const updateSheetForCurrentDay = () => {
    const newDate = new Date().toLocaleDateString();
    if (newDate !== sheetSettings.id) {
      localStorage.setItem(sheetSettings.id, JSON.stringify(sheetSettings));
      setSheetSettings(initialSheetSettings);
    }
  };

  useEffect(() => {
    updateSheetForCurrentDay();
  }, []);

  useEffect(() => {
    localStorage.setItem(sheetSettings.id, JSON.stringify(sheetSettings));
  }, [sheetSettings]);

  useEffect(() => {
    calculateCharCount();
    calculateWordCount();
  }, [sheetSettings.content]);

  return (
    <article>
      {screenSize.width <=  1118 ? (
        <div style={{height: "100vh", width: "100%"}}>Ooops.. Lifelog isn't optimized for screens as small as yours. Try opening the site on a larger one</div>
      ) : (
        <Box id="sheetpage">
          <div id="options">
            <div className="top-level">
              <label id="sheet-date">
                Date: {sheetSettings.id}&nbsp;&nbsp;&nbsp;
              </label>
              <div id="font-settings">
                <div>
                  <label id="sheet-font">font size:&nbsp;&nbsp;</label>
                  <button id="font-increase" onClick={increaseFontSize}>
                    +
                  </button>
                  <button id="font-decrease" onClick={decreaseFontSize}>
                    -
                  </button>
                </div>
                <div>
                  <label id="sheet-font">font weight:&nbsp;&nbsp;</label>
                  <button id="font-weight" onClick={changeFontWeight}>
                    {sheetSettings.font.fontWeight}
                  </button>
                </div>
                <div>
                  <label id="sheet-font">Font family:&nbsp;&nbsp;</label>
                  <button id="font-family" onClick={changeFontFamily}>
                    Change Font Family
                  </button>
                </div>
              </div>

  
              <hr />
            </div>
          </div>

          <section>
            <textarea
              value={sheetSettings.content}
              onChange={(e) => {
               
                  setSheetSettings((prevSettings) => ({
                    ...prevSettings,
                    content: e.target.value,
                  }));

                  calculateCharCount();
                  calculateWordCount();
              }}
              style={{
                fontSize: `${sheetSettings.font.fontSize}px`,
                fontWeight: `${sheetSettings.font.fontWeight}`,
                fontFamily: `${sheetSettings.font.fontFamily}`,
              }}
              placeholder="What's on your mind... "
              id="journal-content"
              cols={sheetMeasurements.cols}
              rows={sheetMeasurements.rows}
            ></textarea>
          </section>

          <div id="sheet-results">
            <div className="result-element">
              <p>Character Count: {charCount}</p>
              <p>Word Count: {wordCount}</p>
            </div>
          </div>
        </Box>
      )}
    </article>
  );
};

export default Sheet;
