import { mount } from '@vue/test-utils'
import App from './../../src/App.vue'
import Vuex from 'vuex';

describe('App', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(typeof App.data).toBe('function')
  })
})

//Home Page
  //1. Navigation exist
  //2. Content exist 
  
  //Events
  //1. Event table exist
  //2. Search button in event table is working
  //3. When apply link clicked, form should be displayed

  //Member
  //1. Should have this component:
      //Event List Table exist
      //Volunteer List Table exist
      //Create Event Tab is working
      //Form filled & submit, display success or no error
      //If required field is empty upon submit, error will be displayed

// describe('Mounted App', () => {
//   const wrapper = mount(App);

//   test('is a Vue instance', () => {
//     expect(wrapper.isVueInstance()).toBeTruthy()
//   })
// })

describe('Mounted App', () => {
  const wrapper = mount(App);
  // Inspect the raw component options
  // it('has a button', () => {
  expect(wrapper.classes('v-btn')).toBe(true)
  // })
})
