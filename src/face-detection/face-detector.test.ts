import noFaceImageUrl from '@/test-fixtures/00_no_person_one_dog.jpg';
import twoFaceImageUrl from '@/test-fixtures/01_two_people_one_dog.jpg';
import { detectFaces } from './face-detector.ts';

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

async function loadImageFromUrl(url: string) {
  const image = new Image();
  image.src = url;
  await image.decode();
  return image;
}
