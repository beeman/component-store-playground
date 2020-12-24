import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ui-step',
  template: `
    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav aria-label="Progress">
      <ol class="overflow-hidden">
        <li class="relative pb-10">
          <!-- Complete Step -->
          <div class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600" aria-hidden="true"></div>
          <a href="#" class="relative flex items-start group">
            <span class="h-9 flex items-center">
              <span
                class="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800"
              >
                <!-- Heroicon name: check -->
                <svg
                  class="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </span>
            <span class="ml-4 min-w-0 flex flex-col">
              <span class="text-xs font-semibold uppercase tracking-wide">Create account</span>
              <span class="text-sm text-gray-500">Vitae sed mi luctus laoreet.</span>
            </span>
          </a>
        </li>

        <li class="relative pb-10">
          <!-- Current Step -->
          <div class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true"></div>
          <a href="#" class="relative flex items-start group" aria-current="step">
            <span class="h-9 flex items-center" aria-hidden="true">
              <span
                class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full"
              >
                <span class="h-2.5 w-2.5 bg-indigo-600 rounded-full"></span>
              </span>
            </span>
            <span class="ml-4 min-w-0 flex flex-col">
              <span class="text-xs font-semibold uppercase tracking-wide text-indigo-600">Profile information</span>
              <span class="text-sm text-gray-500">Cursus semper viverra facilisis et et some more.</span>
            </span>
          </a>
        </li>

        <li class="relative pb-10">
          <div class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true"></div>
          <a href="#" class="relative flex items-start group">
            <span class="h-9 flex items-center" aria-hidden="true">
              <span
                class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
              >
                <span class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"></span>
              </span>
            </span>
            <span class="ml-4 min-w-0 flex flex-col">
              <span class="text-xs font-semibold uppercase tracking-wide text-gray-500">Business information</span>
              <span class="text-sm text-gray-500">Penatibus eu quis ante.</span>
            </span>
          </a>
        </li>

        <li class="relative pb-10">
          <div class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true"></div>
          <a href="#" class="relative flex items-start group">
            <span class="h-9 flex items-center" aria-hidden="true">
              <span
                class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
              >
                <span class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"></span>
              </span>
            </span>
            <span class="ml-4 min-w-0 flex flex-col">
              <span class="text-xs font-semibold uppercase tracking-wide text-gray-500">Theme</span>
              <span class="text-sm text-gray-500">Faucibus nec enim leo et.</span>
            </span>
          </a>
        </li>

        <li class="relative">
          <a href="#" class="relative flex items-start group">
            <span class="h-9 flex items-center" aria-hidden="true">
              <span
                class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
              >
                <span class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"></span>
              </span>
            </span>
            <span class="ml-4 min-w-0 flex flex-col">
              <span class="text-xs font-semibold uppercase tracking-wide text-gray-500">Preview</span>
              <span class="text-sm text-gray-500">Iusto et officia maiores porro ad non quas.</span>
            </span>
          </a>
        </li>
      </ol>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStepComponent {}
