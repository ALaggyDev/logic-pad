import GridData from '../../data/grid';
import GridConnections from '../../data/gridConnections';
import BanPatternRule from '../../data/rules/banPatternRule';
import CompletePatternRule from '../../data/rules/completePatternRule';
import ConnectAllRule from '../../data/rules/connectAllRule';
import CustomRule from '../../data/rules/customRule';
import {
  Color,
  DIRECTIONS,
  Direction,
  Mode,
  ORIENTATIONS,
  Orientation,
  State,
} from '../../data/primitives';
import UndercluedRule from '../../data/rules/undercluedRule';
import LetterSymbol from '../../data/symbols/letterSymbol';
import AreaNumberSymbol from '../../data/symbols/areaNumberSymbol';
import ViewpointSymbol from '../../data/symbols/viewpointSymbol';
import DartSymbol from '../../data/symbols/dartSymbol';
import RegionAreaRule from '../../data/rules/regionAreaRule';
import TileConnections from '../../data/tileConnections';
import LotusSymbol from '../../data/symbols/lotusSymbol';
import GalaxySymbol from '../../data/symbols/galaxySymbol';
import OffByXRule from '../../data/rules/offByXRule';
import { ConfigType, configEquals } from '../../data/config';
import { array, escape, maxBy, minBy, move, unescape } from '../../data/helper';
import { PuzzleSchema } from '../../data/puzzle';
import Serializer from '../../data/serializer/allSerializers';
import Compressor from '../../data/serializer/compressor/allCompressors';
import QuestionMarkSign from '../../data/symbols/signs/questionMarkSign';
import TileData from '../../data/tile';
import CellCountRule from '../../data/rules/cellCountRule';
import SymbolsPerRegionRule from '../../data/rules/symbolsPerRegionRule.ts';
import CustomTextSymbol from '../../data/symbols/customTextSymbol.ts';
import CustomIconSymbol from '../../data/symbols/customIconSymbol.ts';

export interface EnclosureEntry {
  name: string;
  value: unknown;
  example: string | null;
}

export const enclosure: EnclosureEntry[] = [
  /* === data structures === */
  {
    name: 'GridData',
    value: GridData,
    example: `GridData.create(['nnnnn', 'nnnnn'])`,
  },
  {
    name: 'GridConnections',
    value: GridConnections,
    example: `.withConnections(\n  GridConnections.create(['..aa.', '..aa.'])\n)`,
  },
  {
    name: 'TileConnections',
    value: TileConnections,
    example: null,
  },
  {
    name: 'TileData',
    value: TileData,
    example: null,
  },
  /* === rules === */
  {
    name: 'BanPatternRule',
    value: BanPatternRule,
    example: '.addRule(new BanPatternRule(GridData.create([])))',
  },
  {
    name: 'CompletePatternRule',
    value: CompletePatternRule,
    example: '.addRule(new CompletePatternRule())',
  },
  {
    name: 'ConnectAllRule',
    value: ConnectAllRule,
    example: '.addRule(new ConnectAllRule(Color.Dark))',
  },
  {
    name: 'RegionAreaRule',
    value: RegionAreaRule,
    example: '.addRule(new RegionAreaRule(Color.Dark, 2))',
  },
  {
    name: 'OffByXRule',
    value: OffByXRule,
    example: '.addRule(new OffByXRule(1))',
  },
  {
    name: 'CellCountRule',
    value: CellCountRule,
    example: '.addRule(new CellCountRule(Color.Dark, 10))',
  },
  {
    name: 'CustomRule',
    value: CustomRule,
    example: `.addRule(new CustomRule(\n  'Description',\n  GridData.create([])\n))`,
  },
  {
    name: 'UndercluedRule',
    value: UndercluedRule,
    example: '.addRule(new UndercluedRule())',
  },
  {
    name: 'SymbolsPerRegionRule',
    value: SymbolsPerRegionRule,
    example: '.addRule(new SymbolsPerRegionRule(Color.Light, 1))',
  },
  /* === symbols === */
  {
    name: 'LetterSymbol',
    value: LetterSymbol,
    example: '.addSymbol(new LetterSymbol(1, 1, "A"))',
  },
  {
    name: 'AreaNumberSymbol',
    value: AreaNumberSymbol,
    example: '.addSymbol(new AreaNumberSymbol(1, 1, 3))',
  },
  {
    name: 'ViewpointSymbol',
    value: ViewpointSymbol,
    example: '.addSymbol(new ViewpointSymbol(1, 1, 3))',
  },
  {
    name: 'DartSymbol',
    value: DartSymbol,
    example: '.addSymbol(new DartSymbol(1, 1, 2, Direction.Up))',
  },
  {
    name: 'LotusSymbol',
    value: LotusSymbol,
    example: '.addSymbol(new LotusSymbol(1, 1, Orientation.Up))',
  },
  {
    name: 'GalaxySymbol',
    value: GalaxySymbol,
    example: '.addSymbol(new GalaxySymbol(1, 1))',
  },
  {
    name: 'CustomTextSymbol',
    value: CustomTextSymbol,
    example: `.addSymbol(new CustomTextSymbol(\n  'Description',\n  GridData.create([]),\n  1, 1,\n  'X', 0\n))`,
  },
  {
    name: 'CustomIconSymbol',
    value: CustomIconSymbol,
    example: `.addSymbol(new CustomIconSymbol(\n  'Description',\n  GridData.create([]),\n  1, 1,\n  'MdQuestionMark', 0\n))`,
  },
  {
    name: 'QuestionMarkSign',
    value: QuestionMarkSign,
    example: null,
  },
  /* === helpers === */
  {
    name: 'move',
    value: move,
    example: 'move({ x: 1, y: 1 }, Direction.Up, 2)',
  },
  {
    name: 'array',
    value: array,
    example: 'array(3, 3, (x, y) => x + y)',
  },
  {
    name: 'minBy',
    value: minBy,
    example: 'minBy([1, 2, 3], (x) => x % 2)',
  },
  {
    name: 'maxBy',
    value: maxBy,
    example: 'maxBy([1, 2, 3], (x) => x % 2)',
  },
  {
    name: 'escape',
    value: escape,
    example: 'escape("Hello, world!", ",!")',
  },
  {
    name: 'unescape',
    value: unescape,
    example: 'unescape("Hello&#44; world&#33;", ",!")',
  },
  {
    name: 'configEquals',
    value: configEquals,
    example: 'configEquals(ConfigType.Number, 1, 2)',
  },
  /* === enums === */
  {
    name: 'Color',
    value: Color,
    example: 'Color.Dark\nColor.Light\nColor.Gray',
  },
  {
    name: 'Direction',
    value: Direction,
    example: 'Direction.Up\nDirection.Down\nDirection.Left\nDirection.Right',
  },
  {
    name: 'DIRECTIONS',
    value: DIRECTIONS,
    example: null,
  },
  {
    name: 'Orientation',
    value: Orientation,
    example:
      'Orientation.Up\nOrientation.UpRight\nOrientation.Right\nOrientation.DownRight\nOrientation.Down\nOrientation.DownLeft\nOrientation.Left\nOrientation.UpLeft',
  },
  {
    name: 'ORIENTATIONS',
    value: ORIENTATIONS,
    example: null,
  },
  {
    name: 'ConfigType',
    value: ConfigType,
    example: null,
  },
  {
    name: 'State',
    value: State,
    example: null,
  },
  {
    name: 'Mode',
    value: Mode,
    example: null,
  },
  /* === misc === */
  {
    name: 'PuzzleSchema',
    value: PuzzleSchema,
    example: null,
  },
  {
    name: 'Serializer',
    value: Serializer,
    example: null,
  },
  {
    name: 'Compressor',
    value: Compressor,
    example: null,
  },
];

export default function evaluate(code: string): unknown {
  enclosure.forEach(({ name, value }) => {
    (globalThis as Record<string, unknown>)[name] = value;
  });
  // eslint-disable-next-line no-eval
  return window.eval?.(code);
}

evaluate(''); // do an empty evaluate to populate globalThis
