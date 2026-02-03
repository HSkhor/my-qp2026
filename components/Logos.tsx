import React from 'react';

export const JPTLogo: React.FC<{ className?: string }> = ({ className }) => {
  // Using the thumbnail endpoint is often more reliable for hotlinking than export=view
  // ID: 1GRjFMmaCm18Mq1QWg8DPN3cvM1wTABUi
  return (
    <img
      src="https://drive.google.com/thumbnail?id=1GRjFMmaCm18Mq1QWg8DPN3cvM1wTABUi&sz=w1000"
      alt="Jabatan Perubatan Transfusi Logo"
      className={`object-contain ${className}`}
      onError={(e) => {
        // Fallback in case of error
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevent infinite loop
        target.style.display = 'none';
        // Try to show text if image fails
        if (target.parentElement) {
            target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'border', 'border-gray-300', 'bg-gray-50', 'text-xs', 'font-bold', 'text-gray-500');
            target.parentElement.innerText = 'JPT LOGO';
        }
      }}
    />
  );
};
