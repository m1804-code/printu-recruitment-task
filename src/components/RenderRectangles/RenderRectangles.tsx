import { Item } from "../../shared/api"
import { RenderRectanglesProps } from "./RenderRectanglesTypes"

export const RenderRectangles: React.FC<RenderRectanglesProps> = ({
  project,
}: RenderRectanglesProps) => (
  <div style={{ flex: "1" }}>
    <svg
      style={{
        width: "100%",
        height: "100%",
        padding: "10px",
      }}
    >
      <svg viewBox={`0 0 ${project.width} ${project.height}`}>
        <rect width={project.width} height={project.height} fill="#fff" />
        {project?.items.map((item) => (
          <RenderItem key={item.id || Math.random()} item={item} />
        ))}
      </svg>
    </svg>
  </div>
)

const RenderItem = ({ item }: { item: Item }) => {
  const getContrastTextColor = (hexColor: string): string => {
    const extractChannel = (start: number) =>
      parseInt(hexColor.substr(start, 2), 16) / 255

    const r = extractChannel(1)
    const g = extractChannel(3)
    const b = extractChannel(5)

    const luminance = (Math.max(r, g, b) + Math.min(r, g, b)) / 2

    return luminance < 0.6 ? "#FFFFFF" : "#000000"
  }

  const { color, x, y, width, height, rotation } = item

  const computeBoundingBoxHeight = () =>
    width * Math.abs(Math.sin((rotation * Math.PI) / 180)) +
    height * Math.abs(Math.cos((rotation * Math.PI) / 180))

  const computeBoundingBoxWidth = () =>
    width * Math.abs(Math.cos((rotation * Math.PI) / 180)) +
    height * Math.abs(Math.sin((rotation * Math.PI) / 180))

  const boundingBoxHeight = computeBoundingBoxHeight()
  const boundingBoxWidth = computeBoundingBoxWidth()

  return (
    <svg key={Math.random()}>
      <g transform={`rotate(${rotation} ${x} ${y})`}>
        <rect
          width={width}
          height={height}
          fill={color}
          x={x - width / 2}
          y={y - height / 2}
        />
        <circle cx={x} cy={y} r="3" fill="red" stroke="#000" />
      </g>
      <rect
        height={boundingBoxHeight}
        width={boundingBoxWidth}
        fill="none"
        stroke="indianred"
        strokeWidth="1"
        y={y - boundingBoxHeight * 0.5}
        x={x - boundingBoxWidth * 0.5}
      />
      <text
        fill={getContrastTextColor(color)}
        x={x + 10}
        y={y}
        fontSize="16"
        fontFamily="Verdana"
      >
        {rotation}°
      </text>
    </svg>
  )
}
