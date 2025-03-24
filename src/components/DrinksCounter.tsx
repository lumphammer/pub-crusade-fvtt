import { loveYaLikeASister } from "../constants";
import { CharacterActor } from "../v10Types";
import { Panel } from "./Panel";
import { blackboard } from "./styles";

interface DrinksCounterProps {
  actor: CharacterActor;
  className?: string;
}

export const DrinksCounter = ({ actor, className }: DrinksCounterProps) => {
  return (
    <Panel
      className={className}
      css={{
        ...blackboard,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
        font: loveYaLikeASister.fontFamily,
        transform: "rotateZ(-0.5deg)",
      }}
    >
      <div
        css={{
          fontSize: "7em",
          lineHeight: "1",
        }}
      >
        {actor.system.drinks.length}
      </div>
      <div
        css={{
          transform: "translateY(-0.5em)",
          fontSize: "2em",
        }}
      >
        {actor.system.drinks.length === 1 ? "Drink" : "Drinks"}
      </div>
    </Panel>
  );
};

DrinksCounter.displayName = "DrinksCounter";
