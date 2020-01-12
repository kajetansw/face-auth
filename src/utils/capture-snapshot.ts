export function captureSnapshot(
  videoEl: HTMLVideoElement | null, 
  canvasEl: HTMLCanvasElement | null
): string {
  if (videoEl && canvasEl) {
    const canvasContext = canvasEl.getContext('2d');
    canvasContext!.drawImage(videoEl, 0.0, 0.0, canvasEl.width, canvasEl.height);

    return canvasEl.toDataURL('image/jpg');
  } else {
    return '';
  }
}