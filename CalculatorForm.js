import React, { useState } from 'react';
import './styles.css';
const NumberCalculatorForm = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const calculate = async () => {
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ num1, num2 })
    });

    const data = await response.json();
    setResult(`Result: ${data.result}`);
  };

  const printPDF = () => {
   
  };

  return (
    <div>
      <form>
        <label htmlFor="num1">Number 1:</label>
        <input type="number" id="num1" value={num1} onChange={(e) => setNum1(e.target.value)} required/><br/><br/>
        
        <label htmlFor="num2">Number 2:</label>
        <input type="number" id="num2" value={num2} onChange={(e) => setNum2(e.target.value)} required/><br/><br/>

        <button type="button" onClick={calculate}>Calculate</button>
        <button type="button" onClick={printPDF}>Print PDF</button>
      </form>

      <p>{result}</p>
    </div>
  );
};

export default NumberCalculatorForm;
