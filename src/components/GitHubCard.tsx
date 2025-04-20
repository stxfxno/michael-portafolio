import { Code, Star, GitFork, Eye, Clock } from 'lucide-react';

interface GitHubCardProps {
  project: {
    title: string;
    description: string;
    language?: string;
    stars?: number;
    forks?: number;
    watchCount?: number;
    lastUpdated?: string;
    repoUrl?: string;
  };
}

const GitHubCard = ({ project }: GitHubCardProps) => {
  // Map language to color
  const getLanguageColor = (language?: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-purple-500',
      'C++': 'bg-pink-500',
      Kotlin: 'bg-indigo-500'
    };
    
    return colors[language || ''] || 'bg-gray-500';
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <Code size={20} className="text-gray-600 dark:text-gray-400 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
          </div>
          
          {project.lastUpdated && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock size={14} className="mr-1" />
              {project.lastUpdated}
            </div>
          )}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {project.language && (
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)} mr-1`}></span>
              <span className="text-gray-700 dark:text-gray-300">{project.language}</span>
            </div>
          )}
          
          {project.stars !== undefined && (
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Star size={16} className="mr-1 text-yellow-500" />
              {project.stars}
            </div>
          )}
          
          {project.forks !== undefined && (
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <GitFork size={16} className="mr-1" />
              {project.forks}
            </div>
          )}
          
          {project.watchCount !== undefined && (
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Eye size={16} className="mr-1" />
              {project.watchCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubCard;