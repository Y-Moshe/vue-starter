import type { Directive } from 'vue'

interface HTMLElementWithOutsideClick extends HTMLElement {
  clickOutside: (event: MouseEvent) => void
}

export const clickOutsideDirective: Directive = {
  mounted(el: HTMLElementWithOutsideClick, { value: cb }) {
    el.clickOutside = ({ clientX, clientY }) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      if (!(clientX > left && clientX < left + width && clientY > top && clientY < top + height)) {
        cb()
      }
    }

    document.addEventListener('click', el.clickOutside)
  },

  unmounted(el: HTMLElementWithOutsideClick) {
    document.removeEventListener('click', el.clickOutside)
  }
}
