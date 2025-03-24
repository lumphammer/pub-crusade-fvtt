import { ReactApplicationMixin } from "@lumphammer/shared-fvtt-bits/src/ReactApplicationMixin";

import { CharacterSheet } from "../components/CharacterSheet";
import { reactTemplatePath, systemId } from "../constants";
import { assertCharacterActor } from "../pubCrusade";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
class CharacterSheetClassBase extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [systemId, "sheet", "actor"],
      template: reactTemplatePath,
      width: 777,
      height: 900,
    });
  }
}

const render = (sheet: CharacterSheetClassBase) => {
  assertCharacterActor(sheet.document);
  return <CharacterSheet actor={sheet.document} foundryApplication={sheet} />;
};

export const CharacterSheetClass = ReactApplicationMixin(
  "CharacterSheetClass",
  CharacterSheetClassBase,
  render,
);
