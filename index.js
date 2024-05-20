const express = require('express');
const XLSX = require('xlsx');

const app = express();

app.get('/selectAndUpdate', (req, res) => {
    // Read the Excel file
    const workbook = XLSX.readFile('POCTestData.xlsx');
    
    // Get the first sheet as a JSON array
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const records = XLSX.utils.sheet_to_json(worksheet);

    // Perform the bulk update
    // You would replace this with your actual bulk update function
    bulkUpdate(records);

    res.send('Records updated...');
});

function bulkUpdate(result) {

    // Prepare the bulk update payload
    let updatePayload = result.map(record => {
        // Update the column value for each record
        record.QUEUECD = 'END';
        return record;
    });
    console.log(updatePayload);

    // Perform the bulk update
    let updateSql = 'UPDATE your_table SET ? WHERE condition';
    // db.query(updateSql, [updatePayload], (err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    //     res.send('Records updated...');
    // });

}
// Start the server
app.listen('3000', () => {
    console.log('Server started on port 3000');
});