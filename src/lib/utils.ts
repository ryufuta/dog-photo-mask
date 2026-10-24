export { cn } from 'cn';

export class ImageLoadError extends Error {
  constructor(options?: ErrorOptions) {
    super('Failed to load image', options);
    this.name = 'ImageLoadError';
  }
}

export async function loadImage(file: File) {
  const objURL = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.src = objURL;
    await image.decode();
    return image;
  } catch (error) {
    throw new ImageLoadError({ cause: error });
  } finally {
    URL.revokeObjectURL(objURL);
  }
}
