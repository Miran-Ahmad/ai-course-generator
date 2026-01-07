import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from 'react-markdown';

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  // Use videoId from content (database) first, fallback to chapter (merged data)
  const videoId = content?.videoId || chapter?.videoId;
  
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h2 className="font-semibold text-2xl md:text-3xl text-foreground mb-3">{chapter?.name}</h2>
      <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">{chapter?.about}</p>

      {/* video */}
      <div className="flex justify-center my-8">
        {videoId ? (
          <div className="w-full max-w-4xl">
            <YouTube 
              key={videoId} 
              videoId={videoId} 
              opts={opts} 
              className="w-full"
            />
          </div>
        ) : (
          <div className="text-muted-foreground text-center py-8 px-4 bg-muted rounded-lg border border-border">
            Video not available
          </div>
        )}
      </div>

      {/* content */}
      <div className="space-y-4">
        {content?.content?.map((item, index) => (
          <div key={index} className="p-6 md:p-8 bg-card border border-border mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-semibold text-lg md:text-xl text-foreground mb-4">{item.title}</h2>
            <div className="prose prose-sm md:prose-base max-w-none text-foreground text-base leading-relaxed">
              <ReactMarkdown>{item?.explanation}</ReactMarkdown>
            </div>
            {item.codeExample && (
              <div className="p-4 md:p-6 bg-muted border border-border w-full md:w-4/5 text-foreground rounded-md mt-4 overflow-x-auto">
                <pre className="text-sm md:text-base">
                  <code className="text-foreground">{item?.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
