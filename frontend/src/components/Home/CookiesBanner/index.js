import React from 'react';

const CookiesBanner = () => {
const [showBanner, setShowBanner] = React.useState(true);

const handleClose = () => {
setShowBanner(false);
}

if (!showBanner) {
return null;
}

return (
<div className="cookies-banner flex items-center justify-center">
  <p className="text-white">We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.</p>
  <button onClick={handleClose} className="bg-white py-1 px-3 ">Close</button>
</div>
);
}

export default CookiesBanner;