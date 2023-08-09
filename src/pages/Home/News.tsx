import React from 'react';

interface NewsProps {
  title: string;
}

const News: React.FC<NewsProps> = ({ title }) => {
  return (
    <div className="news">
      <p>{title}</p>
    </div>
  );
};

export default News;