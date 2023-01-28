let arr=[];
fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
    .then(res=>res.json())
    .then(data=>{
        console.log(data.elements.length-1);
        loopPlayers(data);
    })

function loopPlayers(data){
    for(let i=0;i<data.elements.length;i++) {
        fetch(`https://fantasy.premierleague.com/api/element-summary/${data.elements[i].id}/`)
            .then(res=>res.json())
            .then(data2=>{
                hello(data2, i);
            })
            .catch(err=>console.log(err));
    }
}

function hello(data2,i) {
    console.log(data2);
    console.log("hello"+i);
    arr.push(data2);
    console.log(arr.length);
}