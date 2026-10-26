import {
  createInitialStickerEditorState,
  stickerEditorReducer,
} from './sticker-editor-state.ts';

describe('createInitialStickerEditorState', () => {
  test('creates stickers from face rectangles and starts with no selection', () => {
    const state = createInitialStickerEditorState([
      { x: 100, y: 50, width: 90, height: 120 },
    ]);

    expect(state.stickers).toHaveLength(1);
    expect(state.selectedStickerId).toBeNull();
  });

  test('starts with no stickers when there are no faces', () => {
    expect(createInitialStickerEditorState([])).toEqual({
      stickers: [],
      selectedStickerId: null,
    });
  });
});

describe('stickerEditorReducer', () => {
  const firstSticker = {
    id: 'first',
    x: 10,
    y: 20,
    width: 30,
    height: 30,
  };

  const secondSticker = {
    id: 'second',
    x: 40,
    y: 50,
    width: 30,
    height: 30,
  };

  test('adds a sticker and selects it', () => {
    const state = { stickers: [firstSticker], selectedStickerId: 'first' };

    expect(
      stickerEditorReducer(state, { type: 'added', sticker: secondSticker }),
    ).toEqual({
      stickers: [firstSticker, secondSticker],
      selectedStickerId: 'second',
    });
  });

  test('selects a sticker', () => {
    const state = { stickers: [firstSticker], selectedStickerId: null };

    expect(
      stickerEditorReducer(state, { type: 'selected', id: 'first' }),
    ).toEqual({ stickers: [firstSticker], selectedStickerId: 'first' });
  });

  test('deselects a sticker', () => {
    const state = { stickers: [firstSticker], selectedStickerId: 'first' };

    expect(stickerEditorReducer(state, { type: 'selected', id: null })).toEqual(
      { stickers: [firstSticker], selectedStickerId: null },
    );
  });

  test('moves the dragged sticker regardless of which sticker is selected', () => {
    const state = {
      stickers: [firstSticker, secondSticker],
      selectedStickerId: 'second',
    };

    expect(
      stickerEditorReducer(state, {
        type: 'moved',
        id: 'first',
        position: { x: 100, y: 200 },
      }),
    ).toEqual({
      stickers: [{ ...firstSticker, x: 100, y: 200 }, secondSticker],
      selectedStickerId: 'second',
    });
  });

  test('resizes the selected sticker', () => {
    const state = {
      stickers: [firstSticker, secondSticker],
      selectedStickerId: 'first',
    };

    expect(
      stickerEditorReducer(state, {
        type: 'transformed',
        id: 'first',
        rect: { x: 5, y: 6, width: 70, height: 70 },
      }),
    ).toEqual({
      stickers: [
        { id: 'first', x: 5, y: 6, width: 70, height: 70 },
        secondSticker,
      ],
      selectedStickerId: 'first',
    });
  });

  test('deletes the selected sticker and clears the selection', () => {
    const state = {
      stickers: [firstSticker, secondSticker],
      selectedStickerId: 'first',
    };

    expect(stickerEditorReducer(state, { type: 'deleted' })).toEqual({
      stickers: [secondSticker],
      selectedStickerId: null,
    });
  });

  test('keeps the state unchanged when there is no selected sticker to delete', () => {
    const state = { stickers: [firstSticker], selectedStickerId: null };

    expect(stickerEditorReducer(state, { type: 'deleted' })).toEqual(state);
  });
});
