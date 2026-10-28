import {
  FaceDetector,
  type FaceDetectorResult,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import modelUrl from '@/assets/models/blaze_face_full_range_sparse.tflite';
import type { Rect } from '@/lib/coordinate.ts';

export type Face = Rect & {
  score: number; // 検出した顔の確信度。デバッグに使用
};

export function createFaceDetectorLoader() {
  let faceDetectorPromise: Promise<FaceDetector> | undefined;

  return function loadFaceDetector() {
    if (!faceDetectorPromise) {
      faceDetectorPromise = createFaceDetector().catch((error) => {
        faceDetectorPromise = undefined;
        throw new Error('Failed to initialize face detector', { cause: error });
      });
    }

    return faceDetectorPromise;
  };
}

async function createFaceDetector() {
  const vision = await FilesetResolver.forVisionTasks(
    `${import.meta.env.BASE_URL}mediapipe/wasm`,
  );

  return FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: modelUrl,
    },
    runningMode: 'IMAGE',
  });
}

function toFaces(result: FaceDetectorResult): Face[] {
  return result.detections.flatMap((detection) => {
    const { boundingBox, categories } = detection;
    const category = categories[0];
    if (!boundingBox || !category) {
      return [];
    }

    const { originX, originY, width, height } = boundingBox;
    return {
      x: originX,
      y: originY,
      width,
      height,
      score: category.score,
    };
  });
}

const loadFaceDetector = createFaceDetectorLoader();

export async function detectFaces(image: HTMLImageElement) {
  const faceDetector = await loadFaceDetector();

  return toFaces(faceDetector.detect(image));
}
