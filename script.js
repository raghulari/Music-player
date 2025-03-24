const songsList = [
    {
        name: "Sau paulo",
        artist: "TheWeeknd",
        scr: "as1.jpeg", 
        cover: "Theweekend.mp3" 
    },
    {
        name: "Closer",
        artist: "Chainsmokers",
        scr: "as2.jpeg", 
        cover: "So-Baby-Pull-Me-Closer.mp3"
    },
    {
        name: "Big Dawgs",
        artist: "Hanumkid",
        scr: "Bigdawgs.jpg",
        cover: "Big Dawgs - (Raag.Fm).mp3" 
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentsong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentsong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, scr, cover: audioFile } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = audioFile; 
    cover.style.backgroundImage = `url(${scr})`; 
}

function updateProgress() {
    if (song.duration) {
        const currentPos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${currentPos}%`; 

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentsong = (currentsong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentsong = (currentsong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentsong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}
