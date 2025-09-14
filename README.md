# 🎵 Music Pixel - Criador de Música 16-bit

Um criador de música estilo Super Nintendo com piano roll, bateria e funcionalidades completas de produção musical.

## ✨ Características

- **Piano Roll**: Interface visual para criar melodias com notas de C1 a C8
- **Bateria**: Padrões de bateria com Kick, Snare, Hi-Hat e Crash
- **Mixer**: Controles de volume individuais para cada canal
- **Salvar/Carregar**: Sistema de arquivos .apm para projetos
- **Exportação**: Exporte suas criações como arquivos WAV
- **Tema Retro**: Visual estilo Super Nintendo com cores vibrantes

## 🚀 Como Usar

### Iniciando
1. Abra o arquivo `index.html` no seu navegador
2. Aguarde a inicialização do sistema de áudio
3. Comece a criar sua música!

### Piano Roll
- **Clique** no piano roll para adicionar notas
- **Duplo clique** em uma nota para removê-la
- **Clique simples** para selecionar uma nota
- Use as teclas do piano à esquerda como referência

### Bateria
- **Clique** nos quadrados para ativar/desativar batidas
- Cada linha representa um instrumento diferente:
  - **Kick**: Caixa de bateria (grave)
  - **Snare**: Caixa (médio)
  - **Hi-Hat**: Chimbal (agudo, rápido)
  - **Crash**: Prato (agudo, longo)

### Controles
- **▶️ Play**: Inicia a reprodução
- **⏹️ Stop**: Para a reprodução
- **💾 Salvar**: Salva o projeto como arquivo .apm
- **📁 Carregar**: Carrega um projeto salvo
- **🎧 Exportar**: Exporta como arquivo WAV

### Mixer
- Ajuste o volume de cada canal usando os sliders
- Valores de 0 a 100

### Controles de Tempo
- **BPM**: Batidas por minuto (60-200)
- **Compasso**: 4/4, 3/4 ou 2/4

## ⌨️ Atalhos de Teclado

- **Espaço**: Play/Pause
- **Escape**: Stop
- **Ctrl+S**: Salvar projeto
- **Ctrl+O**: Carregar projeto

## 🎮 Estilo Super Nintendo

O Music Pixel foi criado para reproduzir o som característico dos jogos Super Nintendo:
- Osciladores quadrados para melodias
- Sons sintéticos para bateria
- Limitações de polifonia
- Efeitos de envelope simples

## 📁 Estrutura de Arquivos

```
music-pixel/
├── index.html          # Interface principal
├── styles.css          # Estilos visuais
├── audio-engine.js     # Motor de áudio
├── app.js             # Lógica da aplicação
└── README.md          # Este arquivo
```

## 🔧 Requisitos Técnicos

- Navegador moderno com suporte a Web Audio API
- JavaScript habilitado
- Recomendado: Chrome, Firefox, Safari ou Edge

## 🎵 Funcionalidades Avançadas

### Sistema de Notas
- Suporte completo de C1 a C8
- Duração ajustável das notas
- Velocidade (velocity) configurável
- Interface visual intuitiva

### Sistema de Bateria
- 4 instrumentos diferentes
- 16 steps por padrão
- Padrões pré-definidos incluídos
- Sincronização perfeita com melodias

### Exportação
- Formato WAV de alta qualidade
- Renderização offline
- Preservação de todos os canais
- Nome de arquivo automático com timestamp

## 🎨 Personalização

O visual pode ser facilmente personalizado editando o arquivo `styles.css`:
- Cores do tema
- Animações
- Layout responsivo
- Efeitos visuais

## 🐛 Solução de Problemas

### Áudio não funciona
- Verifique se o navegador suporta Web Audio API
- Certifique-se de que o JavaScript está habilitado
- Tente clicar em qualquer lugar da página antes de usar os controles

### Projeto não carrega
- Verifique se o arquivo .apm não está corrompido
- Certifique-se de que o arquivo foi salvo pelo Music Pixel

### Performance lenta
- Reduza o número de notas simultâneas
- Feche outras abas do navegador
- Use um navegador mais recente

## 🎉 Divirta-se!

O Music Pixel foi criado para ser divertido e intuitivo. Experimente diferentes combinações de notas, crie padrões de bateria únicos e exporte suas criações para compartilhar com amigos!

---

*Criado com ❤️ para a comunidade de desenvolvedores e músicos*
