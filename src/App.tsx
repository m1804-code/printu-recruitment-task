import "./App.css"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import {
  fetchProject,
  getInitProject,
} from "./redux/Rectangles/RectanglesEpics"
import { RenderRectangles } from "./components/RenderRectangles/RenderRectangles"
const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const [projectId, setProjectId] = useState("")
  const { rectangles } = useAppSelector((state) => state)

  const handleChangeProjectId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(e.target.value)
  }
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (projectId === "") {
      dispatch(getInitProject())
    } else {
      dispatch(fetchProject(projectId))
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          Project ID:{" "}
          <input
            onChange={handleChangeProjectId}
            placeholder="For random leave empty"
          />
          <button type="submit" > Fetch </button>
          <br />
          {rectangles.error || !rectangles.project?.id ? (
            rectangles.error
          ) : (
            <>
              ID: {rectangles.project?.id}
              {rectangles.project ? (
                <RenderRectangles project={rectangles.project} />
              ) : null}
            </>
          )}
        </form>
      </header>
    </div>
  )
}

export default App
