'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { motion } from 'motion/react'
import * as THREE from 'three'

// Компонент ноутбука с анимацией открытия
function Laptop({ isOpen, modelPath }: { isOpen: boolean, modelPath: string }) {
  const { scene, nodes, materials } = useGLTF(modelPath)
  const lidRef = useRef<THREE.Group>(null)
  const targetAngle = isOpen ? -1.2 : 0 // -1.2 радиан ≈ 70 градусов
  
  useFrame(() => {
    if (lidRef.current) {
      // Плавная интерполяция угла открытия
      const currentAngle = lidRef.current.rotation.x
      const diff = targetAngle - currentAngle
      lidRef.current.rotation.x += diff * 0.05
    }
  })

  // Ищем группу крышки в модели
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isGroup && child.name.toLowerCase().includes('lid')) {
        lidRef.current = child
      }
    })
  }, [scene])

  return (
    <primitive 
      object={scene} 
      scale={1.2}
      position={[0, -0.3, 0]}
    />
  )
}

// Компонент с графиками на экране
function ScreenContent({ isVisible }: { isVisible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return
    
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const canvas = canvasRef.current
    const width = canvas.width
    const height = canvas.height

    // Анимация графиков
    let animationId: number
    let frame = 0

    const drawCharts = () => {
      frame++
      ctx.clearRect(0, 0, width, height)

      // --- График 1: Линейный ---
      const chart1X = 20
      const chart1Y = 20
      const chart1W = 180
      const chart1H = 100

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 1
      ctx.strokeRect(chart1X, chart1Y, chart1W, chart1H)

      ctx.beginPath()
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      for (let x = 0; x < chart1W; x++) {
        const progress = (x / chart1W) * 2
        const y = chart1Y + chart1H - 20 - 
          (Math.sin(x / 15 + frame / 60) * 20 + 
           Math.sin(x / 30 + frame / 40) * 10 + 
           x / 3)
        if (x === 0) ctx.moveTo(chart1X + x, y)
        else ctx.lineTo(chart1X + x, y)
      }
      ctx.stroke()

      ctx.lineTo(chart1X + chart1W, chart1Y + chart1H - 10)
      ctx.lineTo(chart1X, chart1Y + chart1H - 10)
      ctx.closePath()
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.fill()

      // --- График 2: Столбчатый ---
      const chart2X = 220
      const chart2Y = 20
      const chart2W = 180
      const chart2H = 100

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 1
      ctx.strokeRect(chart2X, chart2Y, chart2W, chart2H)

      const bars = 12
      const barWidth = 10
      const gap = 4
      const totalWidth = bars * (barWidth + gap) - gap

      for (let i = 0; i < bars; i++) {
        const value = (Math.sin(i * 0.8 + frame / 50) * 0.5 + 0.5) * (chart2H - 20)
        const x = chart2X + (chart2W - totalWidth) / 2 + i * (barWidth + gap)
        const y = chart2Y + chart2H - 10 - value

        ctx.fillStyle = `rgba(59, 130, 246, ${0.4 + (value / (chart2H - 20)) * 0.5})`
        ctx.fillRect(x, y, barWidth, value)
      }

      // --- Текст ---
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.font = '10px monospace'
      ctx.fillText('• AESBAU Labs', 15, 145)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.font = '8px monospace'
      ctx.fillText('CPU: 42%  •  MEM: 68%  •  NET: 1.2 Gbps', 15, 160)

      animationId = requestAnimationFrame(drawCharts)
    }

    drawCharts()
    return () => cancelAnimationFrame(animationId)
  }, [isVisible])

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={420}
        height={180}
        className="w-full h-full object-contain"
      />
    </div>
  )
}

// Основной компонент 3D-эко-системы
export function Ecosystem3D() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [modelPath, setModelPath] = useState<string>('/models/laptop.glb')
  const [modelError, setModelError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  // Если модель не загрузилась — показываем заглушку
  if (modelError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full aspect-[4/3] max-w-2xl mx-auto glass rounded-3xl p-8 flex items-center justify-center border border-white/10"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">💻</div>
          <h3 className="text-xl font-semibold text-white">AESBAU Labs</h3>
          <p className="text-muted-foreground mt-2">Загружается 3D-модель...</p>
          <p className="text-muted-foreground text-sm mt-1">Проверьте наличие файла /models/laptop.glb</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative w-full aspect-[4/3] max-w-2xl mx-auto"
    >
      {/* 3D-сцена с ноутбуком */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [1.5, 1.2, 2.5], fov: 45 }}>
          <PerspectiveCamera makeDefault position={[1.5, 1.2, 2.5]} />
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 3, 2]} intensity={1} />
          <directionalLight position={[-1, 2, 0]} intensity={0.5} />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI / 3}
            minPolarAngle={Math.PI / 6}
          />
          <Laptop isOpen={isOpen} modelPath={modelPath} />
        </Canvas>
      </div>

      {/* 2D-графики поверх экрана ноутбука */}
      <div className="absolute inset-[15%] top-[8%] left-[10%] right-[10%] bottom-[20%] pointer-events-none">
        <ScreenContent isVisible={isVisible} />
      </div>
    </motion.div>
  )
}

// Подгрузка модели
useGLTF.preload('/models/laptop.glb')