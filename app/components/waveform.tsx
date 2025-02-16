"use client"

import { useEffect, useRef } from "react"

interface WaveformProps {
  isRecording: boolean
}

export function Waveform({ isRecording }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const dataArrayRef = useRef<Uint8Array>()
  const analyserRef = useRef<AnalyserNode>()

  useEffect(() => {
    if (!isRecording) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize audio context and analyzer if not already done
    if (!analyserRef.current) {
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      // Simulate microphone input with oscillator for demo
      const oscillator = audioContext.createOscillator()
      oscillator.connect(analyser)
      oscillator.start()

      analyserRef.current = analyser
      dataArrayRef.current = dataArray
    }

    const animate = () => {
      const WIDTH = canvas.width
      const HEIGHT = canvas.height

      if (!analyserRef.current || !dataArrayRef.current) return

      analyserRef.current.getByteTimeDomainData(dataArrayRef.current)

      ctx.fillStyle = "rgb(255, 255, 255)"
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      ctx.lineWidth = 2
      ctx.strokeStyle = "rgb(0, 123, 255)"
      ctx.beginPath()

      const sliceWidth = WIDTH / dataArrayRef.current.length
      let x = 0

      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const v = dataArrayRef.current[i] / 128.0
        const y = (v * HEIGHT) / 2

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        x += sliceWidth
      }

      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRecording])

  return <canvas ref={canvasRef} width={600} height={200} className="w-full max-w-2xl mx-auto" />
}

