import * as React from "react";

import * as BpmnEditor from "@kogito-tooling/kie-editors-standalone/dist/bpmn";
import { EditorComponent, Props } from "./EditorComponent";

export const BpmnEditorComponent: React.FC<Props> = ({ id, initialContent, readOnly, origin, resources }) => {
  return (
    <EditorComponent
      openEditor={BpmnEditor.open}
      defaultModelName="new.bpmn"
      {...{ id, initialContent, readOnly, origin, resources }}
    />
  );
};
