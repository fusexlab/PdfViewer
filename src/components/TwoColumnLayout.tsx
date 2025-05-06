import React, { useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const TwoColumnLayout = ({ pageNumber }: { pageNumber: number }) => {
    // Initialize the default layout plugin (includes zoom controls)
    const defaultLayout = defaultLayoutPlugin();

    // Initialize the page navigation plugin
    const pageNavigation = pageNavigationPlugin();

    useEffect(() => {
        // Navigate to the specified page when the component mounts or the pageNumber changes
        if (pageNumber) {
            pageNavigation.jumpToPage(pageNumber - 1); // Page numbers are zero-based
        }
    }, [pageNumber, pageNavigation]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            {/* Left Block: Text */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f0f0f0' }}>
                <h1>Welcome to the PDF Viewer</h1>
                <p>This is a sample text block. You can add any content here.</p>
            </div>

            {/* Right Block: PDF Viewer */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff', overflow: 'auto' }}>
                <Worker workerUrl="/pdf.worker.min.js">
                    <div style={{ height: '100%' }}>
                        <Viewer
                            fileUrl="/sample.pdf"
                            plugins={[defaultLayout, pageNavigation]} // Add the page navigation plugin
                        />
                    </div>
                </Worker>
            </div>
        </div>
    );
};

export default TwoColumnLayout;