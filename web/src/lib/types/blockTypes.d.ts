import type { Dispatch, SetStateAction } from 'react';

import BlockTypes from '../constants/BlockTypes';
import type PageDataInterface from './pageTypes';
import InlineTextStyles from '../../lib/constants/InlineTextStyles';

// -=- Used for the base block -=-
interface BaseBlockProps {
  blockType: keyof typeof BlockTypes,
  blockID: string,
  properties: Record<string, unknown>,
  children: unknown[]
  page: string,
  index: number,
  isMenuOpen: boolean,
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>,
}

// -=- Used for blocks that can't be deleted and are only controlled by the server -=-
interface PermanentBlock {
  page: string,
}

// -=- Used for for blocks that can't be deleted but can be edited -=-
interface PermanentEditableText extends PermanentBlock {
  index: number,
}

// -=- Used for p through h1 -=-
interface EditableText extends PermanentEditableText {
  properties: {
    value: string,
    style?: {
      type: (keyof typeof InlineTextStyles)[],
      start: number,
      end: number,
    }[],
  },
  type: string,
  blockID: string,
  setCurrentBlockType: (_type: string) => void,
}

// -=- Used for ol and ul elements -=-
interface EditableList {
  properties: {
    value: string,
    relationship: 'sibling' | 'child',
  },
  page: string,
  type: string,
  blockID: [string],
  children: EditableList[]
  setCurrentBlockType: (_type: string) => void,
}

// -=- Used for check list elements -=-
interface EditableCheckList extends EditableList {
  properties: {
    value: string,
    checked: boolean,
    relationship: 'sibling' | 'child',
  },
}

export type {
  BaseBlockProps,
  PermanentBlock,
  PermanentEditableText,
  EditableText,
  EditableList,
  EditableCheckList,
};
