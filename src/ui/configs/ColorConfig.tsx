import { memo } from 'react';
import { ColorConfig } from '../../data/config';
import Instruction from '../../data/instruction';
import { Color } from '../../data/primitives';
import { cn } from '../../utils';

export interface ColorConfigProps {
  instruction: Instruction;
  config: ColorConfig;
  setConfig?: (field: string, value: ColorConfig['default']) => void;
}

const ColorRadio = memo(function ColorRadio({
  value,
  setValue,
  color,
}: {
  value: Color;
  setValue: (value: Color) => void;
  color: string;
}) {
  return (
    <input
      type="radio"
      name="radio-dark"
      className={cn(
        'appearance-none w-8 h-8 rounded checked:shadow-glow-md checked:shadow-accent checked:border-2 checked:border-accent',
        {
          'bg-gray-500': color === Color.Gray,
          'bg-white': color === Color.Light,
          'bg-black': color === Color.Dark,
        }
      )}
      value={color}
      checked={value === color}
      onChange={e => setValue(e.target.value as Color)}
    />
  );
});

// million-ignore
export default memo(function ColorConfig({
  instruction,
  config,
  setConfig,
}: ColorConfigProps) {
  const value = instruction[config.field as keyof typeof instruction] as Color;
  return (
    <div className="flex p-2 justify-between items-center">
      <span className="text-lg">{config.description}</span>
      <div className="flex gap-4">
        <ColorRadio
          value={value}
          setValue={value => setConfig?.(config.field, value)}
          color={Color.Dark}
        />
        {config.allowGray && (
          <ColorRadio
            value={value}
            setValue={value => setConfig?.(config.field, value)}
            color={Color.Gray}
          />
        )}
        <ColorRadio
          value={value}
          setValue={value => setConfig?.(config.field, value)}
          color={Color.Light}
        />
      </div>
    </div>
  );
});
