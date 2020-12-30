import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { SvgIconComponent, SvgIconsModule } from '@ngneat/svg-icon'

import { IconComponent } from './icon.component'

describe('IconComponent', () => {
  let spectator: Spectator<IconComponent>

  const createComponent = createComponentFactory({
    component: IconComponent,
    imports: [SvgIconsModule.forRoot({ icons: { data: '<svg>foo</svg>', name: 'foo' } })],
  })

  beforeEach(() => {
    spectator = createComponent({
      props: {
        icon: 'foo',
      },
    })
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
    expect(spectator.query(SvgIconComponent)?.key).toEqual('foo')
  })
})
