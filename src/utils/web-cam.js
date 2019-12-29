export function startWebCam(videoEl) {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => videoEl.srcObject = stream)
      .catch(console.error);
  }
}

export function stopWebCam(videoEl) {
  const stream = videoEl.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(track => track.stop());
  videoEl.srcObject = null;
}
