[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=20402999&assignment_repo_type=AssignmentRepo)
# B-beautyGlow

Site estático simples com live reload para desenvolvimento.

## Como usar

### Desenvolvimento Local (com live reload)
```bash
# Instalar dependências (só na primeira vez)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Ou use os scripts:
- **Windows**: `dev.bat`
- **Linux/Mac**: `./dev.sh`

O site abrirá automaticamente em `http://localhost:3000` e recarregará sempre que você salvar um arquivo!

### Deploy no GitHub Pages
O site é automaticamente publicado no GitHub Pages quando você faz push para a branch `main`.

##  Estrutura
```
├── index.html      # Página principal
├── style.css       # Estilos
├── script.js       # JavaScript
├── package.json    # Configurações do projeto
├── dev.bat/.sh     # Scripts para desenvolvimento
└── .github/        # Configuração do GitHub Pages
```

## Funcionalidades
- Live reload automático
- Deploy automático no GitHub Pages


## NodeJs

### Siga o Tutorial para instalar o FNM para instalar/trocar versões do node

[![Instalar Node.js com FNM](https://img.shields.io/badge/📦_Instalar_Node.js-FNM_Tutorial-blue?style=for-the-badge)](https://github.com/Schniz/fnm)