export class ImageLoadError extends Error {
  constructor(fileName: string) {
    super(`Failed to load image: ${fileName}`);
    this.name = 'ImageLoadError';
  }
}

export async function loadImage(file: File) {
  const objURL = URL.createObjectURL(file);

  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject(new ImageLoadError(file.name));
      };
      image.src = objURL;
    });
  } finally {
    URL.revokeObjectURL(objURL);
  }
}
