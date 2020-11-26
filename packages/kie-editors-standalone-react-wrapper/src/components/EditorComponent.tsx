import * as React from "react";
import { useRef, useEffect, useState } from "react";

import { ContentType } from "@kogito-tooling/channel-common-api/dist";
import { StandaloneEditorApi } from "@kogito-tooling/kie-editors-standalone/dist/common/Editor";

import { FileLoader } from "./FileLoader";
import { ResourcesHolder, ResourcesHolderItem } from "../util/ResourcesHolder";

interface EditorOpenProps {
  container: Element;
  initialContent?: Promise<string>;
  readOnly?: boolean;
  origin?: string;
  resources?: Map<
    string,
    {
      contentType: ContentType;
      content: Promise<string>;
    }
  >;
}

export interface Props {
  id: string;
  initialContent?: Promise<string>;
  readOnly?: boolean;
  origin?: string;
  resources?: Map<string, ResourcesHolderItem>;
}

interface InternalProps {
  openEditor: (props: EditorOpenProps) => StandaloneEditorApi;
  id: string;
  initialContent?: Promise<string>;
  readOnly?: boolean;
  origin?: string;
  resources?: Map<string, ResourcesHolderItem>;
  defaultModelName?: string;
}
const divstyle = {
  flex: "1 1 auto"
};

const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(val => ++val); // update the state to force render
};

export const EditorComponent: React.FC<InternalProps> = ({
  id,
  initialContent,
  readOnly,
  origin,
  defaultModelName,
  openEditor
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [logs] = useState<string[]>([]);
  const [dirty, setDirty] = useState<boolean>(false);
  const [editor, setEditor] = useState<StandaloneEditorApi>();
  const forceUpdate = useForceUpdate();
  const [filesHolder, setFilesHolder] = useState<ResourcesHolder>(new ResourcesHolder());
  const [modelName, setModelName] = useState<string>(defaultModelName || "new-file");

  useEffect(() => {
    const ed = openEditor({
      container: container.current!,
      initialContent,
      readOnly,
      origin,
      resources: filesHolder.resources
    });
    ed.subscribeToContentChanges(isDirty => {
      setDirty(isDirty);
    });
    setEditor(ed);
    return () => {
      editor?.close();
    };
  }, []);

  const setEditorContents = (resource: ResourcesHolderItem) => {
    return resource.value.content.then((value: string) => {
      editor!.setContent(value, value);
      setModelName(resource.name);
    });
  };

  const appendLog = (message: string) => {
    logs.push(message);
  };

  const editorUndo = () => {
    editor!.undo();
  };
  const editorRedo = () => {
    editor!.redo();
  };
  const editorSave = () => {
    filesHolder.addFile(
      { name: modelName, value: { contentType: ContentType.TEXT, content: editor!.getContent() } },
      forceUpdate
    );
    editor?.markAsSaved();
  };
  const editorSvg = () => {
    //TODO
    editor!.getPreview().then(value => value);
  };
  const editorXml = () => {
    editor!.getContent().then(value => {
      // TODO
    });
  };

  const renderButtons = () => {
    return (
      <div id="buttons" style={{ flex: "0 1 auto" }}>
        <button id="undo" onClick={editorUndo} disabled={!dirty}>
          undo
        </button>
        <button id="redo" onClick={editorRedo} disabled={!dirty}>
          redo
        </button>
        <button id="save" onClick={editorSave} disabled={!dirty}>
          save
        </button>
        <button id="xml" onClick={editorXml}>
          Download XML
        </button>
        <button id="svg" onClick={editorSvg}>
          Download SVG
        </button>
      </div>
    );
  };

  const renderLogs = () => {
    // TODO
    return (
      <ul>
        {logs.map(it => (
          <li>{it}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <FileLoader
        allowDownload={true}
        allowUpload={true}
        onView={setEditorContents}
        resourcesHolder={filesHolder}
        onResourceChange={forceUpdate}
        ouiaId={id}
      />
      {dirty && <div id="dirty">Unsaved changes.</div>}
      {renderButtons()}
      <div data-ouia-component-type="editor" data-ouia-component-id={id} ref={container} style={divstyle} />
      <div data-ouia-component-type="test-log" data-ouia-component-id={id}>
        {renderLogs()}
      </div>
    </>
  );
};
