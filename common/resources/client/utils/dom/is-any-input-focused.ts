export function isAnyInputFocused(): boolean {
  return document.activeElement
    ? ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) ||
        (document.activeElement as HTMLElement).isContentEditable
    : false;
}
