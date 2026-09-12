export async function loadImage(file: File) {
  const objURL = URL.createObjectURL(file);

  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject(new Error(`Failed to load image: ${file.name}`));
      };
      image.src = objURL;
    });
  } finally {
    URL.revokeObjectURL(objURL);
  }
}
