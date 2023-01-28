fetch('https://fantasy.premierleague.com/api/element-summary/215/')
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err));