export function startWebCam(videoEl: HTMLVideoElement | null) {
  if (navigator.mediaDevices.getUserMedia && videoEl) {
    return navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => videoEl.srcObject = stream)
      .catch(console.error);
  }
}

export function stopWebCam(videoEl: HTMLVideoElement | null) {
  if (videoEl) {
    const stream = videoEl.srcObject;
  
    if (isMediaStream(stream)) {
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop());
      videoEl.srcObject = null;
    }
  }
}

function isMediaStream(
  stream: MediaStream | MediaSource | Blob | null
): stream is MediaStream {
  return !!stream && !!(stream as MediaStream).getTracks;
} 