'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', handleMouse)

    const vert = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0, 1); }
    `
    const frag = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;

      float orb(vec2 uv, vec2 center, float radius) {
        return 1.0 - smoothstep(0.0, radius, length(uv - center));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        float t = u_time * 0.3;
        
        vec2 m = u_mouse;
        
        vec2 c1 = vec2(0.2 + sin(t * 0.7) * 0.15, 0.3 + cos(t * 0.5) * 0.1);
        vec2 c2 = vec2(0.8 + cos(t * 0.6) * 0.1, 0.7 + sin(t * 0.4) * 0.15);
        vec2 c3 = vec2(m.x * 0.5 + 0.25, 1.0 - m.y * 0.5 + 0.0);
        vec2 c4 = vec2(0.5 + sin(t * 0.3) * 0.2, 0.5 + cos(t * 0.8) * 0.2);

        float o1 = orb(uv, c1, 0.35) * 0.12;
        float o2 = orb(uv, c2, 0.30) * 0.10;
        float o3 = orb(uv, c3, 0.25) * 0.08;
        float o4 = orb(uv, c4, 0.40) * 0.06;

        vec3 col1 = vec3(0.39, 0.40, 0.95); // indigo
        vec3 col2 = vec3(0.13, 0.83, 0.93); // cyan
        vec3 col3 = vec3(0.55, 0.36, 0.96); // purple
        vec3 col4 = vec3(0.06, 0.75, 0.51); // emerald

        vec3 color = vec3(0.024, 0.024, 0.059); // #06060f
        color += col1 * o1 + col2 * o2 + col3 * o3 + col4 * o4;

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const program = gl.createProgram()!
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vert))
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, frag))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    
    const pos = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uTime = gl.getUniformLocation(program, 'u_time')

    const start = Date.now()
    const loop = () => {
      const t = (Date.now() - start) / 1000
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ opacity: 0.9 }}
    />
  )
}
