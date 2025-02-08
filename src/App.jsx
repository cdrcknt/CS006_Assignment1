import React, { useState, useEffect } from 'react';

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
    const result = findSharedDigits(parseInt(num1), parseInt(num2));
    setResult(result);
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setResult('');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100'} p-8 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 py-2">
            Shared Digits Calculator
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' : 'bg-white hover:bg-gray-100 border-gray-300'} transition-colors duration-200 shadow-lg`}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-gray-300'} p-8 rounded-2xl shadow-xl mb-6 border`}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">First Number:</label>
            <input
              type="text"
              value={num1}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setNum1(value);
              }}
              placeholder="Enter first number"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-700'
              }`}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Second Number:</label>
            <input
              type="text"
              value={num2}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setNum2(value);
              }}
              placeholder="Enter second number"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-700'
              }`}
            />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg border border-transparent hover:border-blue-400"
            >
              Calculate Shared Digits
            </button>
            <button
              onClick={handleClear}
              className={`px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg border ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200' : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-700'
              }`}
            >
              Clear
            </button>
          </div>
          
          {result && (
            <div className={`mt-6 p-6 rounded-lg border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}>
              <h2 className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2">Shared Digits:</h2>
              <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{result}</p>
            </div>
          )}
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-gray-300'} p-8 rounded-2xl shadow-xl mb-6 border`}>
          <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Algorithm Steps</h2>
          <div className={`pl-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
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

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-gray-300'} p-8 rounded-2xl shadow-xl border`}>
          <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Flowchart</h2>
          <div style={{ height: '900px' }}>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;