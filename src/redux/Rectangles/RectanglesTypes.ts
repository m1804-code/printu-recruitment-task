import { Project } from "../../shared/api"
import * as yup from "yup"

export interface IRectanglesState {
  project: Project | null
  itemTypes: string[]
  error: string | null
}

export const rectanglesInitialState: IRectanglesState = {
  project: null,
  itemTypes: ["rectangle", "ellipse"],
  error: null,
}

export const projectValidateSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  width: yup.number().required(),
  height: yup.number().required(),
  items: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      color: yup.string().required(),
      rotation: yup.number().required(),
      x: yup.number().required(),
      y: yup.number().required(),
      width: yup.number().required(),
      height: yup.number().required(),
    }),
  ),
})
