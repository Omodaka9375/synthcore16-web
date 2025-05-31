# SynthCore16 Operation Guide v1.0.0

## Concept
Digital Arduino based synthesizer with 16-bit Audio Output

## Features
- PWM Audio Out
    - L channel, high 8-bit: Pin D5 (or D6)
    - L channel, low 8-bit: Pin D6 (or D5)
    - R channel, high 8-bit: Pin D11 (Fixed)
    - R channel, low 8-bit: Pin D3 (Fixed)
    - **NOTE**: When using the SparkFun MIDI Shield (DEV-12898), do not mount S4 (D3) and LED2 GREEN (D6)
- Limitations
    - The effect of Chorus Depth and Chorus Delay Time are limited
    - Refer to [Parameter Guide](/SynthCore16-Parameter-Guide.md) for details

## Recommended Circuit Diagram

![Recommended Circuit Diagram](./synthCore16-circuit-diagram.png)

## Wiring Diagram

![Actual Wiring Diagram](./synthCore16-bread-board.png)

