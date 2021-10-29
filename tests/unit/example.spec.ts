import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renders tab 1 view', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toMatch('Home')
  })
})
