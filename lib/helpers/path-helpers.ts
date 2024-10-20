import { IComponent } from "../schemas/component-base-schema";

export function getPathArray(path: string) {
  return path.split("-").map((p) => parseInt(p));
}

export function getElementByPath(path: string, components: IComponent[]) {
  const pathArray = getPathArray(path);
  let children = components;

  for (let i = 0; i < pathArray.length - 1; i++) {
    children = children[pathArray[i]].children!;
  }

  return children[pathArray[pathArray.length - 1]];
}

export function getPath(
  componentId: string,
  components: IComponent[],
  prefix = ""
): string | undefined {
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    if (component.id === componentId) return prefix + i.toString();

    if (component.children) {
      const path = getPath(
        componentId,
        component.children,
        prefix + i.toString() + "-"
      );
      if (path) return path;
    }
  }

  return undefined;
}

export function replaceAtPath(
  component: IComponent,
  path: string,
  components: IComponent[]
) {
  const pathArray = getPathArray(path);
  let children = components;

  for (let i = 0; i < pathArray.length - 1; i++) {
    children = children[pathArray[i]].children!;
  }

  children.splice(pathArray[pathArray.length - 1], 1, component);
}

export function insertAtPath(
  component: IComponent,
  path: string,
  components: IComponent[]
) {
  const pathArray = getPathArray(path);
  let children = components;

  for (let i = 0; i < pathArray.length - 1; i++) {
    children = children[pathArray[i]].children!;
  }

  children.splice(pathArray[pathArray.length - 1], 0, component);
}

export function removeAtPath(components: IComponent[], path: string) {
  const pathArray = getPathArray(path);
  let children = components;

  for (let i = 0; i < pathArray.length - 1; i++) {
    children = children[pathArray[i]].children!;
  }

  return children.splice(pathArray[pathArray.length - 1], 1)[0];
}

export function adjustPath(targetPath: string, sourcePath: string) {
  const sourcePathArray = getPathArray(sourcePath);
  const targetPathArray = getPathArray(targetPath);

  const sourceLastIndex = sourcePathArray.length - 1;
  const targetLastIndex = targetPathArray.length - 1;

  if (
    sourcePathArray.length === targetPathArray.length &&
    sourcePathArray[sourceLastIndex] < targetPathArray[targetLastIndex]
  ) {
    targetPathArray[targetLastIndex] = targetPathArray[targetLastIndex] - 1;
  } else if (
    sourcePathArray.length < targetPathArray.length &&
    sourcePathArray[0] < targetPathArray[0]
  ) {
    targetPathArray[0] = targetPathArray[0] - 1;
  }

  return targetPathArray.join("-");
}
