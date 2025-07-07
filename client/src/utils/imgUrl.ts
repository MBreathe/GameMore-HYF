type size = "t_720p" | "t_1080p";

function imgUrl(url: string, size: size) {
  const regex = /\/t_[^/]+\//;
  return url.replace(regex, `/${size}/`);
}

export default imgUrl;
