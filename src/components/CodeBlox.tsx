import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
}

const CodeBlock = ({ 
  code, 
  language = 'javascript', 
  fileName = 'skills.js', 
  showLineNumbers = true 
}: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const lines = code.split('\n');
  
  // Función para colorear la sintaxis
  const syntaxHighlight = (char: string, index: number, line: string) => {
    // Keywords de JavaScript/TypeScript
    const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'await', 'async'];
    
    // Comprobar si el carácter actual es el inicio de una keyword
    const nextChars = line.substring(index);
    const nextWord = nextChars.split(/[ {(=;,:\n\t\r]/, 1)[0];
    
    if (keywords.includes(nextWord) && index === line.indexOf(nextWord)) {
      return (
        <span key={index} className="text-orchid-300">
          {nextWord}
        </span>
      );
    }
    
    // Paréntesis, corchetes y llaves
    if (/[{}()[\]]/.test(char)) {
      return <span key={index} className="text-white">{char}</span>;
    }
    
    // Comillas para strings
    if (/["'`]/.test(char)) {
      return <span key={index} className="text-azure-300">{char}</span>;
    }
    
    // Operadores y puntuación
    if (/[:.;,=+\-*/<>]/.test(char)) {
      return <span key={index} className="text-orchid-100/50">{char}</span>;
    }
    
    // Detección de strings completos
    if (
      (line.indexOf('"', index) > index && line.lastIndexOf('"', index - 1) !== -1) ||
      (line.indexOf("'", index) > index && line.lastIndexOf("'", index - 1) !== -1) ||
      (line.indexOf('`', index) > index && line.lastIndexOf('`', index - 1) !== -1)
    ) {
      return <span key={index} className="text-azure-300">{char}</span>;
    }
    
    // Default
    return <span key={index} className="text-orchid-50/90">{char}</span>;
  };
  
  return (
    <div className="rounded-2xl overflow-hidden border border-orchid-400/30 shadow-[0_30px_80px_-30px_rgba(147,51,234,0.8)] backdrop-blur-xl">
      {/* File header */}
      <div className="bg-gradient-to-r from-orchid-900/80 to-azure-600/20 border-b border-orchid-400/20 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-orchid-400 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-white/80 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-azure-400 mr-2"></div>
          <span className="text-orchid-100/80 text-sm ml-2 font-mono">{fileName}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 rounded-full border border-orchid-400/40 text-orchid-100 hover:bg-orchid-500/20 transition-colors duration-200"
        >
          {isCopied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      
      {/* Code content */}
      <div className="bg-void/85 overflow-x-auto">
        <pre className="p-4 text-sm font-mono text-orchid-50">
          <code className="table w-full">
            {lines.map((line, lineIndex) => {
              // Procesamiento de la línea para resaltado de sintaxis
              const processedLine = [];
              let skipChars = 0;
              
              for (let i = 0; i < line.length; i++) {
                if (skipChars > 0) {
                  skipChars--;
                  continue;
                }
                
                // Buscar palabras clave JavaScript/TypeScript
                const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'await', 'async'];
                let foundKeyword = false;
                
                for (const keyword of keywords) {
                  if (line.substring(i, i + keyword.length) === keyword && 
                      (i === 0 || /\s|[{([]/.test(line[i-1])) && 
                      (i + keyword.length === line.length || /\s|[}),:;=]/.test(line[i + keyword.length]))) {
                    processedLine.push(
                      <span key={`${lineIndex}-${i}`} className="text-orchid-300">
                        {keyword}
                      </span>
                    );
                    skipChars = keyword.length - 1;
                    foundKeyword = true;
                    break;
                  }
                }
                
                if (foundKeyword) continue;
                
                // Detectar strings
                if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
                  const quoteChar = line[i];
                  let endQuotePos = -1;
                  let escaped = false;
                  
                  for (let j = i + 1; j < line.length; j++) {
                    if (line[j] === '\\') {
                      escaped = !escaped;
                    } else if (line[j] === quoteChar && !escaped) {
                      endQuotePos = j;
                      break;
                    } else {
                      escaped = false;
                    }
                  }
                  
                  if (endQuotePos !== -1) {
                    processedLine.push(
                      <span key={`${lineIndex}-${i}`} className="text-azure-300">
                        {line.substring(i, endQuotePos + 1)}
                      </span>
                    );
                    skipChars = endQuotePos - i;
                    continue;
                  }
                }
                
                // Procesar corchetes, llaves, paréntesis
                if (/[{}()[\]]/.test(line[i])) {
                  processedLine.push(
                    <span key={`${lineIndex}-${i}`} className="text-white">
                      {line[i]}
                    </span>
                  );
                  continue;
                }
                
                // Procesar puntuación y operadores
                if (/[:.;,=+\-*/<>]/.test(line[i])) {
                  processedLine.push(
                    <span key={`${lineIndex}-${i}`} className="text-orchid-100/50">
                      {line[i]}
                    </span>
                  );
                  continue;
                }
                
                // Todo lo demás (identificadores, números, etc.)
                processedLine.push(
                  <span key={`${lineIndex}-${i}`} className="text-orchid-50/90">
                    {line[i]}
                  </span>
                );
              }
              
              return (
                <div key={lineIndex} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell text-right pr-4 select-none text-orchid-100/25 w-10 whitespace-nowrap">
                      {lineIndex + 1}
                    </span>
                  )}
                  <span className="table-cell whitespace-pre">
                    {processedLine.length > 0 ? processedLine : line}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;