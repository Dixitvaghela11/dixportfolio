
import React from 'react';
import Typewriter from 'typewriter-effect';

type TypewriterAnimationProps = {
  strings: string[];
  speed?: number;
};

const TypewriterAnimation = ({ strings, speed = 50 }: TypewriterAnimationProps) => {
  return (
    <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
          delay: speed,
          wrapperClassName: "text-2xl sm:text-3xl md:text-4xl",
          cursorClassName: "text-2xl sm:text-3xl md:text-4xl text-purple-500"
        }}
      />
    </div>
  );
};

export default TypewriterAnimation;
