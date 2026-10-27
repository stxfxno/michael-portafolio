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
    <div className="bg-void/90 rounded-2xl shadow-[0_30px_80px_-20px_rgba(147,51,234,0.7)] overflow-hidden border border-orchid-400/30 font-mono text-sm w-full min-h-[22rem] backdrop-blur-xl">
      <div className="bg-gradient-to-r from-orchid-900/80 to-azure-600/20 px-4 py-3 flex items-center border-b border-orchid-400/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-orchid-400"></div>
          <div className="w-3 h-3 rounded-full bg-white/80"></div>
          <div className="w-3 h-3 rounded-full bg-azure-400"></div>
        </div>
        <div className="ml-4 text-orchid-100/70 text-xs truncate">michael@purple-galaxy ~ zsh</div>
      </div>
      
      {/* Contenido del terminal con altura fija */}
      <div className="p-4 h-full overflow-y-auto bg-opacity-95 text-orchid-100">
        {output.map((line, index) => (
          <div key={index} className={`mb-2 break-words whitespace-pre-wrap ${line.startsWith('$ ') ? 'text-azure-300' : 'text-white/90'}`}>
            {line}
          </div>
        ))}
        
        {currentIndex < commands.length && (
          <div className="flex items-center">
            <span className="mr-2 text-azure-300">$</span>
            <span className={`h-4 w-2 bg-orchid-300 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
          </div>
        )}
        
        {currentIndex >= commands.length && (
          <div className="flex items-center">
            <span className="mr-2 text-azure-300">$</span>
            <span className={`h-4 w-2 bg-orchid-300 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;