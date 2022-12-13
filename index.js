const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello World');
});

app.get('/mean', (req, res) => {
    if(!queryBool) {
        return res.status(400).json("Invalid: Must include 'nums' query!");
    }
    let nums = req.query.nums.split(",");
    let mean = 0;
    for(let n of nums) {
        mean += parseInt(n);
    }
    return res.json({response: 
                      {operation: "mean",
                       value: mean / nums.length}});
});

app.get('/median', (req, res) => {
    if(!queryBool) {
        return res.status(400).json("Invalid: Must include 'nums' query!");
    }
    let nums = req.query.nums.split(",").sort((a, b) => a - b).map(v => parseInt(v));
    let median = nums.length % 2 === 1 
        ? nums[Math.floor(nums.length / 2)] 
        : (nums[(nums.length / 2) - 1] + nums[(nums.length / 2)]) / 2 ;
    
    return res.json({response: 
                      {operation: "median",
                       value: median}});
});

app.get('/mode', (req, res) => {
    queryBool = req.query.nums ? true : false;
    if(!queryBool) {
        return res.status(400).json("Invalid: Must include 'nums' query!");
    }
    let nums = req.query.nums.split(",").sort((a, b) => a - b).map(v => parseInt(v));

    let count = 0;
    let max = 0;
    let mode = undefined;

    for(let i = 0; i < nums.length; i++) {
        if(isNaN(nums[i])) {
            return res.status(400).json('Invalid: All values must be numbers!');
        }
        count += 1;
        if(count > max) {
            max = count;
            mode = nums[i];
        }
        if(nums[i+1] && nums[i] != nums[i+1]) {
            count = 0;
        }
    }
    
    return res.json({response: 
                      {operation: "mode",
                       value: mode}});
});

app.listen(3000, () => {
    console.log('App on port 3000');
});