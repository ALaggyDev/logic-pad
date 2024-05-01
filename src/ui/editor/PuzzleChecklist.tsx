import { memo, useMemo } from 'react';
import { useEmbed } from '../EmbedContext';
import { useGrid } from '../GridContext';
import Accordion from '../components/Accordion';
import { useGridState } from '../GridStateContext';
import { Color, State } from '../../data/primitives';
import { BiSolidFlagCheckered } from 'react-icons/bi';
import { cn } from '../../utils';
import { BsCreditCard2Front, BsPatchCheckFill } from 'react-icons/bs';
import { FaCircleHalfStroke } from 'react-icons/fa6';
import { MetadataSchema } from '../../data/puzzle';

function ChecklistItem({
  icon,
  children,
  tooltip,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  tooltip?: string;
}) {
  return (
    <div
      className="flex items-center gap-2 tooltip tooltip-top tooltip-info"
      data-tip={tooltip}
    >
      {icon}
      {children}
    </div>
  );
}

export default memo(function PuzzleChecklist() {
  const { features } = useEmbed();
  const { grid, metadata } = useGrid();
  const { state } = useGridState();

  const metadataValid = useMemo(
    () => MetadataSchema.safeParse(metadata).success,
    [metadata]
  );

  const autoValidation = useMemo(() => !grid.requireSolution(), [grid]);

  const solutionIsNotEmpty = useMemo(
    () =>
      grid.tiles.some(row =>
        row.some(tile => !tile.fixed && tile.color !== Color.Gray)
      ),
    [grid]
  );

  const solutionIsComplete = useMemo(() => grid.isComplete(), [grid]);

  const solutionIsValid = state.final !== State.Error;

  const checklistComplete =
    metadataValid &&
    (autoValidation
      ? solutionIsComplete && solutionIsValid
      : solutionIsNotEmpty);

  if (!features.checklist) return null;

  return (
    <Accordion
      title={
        <>
          <span>Checklist</span>
          {checklistComplete ? (
            <div className="badge badge-success ml-2">Complete</div>
          ) : (
            <div className="badge badge-error ml-2">Incomplete</div>
          )}
        </>
      }
    >
      <div className="flex flex-col gap-2 text-sm">
        <ChecklistItem
          key="metadataValid"
          icon={
            <BsCreditCard2Front
              size={22}
              className={cn(metadataValid ? 'text-success' : 'text-error')}
            />
          }
          tooltip={
            metadataValid
              ? 'All required metadata fields are filled'
              : 'Fill all required metadata fields'
          }
        >
          {metadataValid ? 'Metadata valid' : 'Metadata invalid'}
        </ChecklistItem>
        <ChecklistItem
          key="autoValidation"
          icon={
            <BiSolidFlagCheckered
              size={22}
              className={cn(autoValidation ? 'text-success' : 'text-error')}
            />
          }
          tooltip={
            autoValidation
              ? 'You puzzle solution is automatically validated'
              : 'Only the solution you provide will be accepted'
          }
        >
          {autoValidation ? 'Auto validation' : 'Solution required'}
        </ChecklistItem>
        {autoValidation ? (
          <ChecklistItem
            key="solutionIsValid"
            icon={
              <BsPatchCheckFill
                size={22}
                className={cn(
                  solutionIsValid && solutionIsComplete
                    ? 'text-success'
                    : 'text-error'
                )}
              />
            }
            tooltip="A valid and complete solution is required to prove that the puzzle is solvable"
          >
            {solutionIsValid && solutionIsComplete
              ? 'Solution valid'
              : solutionIsValid
                ? 'Solution incomplete'
                : 'Solution invalid'}
          </ChecklistItem>
        ) : (
          <ChecklistItem
            key="solutionIsNotEmpty"
            icon={
              <FaCircleHalfStroke
                size={22}
                className={cn(
                  solutionIsNotEmpty ? 'text-success' : 'text-error'
                )}
              />
            }
            tooltip="Solution cannot be empty"
          >
            {solutionIsNotEmpty ? 'Solution not empty' : 'Solution empty'}
          </ChecklistItem>
        )}
      </div>
    </Accordion>
  );
});