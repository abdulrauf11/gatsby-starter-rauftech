import { css } from "styled-components"

export const sizes = {
  large: 2000,
  medium: 1024,
  small: 400,
}
// ${device.small``}
// ${device.large``}
// ${device.medium``}
// Iterate through the sizes and create a media template
const device = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => {
    if (sizes[label] >= sizes.large) {
      return css`
        @media (min-width: ${sizes[label] / 16}rem) {
          ${css(...args)}
        }
      `
    } else {
      return css`
        @media (max-width: ${sizes[label] / 16}rem) {
          ${css(...args)}
        }
      `
    }
  }
  return acc
}, {})

export default device
