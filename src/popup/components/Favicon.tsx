import { useState, useEffect } from "react";

export function Favicon({url}: {url: string}) {
  const [favicon, setFavicon] = useState('');

  useEffect(() => {
    const domain = url.match(/^[httpsfile]+:\/{2,3}([0-9a-zA-Z.\-:]+?):?[0-9]*?\//i);
    const faviconEndpoint = 'http://www.google.com/s2/favicons?domain=';
    if (domain) {
      setFavicon(faviconEndpoint + domain[0]);
    }
  }, [url]);

  return <img className="mx-1 h-3 w-3" src={favicon} alt="" />;
}
