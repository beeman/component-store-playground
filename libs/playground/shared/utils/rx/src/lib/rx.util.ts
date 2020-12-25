import {
  ApiResponse,
  FailureApiResponse,
  SuccessApiResponse,
} from '@component-store-playground/playground/shared/utils/types'
import type { MonoTypeOperatorFunction, Observable, UnaryFunction } from 'rxjs'
import { isObservable, of, pipe, throwError } from 'rxjs'
import { catchError, map, startWith, tap } from 'rxjs/operators'

export class RxUtil {
  static log<T>(context?: string): MonoTypeOperatorFunction<T> {
    return tap<T>((data) => {
      if (context) {
        console.log(context, data)
      } else {
        console.log({ data })
      }
    })
  }

  static toApiResponse<TData>(
    initialValue?: TData,
    errObsFactoryOrRethrow?: true | ((err: unknown) => string | Observable<string>),
  ): UnaryFunction<Observable<TData>, Observable<ApiResponse<TData>>> {
    return pipe(
      map<TData, SuccessApiResponse<TData>>((data) => ({
        status: 'success' as const,
        data,
        error: '',
      })),
      startWith({ status: 'loading' as const, data: initialValue ?? null, error: '' }),
      catchError((err) => {
        const defaultFailureResponse = {
          status: 'failure' as const,
          data: initialValue ?? null,
        }

        if (errObsFactoryOrRethrow == null) {
          return of<FailureApiResponse<TData>>({
            ...defaultFailureResponse,
            error: err.message || err.error || err.toString(),
          })
        }

        if (typeof errObsFactoryOrRethrow === 'function') {
          const error = errObsFactoryOrRethrow(err)
          if (isObservable(error)) {
            return error.pipe(
              map<string, FailureApiResponse<TData>>((e) => ({
                ...defaultFailureResponse,
                error: e,
              })),
            )
          }

          return of<FailureApiResponse<TData>>({
            ...defaultFailureResponse,
            error,
          })
        }

        return throwError(err)
      }),
    )
  }
}
