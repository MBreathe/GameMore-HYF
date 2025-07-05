type size = "t_720p" | "t_1080p";

function imgUrl(url: string, size: size) {
    const regex = /\/t_[^/]+\//;
    const newUrl = url.replace(regex, `/${size}/`);
    return `https: ${newUrl}`;
}

export default imgUrl;