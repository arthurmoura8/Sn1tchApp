const axios = require('axios');
const Group = require('../models/Group');

const getGitHubContributions = async (req, res) => {
    try {
      const { groupId } = req.params;
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      // Extrai informações do repositório da URL
      const repoInfo = await getRepoInfoFromURL(group.githubRepo);
  
      // Constrói a URL da API do GitHub usando as informações do repositório
      const apiURL = `https://api.github.com/repos/${repoInfo.username}/${repoInfo.repoName}/contributors`;
  
      const response = await axios.get(apiURL);
      
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching GitHub contributions', error });
    }
  };

  function getRepoInfoFromURL(url) {
    // Verifica se a URL é válida
    if (!url.startsWith('https://github.com/') || !url.includes('/')) {
      throw new Error('URL do repositório inválida');
    }
  
    // Divide a URL em partes
    const urlParts = url.split('/');
  
    // Extrai o nome do usuário e o nome do repositório
    const username = urlParts[3];
    const repoName = urlParts[4].replace('.git', ''); // Remove .git extension
  
    // Retorna um objeto com as informações do repositório
    return {
      username,
      repoName
    };
  }

const getGoogleDocsContributions = async (req, res) => {
  // Implementação de lógica para buscar contribuições no Google Docs
  res.status(501).json({ message: 'Google Docs contributions not implemented' });
};

module.exports = { getGitHubContributions, getGoogleDocsContributions };
