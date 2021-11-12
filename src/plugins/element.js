import Vue from 'vue'
import { Form, FormItem, Table, TableColumn, Dialog, Drawer, DatePicker, Pagination} from 'element-ui'
import { Input } from 'element-ui'
import { Button } from 'element-ui'

import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'



Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Drawer)
Vue.use(DatePicker)
Vue.use(Pagination)


Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message