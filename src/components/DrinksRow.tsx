import { Fragment, useCallback } from "react";

import { AsyncTextInput } from "../copiedFromInvestigator/components/inputs/AsyncTextInput";
import { Button } from "../copiedFromInvestigator/components/inputs/Button";
import { confirmADoodleDo } from "../copiedFromInvestigator/functions/confirmADoodleDo";
import { CharacterActor } from "../v10Types";

interface DrinksRowProps {
  actor: CharacterActor;
  id: string;
}

export const DrinksRow = ({ actor, id }: DrinksRowProps) => {
  const drink = actor.system.drinks.find(({ id: i }) => i === id);
  if (drink === undefined) {
    throw new Error("invalid drink id");
  }

  const handleChangeWhat = useCallback(
    (what: string) => {
      void actor.setDrinkWhat(id, what);
    },
    [actor, id],
  );

  const handleChangeWhere = useCallback(
    (where: string) => {
      void actor.setDrinkWhere(id, where);
    },
    [actor, id],
  );

  const handleDelete = useCallback(async () => {
    const yes = await confirmADoodleDo({
      message: `Delete the ${drink.what || "(blank)"} that you drank at ${drink.where || "(blank)"}?`,
      confirmText: "Yes",
      cancelText: "No",
      confirmIconClass: "fa-trash",
    });
    if (yes) {
      void actor.deleteDrink(id);
    }
  }, [actor, drink.what, drink.where, id]);

  return (
    <Fragment>
      <div css={{ gridColumn: "1" }}>
        <AsyncTextInput
          className="drink-what"
          value={drink.what}
          onChange={handleChangeWhat}
        />
      </div>
      <div
        css={{
          gridColumn: "2",
          display: "flex",
          flexDirection: "row",
          gap: "0.3em",
        }}
      >
        <AsyncTextInput value={drink.where} onChange={handleChangeWhere} />
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </Fragment>
  );
};

DrinksRow.displayName = "DrinksRow";
