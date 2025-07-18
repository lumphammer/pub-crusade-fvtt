import { CharacterActor } from "../character";
import { AsyncTextInput } from "../copiedFromInvestigator/components/inputs/AsyncTextInput";
import { Toggle } from "../copiedFromInvestigator/components/inputs/Toggle";
import { Panel } from "./Panel";

interface TopBitsProps {
  actor: CharacterActor;
  className?: string;
}

export const TopBits = ({ actor, className }: TopBitsProps) => {
  return (
    <Panel
      className={className}
      css={{ display: "grid", gridTemplateColumns: "subgrid", rowGap: "0.5em" }}
    >
      <div css={{ gridColumn: "1/4" }}>
        <label>
          Name
          <AsyncTextInput value={actor.name ?? ""} onChange={actor.setName} />
        </label>
      </div>
      <div css={{ gridColumn: "4/6" }}>
        <label>
          Title
          <AsyncTextInput
            value={actor.system.title}
            onChange={actor.system.setTitle}
            index={0}
          />
        </label>
      </div>
      <div css={{ gridColumn: "6/7" }}>
        <label>
          Title Die
          <select
            css={{ display: "block" }}
            value={actor.system.titleDie}
            onChange={(e) => actor.system.setTitleDie(e.target.value)}
          >
            <option value="d4">d4</option>
            <option value="d6">d6</option>
            <option value="d10">d10</option>
            <option value="d12">d12</option>
          </select>
        </label>
      </div>
      <div css={{ gridColumn: "1/3" }}>
        <label>
          Order
          <AsyncTextInput
            value={actor.system.order}
            onChange={actor.system.setOrder}
          />
        </label>
      </div>
      <div css={{ gridColumn: "3/6" }}>
        <label>
          Order Quest
          <AsyncTextInput
            value={actor.system.orderQuest.name}
            onChange={actor.system.setOrderQuestName}
          />
        </label>
      </div>
      <div css={{ gridColumn: "6/7" }}>
        <label>
          Completed?
          <Toggle
            checked={actor.system.orderQuest.completed}
            onChange={actor.system.setOrderQuestCompleted}
          />
        </label>
      </div>
      <div css={{ gridColumn: "1/3" }}>
        <label>
          Tenet
          <AsyncTextInput
            value={actor.system.tenet}
            onChange={actor.system.setTenet}
          />
        </label>
      </div>
      <div css={{ gridColumn: "3/6" }}>
        <label>
          Personal Quest
          <AsyncTextInput
            value={actor.system.personalQuest.name}
            onChange={actor.system.setPersonalQuestName}
          />
        </label>
      </div>
      <div css={{ gridColumn: "6/7" }}>
        <label>
          Completed?
          <Toggle
            checked={actor.system.personalQuest.completed}
            onChange={actor.system.setPersonalQuestCompleted}
          />
        </label>
      </div>
    </Panel>
  );
};

TopBits.displayName = "TopBits";
