'use client'

interface QRCodeProps {
  value: string
  size?: number
}

// Deterministic "fake" QR code pattern from string hash
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function seededRandom(seed: number) {
  return function () {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff
    return (seed >>> 0) / 0xffffffff
  }
}

export default function QRCode({ value, size = 200 }: QRCodeProps) {
  const modules = 25
  const quietZone = 2
  const total = modules + quietZone * 2
  const cellSize = size / total
  const seed = hashCode(value)
  const rand = seededRandom(seed)

  // Generate grid
  const grid: boolean[][] = []
  for (let r = 0; r < total; r++) {
    grid[r] = []
    for (let c = 0; c < total; c++) {
      grid[r][c] = false
    }
  }

  // Quiet zone offset
  const offset = quietZone

  // Generate random data modules
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      grid[r + offset][c + offset] = rand() > 0.5
    }
  }

  // Draw finder patterns (top-left, top-right, bottom-left)
  const drawFinder = (row: number, col: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const outer = r === 0 || r === 6 || c === 0 || c === 6
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4
        grid[row + r + offset][col + c + offset] = outer || inner
      }
    }
    // Separator
    for (let i = 0; i < 8; i++) {
      const sr = row + 7 + offset
      const sc = col + 7 + offset
      if (sr < total) grid[sr][col + i + offset] = false
      if (sc < total) grid[row + i + offset][sc] = false
    }
  }

  drawFinder(0, 0)       // top-left
  drawFinder(0, modules - 7) // top-right
  drawFinder(modules - 7, 0) // bottom-left

  // Alignment pattern (center-ish)
  const ap = 16
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isOuter = r === -2 || r === 2 || c === -2 || c === 2
      const isCenter = r === 0 && c === 0
      grid[ap + r + offset][ap + c + offset] = isOuter || isCenter
    }
  }

  return (
    <div
      className="bg-white rounded-2xl flex items-center justify-center"
      style={{ width: size, height: size, padding: 4 }}
    >
      <svg
        width={size - 8}
        height={size - 8}
        viewBox={`0 0 ${size - 8} ${size - 8}`}
      >
        <rect width={size - 8} height={size - 8} fill="white" />
        {grid.map((row, ri) =>
          row.map((cell, ci) =>
            cell ? (
              <rect
                key={`${ri}-${ci}`}
                x={ci * cellSize * ((size - 8) / size)}
                y={ri * cellSize * ((size - 8) / size)}
                width={cellSize * ((size - 8) / size) - 0.3}
                height={cellSize * ((size - 8) / size) - 0.3}
                fill="#0F172A"
                rx={0.5}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  )
}
