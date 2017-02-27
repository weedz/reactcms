import React from 'react';

const TestNews = ({news,onNewsClick}) => (
    <ul>
        <li onClick={() => onNewsClick(1)}>Test</li>
    </ul>
);

export default TestNews