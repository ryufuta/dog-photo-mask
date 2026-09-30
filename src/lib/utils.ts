export class ImageLoadError extends Error {
  constructor(fileName: string, options?: ErrorOptions) {
    super(`Failed to load image: ${fileName}`, options);
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
    throw new ImageLoadError(file.name, { cause: error });
  } finally {
    URL.revokeObjectURL(objURL);
  }
}
