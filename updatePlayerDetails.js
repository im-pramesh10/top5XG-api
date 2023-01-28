let arr=[];
const fs = require('fs');

fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
    .then(res=>res.json())
    .then(data=>{
        loopPlayers(data);
    })

function loopPlayers(data){
    let lengthCheck=data.elements.length;
    for(let i=0;i<data.elements.length;i++) {
        fetch(`https://fantasy.premierleague.com/api/element-summary/${data.elements[i].id}/`)
            .then(res=>res.json())
            .then(data2=>{
                hello(lengthCheck, data2, i);
            })
            .catch(err=> {
                console.log(err);
            });
            
    }
}

function hello(lengthCheck, data2,i) {
    console.log(data2);
    // console.log("hello"+i);
    arr.push(data2);
    console.log(lengthCheck);
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