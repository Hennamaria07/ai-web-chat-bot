export const formatURL = (url: string[] | undefined) => {
    if (!url) return ''; // Handle undefined case
    const decodedURL = url.map((comp) => decodeURIComponent(comp));
    return decodedURL.join('/');
};
