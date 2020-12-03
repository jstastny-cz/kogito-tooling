import * as React from "react";
import { useRef } from "react";
import { ResourcesHolderItem, ResourcesHolder } from "../util/ResourcesHolder";

interface Props {
  allowDownload: boolean;
  allowUpload: boolean;
  onView: (resource: ResourcesHolderItem) => void;
  resourcesHolder: ResourcesHolder;
  onResourceChange: () => void;
  ouiaId?: string;
  ouiaSafe?: boolean;
}
export const FileLoader: React.FC<Props> = ({
  allowDownload,
  allowUpload,
  onView,
  resourcesHolder,
  onResourceChange,
  ouiaId,
  ouiaSafe
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (fileInput!.current!.files!.length > 0) {
      Array.from(fileInput!.current!.files!).forEach(f => {
        resourcesHolder.loadFile(f, onResourceChange);
      });
      fileInput.current!.value = "";
    }
  };
  const remove = (resource: ResourcesHolderItem) => {
    resourcesHolder.removeFile(resource);
    onResourceChange();
  };
  const download = (resource: ResourcesHolderItem) => {
    alert(resource.value.content);
  };
  const view = (resource: ResourcesHolderItem) => {
    onView(resource);
  };

  const renderForm = () => {
    return (
      allowUpload && (
        <form onSubmit={handleSubmit} data-ouia-component-type="file-upload-form">
          <label>
            File to upload:&nbsp;
            <input type="file" ref={fileInput} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )
    );
  };
  const renderFiles = () => {
    return (
      <ul data-ouia-component-type="file-list">
        {Array.from(resourcesHolder.resources).map(([key, value]) => {
          const item: ResourcesHolderItem = { name: key, value: value };
          return (
            <li data-ouia-component-type="file-list-item" data-ouia-component-id={item.name} key={item.name}>
              <span>{item.name}</span>
              <button
                data-ouia-component-type="file-list-item-button"
                data-ouia-component-id="view"
                onClick={it => view(item)}
              >
                view
              </button>
              {allowDownload && (
                <button
                  data-ouia-component-type="file-list-item-button"
                  data-ouia-component-id="download"
                  onClick={it => download(item)}
                >
                  download
                </button>
              )}
              <button
                data-ouia-component-type="file-list-item-button"
                data-ouia-component-id="remove"
                onClick={it => remove(item)}
              >
                remove
              </button>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div
      data-ouia-component-type="file-loader"
      data-ouia-component-id={ouiaId}
      data-ouia-safe={ouiaSafe ? ouiaSafe : true}
    >
      {allowUpload && renderForm()}
      {renderFiles()}
    </div>
  );
};
