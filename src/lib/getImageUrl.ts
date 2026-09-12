const IMAGE_BASE_URL ="https://1p5nep1spk.ucarecd.net";

export function getImageUrl(uuid?: string | null): string | undefined {
  if (!uuid) return undefined;

  return `${IMAGE_BASE_URL}/${uuid}/`;
}
