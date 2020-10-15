import { useStore } from '@src/store';
import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { useDebouncedCallback } from 'use-debounce/lib';

export default function ColorPicker() {
  const [color, setColor] = useState('#fff');
  const setCurrentColor = useStore(state => state.setCurrentColor);
  const onColorChange = useDebouncedCallback((color: ColorResult) => {
    setCurrentColor(color.hex);
  }, 300);

  return <SketchPicker color={color || '#fff'} onChangeComplete={color => {
    setColor(color.hex);
    onColorChange.callback(color);
  }} />
}
