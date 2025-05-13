// enabling this rule because ts 5.5.x is having some issues with deep types
// that seem to come out here
/* eslint "@typescript-eslint/explicit-function-return-type": "error" */

import { assertCharacterActor } from "./character";

// just a type test
async function _setOrder(
  actor: Actor.Implementation,
  order: string,
): Promise<void> {
  assertCharacterActor(actor);
  // @ts-expect-error this should error on foo
  await actor.update({ system: { order, foo: 5 } });
}

export class PubCrusadeActor<
  SubType extends Actor.SubType,
> extends Actor<SubType> {
  setName = (name: string): Promise<this | undefined> => {
    return this.update({ name });
  };
}
