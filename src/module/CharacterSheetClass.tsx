import { ReactApplicationV2Mixin } from "@lumphammer/shared-fvtt-bits/src/ReactApplicationV2Mixin";

import { CharacterSheet } from "../components/CharacterSheet";
import { reactTemplatePath, systemId } from "../constants";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
class CharacterSheetClassBase extends foundry.applications.sheets.ActorSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: [systemId, "sheet", "actor", "pub-crusade"],
    template: reactTemplatePath,
    position: {
      width: 777,
      height: 900,
    },
    window: {
      resizable: true,
    },
  };
}

const render = () => {
  return <CharacterSheet />;
};

export const CharacterSheetClass = ReactApplicationV2Mixin(
  "CharacterSheetClass",
  CharacterSheetClassBase,
  render,
);
