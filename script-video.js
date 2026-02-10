// Video Player JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideoElement');
    const poster = document.querySelector('.video-poster');
    const playBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const playButton = document.querySelector('.play-button');
    
    if (!video) return;
    
    // Video state
    let isPlaying = false;
    let isMuted = false;
    
    // Play/Pause functionality
    function togglePlayPause() {
        if (isPlaying) {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            poster.style.opacity = '1';
        } else {
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            poster.style.opacity = '0';
        }
        isPlaying = !isPlaying;
    }
    
    // Mute/Unmute functionality
    function toggleMute() {
        video.muted = !video.muted;
        isMuted = !isMuted;
        
        if (isMuted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
    
    // Fullscreen functionality
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    
    // Event listeners
    playButton.addEventListener('click', togglePlayPause);
    playBtn.addEventListener('click', togglePlayPause);
    muteBtn.addEventListener('click', toggleMute);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Video event listeners
    video.addEventListener('play', () => {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        poster.style.opacity = '0';
    });
    
    video.addEventListener('pause', () => {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        poster.style.opacity = '1';
    });
    
    video.addEventListener('volumechange', () => {
        if (video.muted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case ' ':
            case 'k':
                togglePlayPause();
                break;
            case 'm':
                toggleMute();
                break;
            case 'f':
                toggleFullscreen();
                break;
        }
    });
    
    // Auto-play when video is ready
    video.addEventListener('canplay', () => {
        // Auto-play with user interaction required
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Auto-play was prevented, show poster
                poster.style.opacity = '1';
            });
        }
    });
});
