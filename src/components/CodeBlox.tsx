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
        <span key={index} className="text-purple-600 dark:text-purple-400">
          {nextWord}
        </span>
      );
    }
    
    // Paréntesis, corchetes y llaves
    if (/[{}()[\]]/.test(char)) {
      return <span key={index} className="text-yellow-600 dark:text-yellow-400">{char}</span>;
    }
    
    // Comillas para strings
    if (/["'`]/.test(char)) {
      return <span key={index} className="text-green-600 dark:text-green-400">{char}</span>;
    }
    
    // Operadores y puntuación
    if (/[:.;,=+\-*/<>]/.test(char)) {
      return <span key={index} className="text-gray-600 dark:text-gray-400">{char}</span>;
    }
    
    // Detección de strings completos
    if (
      (line.indexOf('"', index) > index && line.lastIndexOf('"', index - 1) !== -1) ||
      (line.indexOf("'", index) > index && line.lastIndexOf("'", index - 1) !== -1) ||
      (line.indexOf('`', index) > index && line.lastIndexOf('`', index - 1) !== -1)
    ) {
      return <span key={index} className="text-green-600 dark:text-green-400">{char}</span>;
    }
    
    // Default
    return <span key={index} className="text-gray-800 dark:text-gray-200">{char}</span>;
  };
  
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      {/* File header */}
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium ml-2">{fileName}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-2 py-1 rounded transition-colors duration-200 text-gray-700 dark:text-gray-300"
        >
          {isCopied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      
      {/* Code content */}
      <div className="bg-white dark:bg-gray-900 overflow-x-auto">
        <pre className="p-4 text-sm font-mono text-gray-800 dark:text-gray-200">
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
                      <span key={`${lineIndex}-${i}`} className="text-purple-600 dark:text-purple-400">
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
                      <span key={`${lineIndex}-${i}`} className="text-green-600 dark:text-green-400">
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
                    <span key={`${lineIndex}-${i}`} className="text-yellow-600 dark:text-yellow-400">
                      {line[i]}
                    </span>
                  );
                  continue;
                }
                
                // Procesar puntuación y operadores
                if (/[:.;,=+\-*/<>]/.test(line[i])) {
                  processedLine.push(
                    <span key={`${lineIndex}-${i}`} className="text-gray-600 dark:text-gray-400">
                      {line[i]}
                    </span>
                  );
                  continue;
                }
                
                // Todo lo demás (identificadores, números, etc.)
                processedLine.push(
                  <span key={`${lineIndex}-${i}`} className="text-gray-800 dark:text-gray-200">
                    {line[i]}
                  </span>
                );
              }
              
              return (
                <div key={lineIndex} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell text-right pr-4 select-none text-gray-400 dark:text-gray-600 w-10">
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