import React, { useState } from 'react';
import ReactFlow from 'react-flow-renderer';

function App() {
  const [num1, setNum1] = useState('899565290');
  const [num2, setNum2] = useState('443105992');
  const [result, setResult] = useState('');

  // Function to find shared digits
  function findSharedDigits(n1, n2) {
    let sharedDigits = '';
    let hasShared = false;
    
    // Check each possible digit (0-9)
    for (let digit = 0; digit <= 9; digit++) {
      let foundInFirst = false;
      let foundInSecond = false;
      let tempN1 = n1;
      let tempN2 = n2;
      
      // Check first number
      while (tempN1 > 0) {
        if (tempN1 % 10 === digit) {
          foundInFirst = true;
          break;
        }
        tempN1 = Math.floor(tempN1 / 10);
      }
      
      // Check second number
      while (tempN2 > 0) {
        if (tempN2 % 10 === digit) {
          foundInSecond = true;
          break;
        }
        tempN2 = Math.floor(tempN2 / 10);
      }
      
      // If digit is found in both numbers
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

  // Flowchart nodes with proper shapes
  const nodes = [
    {
      id: 'start',
      type: 'input',
      data: { label: 'Start' },
      position: { x: 300, y: 0 },
      style: { background: '#f0f0f0', border: '1px solid #999', borderRadius: '50px' }
    },
    {
      id: 'input',
      type: 'default',
      data: { label: 'Input num1, num2' },
      position: { x: 300, y: 80 },
      style: { background: '#f0f0f0', border: '1px solid #999', height: '60px', width: '200px' }
    },
    {
      id: 'init',
      type: 'default',
      data: { label: 'digit = 0\nsharedDigits = empty\nhasShared = false' },
      position: { x: 300, y: 160 },
      style: { background: '#f0f0f0', border: '1px solid #999', height: '80px', width: '200px' }
    },
    {
      id: 'check_digit',
      type: 'default',
      data: { label: 'digit <= 9?' },
      position: { x: 300, y: 260 },
      style: { background: '#e6f3ff', border: '1px solid #1a73e8', transform: 'rotate(45deg)', height: '100px', width: '100px' }
    },
    {
      id: 'connector1',
      type: 'default',
      data: { label: 'A' },
      position: { x: 500, y: 260 },
      style: { background: '#f0f0f0', border: '1px solid #999', borderRadius: '50%', height: '40px', width: '40px' }
    },
    {
      id: 'check_num1',
      type: 'default',
      data: { label: 'Check if digit exists in num1' },
      position: { x: 300, y: 380 },
      style: { background: '#f0f0f0', border: '1px solid #999', height: '60px', width: '200px' }
    },
    {
      id: 'check_num2',
      type: 'default',
      data: { label: 'Check if digit exists in num2' },
      position: { x: 300, y: 460 },
      style: { background: '#f0f0f0', border: '1px solid #999', height: '60px', width: '200px' }
    },
    {
      id: 'found_both',
      type: 'default',
      data: { label: 'Found in both?' },
      position: { x: 300, y: 540 },
      style: { background: '#e6f3ff', border: '1px solid #1a73e8', transform: 'rotate(45deg)', height: '100px', width: '100px' }
    },
    {
      id: 'add_digit',
      type: 'default',
      data: { label: 'Add digit to shared\nhasShared = true' },
      position: { x: 500, y: 540 },
      style: { background: '#f0f0f0', border: '1px solid #999', height: '60px', width: '200px' }
    },
    {
      id: 'increment',
      type: 'default',
      data: { label: 'digit++' },
      position: { x: 300, y: 660 },
      style: { background: '#f0f0f0', border: '1px solid #999', height: '60px', width: '200px' }
    },
    {
      id: 'connector2',
      type: 'default',
      data: { label: 'A' },
      position: { x: 100, y: 660 },
      style: { background: '#f0f0f0', border: '1px solid #999', borderRadius: '50%', height: '40px', width: '40px' }
    },
    {
      id: 'check_result',
      type: 'default',
      data: { label: 'hasShared?' },
      position: { x: 300, y: 760 },
      style: { background: '#e6f3ff', border: '1px solid #1a73e8', transform: 'rotate(45deg)', height: '100px', width: '100px' }
    },
    {
      id: 'output_shared',
      type: 'default',
      data: { label: 'Output sharedDigits' },
      position: { x: 200, y: 880 },
      style: { background: '#f0f0f0', border: '1px solid #999', height: '60px', width: '200px' }
    },
    {
      id: 'output_na',
      type: 'default',
      data: { label: 'Output "N/A"' },
      position: { x: 400, y: 880 },
      style: { background: '#f0f0f0', border: '1px solid #999', height: '60px', width: '200px' }
    },
    {
      id: 'end',
      type: 'output',
      data: { label: 'End' },
      position: { x: 300, y: 980 },
      style: { background: '#f0f0f0', border: '1px solid #999', borderRadius: '50px' }
    }
  ];

  const edges = [
    { id: 'e1', source: 'start', target: 'input' },
    { id: 'e2', source: 'input', target: 'init' },
    { id: 'e3', source: 'init', target: 'check_digit' },
    { id: 'e4', source: 'check_digit', target: 'check_num1', label: 'Yes' },
    { id: 'e5', source: 'check_digit', target: 'connector1', label: 'No' },
    { id: 'e6', source: 'check_num1', target: 'check_num2' },
    { id: 'e7', source: 'check_num2', target: 'found_both' },
    { id: 'e8', source: 'found_both', target: 'add_digit', label: 'Yes' },
    { id: 'e9', source: 'found_both', target: 'increment', label: 'No' },
    { id: 'e10', source: 'add_digit', target: 'increment' },
    { id: 'e11', source: 'increment', target: 'connector2' },
    { id: 'e12', source: 'connector1', target: 'check_result' },
    { id: 'e13', source: 'check_result', target: 'output_shared', label: 'Yes' },
    { id: 'e14', source: 'check_result', target: 'output_na', label: 'No' },
    { id: 'e15', source: 'output_shared', target: 'end' },
    { id: 'e16', source: 'output_na', target: 'end' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Shared Digits Calculator</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">First Number:</label>
            <input
              type="text"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Second Number:</label>
            <input
              type="text"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <button
            onClick={handleCalculate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Calculate Shared Digits
          </button>
          
          {result && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h2 className="font-medium">Shared Digits:</h2>
              <p className="text-lg">{result}</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Algorithm Steps</h2>
          <ol className="list-decimal pl-6">
            <li>Start the program</li>
            <li>Input two numbers (num1 and num2)</li>
            <li>Initialize variables:
              <ul className="list-disc pl-6">
                <li>digit = 0</li>
                <li>sharedDigits = empty string</li>
                <li>hasShared = false</li>
              </ul>
            </li>
            <li>While digit ≤ 9:
              <ul className="list-disc pl-6">
                <li>Check if digit exists in num1</li>
                <li>Check if digit exists in num2</li>
                <li>If digit exists in both numbers:
                  <ul className="list-disc pl-6">
                    <li>Add digit to sharedDigits</li>
                    <li>Set hasShared to true</li>
                  </ul>
                </li>
                <li>Increment digit</li>
              </ul>
            </li>
            <li>If hasShared is true:
              <ul className="list-disc pl-6">
                <li>Display sharedDigits</li>
              </ul>
            </li>
            <li>Else:
              <ul className="list-disc pl-6">
                <li>Display "N/A"</li>
              </ul>
            </li>
            <li>End program</li>
          </ol>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Pseudocode</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-x-auto">
{`BEGIN
    INPUT num1, num2
    
    digit ← 0
    sharedDigits ← ""
    hasShared ← false
    
    WHILE digit ≤ 9 DO
        foundInFirst ← false
        foundInSecond ← false
        tempN1 ← num1
        tempN2 ← num2
        
        WHILE tempN1 > 0 DO
            IF tempN1 MOD 10 = digit THEN
                foundInFirst ← true
                BREAK
            END IF
            tempN1 ← tempN1 DIV 10
        END WHILE
        
        WHILE tempN2 > 0 DO
            IF tempN2 MOD 10 = digit THEN
                foundInSecond ← true
                BREAK
            END IF
            tempN2 ← tempN2 DIV 10
        END WHILE
        
        IF foundInFirst AND foundInSecond THEN
            sharedDigits ← sharedDigits + digit + " "
            hasShared ← true
        END IF
        
        digit ← digit + 1
    END WHILE
    
    IF hasShared THEN
        PRINT sharedDigits
    ELSE
        PRINT "N/A"
    END IF
END`}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Flowchart</h2>
          <div style={{ height: '1200px' }}>
            <ReactFlow 
              nodes={nodes}
              edges={edges}
              fitView
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;