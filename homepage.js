// Keep the original video frame visible when playback is unavailable or unwanted.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const videos = [...document.querySelectorAll('.media-preview video')];
function updatePlayback() {
  videos.forEach((video) => {
    if (reducedMotion.matches || document.hidden || video.closest("details:not([open])")) {
      video.pause();
      if (reducedMotion.matches) video.hidden = true;
      return;
    }
    if (video.error) return;
    video.hidden = false;
    video.play().catch(() => { video.hidden = true; });
  });
}
videos.forEach((video) => {
  const showPoster = () => { video.hidden = true; };
  video.addEventListener('error', showPoster);
  video.querySelector('source')?.addEventListener('error', showPoster);
});
reducedMotion.addEventListener('change', updatePlayback);
document.addEventListener('visibilitychange', updatePlayback);
updatePlayback();

document.querySelectorAll(".project-series").forEach((group) => {
  group.addEventListener("toggle", updatePlayback);
});
