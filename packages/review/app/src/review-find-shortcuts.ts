/** Own Cmd+G only while the caller has an open search in this shell. */
export function bindFindNavigation(
  shell: HTMLElement,
  navigate: (delta: number) => void,
): () => void {
  const document = shell.ownerDocument;

  const onKeyDown = (event: KeyboardEvent) => {
    if (!isFindNavigation(event)) return;

    if (!(event.target instanceof Node) || !shell.contains(event.target))
      return;
    event.preventDefault();
    event.stopPropagation();
    navigate(event.shiftKey ? -1 : 1);
  };

  document.addEventListener("keydown", onKeyDown, true);

  return () => document.removeEventListener("keydown", onKeyDown, true);
}

function isFindNavigation(event: KeyboardEvent): boolean {
  return (
    event.metaKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.isComposing &&
    event.key.toLowerCase() === "g"
  );
}
