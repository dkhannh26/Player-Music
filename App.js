const song = document.getElementById("song");
const playBtn = document.querySelector('.play-inner')
const playIcon = document.getElementById('play-icon');
const prevPlay = document.getElementById('play-prev')
const nextPlay = document.getElementById('play-next')
const durationTimer = document.querySelector('.duration')
const remainingTimer = document.querySelector('.remaining')
const range = document.getElementById('range')
const musicName = document.getElementById('music-name')
const musicImg = document.querySelector('#music-img')
const repeatIcon = document.querySelector('#repeat-icon')
const List = document.querySelector('.play-list')
let isPlaying = true;
let isRepeat = false
var isMute = false
let allSongs = [
    {
    author: 'Ampyx',
    name: 'Holo',
    link: 'holo.mp3',
    img: 'https://images.unsplash.com/photo-1661904708589-2e20885a3297?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60'
},
{
    author: 'Ampyx',
    name: 'Home',
    link: 'home.mp3',
    img: 'https://source.unsplash.com/random'
},
{
    author: 'Ampyx',
    name: 'Spark',
    link: 'spark.mp3',
    img: 'https://images.unsplash.com/photo-1682686578615-39549501dd08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60'
},
{
    author: 'Ampyx',
    name: 'Summer',
    link: 'summer.mp3',
    img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'
}

]
let songs = allSongs

currentSong = 0
song.setAttribute('src', `./music/${songs[currentSong].link}`)
musicName.textContent = `${songs[currentSong].name}`
musicImg.setAttribute('src', songs[currentSong].img)


nextPlay.addEventListener("click", () => changeSong(1))
prevPlay.addEventListener("click", () => changeSong(-1))


function changeSong(change) {
    if (change === 1) {
        currentSong++;
        if (currentSong > songs.length - 1) { currentSong = 0; }

    } else if (change === -1) {
        currentSong--;
        if (currentSong < 0) currentSong = songs.length - 1;
    }
    isPlaying = true
    console.log(songs[currentSong].img)
    song.setAttribute('src', `./music/${songs[currentSong].link}`)
    musicImg.setAttribute('src', songs[currentSong].img)
    musicName.textContent = `${songs[currentSong].name}`
    playPause();
}



playBtn.addEventListener('click', playPause)
const wave = document.querySelector('.music-wave')
function playPause() {
    if (isPlaying) {
        song.play();
        isPlaying = false;
        playIcon.name = 'pause-circle-outline'
        wave.style.width = '100px'

    } else {
        song.pause();
        playIcon.name = 'play-circle-outline'
        isPlaying = true;
        wave.style.width = '0px'
    }


}

function displayTimer() {
    const { duration, currentTime } = song;

    remainingTimer.textContent = formatTime(currentTime)
    range.max = duration
    range.value = currentTime
    if (!duration) {
        durationTimer.textContent = "00:00"
    } else {
        durationTimer.textContent = formatTime(duration);
    }

}


function formatTime(number) {
    const minutes = Math.floor(number / 60)
    const seconds = Math.floor(number - minutes * 60)

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
displayTimer()
setInterval(displayTimer, 1000)


range.addEventListener('change', handleRange)

function handleRange() {
    song.currentTime = range.value;
}

song.addEventListener('ended', handleEnded)

function handleEnded() {
    if (isRepeat) {
        changeSong(0)
    } else {
        changeSong(1)
    }
}



repeatIcon.addEventListener('click', handleRepeat)


function handleRepeat() {

    if (isRepeat) {
        isRepeat = false
        repeatIcon.classList.remove('green')
    } else {
        isRepeat = true
        repeatIcon.classList.add('green')
    }
    console.log(isRepeat)

}
let countMusicItem = 0 
let musicItem
function getPlayList () {
    let playList = songs.map((song, index) => {
        count = 0 
        musicItem = document.createElement('div')
        // List.remove(musicItem)
        console.log(musicItem.innerHTML)
        musicItem.innerHTML = `<div class = 'list-item' onClick='handleList(${index})'> 
            <img src="${song.img}" alt=""/>
            <div class="music-title">
                <h3>${song.name}</h3>
                <p>${song.author}</p>
            </div>
            <ion-icon name="ellipsis-vertical-outline" id="ellip"/>
        </div>`
        count++;
        List.appendChild(musicItem)
    
    
    }
    )
}

getPlayList()


let thumb = document.querySelector('.music-thumb')
let thumbWidth =  document.querySelector('.music-thumb').clientWidth
let author = document.querySelector('#author')
let musicAudio = document.querySelector('.mucsic-audio')
console.log(thumb)
author.style.transform = 'translateY(30px)'

let scroll = function() {
    document.onscroll = function() {
        author.style.width = '288px'
        // if ( window.scrollBy > 0 ) {
        // thumbWidth = thumbWidth - 7;
        // thumb.style.width = `${thumbWidth}px`
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const newWidth = thumbWidth - scrollTop
        thumb.style.width = newWidth + 'px'
        thumb.style.height= newWidth + 'px'
        console.log(scrollTop)
        if ( scrollTop < 280 )
        author.style.transform = `translateY(${scrollTop}px)`
        
        
    }
        
        
    }
    

scroll();

function handleList(index) {
    song.setAttribute('src', `./music/${songs[index].link}`)
    musicImg.setAttribute('src', songs[index].img)
    musicName.textContent = `${songs[index].name}`
    isPlaying = true
    playPause();
    
}

const volRange = document.querySelector('#volume-range')
song.volume = volRange.value/100
console.log(song.volume)
volRange.oninput = function handleVol() {
    song.volume = volRange.value/100
    
}

const volIcon = document.querySelector('#volume-icon')




volIcon.onclick = function handleVolClick() {
    
    
    if(isMute) {
        //mo
       song.volume = 0.5
       volRange.value = 50
       isMute = false
    } else {
        //tat             
        song.volume = 0 
        volRange.value = 0
        isMute = true
        
    }
    console.log(isMute)
    console.log(currentVol)
}
const sadSongs = [
    {
        author: 'Ampyx',
        name: 'Spark',
        link: 'spark.mp3',
        img: 'https://images.unsplash.com/photo-1682686578615-39549501dd08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60'
    },
    {
        author: 'Ampyx',
        name: 'Summer',
        link: 'summer.mp3',
        img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'
    }
]
const sad = document.querySelector('#sad-songs')
const allSong = document.querySelector('#all-songs')

sad.onclick = function handleSadSongs() {
    songs = sadSongs
    handlePlayList()
}

allSong.onclick = function handleAllSong() {
    songs = allSongs
    handlePlayList()
    
}

function handlePlayList() {
    List.innerHTML = ""
    console.log(songs)
    getPlayList()
    console.log(List)
    song.setAttribute('src', `./music/${songs[currentSong].link}`)
    musicName.textContent = `${songs[currentSong].name}`
    musicImg.setAttribute('src', songs[currentSong].img)
    window.scrollTo({
        top: 0,
        behavior: `smooth`
      })
    playPause()
}
