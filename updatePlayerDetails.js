let arr=[];
const fs = require('fs');

fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
    .then(res=>res.json())
    .then(data=> {
        loopPlayers(data);
    })

function loopPlayers(data) {
    let lengthCheck=data.elements.length;
    for(let i=0;i<data.elements.length;i++) {
        setTimeout(() => {
            fetch(`https://fantasy.premierleague.com/api/element-summary/${data.elements[i].id}/`)
            .then(res=>res.json())
            .then(data2=> {
                writetofile(lengthCheck, data2, data.elements[i].id, data.elements[i].web_name, data.teams[data.elements[i].team-1].short_name);
            })
            .catch(err=> {
                console.log(err);
            });
        }, 400);       
    }
}

function writetofile(lengthCheck, data2, id, name, team) {
    // console.log(data2);
    // console.log("hello"+i);
    let newdata = {
        "id": id,
        "name": name+"("+team+")",
        ...data2
    };
    arr.push(newdata);
    console.log("Below num should be equal to "+lengthCheck);
    console.log(arr.length);
    if (arr.length===lengthCheck){
        writeArray();
    }
}

function writeArray(){

    try {
        // convert JSON object to a string
        const arrjson = JSON.stringify(arr, null, 4)
    
        // write file to disk
        fs.writeFileSync('./playerDetailsArray.json', arrjson, 'utf8')
    
        console.log(`File is written successfully!`)
    } catch (err) {
        console.log(`Error writing file: ${err}`)
    }
}