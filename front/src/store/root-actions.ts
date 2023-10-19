import * as categoriesActions from './category/category.actions'
import { categorySlice } from './category/category.slice'
import * as userActions from './user/user.actions'
import { userSlice } from './user/user.slice'

export const rootActions = {
	...userActions,
	...userSlice.actions,
	...categoriesActions,
	...categorySlice.actions
}
