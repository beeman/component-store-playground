# @ngrx/component-store Playground

This is a repo that showcases different use-cases which
utilizes [@ngrx/component-store](https://ngrx.io/guide/component-store).

## Technologies

- [Nx](https://nx.dev)
- [Angular](https://angular.io)
- [NGRX Component Store](https://ngrx.io/guide/component-store)
- [IndexDB](https://github.com/UlisesHllSk/ng-indexed-db) - this might be soon replaced with [RxDB](https://rxdb.info/)
- [TailwindCSS](https://tailwindcss.com/)
- [Formly](https://formly.dev/)
- [Jest](https://jestjs.io/)
- [Cypress](https://cypress.io)
- [ngneat/spectator](https://github.com/ngneat/spectator)
- [observer-spy](https://github.com/hirezio/observer-spy)

## Use-cases

Please check each individual use-case for more info

- [Ui Global Store](libs/shared/data-access/ui-store/README.md): We utilize **Component Store** for a simple `UiStore`
  for our dark/light mode
- [Todo](libs/playground/todos/feature/README.md): Simple todo applications
- [Workflow](libs/playground/workflows/feature/shell/README.md): Workflow applications with Recursive Tree structure +
  nested Component Store
- [Form](libs/playground/forms-demo/feature/shell/README.md): Forms demo with Formly

## Testing

**Nx** comes with **Jest** and **Cypress** by default and that's what we're using to write tests for this playground. In
addition, we also utilize **Spectator** for overall Angular testing and **ObserverSpy** for testing `Observable`. Please
check out the `*.spec.ts` files throughout the repo for details.

## Contribute

Please check our [CONTRIBUTING GUIDE](CONTRIBUTING.md)
