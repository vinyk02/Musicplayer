const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');

const songs = [
  {
    title: "Acoustic Breeze",
    artist: "Bensound",
    src: "songs/song1.mp3"
  },
  {
    title: "Buddy",
    artist: "Bensound",
    src: "songs/song2.mp3"
  },
  {
    title: "Energy",
    artist: "Bensound",
    src: "songs/song3.mp3"
  }
];

let currentSongIndex = 0;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
}

function playSong() {
  audio.play();
  playBtn.textContent = "Pause";
  playBtn.classList.add('playing');
  document.querySelector('.player').classList.add('playing');
  document.body.classList.add('dance');
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "Play";
  playBtn.classList.remove('playing');
  document.querySelector('.player').classList.remove('playing');
  document.body.classList.remove('dance');
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
  progress.value = (currentTime / duration) * 100 || 0;
});

progress.addEventListener('input', () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Load first song
loadSong(currentSongIndex);