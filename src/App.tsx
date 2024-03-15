import Grid from './ui/grid/Grid';
import GridData from './data/grid';
import { useEffect, useState } from 'react';
import { Color, GridState, State } from './data/primitives';
import InstructionList from './ui/InstructionList';
import ConnectAllRule from './data/rules/connectAllRule';
import { themeChange } from 'theme-change';
import ViewpointSymbol from './data/symbols/viewpointSymbol';
import BanPatternRule from './data/rules/banPatternRule';
import GridConnections from './data/gridConnections';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ErrorOverlay from './ui/grid/ErrorOverlay';
import SymbolOverlay from './ui/grid/SymbolOverlay';
import GridRing from './ui/GridRing';

const SUPPORTED_THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

export default function App() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  const [grid, setGrid] = useState(
    GridData.create([
      'WWWWWWWWWWWWWWWWWWWWWWWWWBBBW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'Wnnnn.nnnnn.nnnnn.nnnnn.nnnnW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'WnnnWWWnnnWWWnnnWWWnnnWWWnnnW',
      'Wn.nWWWn.nWWWn.nWWWn.nWWWn.nW',
      'WnnnWWWnnnWWWnnnWWWnnnWWWnnnW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'Wnnnn.nnnnn.nnnnn.nnnnn.nnnnW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'WnnnWWWnnnWWWnnnWWWnnnWWWnnnW',
      'Wn.nWWWn.nWWWn.nWWWn.nWWWn.nW',
      'WnnnWWWnnnWWWnnnWWWnnnWWWnnnW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'Wnnnn.nnnnn.nnnnn.nnnnn.nnnnW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'WnnnWWWnnnWWWnnnWWWnnnWWWnnnW',
      'Wn.nWWWn.nWWWn.nWWWn.nWWWn.nW',
      'WnnnWWWnnnWWWnnnWWWnnnWWWnnnW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'Wnnnn.nnnnn.nnnnn.nnnnn.nnnnW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'WnnnWWWnnnWWWnnnWWWnnnWWWnnnW',
      'Wn.nWWWn.nWWWn.nWWWn.nWWWn.nW',
      'WnnnWWWnnnWWWnnnWWWnnnWWWnnnW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'Wnnnn.nnnnn.nnnnn.nnnnn.nnnnW',
      'WnnnnnnnnnnnnnnnnnnnnnnnnnnnW',
      'WBBBWWWWWWWWWWWWWWWWWWWWWWWWW',
    ])
      .withConnections(
        GridConnections.create([
          '.............................',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.aaab.bcccd.deeef.fgggh.hiii.',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.jjj...lll...nnn...ppp...rrr.',
          '.j.j...l.l...n.n...p.p...r.r.',
          '.jjj...lll...nnn...ppp...rrr.',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.aaab.bcccd.deeef.fgggh.hiii.',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.jjj...lll...nnn...ppp...rrr.',
          '.j.j...l.l...n.n...p.p...r.r.',
          '.jjj...lll...nnn...ppp...rrr.',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.aaab.bcccd.deeef.fgggh.hiii.',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.jjj...lll...nnn...ppp...rrr.',
          '.j.j...l.l...n.n...p.p...r.r.',
          '.jjj...lll...nnn...ppp...rrr.',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.aaab.bcccd.deeef.fgggh.hiii.',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.jjj...lll...nnn...ppp...rrr.',
          '.j.j...l.l...n.n...p.p...r.r.',
          '.jjj...lll...nnn...ppp...rrr.',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.aaab.bcccd.deeef.fgggh.hiii.',
          '.aaabbbcccdddeeefffggghhhiii.',
          '.............................',
        ])
      )
      .addRule(
        new BanPatternRule(
          GridData.create(['.bbb.', 'bb.bb', '.bbb.', '..b..'])
        )
      )
      .addRule(
        new BanPatternRule(
          GridData.create(['.bbb.', 'wb.bw', '.bbb.', '..w..'])
        )
      )
      .addRule(new ConnectAllRule(Color.Dark))
      .addSymbol(new ViewpointSymbol(17, 5, 8))
      .addSymbol(new ViewpointSymbol(23, 5, 6))
      .addSymbol(new ViewpointSymbol(5, 11, 8))
      .addSymbol(new ViewpointSymbol(11, 17, 6))
      .addSymbol(new ViewpointSymbol(17, 17, 8))
      .addSymbol(new ViewpointSymbol(23, 17, 7))
      .addSymbol(new ViewpointSymbol(5, 23, 7))
      .addSymbol(new ViewpointSymbol(11, 23, 6))
      .addSymbol(new ViewpointSymbol(17, 23, 7))
      .addSymbol(new ViewpointSymbol(23, 23, 7))
  );

  const [state, setState] = useState<GridState>({
    symbols: new Map(),
    rules: [],
  });

  const validateGrid = (grid: GridData) => {
    const rules = grid.rules.map(rule => rule.validateGrid(grid));
    const symbols = new Map<string, State[]>();
    grid.symbols.forEach((symbolList, id) =>
      symbols.set(
        id,
        symbolList.map(s => s.validateSymbol(grid))
      )
    );
    setState({ rules, symbols });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => validateGrid(grid), []);

  return (
    <div className="h-dvh w-dvw overflow-auto bg-neutral">
      <Analytics />
      <SpeedInsights />
      <div className="flex flex-col items-stretch min-h-full w-full">
        <header className="flex justify-start items-center gap-4 px-8 py-2">
          <h1 className="text-3xl text-neutral-content">Logic Pad</h1>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              Theme
              <svg
                width="12px"
                height="12px"
                className="h-2 w-2 fill-current opacity-60 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 max-h-[calc(100dvh-100px)] overflow-y-auto"
            >
              {SUPPORTED_THEMES.map(theme => (
                <li key={theme}>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label={theme}
                    value={theme}
                  />
                </li>
              ))}
            </ul>
          </div>
        </header>
        <div className="flex flex-1 justify-center items-center flex-wrap">
          <div className="w-[320px] flex flex-col gap-2 p-4 text-neutral-content">
            <div className="text-xl">Roadmap</div>
            <ul className="list-disc pl-4">
              <li className="line-through">Implement puzzle grid</li>
              <li className="line-through">
                Implement click and drag mouse input
              </li>
              <li className="line-through">Implement merged tiles</li>
              <li className="line-through">Implement rules UI</li>
              <li className="line-through">Implement color themes</li>
              <li>Add missing rules and symbols</li>
              <li>Implement logic for rules and symbols</li>
              <li>Implement win confirmation</li>
              <li>Add undo and restart</li>
              <li>Add flood painting</li>
              <li>Implement puzzle serialization</li>
              <li>Optimize performance</li>
              <li>Puzzle editor</li>
              <li className="ml-4">Add color, fix and merge tools</li>
              <li className="ml-4">Add a tool for each symbol type</li>
              <li className="ml-4">Hide tools behind search bar</li>
              <li className="ml-4">Add configurations for each rule</li>
              <li className="ml-4">Hide rules behind search bar</li>
              <li className="ml-4">Add puzzle name and author fields</li>
            </ul>
          </div>
          <div className="grow shrink flex justify-start items-center p-0">
            <div className="flex shrink-0 grow justify-center items-center m-0 p-0 border-0">
              <GridRing state={state}>
                <Grid
                  size={28}
                  grid={grid}
                  editable={true}
                  onTileClick={(x, y, target) => {
                    setGrid(grid => {
                      const newGrid = grid.setTile(x, y, t =>
                        t.withColor(target)
                      );
                      validateGrid(newGrid);
                      return newGrid;
                    });
                  }}
                >
                  <SymbolOverlay size={28} grid={grid} state={state.symbols} />
                  {state.rules.map((rule, i) =>
                    rule.state === State.Error ? (
                      <ErrorOverlay
                        key={i}
                        size={28}
                        positions={rule.positions}
                      />
                    ) : null
                  )}
                </Grid>
              </GridRing>
            </div>
          </div>
          <InstructionList data={grid} state={state} />
        </div>
      </div>
    </div>
  );
}
