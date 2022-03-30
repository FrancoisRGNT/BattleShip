let play = document.getElementById('play');
let leaderBoard = document.getElementById('leaderboard')


play.addEventListener('click', () =>{

    console.log('event')

    window.location.href = '/play'

});

leaderBoard.addEventListener('click', () =>{

    console.log('event')

    window.location.href = '/leaderboard'

});