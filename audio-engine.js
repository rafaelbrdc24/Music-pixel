// Audio Engine para Music Pixel
class AudioEngine {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.oscillators = new Map();
        this.drumSounds = new Map();
        this.isPlaying = false;
        this.currentStep = 0;
        this.tempo = 120;
        this.timeSignature = '4/4';
        this.beatsPerMeasure = 4;
        this.stepsPerBeat = 4;
        this.totalSteps = 16;
        this.playInterval = null;
        this.notes = [];
        this.drumPattern = {
            kick: new Array(16).fill(false),
            snare: new Array(16).fill(false),
            hihat: new Array(16).fill(false),
            crash: new Array(16).fill(false)
        };
        
        // Volumes dos canais
        this.volumes = {
            melody: 0.8,
            kick: 0.9,
            snare: 0.85,
            hihat: 0.7,
            crash: 0.75
        };
        
        // Frequências das notas (C4 = 261.63 Hz)
        this.noteFrequencies = {
            'C1': 32.70, 'C#1': 34.65, 'D1': 36.71, 'D#1': 38.89, 'E1': 41.20, 'F1': 43.65, 'F#1': 46.25, 'G1': 49.00, 'G#1': 51.91, 'A1': 55.00, 'A#1': 58.27, 'B1': 61.74,
            'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
            'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
            'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
            'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
            'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53,
            'C7': 2093.00, 'C#7': 2217.46, 'D7': 2349.32, 'D#7': 2489.02, 'E7': 2637.02, 'F7': 2793.83, 'F#7': 2959.96, 'G7': 3135.96, 'G#7': 3322.44, 'A7': 3520.00, 'A#7': 3729.31, 'B7': 3951.07,
            'C8': 4186.01
        };
        
        this.init();
    }
    
    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0.7;
            
            this.createDrumSounds();
            console.log('Audio Engine inicializado com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar Audio Engine:', error);
        }
    }
    
    createDrumSounds() {
        // Kick - Tom grave sintético
        const kickBuffer = this.createKickSound();
        this.drumSounds.set('kick', kickBuffer);
        
        // Snare - Ruído com tom
        const snareBuffer = this.createSnareSound();
        this.drumSounds.set('snare', snareBuffer);
        
        // Hi-Hat - Ruído agudo
        const hihatBuffer = this.createHihatSound();
        this.drumSounds.set('hihat', hihatBuffer);
        
        // Crash - Ruído com envelope longo
        const crashBuffer = this.createCrashSound();
        this.drumSounds.set('crash', crashBuffer);
    }
    
    createKickSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.5, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < data.length; i++) {
            const t = i / buffer.sampleRate;
            const frequency = 60 * Math.exp(-t * 15); // Tom que desce rapidamente
            const envelope = Math.exp(-t * 8); // Envelope exponencial
            data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.8;
        }
        
        return buffer;
    }
    
    createSnareSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.2, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < data.length; i++) {
            const t = i / buffer.sampleRate;
            const noise = (Math.random() * 2 - 1) * 0.5; // Ruído branco
            const tone = Math.sin(2 * Math.PI * 200 * t) * 0.3; // Tom fundamental
            const envelope = Math.exp(-t * 20);
            data[i] = (noise + tone) * envelope;
        }
        
        return buffer;
    }
    
    createHihatSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < data.length; i++) {
            const t = i / buffer.sampleRate;
            const noise = (Math.random() * 2 - 1) * 0.3;
            const envelope = Math.exp(-t * 30);
            data[i] = noise * envelope;
        }
        
        return buffer;
    }
    
    createCrashSound() {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 1.5, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < data.length; i++) {
            const t = i / buffer.sampleRate;
            const noise = (Math.random() * 2 - 1) * 0.4;
            const envelope = Math.exp(-t * 2);
            data[i] = noise * envelope;
        }
        
        return buffer;
    }
    
    playNote(note, duration = 0.25, velocity = 0.8) {
        if (!this.audioContext || !this.noteFrequencies[note]) return;
        
        const frequency = this.noteFrequencies[note];
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        // Configurar oscilador com forma de onda quadrada (estilo 8-bit)
        oscillator.type = 'square';
        oscillator.frequency.value = frequency;
        
        // Configurar envelope ADSR simples
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(velocity * this.volumes.melody, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.1, now + duration * 0.7);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
        
        // Conectar e tocar
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.start(now);
        oscillator.stop(now + duration);
        
        return oscillator;
    }
    
    playDrum(drumType) {
        if (!this.audioContext || !this.drumSounds.has(drumType)) return;
        
        const buffer = this.drumSounds.get(drumType);
        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        
        source.buffer = buffer;
        gainNode.gain.value = this.volumes[drumType];
        
        source.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        source.start();
        
        return source;
    }
    
    startPlayback() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.currentStep = 0;
        
        const stepDuration = (60 / this.tempo) / this.stepsPerBeat;
        
        this.playInterval = setInterval(() => {
            this.playCurrentStep();
            this.updatePlayhead();
            this.currentStep = (this.currentStep + 1) % this.totalSteps;
            
            if (this.currentStep === 0) {
                // Loop completo
                setTimeout(() => {
                    if (this.isPlaying) {
                        this.startPlayback();
                    }
                }, stepDuration * 1000);
                this.stopPlayback();
            }
        }, stepDuration * 1000);
    }
    
    stopPlayback() {
        this.isPlaying = false;
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
        this.currentStep = 0;
        this.updatePlayhead();
    }
    
    playCurrentStep() {
        // Tocar notas do piano roll
        const currentNotes = this.notes.filter(note => 
            note.startStep === this.currentStep
        );
        
        currentNotes.forEach(note => {
            this.playNote(note.note, note.duration, note.velocity);
        });
        
        // Tocar bateria
        Object.keys(this.drumPattern).forEach(drumType => {
            if (this.drumPattern[drumType][this.currentStep]) {
                this.playDrum(drumType);
            }
        });
    }
    
    updatePlayhead() {
        const playhead = document.getElementById('playhead');
        if (!playhead) return;
        
        const stepWidth = 50; // Largura de cada step em pixels
        const position = this.currentStep * stepWidth;
        playhead.style.left = position + 'px';
    }
    
    addNote(note, startStep, duration = 1, velocity = 0.8) {
        this.notes.push({
            note,
            startStep,
            duration,
            velocity,
            id: Date.now() + Math.random()
        });
    }
    
    removeNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
    }
    
    toggleDrumStep(drumType, step) {
        this.drumPattern[drumType][step] = !this.drumPattern[drumType][step];
    }
    
    setTempo(tempo) {
        this.tempo = tempo;
        if (this.isPlaying) {
            this.stopPlayback();
            this.startPlayback();
        }
    }
    
    setVolume(channel, volume) {
        this.volumes[channel] = volume / 100;
    }
    
    // Exportar áudio
    async exportAudio(duration = 16) {
        if (!this.audioContext) return null;
        
        const offlineContext = new OfflineAudioContext(2, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
        const offlineMasterGain = offlineContext.createGain();
        offlineMasterGain.connect(offlineContext.destination);
        offlineMasterGain.gain.value = 0.7;
        
        // Recriar sons offline
        const offlineDrumSounds = new Map();
        offlineDrumSounds.set('kick', this.createKickSound());
        offlineDrumSounds.set('snare', this.createSnareSound());
        offlineDrumSounds.set('hihat', this.createHihatSound());
        offlineDrumSounds.set('crash', this.createCrashSound());
        
        // Tocar toda a sequência
        const stepDuration = (60 / this.tempo) / this.stepsPerBeat;
        
        for (let step = 0; step < duration; step++) {
            const startTime = step * stepDuration;
            
            // Tocar notas
            const currentNotes = this.notes.filter(note => 
                note.startStep === (step % this.totalSteps)
            );
            
            currentNotes.forEach(note => {
                const oscillator = offlineContext.createOscillator();
                const gainNode = offlineContext.createGain();
                
                oscillator.type = 'square';
                oscillator.frequency.value = this.noteFrequencies[note.note];
                
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(note.velocity * this.volumes.melody, startTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration);
                
                oscillator.connect(gainNode);
                gainNode.connect(offlineMasterGain);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + note.duration);
            });
            
            // Tocar bateria
            Object.keys(this.drumPattern).forEach(drumType => {
                if (this.drumPattern[drumType][step % this.totalSteps]) {
                    const source = offlineContext.createBufferSource();
                    const gainNode = offlineContext.createGain();
                    
                    source.buffer = offlineDrumSounds.get(drumType);
                    gainNode.gain.value = this.volumes[drumType];
                    
                    source.connect(gainNode);
                    gainNode.connect(offlineMasterGain);
                    
                    source.start(startTime);
                }
            });
        }
        
        return await offlineContext.startRendering();
    }
    
    // Salvar projeto
    exportProject() {
        const project = {
            version: '1.0',
            tempo: this.tempo,
            timeSignature: this.timeSignature,
            notes: this.notes,
            drumPattern: this.drumPattern,
            volumes: this.volumes,
            timestamp: new Date().toISOString()
        };
        
        return JSON.stringify(project, null, 2);
    }
    
    // Carregar projeto
    loadProject(projectData) {
        try {
            const project = JSON.parse(projectData);
            
            this.tempo = project.tempo || 120;
            this.timeSignature = project.timeSignature || '4/4';
            this.notes = project.notes || [];
            this.drumPattern = project.drumPattern || {
                kick: new Array(16).fill(false),
                snare: new Array(16).fill(false),
                hihat: new Array(16).fill(false),
                crash: new Array(16).fill(false)
            };
            this.volumes = project.volumes || {
                melody: 0.8,
                kick: 0.9,
                snare: 0.85,
                hihat: 0.7,
                crash: 0.75
            };
            
            return true;
        } catch (error) {
            console.error('Erro ao carregar projeto:', error);
            return false;
        }
    }
}

// Exportar para uso global
window.AudioEngine = AudioEngine;
