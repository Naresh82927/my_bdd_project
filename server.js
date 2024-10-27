const express = require('express');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const pdf = require('pdfkit');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.post('/calculate', async (req, res) => {
  const { num1, num2 } = req.body;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Sheet1');
  sheet.addRow([num1, num2]);
  sheet.getCell('C1').value = parseInt(num1) + parseInt(num2);

  await workbook.xlsx.writeFile('public/result.xlsx');

  const updatedWorkbook = new ExcelJS.Workbook();
  await updatedWorkbook.xlsx.readFile('public/result.xlsx');
  const updatedSheet = updatedWorkbook.getWorksheet('Sheet1');
  const result = updatedSheet.getCell('C1').value;

  res.json({ result });
});

app.get('/generate-pdf', async (req, res) => {
  const doc = new pdf();
  doc.pipe(fs.createWriteStream('public/result.pdf'));

  

  doc.end();
  res.json({ message: 'PDF generated' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
