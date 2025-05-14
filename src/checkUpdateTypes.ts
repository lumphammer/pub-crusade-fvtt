// enabling this rule because ts 5.5.x is having some issues with deep types
// that seem to come out here
/* eslint "@typescript-eslint/explicit-function-return-type": "error" */

import { CharacterActor } from "./character";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function _checkUpdateTypes(actor: CharacterActor) {
  // @ts-expect-error foo should be an error
  void actor.update({ system: { title: "foo", foo: 5 } });
}
