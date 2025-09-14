// Music Pixel - Aplicação Principal
class MusicPixelApp {
    constructor() {
        this.audioEngine = null;
        this.isInitialized = false;
        this.selectedTool = 'draw';
        this.selectedNote = null;
        this.noteLabels = [];
        this.gridWidth = 800;
        this.gridHeight = 960;
        this.stepWidth = 50;
        this.noteHeight = 20;
        
        this.init();
    }
    
    async init() {
        try {
            console.log('Iniciando Music Pixel...');
            
            // Inicializar Audio Engine
            console.log('Criando Audio Engine...');
            this.audioEngine = new AudioEngine();
            await this.audioEngine.init();
            console.log('Audio Engine inicializado!');
            
            // Configurar interface
            console.log('Configurando interface...');
            this.setupEventListeners();
            this.setupPianoRoll();
            this.setupDrumMachine();
            this.setupMixer();
            
            this.isInitialized = true;
            console.log('Music Pixel inicializado com sucesso!');
            console.log('isInitialized:', this.isInitialized);
            
            // Mostrar mensagem de boas-vindas
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error);
            alert('Erro ao inicializar o Music Pixel. Verifique se seu navegador suporta Web Audio API.');
        }
    }
    
    showWelcomeMessage() {
        const message = `
        🎵 Bem-vindo ao Music Pixel! 🎵
        
        🎹 PIANO ROLL:
        • Clique no piano roll para adicionar notas
        • Arraste notas para movê-las
        • Duplo-clique para remover notas
        • Use as teclas A-S-D-F-G-H-J-K para tocar notas
        
        🥁 BATERIA:
        • Clique nos steps para ativar/desativar
        • Use a bateria para criar ritmos
        
        ⌨️ ATALHOS:
        • Espaço: Play/Pause
        • Ctrl+S: Salvar projeto
        • Ctrl+O: Carregar projeto
        • Ctrl+C: Limpar todas as notas
        • Delete: Remover nota selecionada
        
        🎚️ MIXER:
        • Ajuste os volumes de cada canal
        
        Divirta-se criando música estilo Super Nintendo! 🎮
        `;
        
        setTimeout(() => {
            if (confirm(message + '\n\nPressione OK para continuar ou Cancelar para pular esta mensagem.')) {
                console.log('Usuário confirmou a mensagem de boas-vindas');
            }
        }, 1000);
    }
    
    setupEventListeners() {
        console.log('Configurando event listeners...');
        
        // Botões de controle
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlayback());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopPlayback());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveProject());
        document.getElementById('loadBtn').addEventListener('click', () => this.loadProject());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportAudio());
        
        // Controles de tempo
        document.getElementById('tempo').addEventListener('change', (e) => {
            this.audioEngine.setTempo(parseInt(e.target.value));
        });
        
        document.getElementById('timeSignature').addEventListener('change', (e) => {
            this.audioEngine.timeSignature = e.target.value;
            this.updateTimeSignature();
        });
        
        // Sliders de volume
        document.querySelectorAll('.volume-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const channel = e.target.id.replace('Volume', '');
                const volume = parseInt(e.target.value);
                this.audioEngine.setVolume(channel, volume);
                e.target.nextElementSibling.textContent = volume;
            });
        });
        
        // Piano roll - agora é configurado no setupPianoRoll()
        console.log('Piano roll será configurado no setupPianoRoll()');
        
        // Botão de teste
        const testBtn = document.getElementById('testBtn');
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                console.log('Botão de teste clicado!');
                this.addTestNote();
            });
        }
        
        // Bateria
        document.querySelectorAll('.step').forEach(step => {
            step.addEventListener('click', (e) => this.handleDrumStepClick(e));
        });
        
        // Prevenir contexto do menu
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        console.log('Event listeners configurados com sucesso!');
    }
    
    setupPianoRoll() {
        const pianoRoll = document.getElementById('pianoRoll');
        const notesContainer = document.getElementById('notesContainer');
        
        // Configurar dimensões
        pianoRoll.style.width = this.gridWidth + 'px';
        pianoRoll.style.height = this.gridHeight + 'px';
        
        // Event listener MUITO simples
        pianoRoll.addEventListener('click', (e) => {
            console.log('🎹 CLIQUE NO PIANO ROLL!');
            this.handleSimpleClick(e);
        });
        
        console.log('Piano roll simplificado configurado!');
    }
    
    handleSimpleClick(e) {
        if (!this.isInitialized) {
            console.log('App não inicializado!');
            return;
        }
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const step = Math.floor(x / this.stepWidth);
        const noteIndex = Math.floor(y / this.noteHeight);
        
        console.log(`Posição: x=${x}, y=${y}, step=${step}, noteIndex=${noteIndex}`);
        
        if (step >= 0 && step < 16 && noteIndex >= 0 && noteIndex < 48) {
            const noteName = this.getNoteNameFromIndex(noteIndex);
            console.log(`✅ Adicionando: ${noteName} no step ${step}`);
            this.addNote(noteName, step);
        }
    }
    
    createPianoRollGrid() {
        // Grid agora é feito apenas com CSS - muito mais simples!
        console.log('Grid criado via CSS');
    }
    
    setupDrumMachine() {
        // Adicionar alguns padrões pré-definidos
        this.addPresetPatterns();
    }
    
    addPresetPatterns() {
        // Padrão básico de rock
        const rockPattern = {
            kick: [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false],
            snare: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
            hihat: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            crash: [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        };
        
        // Aplicar padrão se não houver dados salvos
        if (this.audioEngine.notes.length === 0) {
            Object.keys(rockPattern).forEach(drumType => {
                rockPattern[drumType].forEach((active, step) => {
                    this.audioEngine.drumPattern[drumType][step] = active;
                });
            });
            this.updateDrumDisplay();
        }
    }
    
    setupMixer() {
        // Configurar valores iniciais dos sliders
        Object.keys(this.audioEngine.volumes).forEach(channel => {
            const slider = document.getElementById(channel + 'Volume');
            const valueDisplay = slider.nextElementSibling;
            if (slider && valueDisplay) {
                slider.value = Math.round(this.audioEngine.volumes[channel] * 100);
                valueDisplay.textContent = Math.round(this.audioEngine.volumes[channel] * 100);
            }
        });
    }
    
    // Funções complexas removidas - usando apenas handleSimpleClick
    
    handleDrumStepClick(e) {
        if (!this.isInitialized) return;
        
        const step = parseInt(e.target.dataset.step);
        const drumType = e.target.parentElement.dataset.drum;
        
        if (step >= 0 && step < 16 && drumType) {
            this.audioEngine.toggleDrumStep(drumType, step);
            this.updateDrumStepDisplay(drumType, step);
        }
    }
    
    handleKeyDown(e) {
        // Atalhos de teclado
        switch (e.key) {
            case ' ':
                e.preventDefault();
                this.togglePlayback();
                break;
            case 'Escape':
                this.stopPlayback();
                break;
            case 's':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.saveProject();
                }
                break;
            case 'o':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.loadProject();
                }
                break;
            case 'Delete':
            case 'Backspace':
                if (this.selectedNote) {
                    this.deleteNote(this.selectedNote);
                }
                break;
            case 'c':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.clearAllNotes();
                }
                break;
        }
        
        // Atalhos para tocar notas com teclado
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            this.handlePianoKeyPress(e.key);
        }
    }
    
    handlePianoKeyPress(key) {
        // Mapeamento de teclas do teclado para notas
        const keyMap = {
            'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4', 'f': 'F4',
            't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4', 'u': 'A#4', 'j': 'B4',
            'k': 'C5', 'o': 'C#5', 'l': 'D5', 'p': 'D#5', ';': 'E5', "'": 'F5'
        };
        
        const note = keyMap[key.toLowerCase()];
        if (note) {
            // Tocar preview da nota
            this.audioEngine.playNote(note, 0.3, 0.7);
            
            // Adicionar nota no step atual se estiver tocando
            if (this.audioEngine.isPlaying) {
                this.addNote(note, this.audioEngine.currentStep);
            }
        }
    }
    
    clearAllNotes() {
        if (confirm('Tem certeza que deseja limpar todas as notas?')) {
            this.audioEngine.notes = [];
            document.getElementById('notesContainer').innerHTML = '';
            this.createPianoRollGrid();
            this.showNotification('Todas as notas foram removidas! 🗑️');
        }
    }
    
    addTestNote() {
        console.log('Adicionando nota de teste...');
        console.log('isInitialized:', this.isInitialized);
        console.log('audioEngine:', this.audioEngine);
        
        if (!this.isInitialized || !this.audioEngine) {
            console.error('App não inicializado ou audioEngine não disponível!');
            return;
        }
        
        // Adicionar uma nota de teste no step 0, nota C4
        this.addNote('C4', 0);
        console.log('Nota de teste adicionada!');
    }
    
    getNoteNameFromIndex(index) {
        // Mapeamento correto das notas do piano roll
        const noteNames = [
            'C8', 'B7', 'A7', 'G7', 'F7', 'E7', 'D7', 'C7',
            'B6', 'A6', 'G6', 'F6', 'E6', 'D6', 'C6',
            'B5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5',
            'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
            'B3', 'A3', 'G3', 'F3', 'E3', 'D3', 'C3',
            'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2',
            'B1', 'A1', 'G1', 'F1', 'E1', 'D1', 'C1'
        ];
        
        if (index >= 0 && index < noteNames.length) {
            return noteNames[index];
        }
        return 'C4'; // Nota padrão
    }
    
    addNote(noteName, startStep, duration = 1) {
        // Verificar se já existe uma nota na mesma posição
        const existingNote = this.audioEngine.notes.find(note => 
            note.startStep === startStep && note.note === noteName
        );
        
        if (existingNote) {
            console.log('Nota já existe nesta posição, removendo...');
            this.deleteNote(existingNote.id);
            return;
        }
        
        const noteId = Date.now() + Math.random();
        const note = {
            id: noteId,
            note: noteName,
            startStep: startStep,
            duration: duration,
            velocity: 0.8
        };
        
        this.audioEngine.notes.push(note);
        this.createNoteElement(note);
        
        // Tocar preview da nota
        this.audioEngine.playNote(noteName, 0.2, 0.6);
        
        console.log(`Nota adicionada: ${noteName} no step ${startStep}`);
    }
    
    createNoteElement(note) {
        const notesContainer = document.getElementById('notesContainer');
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.dataset.noteId = note.id;
        
        const noteIndex = this.getNoteIndexFromName(note.note);
        const x = note.startStep * this.stepWidth;
        const y = noteIndex * this.noteHeight;
        const width = note.duration * this.stepWidth;
        
        noteElement.style.left = x + 'px';
        noteElement.style.top = y + 'px';
        noteElement.style.width = width + 'px';
        noteElement.style.height = (this.noteHeight - 2) + 'px';
        
        // Adicionar tooltip com informações da nota
        noteElement.title = `${note.note} - Step ${note.startStep}`;
        
        // Event listeners para edição
        noteElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectNote(note.id);
        });
        
        noteElement.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            this.deleteNote(note.id);
        });
        
        // Adicionar arrastar para mover notas
        noteElement.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startNoteDrag(note.id, e);
        });
        
        notesContainer.appendChild(noteElement);
        
        console.log(`Elemento de nota criado: ${note.note} em (${x}, ${y})`);
    }
    
    getNoteIndexFromName(noteName) {
        // Mapeamento correto das notas do piano roll
        const noteNames = [
            'C8', 'B7', 'A7', 'G7', 'F7', 'E7', 'D7', 'C7',
            'B6', 'A6', 'G6', 'F6', 'E6', 'D6', 'C6',
            'B5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5',
            'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
            'B3', 'A3', 'G3', 'F3', 'E3', 'D3', 'C3',
            'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2',
            'B1', 'A1', 'G1', 'F1', 'E1', 'D1', 'C1'
        ];
        
        const index = noteNames.indexOf(noteName);
        return index >= 0 ? index : 24; // C4 como padrão
    }
    
    selectNote(noteId) {
        // Remover seleção anterior
        document.querySelectorAll('.note.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Selecionar nova nota
        const noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
        if (noteElement) {
            noteElement.classList.add('selected');
            this.selectedNote = noteId;
        }
    }
    
    deleteNote(noteId) {
        // Remover do audio engine
        this.audioEngine.removeNote(noteId);
        
        // Remover elemento visual
        const noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
        if (noteElement) {
            noteElement.remove();
        }
        
        if (this.selectedNote === noteId) {
            this.selectedNote = null;
        }
    }
    
    updateDrumStepDisplay(drumType, step) {
        const stepElement = document.querySelector(`[data-drum="${drumType}"] .step[data-step="${step}"]`);
        if (stepElement) {
            if (this.audioEngine.drumPattern[drumType][step]) {
                stepElement.classList.add('active');
            } else {
                stepElement.classList.remove('active');
            }
        }
    }
    
    updateDrumDisplay() {
        Object.keys(this.audioEngine.drumPattern).forEach(drumType => {
            for (let step = 0; step < 16; step++) {
                this.updateDrumStepDisplay(drumType, step);
            }
        });
    }
    
    updateTimeSignature() {
        const signature = this.audioEngine.timeSignature;
        this.audioEngine.beatsPerMeasure = parseInt(signature.split('/')[0]);
        
        // Atualizar timeline se necessário
        this.updateTimeline();
    }
    
    updateTimeline() {
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = '';
        
        for (let i = 1; i <= this.audioEngine.beatsPerMeasure * 4; i++) {
            const marker = document.createElement('div');
            marker.className = 'beat-marker';
            marker.textContent = i;
            timeline.appendChild(marker);
        }
    }
    
    togglePlayback() {
        if (this.audioEngine.isPlaying) {
            this.stopPlayback();
        } else {
            this.startPlayback();
        }
    }
    
    startPlayback() {
        if (!this.isInitialized) return;
        
        this.audioEngine.startPlayback();
        document.getElementById('playBtn').textContent = '⏸️ Pause';
        document.getElementById('playBtn').classList.add('btn-warning');
        document.getElementById('playBtn').classList.remove('btn-primary');
    }
    
    stopPlayback() {
        if (!this.isInitialized) return;
        
        this.audioEngine.stopPlayback();
        document.getElementById('playBtn').textContent = '▶️ Play';
        document.getElementById('playBtn').classList.add('btn-primary');
        document.getElementById('playBtn').classList.remove('btn-warning');
    }
    
    saveProject() {
        if (!this.isInitialized) return;
        
        const projectData = this.audioEngine.exportProject();
        const blob = new Blob([projectData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `music-pixel-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.apm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Projeto salvo com sucesso! 💾');
    }
    
    loadProject() {
        if (!this.isInitialized) return;
        
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
        
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const success = this.audioEngine.loadProject(e.target.result);
                if (success) {
                    this.rebuildInterface();
                    this.showNotification('Projeto carregado com sucesso! 📁');
                } else {
                    this.showNotification('Erro ao carregar projeto! ❌');
                }
            };
            reader.readAsText(file);
        };
    }
    
    async exportAudio() {
        if (!this.isInitialized) return;
        
        this.showNotification('Exportando áudio... 🎧');
        
        try {
            const audioBuffer = await this.audioEngine.exportAudio(16);
            const wavBlob = this.audioBufferToWav(audioBuffer);
            
            const url = URL.createObjectURL(wavBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `music-pixel-export-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.wav`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Áudio exportado com sucesso! 🎵');
        } catch (error) {
            console.error('Erro ao exportar áudio:', error);
            this.showNotification('Erro ao exportar áudio! ❌');
        }
    }
    
    audioBufferToWav(buffer) {
        const length = buffer.length;
        const arrayBuffer = new ArrayBuffer(44 + length * 2);
        const view = new DataView(arrayBuffer);
        
        // WAV header
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + length * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, buffer.sampleRate, true);
        view.setUint32(28, buffer.sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, length * 2, true);
        
        // Audio data
        const channelData = buffer.getChannelData(0);
        let offset = 44;
        for (let i = 0; i < length; i++) {
            const sample = Math.max(-1, Math.min(1, channelData[i]));
            view.setInt16(offset, sample * 0x7FFF, true);
            offset += 2;
        }
        
        return new Blob([arrayBuffer], { type: 'audio/wav' });
    }
    
    rebuildInterface() {
        // Limpar notas existentes
        document.getElementById('notesContainer').innerHTML = '';
        
        // Recriar grid
        this.createPianoRollGrid();
        
        // Recriar elementos de notas
        this.audioEngine.notes.forEach(note => {
            this.createNoteElement(note);
        });
        
        // Atualizar bateria
        this.updateDrumDisplay();
        
        // Atualizar mixer
        this.setupMixer();
        
        // Atualizar controles
        document.getElementById('tempo').value = this.audioEngine.tempo;
        document.getElementById('timeSignature').value = this.audioEngine.timeSignature;
    }
    
    startNoteDrag(noteId, e) {
        const note = this.audioEngine.notes.find(n => n.id === noteId);
        if (!note) return;
        
        this.draggingNote = {
            id: noteId,
            startX: e.clientX,
            startY: e.clientY,
            startStep: note.startStep,
            startNoteIndex: this.getNoteIndexFromName(note.note)
        };
        
        document.addEventListener('mousemove', this.handleNoteDrag.bind(this));
        document.addEventListener('mouseup', this.endNoteDrag.bind(this));
        
        // Adicionar classe de arrastar
        const noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
        if (noteElement) {
            noteElement.classList.add('dragging');
        }
    }
    
    handleNoteDrag(e) {
        if (!this.draggingNote) return;
        
        const deltaX = e.clientX - this.draggingNote.startX;
        const deltaY = e.clientY - this.draggingNote.startY;
        
        const newStep = Math.max(0, Math.min(15, this.draggingNote.startStep + Math.round(deltaX / this.stepWidth)));
        const newNoteIndex = Math.max(0, Math.min(47, this.draggingNote.startNoteIndex + Math.round(deltaY / this.noteHeight)));
        
        const noteElement = document.querySelector(`[data-note-id="${this.draggingNote.id}"]`);
        if (noteElement) {
            noteElement.style.left = (newStep * this.stepWidth) + 'px';
            noteElement.style.top = (newNoteIndex * this.noteHeight) + 'px';
        }
    }
    
    endNoteDrag(e) {
        if (!this.draggingNote) return;
        
        const deltaX = e.clientX - this.draggingNote.startX;
        const deltaY = e.clientY - this.draggingNote.startY;
        
        const newStep = Math.max(0, Math.min(15, this.draggingNote.startStep + Math.round(deltaX / this.stepWidth)));
        const newNoteIndex = Math.max(0, Math.min(47, this.draggingNote.startNoteIndex + Math.round(deltaY / this.noteHeight)));
        
        const newNoteName = this.getNoteNameFromIndex(newNoteIndex);
        
        // Atualizar nota no audio engine
        const note = this.audioEngine.notes.find(n => n.id === this.draggingNote.id);
        if (note) {
            note.startStep = newStep;
            note.note = newNoteName;
        }
        
        // Remover classe de arrastar
        const noteElement = document.querySelector(`[data-note-id="${this.draggingNote.id}"]`);
        if (noteElement) {
            noteElement.classList.remove('dragging');
            noteElement.title = `${newNoteName} - Step ${newStep}`;
        }
        
        this.draggingNote = null;
        
        document.removeEventListener('mousemove', this.handleNoteDrag.bind(this));
        document.removeEventListener('mouseup', this.endNoteDrag.bind(this));
    }

    showNotification(message) {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #2d1b69, #11998e);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            border: 2px solid #00d4ff;
            animation: slideIn 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// CSS para animações de notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, criando aplicação...');
    window.musicPixelApp = new MusicPixelApp();
});

// Fallback caso o DOM já esteja carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM carregado (fallback), criando aplicação...');
        window.musicPixelApp = new MusicPixelApp();
    });
} else {
    console.log('DOM já carregado, criando aplicação imediatamente...');
    window.musicPixelApp = new MusicPixelApp();
}
