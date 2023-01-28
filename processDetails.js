const fs = require('fs');
let arrayplayers=[];

const data=fs.readFileSync('./playerDetailsArray.json','utf8');

const playerDetails=JSON.parse(data);

// console.log(playerDetails.length);
playerDetails.forEach(player => {
    let obj = {
        "id": player.id,
        "name": player.name,
        "xgs": []
    };
    obj.xgs = player.history.map((elem,i)=>{
        if(i>player.history.length-5 && i<player.history.length-1) {
            return elem.expected_goals;
        }
        return 0;

    }).map(parseFloat).reduce((a,b) => a+b,0).toFixed(3);

    arrayplayers.push(obj);
    // console.log(obj);
});

arrayplayers.sort(function(a, b) {
    return b.xgs - a.xgs;
  });

let players=arrayplayers.slice(0,5);

console.log(players);

try {
    // convert JSON object to a string
    const arrjson = JSON.stringify(players, null, 4)

    // write file to disk
    fs.writeFileSync('./fiveGameweeksXG.json', arrjson, 'utf8')

    console.log(`Top 5 Players is written successfully!`)
} catch (err) {
    console.log(`Error writing file: ${err}`)
}