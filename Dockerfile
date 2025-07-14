# Usa Node.js versão 18 como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência (aproveita cache)
# COPY package*.json .

# Copia o restante do projeto
COPY . .

# Instala as dependências (inclusive o TypeScript)
RUN npm install

# Compila o TypeScript (gera a pasta lib/)
RUN npm run build

# Comando de inicialização
CMD ["node", "lib/index.js"]
