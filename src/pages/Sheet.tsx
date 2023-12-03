/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import '../styles/sheet.css';

interface SheetSettings {
  id: string;
  name: string;
  font: {
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
  };
  content: string;
}

interface SheetMeasurements {
  rows: number;
  cols: number;
}

const Sheet = (): JSX.Element => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const getCurrentDate = () => new Date().toLocaleDateString();
  const currentDate = getCurrentDate();

  const [sheetSettings, setSheetSettings] = useState<SheetSettings>(() => {
    const storedSheet = localStorage.getItem(currentDate);
    return storedSheet
      ? JSON.parse(storedSheet)
      : {
          id: currentDate,
          name: 'Daily Journal',
          font: {
            fontSize: 23,
            fontWeight: 'normal',
            fontFamily: 'Space Mono', // Initial font family
          },
          content: '',
        };
  });

  const sheetMeasurements: SheetMeasurements = { rows: 30, cols: 100 };

  // Function to check and update sheet for the current day
  const updateSheetForCurrentDay = () => {
    const newDate = getCurrentDate();
    if (newDate !== sheetSettings.id) {
      localStorage.setItem(sheetSettings.id, JSON.stringify(sheetSettings));
      setSheetSettings({
        id: newDate,
        name: 'Daily Journal',
        font: {
          fontSize: 23,
          fontWeight: 'normal',
          fontFamily: 'Special Elite', // Initial font family
        },
        content: '',
      });
    }
  };

  const increaseFontSize = () => {
    setSheetSettings((prevSettings) => ({
      ...prevSettings,
      font: {
        ...prevSettings.font,
        fontSize: prevSettings.font.fontSize + 1,
      },
    }));
  };

  const decreaseFontSize = () => {
    setSheetSettings((prevSettings) => ({
      ...prevSettings,
      font: {
        ...prevSettings.font,
        fontSize: prevSettings.font.fontSize - 1,
      },
    }));
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
      'Arial',
      'Times New Roman',
      'Verdana',
      'Special Elite',
      'Delius',
      'Orbitron',
      'Poppins',
      'Cursive',
      'Space Mono',
      'Monospace',
      'Fira Code',
      'Jetbrains Mono',
    ];
    const currentFontFamilyIndex = availableFontFamilies.indexOf(
      sheetSettings.font.fontFamily
    );
    const nextFontFamilyIndex =
      (currentFontFamilyIndex + 1) % availableFontFamilies.length;
    const nextFontFamily = availableFontFamilies[nextFontFamilyIndex];

    setSheetSettings((prevSettings) => ({
      ...prevSettings,
      font: {
        ...prevSettings.font,
        fontFamily: nextFontFamily,
      },
    }));
  };

  const calculateCharCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
  };

  const calculateWordCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    setWordCount(wordCount);
  };

  useEffect(() => {
    // Check and update the sheet for the current day
    updateSheetForCurrentDay();
  }, []);

  useEffect(() => {
    // Update sheetSettings in localStorage whenever it changes
    localStorage.setItem(sheetSettings.id, JSON.stringify(sheetSettings));
  }, [sheetSettings]);

  return (
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
          <hr></hr>
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

            calculateCharCount(e);
            calculateWordCount(e);
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
  );
};

export default Sheet;
