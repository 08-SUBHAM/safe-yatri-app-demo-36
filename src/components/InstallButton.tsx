import { useEffect } from 'react';

const InstallButton = () => {
  useEffect(() => {
    // This empty effect is kept to maintain the component structure
    // but we don't need to do anything here as we're relying on the browser's native prompt
  }, []);

  // Return null to render nothing
  return null;
};

export default InstallButton;
