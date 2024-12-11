import React from 'react';

const MainContent = ({ children }) => {
    return (
        <main className="min-h-[calc(100vh-3rem)] w-full">
            { children }
        </main>
    );
}

export default MainContent;
