let tab = document.getElementById('tab');



let socket = io();

socket.emit('getData');

socket.on('returnData', (users) => {



    for (let i = 0; i < users.length; i++){
        let tr = document.createElement('tr')
        tab.appendChild(tr)
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');

        th1.innerHTML = users[i][0];
        th2.innerHTML = users[i][1];
        tr.appendChild(th1);
        tr.appendChild(th2);

        if (i === 10) break;
    }
});






