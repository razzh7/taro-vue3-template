import '@nutui/nutui-taro/dist/style.css'
import { App } from 'vue'
import { Button, Icon, Dialog, Cell } from '@nutui/nutui-taro'

const setNutUi = (app: App) => {
  app.use(Button).use(Icon).use(Dialog).use(Cell)
}

export default setNutUi
