import { FC, useState, useEffect } from "react"
import '../styleseets/popup.scss'

const Favicon: FC<{url: string}> = ({url}) => {
  const [favicon, setFavicon] = useState('');

  useEffect(() => {
    const domain = url.match(/^[httpsfile]+:\/{2,3}([0-9a-zA-Z.\-:]+?):?[0-9]*?\//i);
    const faviconEndpoint = 'http://www.google.com/s2/favicons?domain=';
    if (domain) {
      setFavicon(faviconEndpoint + domain[1]);
    }
  }, [url]);

  return (
    <>
      <img className="history__items--favicon" src={favicon} alt="" />
    </>
  );
}

export default Favicon;
