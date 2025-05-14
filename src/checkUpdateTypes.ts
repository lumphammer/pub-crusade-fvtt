// enabling this rule because ts 5.5.x is having some issues with deep types
// that seem to come out here
/* eslint "@typescript-eslint/explicit-function-return-type": "error" */

import { CharacterActor } from "./character";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function _checkUpdateTypes(actor: CharacterActor) {
  // errors on `foo` (correctly)
  void actor.update({ system: { title: "foo", foo: 5 } });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function _checkUpdateTypes2(actor: CharacterActor) {
  // errors on `system`?
  void actor.update({ system: { title: "foo" } });
}
