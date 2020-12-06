import { Inject } from '@angular/core'
import { IndexedDB as AngularIdb } from 'ng-indexed-db'
import { Observable } from 'rxjs'
import { delay } from 'rxjs/operators'

export { AngularIdb }

export interface AngularIdbServiceOptions {
  delay?: number
}

export const defaultAngularIdbServiceOptions: AngularIdbServiceOptions = {
  delay: 0,
}

export abstract class AngularIdbService<T> {
  private readonly db: AngularIdb
  private readonly table: string
  private readonly options: AngularIdbServiceOptions

  protected constructor(
    @Inject(AngularIdb) db: AngularIdb,
    table: string,
    options: AngularIdbServiceOptions = defaultAngularIdbServiceOptions,
  ) {
    this.db = db
    this.table = table
    this.options = { ...defaultAngularIdbServiceOptions, ...options }
  }

  get delay(): number {
    return this.options.delay || 0
  }

  create(item: T): Observable<T> {
    const id = new Date().getTime().toString()
    return this.db.create(this.table, { id, ...item }).pipe(delay(this.delay))
  }

  items(): Observable<T[]> {
    return this.db.list(this.table).pipe(delay(this.delay))
  }

  item(id: string): Observable<T> {
    return this.db.get(this.table, id).pipe(delay(this.delay))
  }

  update(id: string, item: T): Observable<T> {
    return this.db.update(this.table, { ...item, id }).pipe(delay(this.delay))
  }

  delete(id: string): Observable<boolean> {
    return this.db.delete(this.table, id).pipe(delay(this.delay))
  }
}
