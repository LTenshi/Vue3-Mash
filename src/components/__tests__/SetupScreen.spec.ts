import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { SetupScreen } from '../index'

describe('Setup Screen', () => {
  const wrapper = mount(SetupScreen)
  it('has an add category button', () => {
    expect(wrapper.find('[id="btn-add-category"]').exists()).toBe(true)
  })

  it('creates categories', async () => {
    const addCategoryButton = wrapper.get('[id="btn-add-category"]')
    await addCategoryButton.trigger('click')
    expect(wrapper.find('[id="in-category-0"]').exists()).toBe(true)
  })

  it('allows to type in the category', async () => {
    const addCategoryButton = wrapper.get('[id="btn-add-category"]')
    await addCategoryButton.trigger('click')
    const categoryInput = wrapper.find('[id="in-category-0"]')
    await categoryInput.setValue('asd')
    // @ts-expect-error value is for some reason not declared on the original object
    expect(categoryInput.element.value).toBe('asd')
  })

  it('creates children', async () => {
    const addCategoryButton = wrapper.get('[id="btn-add-category"]')
    await addCategoryButton.trigger('click')
    const categoryInput = wrapper.find('[id="in-category-0"]')
    await categoryInput.setValue('asd')
    expect(wrapper.find('[id="in-childTitle-0-0"]').exists()).toBe(true)
  })

  it('creates 5 children', async () => {
    const addCategoryButton = wrapper.get('[id="btn-add-category"]')
    await addCategoryButton.trigger('click')
    const categoryInput = wrapper.find('[id="in-category-0"]')
    await categoryInput.setValue('asd')
    for (let i = 0; i < 5; i) {
      const categoryChildInput = wrapper.find(`[id="in-childTitle-0-${i}"]`)
      await categoryChildInput.setValue('dsa')
      i++
    }
    expect(wrapper.find('[id="in-childTitle-0-5"]').exists()).toBe(true)
    // Remember child titles are always 1 longer due to automatic creation of input
    expect(wrapper.find('[id="in-childTitle-0-6"]').exists()).toBe(false)
  })

  it('creates no more than 100 children', async () => {
    const addCategoryButton = wrapper.get('[id="btn-add-category"]')
    await addCategoryButton.trigger('click')
    const categoryInput = wrapper.find('[id="in-category-0"]')
    await categoryInput.setValue('asd')
    for (let i = 0; i < 100; i++) {
      const categoryChildInput = wrapper.find(`[id="in-childTitle-0-${i}"]`)
      await categoryChildInput.setValue('dsa')
    }

    // it shouldn't exceed 99 (100 due to 0 index)
    expect(wrapper.find('[id="in-childTitle-0-99"]').exists()).toBe(true)
    expect(wrapper.find('[id="in-childTitle-0-100"]').exists()).toBe(false)
  })
})
