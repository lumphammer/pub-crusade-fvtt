import React from "react";

import { AsyncNumberInput } from "../copiedFromInvestigator/components/inputs/AsyncNumberInput";
import { Button } from "../copiedFromInvestigator/components/inputs/Button";
import { CharacterActor } from "../v10Types";
import { Panel } from "./Panel";

interface RollProps {
  title: string;
  description: string;
  actor: CharacterActor;
  lowOrHigh: "low" | "high";
  className?: string;
}

export const Roll = ({
  title,
  description,
  actor,
  lowOrHigh,
  className,
}: RollProps) => {
  const [modifier, setModifier] = React.useState(0);
  const [useTitleDie, setUseTitleDie] = React.useState(false);

  const handleChangeUseTitleDie = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setUseTitleDie(e.target.value === "true");
    },
    [setUseTitleDie],
  );

  const handleClickRoll = React.useCallback(() => {
    console.log("roll");
    void actor.roll(modifier, useTitleDie, lowOrHigh);
    setModifier(0);
    setUseTitleDie(false);
  }, [actor, lowOrHigh, modifier, useTitleDie]);

  return (
    <Panel className={className} css={{ textAlign: "center" }}>
      <h2 css={{ "&&": { marginBottom: "0em" } }}>{title}</h2>
      <div css={{ fontSize: "0.8em", marginBottom: "0.5em" }}>
        {description}
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0.5em",
        }}
      >
        <span css={{ marginRight: "0.5em" }}>Modifier</span>{" "}
        <AsyncNumberInput value={modifier} onChange={setModifier} />
      </div>
      <div css={{ marginBottom: "0.5em" }}>
        <select
          value={useTitleDie ? "true" : "false"}
          onChange={handleChangeUseTitleDie}
        >
          <option value="false">Standard: d8</option>
          <option value="true">Title die: {actor.system.titleDie}</option>
        </select>{" "}
      </div>
      <div>
        <Button onClick={handleClickRoll}>Roll</Button>
      </div>
    </Panel>
  );
};

Roll.displayName = "Roll";
