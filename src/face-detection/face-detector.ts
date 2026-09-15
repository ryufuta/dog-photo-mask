import {
  FaceDetector,
  type FaceDetectorResult,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import modelUrl from '@/assets/models/blaze_face_full_range_sparse.tflite';

type Face = {
  x: number;
  y: number;
  width: number;
  height: number;
  score: number; // 検出した顔の確信度。デバッグに使用
};

let faceDetectorPromise: Promise<FaceDetector> | undefined;

export async function detectFaces(image: HTMLImageElement) {
  const faceDetector = await getFaceDetector();

  return toFaces(faceDetector.detect(image));
}

async function getFaceDetector() {
  if (!faceDetectorPromise) {
    faceDetectorPromise = createFaceDetector();
  }

  return faceDetectorPromise;
}

async function createFaceDetector() {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm',
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
