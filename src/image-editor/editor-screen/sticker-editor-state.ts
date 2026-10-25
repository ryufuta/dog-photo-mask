import type { Rect } from '@/lib/coordinate.ts';
import { createFaceStickers, type Sticker } from '@/sticker/sticker.ts';

type StickerEditorState = {
  stickers: Sticker[];
  selectedStickerId: string | null;
};

type StickerEditorAction =
  | { type: 'added'; sticker: Sticker }
  | { type: 'selected'; id: string | null }
  | { type: 'moved'; id: string; position: Pick<Rect, 'x' | 'y'> }
  | { type: 'transformed'; id: string; rect: Rect }
  | { type: 'deleted' };

export function createInitialStickerEditorState(
  faceRects: Rect[],
): StickerEditorState {
  return { stickers: createFaceStickers(faceRects), selectedStickerId: null };
}

export function stickerEditorReducer(
  state: StickerEditorState,
  action: StickerEditorAction,
): StickerEditorState {
  switch (action.type) {
    case 'added':
      return {
        stickers: [...state.stickers, action.sticker],
        selectedStickerId: action.sticker.id,
      };
    case 'selected':
      return { ...state, selectedStickerId: action.id };
    case 'moved':
      return {
        ...state,
        stickers: state.stickers.map((sticker) =>
          sticker.id === action.id
            ? { ...sticker, ...action.position }
            : sticker,
        ),
      };
    case 'transformed':
      return {
        ...state,
        stickers: state.stickers.map((sticker) =>
          sticker.id === action.id ? { ...sticker, ...action.rect } : sticker,
        ),
      };
    case 'deleted':
      if (state.selectedStickerId === null) return state;

      return {
        stickers: state.stickers.filter(
          (sticker) => sticker.id !== state.selectedStickerId,
        ),
        selectedStickerId: null,
      };
  }
}
