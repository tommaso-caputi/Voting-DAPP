async function showCandidates(){
    const abi = '[ { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" } ], "name": "addCandidate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "candidates", "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "candidatesCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]'
    const contractAddress = "0xC756ddE0C51233B3b7af734b8EE86302DBcC5B63"
    
    const signer = new ethers.Wallet('28d45e4da4cf34e4c2eebfc4f53653639a3011b5e1931ccf03d9151140005e9b', ethers.getDefaultProvider('ropsten'));
    
    const contract = new ethers.Contract(contractAddress, abi, signer);

    cands = [];
    const n= await contract.candidatesCount();   
    for (let i = 1; i < n.toNumber()+1;  i++) {
        a = await contract.candidates(i); 
        cands.push(a['name']);
    }
    for (let i = 0; i < cands.length; i++) {
        var ul = document.getElementById("list");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(cands[i]));
        ul.appendChild(li); 
    }
}


async function addCandidate(){
    const abi = '[ { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" } ], "name": "addCandidate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "candidates", "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "candidatesCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]'
    const contractAddress = "0xC756ddE0C51233B3b7af734b8EE86302DBcC5B63"
    
    const signer = new ethers.Wallet('28d45e4da4cf34e4c2eebfc4f53653639a3011b5e1931ccf03d9151140005e9b', ethers.getDefaultProvider('ropsten'));
    
    const contract = new ethers.Contract(contractAddress, abi, signer);
    

    var name = document.getElementById("name");
    const add = await contract.addCandidate(name.value);
    name.value = "";
    console.log(add);
    document.getElementById("loader").style.display = 'block';
    const receipt = await add.wait();
    document.getElementById("loader").style.display = 'none';
    //alert("Transaction done");

    //document.getElementById("name").innerHTML = "";
    //document.getElementById("list").innerHTML = "";
    //showCandidates();
    const n= await contract.candidatesCount();   
    a = await contract.candidates(n.toNumber()); 
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(a['name']));
    ul.appendChild(li); 
}   

