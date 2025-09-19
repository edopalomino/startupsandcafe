let allEpisodes = [];
let filteredEpisodes = [];
let currentEpisode = null;
let currentEpisodeIndex = -1;
let isPlaying = false;

// Referencias a elementos del reproductor
let audioElement;
let audioPlayer;
let playPauseBtn;
let prevBtn;
let nextBtn;
let seekSlider;
let volumeSlider;
let volumeBtn;
let progress;
let currentTimeSpan;
let durationSpan;
let playerTitle;
let playerDescription;
let playerEpisodeNum;

async function loadPodcasts() {
    try {
        // Mostrar el spinner de carga
        document.getElementById('loading').style.display = 'block';
        
        // Cargar datos desde el archivo JSON
        const response = await fetch('podcasts.json');
        const podcastData = await response.json();
        
        // Simular un pequeño delay para mostrar la animación de carga
        setTimeout(() => {
            allEpisodes = podcastData;
            filteredEpisodes = [...allEpisodes];
            renderEpisodes();
            document.getElementById('loading').style.display = 'none';
        }, 1500);
    } catch (error) {
        console.error('Error al cargar los podcasts:', error);
        document.getElementById('loading').innerHTML = '<p>Error al cargar los episodios. Por favor, recarga la página.</p>';
    }
}

function renderEpisodes() {
    const grid = document.getElementById('episodesGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredEpisodes.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    grid.innerHTML = filteredEpisodes.map(episode => `
        <div class="episode-card">
            <span class="episode-number">Episodio ${episode.episodio}</span>
            <h3 class="episode-title">${episode.titulo}</h3>
            <p class="episode-description">${episode.descripcion}</p>
            <div class="episode-actions">
                <button class="play-btn" onclick="playEpisode('${episode.url}', '${episode.titulo}')">
                    ► Reproducir
                </button>
            </div>
        </div>
    `).join('');
}

function playEpisode(url, title) {
    // Encontrar el episodio en la lista
    const episode = allEpisodes.find(ep => ep.titulo === title);
    if (!episode) return;
    
    currentEpisode = episode;
    currentEpisodeIndex = allEpisodes.indexOf(episode);
    
    // Actualizar información del reproductor
    updatePlayerInfo();
    
    // Cargar y reproducir el audio
    audioElement.src = url;
    audioElement.load();
    
    // Mostrar el reproductor
    audioPlayer.style.display = 'block';
    
    // Reproducir cuando esté listo
    audioElement.addEventListener('loadeddata', function() {
        audioElement.play().then(() => {
            isPlaying = true;
            updatePlayPauseButton();
        }).catch(error => {
            console.error('Error al reproducir:', error);
        });
    }, { once: true });
}

function updatePlayerInfo() {
    if (!currentEpisode) return;
    
    playerTitle.textContent = currentEpisode.titulo;
    playerDescription.textContent = currentEpisode.descripcion;
    playerEpisodeNum.textContent = currentEpisode.episodio;
}

function togglePlayPause() {
    if (!audioElement.src) return;
    
    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
    } else {
        audioElement.play().then(() => {
            isPlaying = true;
        }).catch(error => {
            console.error('Error al reproducir:', error);
        });
    }
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
}

function playPreviousEpisode() {
    if (currentEpisodeIndex > 0) {
        const prevEpisode = allEpisodes[currentEpisodeIndex - 1];
        playEpisode(prevEpisode.url, prevEpisode.titulo);
    }
}

function playNextEpisode() {
    if (currentEpisodeIndex < allEpisodes.length - 1) {
        const nextEpisode = allEpisodes[currentEpisodeIndex + 1];
        playEpisode(nextEpisode.url, nextEpisode.titulo);
    }
}

function updateProgress() {
    if (!audioElement.duration) return;
    
    const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
    progress.style.width = progressPercent + '%';
    seekSlider.value = progressPercent;
    
    currentTimeSpan.textContent = formatTime(audioElement.currentTime);
    durationSpan.textContent = formatTime(audioElement.duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function seekAudio() {
    if (!audioElement.duration) return;
    
    const seekTime = (seekSlider.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
}

function updateVolume() {
    audioElement.volume = volumeSlider.value / 100;
    updateVolumeIcon();
}

function updateVolumeIcon() {
    const volume = audioElement.volume;
    if (volume === 0) {
        volumeBtn.textContent = '🔇';
    } else if (volume < 0.5) {
        volumeBtn.textContent = '🔉';
    } else {
        volumeBtn.textContent = '🔊';
    }
}

function toggleMute() {
    if (audioElement.volume === 0) {
        audioElement.volume = 0.7;
        volumeSlider.value = 70;
    } else {
        audioElement.volume = 0;
        volumeSlider.value = 0;
    }
    updateVolumeIcon();
}

function initializeAudioPlayer() {
    // Obtener referencias a elementos del DOM
    audioElement = document.getElementById('audioElement');
    audioPlayer = document.getElementById('audioPlayer');
    playPauseBtn = document.getElementById('playPauseBtn');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    seekSlider = document.getElementById('seekSlider');
    volumeSlider = document.getElementById('volumeSlider');
    volumeBtn = document.getElementById('volumeBtn');
    progress = document.getElementById('progress');
    currentTimeSpan = document.getElementById('currentTime');
    durationSpan = document.getElementById('duration');
    playerTitle = document.getElementById('playerTitle');
    playerDescription = document.getElementById('playerDescription');
    playerEpisodeNum = document.getElementById('playerEpisodeNum');
    
    // Event listeners para controles
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPreviousEpisode);
    nextBtn.addEventListener('click', playNextEpisode);
    seekSlider.addEventListener('input', seekAudio);
    volumeSlider.addEventListener('input', updateVolume);
    volumeBtn.addEventListener('click', toggleMute);
    
    // Event listeners para el elemento de audio
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', updateProgress);
    audioElement.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseButton();
    });
    audioElement.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });
    audioElement.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayPauseButton();
        // Reproducir siguiente episodio automáticamente
        if (currentEpisodeIndex < allEpisodes.length - 1) {
            setTimeout(() => playNextEpisode(), 1000);
        }
    });
    
    // Configurar volumen inicial
    audioElement.volume = 0.7;
    updateVolumeIcon();
}

function searchEpisodes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        filteredEpisodes = [...allEpisodes];
    } else {
        filteredEpisodes = allEpisodes.filter(episode =>
            episode.titulo.toLowerCase().includes(searchTerm) ||
            episode.descripcion.toLowerCase().includes(searchTerm)
        );
    }
    
    renderEpisodes();
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el event listener para la búsqueda
    document.getElementById('searchInput').addEventListener('input', searchEpisodes);
    
    // Inicializar el reproductor de audio
    initializeAudioPlayer();
    
    // Cargar podcasts al iniciar la página
    loadPodcasts();
});