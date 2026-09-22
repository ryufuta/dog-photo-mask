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

let faceDetectorPromise: Promise<FaceDetector> | undefined;

export async function detectFaces(image: HTMLImageElement) {
  const faceDetector = await getFaceDetector();

  return toFaces(faceDetector.detect(image));
}

async function getFaceDetector() {
  if (!faceDetectorPromise) {
    faceDetectorPromise = createFaceDetector().catch((error) => {
      faceDetectorPromise = undefined;
      throw error;
    });
  }

  return faceDetectorPromise;
}

async function createFaceDetector() {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm',
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
    const boundingBox = detection.boundingBox;
    if (boundingBox) {
      const { originX, originY, width, height } = boundingBox;
      return {
        x: originX,
        y: originY,
        width,
        height,
        score: detection.categories[0].score,
      };
    }
    return [];
  });
}
