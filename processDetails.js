const fs = require('fs');
let arrarpl=[];

const data=fs.readFileSync('./playerDetailsArray.json','utf8');

const playerDetails=JSON.parse(data);

// console.log(playerDetails.length);
playerDetails.forEach(player => {
    let arr = [];
    arr = player.history.map((elem,i)=>{
        if(i>player.history.length-5 && i<player.history.length-1) {
            return elem.expected_goals;
        }
        return 0;

    });
    arrarpl.push(arr);
    console.log(arr);
});

console.log(arrarpl.length);