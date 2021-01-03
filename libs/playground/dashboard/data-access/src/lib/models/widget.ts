import { Observable } from 'rxjs'
import { WidgetType } from './widget.type'

export interface Widget {
  id: string
  title: string
  content?: string
  data$?: Observable<any>
  type: WidgetType
}
