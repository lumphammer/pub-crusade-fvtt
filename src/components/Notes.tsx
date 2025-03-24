import { useRef, useState } from "react";

import { absoluteCover } from "../copiedFromInvestigator/components/absoluteCover";
import { RichTextEditor } from "../copiedFromInvestigator/components/inputs/RichTextEditor";
import { CharacterActor } from "../v10Types";

interface NotesProps {
  actor: CharacterActor;
  className?: string;
}

export const Notes = ({ actor, className }: NotesProps) => {
  const [editMode, setEditMode] = useState(false);
  const temp = useRef(actor.system.notes);

  const handleSave = async () => {
    await actor.setNotes(temp.current);
    setEditMode(false);
  };

  const handleClickEdit = () => {
    temp.current = actor.system.notes;
    setEditMode(true);
  };

  const handleChange = (newValue: string) => {
    temp.current = newValue;
  };

  return (
    <div
      className={className}
      css={{
        ...absoluteCover,
        display: "flex",
        flexDirection: "column",
        padding: "0.5em",
      }}
    >
      {!editMode && (
        <>
          <h2 css={{ position: "sticky", top: 0 }}>
            Notes <a onClick={handleClickEdit}>Edit</a>
          </h2>
          <div
            css={{ flex: 1, overflowY: "scroll" }}
            dangerouslySetInnerHTML={{ __html: actor.system.notes }}
          />
        </>
      )}
      {editMode && (
        <RichTextEditor
          value={actor.system.notes}
          onChange={handleChange}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

Notes.displayName = "Notes";
