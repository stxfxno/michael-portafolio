// En Terminal.tsx
import { useState, useEffect } from 'react';

interface TerminalProps {
  commands: string[];
  typingSpeed?: number;
  initialDelay?: number;
}

const Terminal = ({ commands, typingSpeed = 80, initialDelay = 800 }: TerminalProps) => {
  const [output, setOutput] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Efecto para el parpadeo del cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Efecto para mostrar comandos
  useEffect(() => {
    if (currentIndex >= commands.length) return;
    
    const isCommand = currentIndex % 2 === 0;
    const text = commands[currentIndex];
    
    const timeout = setTimeout(() => {
      if (isCommand) {
        setOutput(prev => [...prev, `$ ${text}`]);
      } else {
        setOutput(prev => [...prev, text]);
      }
      setCurrentIndex(prev => prev + 1);
    }, isCommand ? initialDelay : (typingSpeed * 10));
    
    return () => clearTimeout(timeout);
  }, [commands, currentIndex, initialDelay, typingSpeed]);

  return (
    // Ajusta los estilos para que tenga un tamaño fijo desde el inicio
    <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700 font-mono text-sm w-full h-80 min-w-[400px] md:min-w-[500px]">
      <div className="bg-gray-800 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-gray-400 text-xs truncate">michael@dev-terminal</div>
      </div>
      
      {/* Contenido del terminal con altura fija */}
      <div className="p-4 h-full overflow-y-auto bg-opacity-95 text-green-400 bg-gradient-to-b from-gray-900 to-gray-950">
        {output.map((line, index) => (
          <div key={index} className="mb-2 break-words whitespace-pre-wrap">
            {line}
          </div>
        ))}
        
        {currentIndex < commands.length && (
          <div className="flex items-center">
            <span className="mr-2">$</span>
            <span className={`h-4 w-2 bg-green-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
          </div>
        )}
        
        {currentIndex >= commands.length && (
          <div className="flex items-center">
            <span className="mr-2">$</span>
            <span className={`h-4 w-2 bg-green-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;