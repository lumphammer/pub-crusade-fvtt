import { useCallback } from "react";

import { absoluteCover } from "../copiedFromInvestigator/components/absoluteCover";
import { Button } from "../copiedFromInvestigator/components/inputs/Button";
import { CharacterActor } from "../v10Types";
import { ConditionsRow } from "./ConditionsRow";
import { useScrollAndFocus } from "./useScrollAndFocus";

interface ConditionsListProps {
  actor: CharacterActor;
  className?: string;
}

export const ConditionsList = ({ actor, className }: ConditionsListProps) => {
  const { scrollerRef, triggerScroll } = useScrollAndFocus();

  const handleClickAdd = useCallback(async () => {
    await actor.addCondition();
    triggerScroll();
  }, [actor, triggerScroll]);

  return (
    <div
      className={className}
      css={{
        ...absoluteCover,
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "[rows] auto [button] min-content",
        alignContent: "start",
        rowGap: "0.5em",
        columnGap: "0.2em",
        padding: "0.5em",
      }}
    >
      {actor.system.conditions.length === 0 && (
        <div
          css={{ gridColumn: "1 / -1", gridRow: "rows", justifySelf: "center" }}
        >
          {"No conditions yet. Give it some time."}
        </div>
      )}
      {actor.system.conditions.length > 0 && (
        <div
          ref={scrollerRef}
          css={{
            gridColumn: "1 / -1",
            gridRow: "rows",
            display: "grid",
            gridTemplateColumns: "subgrid",
            overflowY: "auto",
            alignContent: "start",
            rowGap: "0.3em",
          }}
        >
          {actor.system.conditions.map(({ id }) => {
            return <ConditionsRow key={id} actor={actor} id={id} />;
          })}
        </div>
      )}
      <div
        css={{ gridColumn: "1 / -1", gridRow: "button", justifySelf: "center" }}
      >
        <Button onClick={handleClickAdd}>Add condition</Button>
      </div>
    </div>
  );
};

ConditionsList.displayName = "ConditionsList";
