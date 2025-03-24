import { Fragment, useCallback } from "react";

import { AsyncTextInput } from "../copiedFromInvestigator/components/inputs/AsyncTextInput";
import { Button } from "../copiedFromInvestigator/components/inputs/Button";
import { confirmADoodleDo } from "../copiedFromInvestigator/functions/confirmADoodleDo";
import { CharacterActor } from "../v10Types";

interface ConditionsRowProps {
  actor: CharacterActor;
  id: string;
}

export const ConditionsRow = ({ actor, id }: ConditionsRowProps) => {
  const condition = actor.system.conditions.find(({ id: i }) => i === id);
  if (condition === undefined) {
    throw new Error("invalid condition id");
  }

  const handleChange = useCallback(
    (what: string) => {
      void actor.setCondition(id, what);
    },
    [actor, id],
  );

  const handleDelete = useCallback(async () => {
    const yes = await confirmADoodleDo({
      message: `Are you sure you want to delete "${condition.name || "(blank)"}"?`,
      confirmText: "Yes",
      cancelText: "No",
      confirmIconClass: "fa-trash",
    });
    if (yes) {
      void actor.deleteCondition(id);
    }
  }, [actor, condition.name, id]);

  return (
    <Fragment>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          gap: "0.3em",
        }}
      >
        <AsyncTextInput value={condition.name} onChange={handleChange} />
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </Fragment>
  );
};

ConditionsRow.displayName = "ConditionsRow";
