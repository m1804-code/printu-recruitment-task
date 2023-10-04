import { AppDispatch } from "../store"
import { errorSet, projectFetched } from "./RectanglesSlice"
import { projectValidateSchema } from "./RectanglesTypes"

const apiUrl = "http://recruitment01.vercel.app/api"
export const getInitProject = () => async (dispatch: AppDispatch) => {
  const request = await fetch(`${apiUrl}/init`)
  if (request.status !== 200) {
    dispatch(errorSet("Error: " + request.status))
    return
  }
  const json = await request.json()
  dispatch(fetchProject(json.id))
}

export const fetchProject =
  (projectId: string) => async (dispatch: AppDispatch) => {
    const request = await fetch(`${apiUrl}/project/${projectId}`)
    if (request.status !== 200) {
      dispatch(errorSet("Error: " + request.status))
      return
    }
    const json = await request.json()
    projectValidateSchema.isValid(json.project).then((valid) => {
      valid
        ? dispatch(projectFetched(json.project))
        : dispatch(errorSet("Wrong data"))
    })
  }
