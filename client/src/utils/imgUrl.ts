type size = "t_720p" | "t_1080p";

function imgUrl(url: string | null | undefined, size: size) {
  if (!url) return undefined;
  const regex = /\/t_[^/]+\//;
  return url.replace(regex, `/${size}/`);
}

export default imgUrl;
