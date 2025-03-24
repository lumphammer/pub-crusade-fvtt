import { useCallback } from "react";

import { absoluteCover } from "../copiedFromInvestigator/components/absoluteCover";
import { Button } from "../copiedFromInvestigator/components/inputs/Button";
import { CharacterActor } from "../v10Types";
import { DrinksRow } from "./DrinksRow";
import { useScrollAndFocus } from "./useScrollAndFocus";

interface DrinksListProps {
  actor: CharacterActor;
  className?: string;
}

export const DrinksList = ({ actor, className }: DrinksListProps) => {
  const { scrollerRef, triggerScroll } = useScrollAndFocus({
    selector: ".drink-what",
  });

  const handleClickAdd = useCallback(async () => {
    await actor.addDrink();
    triggerScroll();
  }, [actor, triggerScroll]);

  return (
    <div
      className={className}
      css={{
        ...absoluteCover,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows:
          "[headers] min-content [rows] auto [button] min-content",
        alignContent: "start",
        rowGap: "0.5em",
        columnGap: "0.3em",
        overflow: "hidden",
        padding: "0.5em",
      }}
    >
      {actor.system.drinks.length > 0 && (
        <>
          <h2
            css={{ gridColumn: "1", gridRow: "headers", "&&": { margin: 0 } }}
          >
            What
          </h2>
          <h2
            css={{ gridColumn: "2", gridRow: "headers", "&&": { margin: 0 } }}
          >
            Where
          </h2>
        </>
      )}
      {actor.system.drinks.length === 0 && (
        <div
          css={{
            gridColumn: "1 / -1",
            gridRow: "rows",
            justifySelf: "center",
          }}
        >
          {"No drinks yet. You're alarmingly sober."}
        </div>
      )}
      {actor.system.drinks.length > 0 && (
        <div
          ref={scrollerRef}
          css={{
            gridColumn: "1 / -1",
            gridRow: "rows",
            display: "grid",
            gridTemplateColumns: "subgrid",
            overflowY: "auto",
            alignContent: "start",
            rowGap: "0.5em",
          }}
        >
          {actor.system.drinks.map(({ id }) => {
            return <DrinksRow key={id} actor={actor} id={id} />;
          })}
        </div>
      )}
      <div
        css={{ gridColumn: "1 / -1", gridRow: "button", justifySelf: "center" }}
      >
        <Button
          disabled={actor.system.drinks.length >= 900}
          onClick={handleClickAdd}
        >
          Drink a drink
        </Button>
      </div>
    </div>
  );
};

DrinksList.displayName = "DrinksList";
