# SynthCore16 Parameter Guide v2.2.8

## Control Change Parameters

- Notes
    - $ : Disabled in Paraphonic Mode
    - $$ : Disabled in Paraphonic or if Osc 1 Wave is not Pls
    - $$$ : Disabled in Paraphonic or if Osc 1 Wave is Pls
- Osc 1 Wave [Saw|-|Tri|Pls|Sqr]
    - 0 (0-47): Saw Wave
    - 64 (48-79): Triangle Wave
    - 96 (80-111): Pulse Wave (Shape adjustable)
    - 127 (112-127): Square Wave
- Osc 1 Shape $$
    - Pulse Wave (= 1st Saw + Phase Shifted 2nd Saw)
        - 0: Pulse Width 50%, or 2nd Saw Phase 50% (min)
        - 64: Pulse Width 25%, or 2nd Saw Phase 25%
        - 96: Pulse Width 12.5%, or 2nd Saw Phase 12.5%
        - 127: Pulse Width 0%, or 2nd Saw Phase 0% (max)
- Osc 1 Morph $$
    - Pulse Wave
        - 0: Pulse 100% = Saw 100% + Reverse Saw 100% (min)
        - 32: Pulse 50% + Saw 50% = Saw 100% + Reverse Saw 50%
        - 64: Saw 100%
        - 96: Saw 100% + Saw 50%
        - 127: Saw 100% + Saw 100% (max)
- Mixer Sub Osc $$$
- Osc 2 Wave $ [Saw|-|Tri|Nos|Sqr]
    - 0 (0-47): Saw Wave
    - 64 (48-79): Triangle Wave
    - 96 (80-111): White Noise
    - 127 (112-127): Square Wave
- Osc 2 Coarse $ [-|+]
    - -48 (16): -48 semitone (min)
    - +48 (112): +48 semitone (max)
- Osc 2 Fine $ [-|+]
    - -64 (0): -100 cent (min)
    - +63 (127): +98.4375 cent (max)
- Mixer Osc Mix $ [1|2]
- Filter Cutoff
    - 4: f = 452.9 Hz (min)
    - 64: f = 2561.9 Hz
    - 124: f = 14492.6 Hz (max)
- Filter Resonance
    - 16 (0-23): Q = 0.7 (min)
    - 32 (24-39): Q = 1.0
    - 48 (40-55): Q = 1.4
    - 64 (56-71): Q = 2.0
    - 80 (72-87): Q = 2.8
    - 96 (88-103): Q = 4.0
    - 112 (104-127): Q = 5.6 (max)
- Filter EG Amt [-|+], LFO Filter Amt [-|+]
    - -60 (4): -120 (min)
    - +60 (124): +120 (max)
- Filter Key Track $ [0.0|0.5|1.0]
    - 0 (0-31): 0.0
    - 64 (32-95): 0.5
    - 127 (96-127): 1.0
- EG Decay, Amp Decay
    - 127: No Decay
- EG Osc Amt [-|+], LFO Osc Amt [-|+]
    - Pitch
        - -39 (25): -24 semitone (min)
        - -27 (37): -12 semitone
        - -16 (48): -1 semitone
        - -12 (52): -75 cent
        - -8 (56): -50 cent
        - -4 (60): -25 cent
        - +0 (64): +0 cent
        - +4 (68): +25 cent
        - +8 (72): +50 cent
        - +12 (76): +75 cent
        - +16 (80): +1 semitone
        - +27 (91): +12 semitone
        - +39 (103): +24 semitone (max)
    - Shape
        - -63 (1): Shape -252 (min)
        - +63 (127): Shape +252 (max)
- EG Osc Dst [P|2P|1S], LFO Osc Dst [P|2P|1S]
    - 0 (0-31): Osc 1 & 2 Pitch
    - 64 (32-95): Osc 2 Pitch
    - 127 (96-127): Osc 1 Shape
- Voice Mode [Par|-|Mon|Lgt|LP]
    - 0 (0-31): Paraphonic (LFO Single Trigger)
    - 64 (32-79): Monophonic (EG & LFO Multi Trigger)
    - 96 (80-111): Legato (Monophonic, EG & LFO Single Trigger)
    - 127 (112-127): Legato Portamento (Monophonic, EG & LFO Single Trigger, Auto Portamento)
- LFO Wave [T1|T2|Saw|SH|Sqr]
    - 0 (0-15): Triangle Wave (-0.5 to +0.5)
    - 32 (16-47): Triangle Wave 2 (Key Sync, -0.5 to +0.5)
    - 64 (48-79): Saw Wave (Key Sync, -0.49 to +0.5)
    - 96 (80-111): Sample & Hold (Key Sync, -0.49 to +0.5)
    - 127 (112-127): Square Wave (Key Sync, 0.0 to 1.0)
- LFO Rate
    - 0: 0.2 Hz (min)
    - 64: 2 Hz
    - 96: 6.3 Hz
    - 127: 20 Hz (max)
- LFO Depth
    - The actual LFO depth is the "LFO Depth" value plus the "Modulation" value
- Chorus Mode [Off|M|PS|S|S2]
    - 0 (0-15): Chorus Off
    - 32 (16-47): Mono Chorus
    - 64 (48-79): Pseudo-Stereo Chorus
    - 96 (80-111): Stereo Chorus
    - 127 (112-127): Stereo 2-phase Chorus
- Chorus Rate
    - 4: LFO Frequency 0.06 Hz (min)
    - 32: LFO Frequency 0.48 Hz
    - 64: LFO Frequency 0.95 Hz
    - 127: LFO Frequency 1.9 Hz (max)
- Chorus Depth
    - 0: Delay Time +/- 0.0 ms (min)
    - 32: Delay Time +/- 2.0 ms
    - 64: Delay Time +/- 4.1 ms
    - 126: Delay Time +/- 8.1 ms (max)
- Chorus Delay Time
    - 0: 0.03 ms (min)
    - 64: 8.2 ms
    - 80: 10.3 ms
    - 127: 16.3 ms (max)
- Pitch Bend Range
    - 0: 0 semitone (min)
    - 24: 24 semitone (max)

## Sample Chorus Settings

- Setting C0 -- Chorus Mode: 127, Chorus Rate: 32, Chorus Depth: 32, Chorus Delay Time: 64
- Setting C1 -- Chorus Mode: 127, Chorus Rate: 16, Chorus Depth: 32, Chorus Delay Time: 64
- Setting C2 -- Chorus Mode: 127, Chorus Rate: 48, Chorus Depth: 32, Chorus Delay Time: 64
- Setting D1 -- Chorus Mode: 127, Chorus Rate: 16, Chorus Depth: 32, Chorus Delay Time: 80
- Setting D2 -- Chorus Mode: 127, Chorus Rate: 16, Chorus Depth: 40, Chorus Delay Time: 60
- Setting D3 -- Chorus Mode: 127, Chorus Rate: 32, Chorus Depth: 24, Chorus Delay Time: 60
- Setting J1 -- Chorus Mode: 127, Chorus Rate: 32, Chorus Depth: 32, Chorus Delay Time: 20
- Setting J2 -- Chorus Mode: 127, Chorus Rate: 48, Chorus Depth: 32, Chorus Delay Time: 20

## NOTE: Control Change Parameters

- Chorus Mode [Off|S|PS]
    - 0 (0-31): Chorus Off
    - 64 (32-95): Stereo Chorus
    - 127 (96-127): Pseudo-Stereo Chorus
- Chorus Depth
    - 0: Delay Time +/- 0.0 ms (min)
    - 64: Delay Time +/- 2.0 ms
    - 125: Delay Time +/- 4.0 ms (max)
- Chorus Delay Time
    - 0: 0.03 ms (min)
    - 64: 4.1 ms
    - 125: 8.1 ms (max)
