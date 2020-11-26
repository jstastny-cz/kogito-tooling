import { ContentType } from "@kogito-tooling/channel-common-api/dist";

export interface ResourcesHolderItem {
  name: string;
  value: Resource;
}

export interface Resource {
  contentType: ContentType;
  content: Promise<string>;
}

export class ResourcesHolder {
  public resources: Map<string, Resource> = new Map();
  private readUploadedFileAsText = (inputFile: File): Promise<string> => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader!.result as string);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };
  public loadFile(file: File, onResourceChanged: () => void): void {
    const name: string = file.name;
    this.addFile(
      { name, value: { contentType: ContentType.TEXT, content: this.readUploadedFileAsText(file) } },
      onResourceChanged
    );
  }
  public addFile(resource: ResourcesHolderItem, onResourceChanged: () => void): void {
    console.log("adding file");
    this.resources.set(resource.name, resource.value);
    onResourceChanged();
  }

  public removeFile(file: ResourcesHolderItem): void {
    this.resources.delete(file.name);
  }
}
