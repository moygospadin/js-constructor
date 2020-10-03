import { block } from '../utils'
import { ColumnsBlock, ImageBlock, TextBlock, TitleBlock } from './blocks'
export class Sidebar {
  constructor(selector, updateCallback) {
    this.$el = document.querySelector(selector)
    this.update = updateCallback
    this.init()
  }
  init() {
    this.$el.insertAdjacentHTML('afterbegin', this.template)
    this.$el.addEventListener('submit', this.add.bind(this))
  }
  get template() {
    return [
      block('text'),
      block('title'),
      block('image'),
      block('columns'),
    ].join('')
  }
  add(event) {
    event.preventDefault()

    const type = event.target.name
    const value = event.target.value.value
    const styles = event.target.styles.value

    switch (type) {
      case 'text':
        this.update(new TextBlock(value, { styles }))
        break
      case 'title':
        this.update(new TitleBlock(value, { styles }))
        break
      case 'image':
        this.update(new ImageBlock(value, { styles }))
      case 'columns':
        this.update(new ColumnsBlock(value, { styles }))
        break
      default:
        break
    }

    event.target.value.value = ''
    event.target.styles.value = ''
  }
}
