import { memo } from 'react';
import Symbol from '../../data/symbols/symbol';
import ToolboxItem from './ToolboxItem';
import { ConfigConsumer, getConfigurableLocation } from '../ConfigContext';
import { GridConsumer } from '../GridContext';
import { Color } from '../../data/primitives';
import { eq, mousePosition } from '../../utils';
import PointerCaptureOverlay from '../grid/PointerCaptureOverlay';
import handleTileClick from '../grid/handleTileClick';
import { SymbolProps } from '../symbols';

export interface SymbolToolProps {
  name: string;
  id?: string;
  sample: Symbol;
  component: React.NamedExoticComponent<SymbolProps<any>>;
  order?: number;
}

export default memo(function SymbolTool({
  name,
  id,
  sample,
  component: Component,
  order,
}: SymbolToolProps) {
  id = id ?? sample.id;
  return (
    <ToolboxItem
      id={id}
      name={name}
      description="Left click to place a symbol. Click again to configure it."
      order={order}
      gridOverlay={
        <ConfigConsumer>
          {({ setLocation, setRef }) => {
            return (
              <GridConsumer>
                {({ grid, setGrid }) => {
                  return (
                    <PointerCaptureOverlay
                      width={grid.width}
                      height={grid.height}
                      allowDrag={false}
                      step={sample.placementStep}
                      colorMap={(x, y, color) => {
                        if (color === Color.Dark)
                          return !!grid.symbols
                            .get(sample.id)
                            ?.find(n => eq(n.x, x) && eq(n.y, y));
                        return false;
                      }}
                      onTileClick={(x, y, from, to) => {
                        if (from === Color.Dark) {
                          setLocation(
                            getConfigurableLocation(
                              grid,
                              grid.findSymbol(
                                sym =>
                                  sym.id === sample.id &&
                                  eq(sym.x, x) &&
                                  eq(sym.y, y)
                              )!
                            )
                          );
                          setRef({
                            current: document
                              .elementsFromPoint(
                                mousePosition.clientX,
                                mousePosition.clientY
                              )
                              .find(e =>
                                e.classList.contains('logic-tile')
                              ) as HTMLElement,
                          });
                        } else if (to === Color.Dark) {
                          setGrid(grid.addSymbol(sample.copyWith({ x, y })));
                        }
                      }}
                    />
                  );
                }}
              </GridConsumer>
            );
          }}
        </ConfigConsumer>
      }
      onTileClick={(x, y, target, flood, gridContext) => {
        handleTileClick(x, y, target, flood, gridContext, true);
      }}
      className="text-[42px]"
    >
      <div className="absolute w-[1em] h-[1em]">
        <Component textClass="text-base-content" symbol={sample} />
      </div>
    </ToolboxItem>
  );
});
