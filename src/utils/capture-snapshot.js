export function captureSnapshot(videoEl, canvasEl) {
    const canvasContext = canvasEl.getContext('2d');
    canvasContext.drawImage(videoEl, 0.0, 0.0, canvasEl.width, canvasEl.height);

    return canvasEl.toDataURL('image/jpg');
}