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
<div className="sticky bottom-0 flex items-center justify-center bg-blue-800 px-8">
  <p className="text-white text-2xl">We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.</p>
  <button onClick={handleClose} className="bg-white py-1 px-3 ">Close</button>
</div>
);
}

export default CookiesBanner;