import React, { useState, useEffect } from 'react';
import ReactFlow from 'react-flow-renderer';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  function findSharedDigits(n1, n2) {
    let sharedDigits = '';
    let hasShared = false;
    
    for (let digit = 0; digit <= 9; digit++) {
      let foundInFirst = false;
      let foundInSecond = false;
      let tempN1 = n1;
      let tempN2 = n2;
      
      while (tempN1 > 0) {
        if (tempN1 % 10 === digit) {
          foundInFirst = true;
          break;
        }
        tempN1 = Math.floor(tempN1 / 10);
      }
      
      while (tempN2 > 0) {
        if (tempN2 % 10 === digit) {
          foundInSecond = true;
          break;
        }
        tempN2 = Math.floor(tempN2 / 10);
      }
      
      if (foundInFirst && foundInSecond) {
        sharedDigits += digit + ' ';
        hasShared = true;
      }
    }
    
    return hasShared ? sharedDigits.trim() : 'N/A';
  }

  const handleCalculate = () => {
    if (!num1 || !num2) {
      setResult('Please enter both numbers');
      return;
    }
    const result = findSharedDigits(parseInt(num1), parseInt(num2));
    setResult(result);
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setResult('');
  };

  const handleNumberInput = (e, setter) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} p-8 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Shared Digits Calculator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md mb-6`}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">First Number:</label>
            <input
              type="text"
              value={num1}
              onChange={(e) => handleNumberInput(e, setNum1)}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder="Enter a number"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Second Number:</label>
            <input
              type="text"
              value={num2}
              onChange={(e) => handleNumberInput(e, setNum2)}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder="Enter a number"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleCalculate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Calculate Shared Digits
            </button>
            <button
              onClick={handleClear}
              className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Clear
            </button>
          </div>
          
          {result && (
            <div className={`mt-4 p-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h2 className="font-medium">Shared Digits:</h2>
              <p className="text-lg">{result}</p>
            </div>
          )}
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md mb-6`}>
          <h2 className="text-xl font-bold mb-4">Algorithm Steps</h2>
          <div className="pl-6">
            <p>Step 1: Input NUM1, NUM2</p>
            <p>Step 2: Set SHARED_COUNT = 0</p>
            <p>Step 3: For each DIGIT from 0 to 9</p>
            <div className="pl-8">
              <p>if (DIGIT exists in NUM1) then</p>
              <div className="pl-8">
                <p>if (DIGIT exists in NUM2) then</p>
                <div className="pl-8">
                  <p>Print DIGIT</p>
                  <p>SHARED_COUNT = SHARED_COUNT + 1</p>
                </div>
                <p>endif</p>
              </div>
              <p>endif</p>
            </div>
            <p>Step 4: if (SHARED_COUNT = 0) then</p>
            <div className="pl-8">
              <p>Print "N/A"</p>
            </div>
            <p>Step 5: End</p>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md mb-6`}>
          <h2 className="text-xl font-bold mb-4">Pseudocode</h2>
          <pre className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded overflow-x-auto`}>
{`BEGIN
    Input NUM1, NUM2
    SHARED_COUNT ← 0
    DIGIT ← 0

    WHILE DIGIT ≤ 9 DO
        TEMP1 ← NUM1
        TEMP2 ← NUM2
        FOUND1 ← FALSE
        FOUND2 ← FALSE

        WHILE TEMP1 > 0 DO
            IF (TEMP1 MOD 10) = DIGIT THEN
                FOUND1 ← TRUE
            ENDIF
            TEMP1 ← TEMP1 DIV 10
        ENDWHILE

        WHILE TEMP2 > 0 DO
            IF (TEMP2 MOD 10) = DIGIT THEN
                FOUND2 ← TRUE
            ENDIF
            TEMP2 ← TEMP2 DIV 10
        ENDWHILE

        IF FOUND1 = TRUE AND FOUND2 = TRUE THEN
            PRINT DIGIT
            SHARED_COUNT ← SHARED_COUNT + 1
        ENDIF

        DIGIT ← DIGIT + 1
    ENDWHILE

    IF SHARED_COUNT = 0 THEN
        PRINT "N/A"
    ENDIF
END`}
          </pre>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
          <h2 className="text-xl font-bold mb-4">Flowchart</h2>
          <div style={{ height: '900px' }}>
            <ReactFlow />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;