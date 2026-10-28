import { FilesetResolver } from '@mediapipe/tasks-vision';
import noFaceImageUrl from '@/test-fixtures/00_no_person_one_dog.jpg';
import twoFaceImageUrl from '@/test-fixtures/01_two_people_one_dog.jpg';
import { createFaceDetectorLoader, detectFaces } from './face-detector.ts';

describe('detectFaces', () => {
  test('detects no faces in an image with no human faces', async () => {
    const image = await loadImageFromUrl(noFaceImageUrl);

    const faces = await detectFaces(image);

    expect(faces).toHaveLength(0);
  });

  test('detects two faces in an image of two people', async () => {
    const image = await loadImageFromUrl(twoFaceImageUrl);

    const faces = await detectFaces(image);

    expect(faces).toHaveLength(2);
  });
});

describe('createFaceDetectorLoader', () => {
  test('returns the same face detector instance when called multiple times', async () => {
    const loadFaceDetector = createFaceDetectorLoader();

    const promise1 = loadFaceDetector();
    const promise2 = loadFaceDetector();

    const [detector1, detector2] = await Promise.all([promise1, promise2]);

    expect(detector1).toBe(detector2);
  });

  test('rejects and clears cache when initialization fails', async () => {
    vi.spyOn(FilesetResolver, 'forVisionTasks').mockRejectedValueOnce(
      new Error('ModuleFactory not set.'),
    );

    const loadFaceDetector = createFaceDetectorLoader();

    await expect(loadFaceDetector()).rejects.toThrow(
      'Failed to initialize face detector',
    );

    const detector = await loadFaceDetector();
    expect(detector).toBeDefined();
  });
});

async function loadImageFromUrl(url: string) {
  const image = new Image();
  image.src = url;
  await image.decode();
  return image;
}
