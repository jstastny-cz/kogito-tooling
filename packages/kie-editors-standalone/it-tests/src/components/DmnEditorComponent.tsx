import * as React from "react";

import * as DmnEditor from "@kogito-tooling/kie-editors-standalone/dist/dmn";
import { EditorComponent, Props } from "./EditorComponent";

export const DmnEditorComponent: React.FC<Props> = ({ id, initialContent, readOnly, origin, resources }) => {
  return (
    <EditorComponent
      openEditor={DmnEditor.open}
      defaultModelName="new.dmn"
      {...{ id, initialContent, readOnly, origin, resources }}
    />
  );
};
