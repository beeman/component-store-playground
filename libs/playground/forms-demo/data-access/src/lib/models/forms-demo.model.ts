import type { NavItem } from '@component-store-playground/shared/data-access/models'
import { FormField } from '@component-store-playground/shared/ui/forms'

export interface FormsDemo extends NavItem {
  fields: FormField[]
  model?: any
}
