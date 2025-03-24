import { TabContainer } from "../copiedFromInvestigator/components/TabContainer";
import { CharacterActor } from "../v10Types";
import { ConditionsList } from "./ConditionsList";
import { DrinksList } from "./DrinksList";
import { Notes } from "./Notes";

interface TabsProps {
  actor: CharacterActor;
  className?: string;
}

export const Tabs = ({ actor, className }: TabsProps) => {
  const conditionCount = actor.system.conditions.length;

  return (
    <TabContainer
      tabs={[
        {
          id: "drinks",
          label: "Drinks",
          content: <DrinksList actor={actor} />,
        },
        {
          id: "conditions",
          label: `Conditions (${conditionCount})`,
          content: <ConditionsList actor={actor} />,
        },
        { id: "notes", label: "Notes", content: <Notes actor={actor} /> },
      ]}
      defaultTab="drinks"
    />
  );
};

Tabs.displayName = "Tabs";

// <DrinksList
// actor={actor}
// css={{ gridColumn: "1/-1", gridRow: "drinks-list" }}
// />
// <ConditionsList actor={actor} css={{ gridColumn: "1/3" }} />
// <Notes
// css={{ gridColumn: "3/-1", position: "relative" }}
// actor={actor}
// />
