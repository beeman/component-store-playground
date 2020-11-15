import { Component } from '@angular/core';

@Component({
  template: `
    <div
      class=" pb-24 bg-gray-100 flex items-start lg:items-center justify-center"
    >
      <div class="container mx-auto px-4 h-full">
        <h2
          class="text-gray-800 font-semibold tracking-tight leading-loose text-center text-3xl lg:text-4xl lg:text-5xl my-2 lg:my-8"
        >
          Frequently Asked Questions
        </h2>

        <section
          x-data="{ selectedItem: 1 }"
          class="shadow-md bg-gray-200 overflow-hidden rounded-lg mt-6 sm:shadow-lg lg:mt-16 lg:mx-auto lg:max-w-4xl"
        >
          <article class="border-gray-400 border-b hover:bg-gray-300">
            <div>
              <header
                (click)="
                  selectedItem === 1 ? (selectedItem = 0) : (selectedItem = 1)
                "
                [class]="{ 'bg-gray-300': selectedItem === 1 }"
                class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none"
              >
                <h3 class="font-semibold text-xl text-gray-800">
                  Do you offer team pricing?
                </h3>
                <div
                  class="rounded-full border w-7 h-7 flex items-center justify-center hover:bg-gray-200"
                >
                  <div
                    *ngIf="selectedItem !== 1"
                    class="rounded-full text-gray-500 w-7 h-7 flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div
                    *ngIf="selectedItem === 1"
                    class="rounded-full text-gray-500 w-7 h-7 flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </header>
              <div *ngIf="selectedItem === 1">
                <div class="pl-8 pr-8 py-5 bg-gray-100 text-gray-700">
                  <p>
                    Yes, we do! Team pricing is available for any plan. You can
                    take advantage of 30% off for signing up for team pricing of
                    10 users or more.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="border-gray-400 border-b hover:bg-gray-300">
            <div>
              <header
                (click)="
                  selectedItem === 2 ? (selectedItem = 0) : (selectedItem = 2)
                "
                [class]="{ 'bg-gray-300': selectedItem === 2 }"
                class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none"
              >
                <h3 class="font-semibold text-xl text-gray-800">
                  How do I add a custom domain?
                </h3>
                <div
                  class="rounded-full border w-7 h-7 flex items-center justify-center hover:bg-gray-200"
                >
                  <div
                    *ngIf="selectedItem !== 2"
                    class="rounded-full text-gray-500 w-7 h-7 flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div
                    *ngIf="selectedItem === 2"
                    class="rounded-full text-gray-500 w-7 h-7 flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </header>
              <div *ngIf="selectedItem === 2">
                <div class="pl-8 pr-8 py-5 bg-gray-100 text-gray-700">
                  <p>
                    You can easily change your site settings inside of your site
                    dashboard by clicking the top right menu and clicking the
                    settings button.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="border-gray-400 border-b hover:bg-gray-300">
            <div>
              <header
                (click)="
                  selectedItem === 3 ? (selectedItem = 0) : (selectedItem = 3)
                "
                [class]="{ 'bg-gray-300': selectedItem === 3 }"
                class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none"
              >
                <h3 class="font-semibold text-xl text-gray-800">
                  How does it work?
                </h3>
                <div
                  class="rounded-full border w-7 h-7 flex items-center justify-center hover:bg-gray-200"
                >
                  <div
                    *ngIf="selectedItem !== 3"
                    class="rounded-full text-gray-500 w-7 h-7 flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div
                    *ngIf="selectedItem === 3"
                    class="rounded-full text-gray-500 w-7 h-7 flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </header>
              <div *ngIf="selectedItem === 3">
                <div class="pl-8 pr-8 py-5 bg-gray-100 text-gray-700">
                  <p>
                    Our platform works with your content to provides insights
                    and metrics on how you can grow your business and scale your
                    infastructure.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  `,
})
export class ContactsComponent {
  public selectedItem: number = 1;
}
