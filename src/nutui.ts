import { App } from 'vue'
import {
  Button,
  Icon,
  Dialog,
  Cell,
  Steps,
  Step,
  CellGroup,
  Toast,
  OverLay,
  Popup
} from '@nutui/nutui-taro'

const setNutUi = (app: App) => {
  app
    .use(Button)
    .use(Icon)
    .use(Dialog)
    .use(Cell)
    .use(Steps)
    .use(Step)
    .use(CellGroup)
    .use(Toast)
    .use(OverLay)
    .use(Popup)
}

export default setNutUi
