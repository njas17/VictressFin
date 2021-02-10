import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Vue from 'vue';
import Home from './../../src/components/Home.vue';
import Events from './../../src/components/Events.vue';
import VolunteerApplicationForm from './../../src/components/VolunteerApplicationForm.vue';
// import Member from './../../src/components/Member.vue';
// import MemberEventList from './../../src/components/MemberEventList.vue';
// import VolunteerList from './../../src/components/VolunteerList.vue';
// import CreteEventForm from './../../src/components/CreateEventForm.vue';

//App
// 1. Navigation exist (router)

//Home Page
//1. Content exist
//2. Render props msg 

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

let wrapper;

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('Home.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(Home, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof Home.data).toBe('function')
  })

  test('renders props.msg when passed', () => {
    const msg = 'Welcome to Sejiwa ';
    wrapper.setProps ({ msg });
    expect(wrapper.text()).toMatch(msg);
  });

  test('renders child component Events', () => {
    expect(wrapper.findComponent(Events).exists()).toBe(true);
  });

});  

describe('Events.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(Events, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof Events.data).toBe('function')
  })

  test('renders child component VolunteerApplicationForm', () => {
    expect(wrapper.findComponent(VolunteerApplicationForm).exists()).toBe(true);
  });

  // test('Apply button exists', () => {
  //   expect(wrapper.find('.apply').exists()).toBe(true);
  // });

  // test('Apply button is clicked', () => {
  //   expect(wrapper.contains('.apply-button')).trigger('click');
  // });

  // test('Expand button exists', () => {
  //   expect(wrapper.contains('.expand')).toBe(true);
  // });

  // test('Expand button is clicked', () => {
  //   expect(wrapper.contains('.expand-button')).trigger('click');
  // });

});

// describe('Member.vue', () => {

//   beforeEach(() => {
//     wrapper = shallowMount(Member, {
//     });
//   });

//   afterEach(() => {
//     wrapper.destroy();
//   });

//   test('is a Vue instance', () => {
//       expect(wrapper.isVueInstance).toBeTruthy();
//   });

//   test('has data', () => {
//     expect(typeof Events.data).toBe('function')
//   })

//   // test('renders child component MemberEventList', () => {
//   //   expect(wrapper.findComponent(MemberEventList).exists()).toBe(true);
//   // });

//   // test('renders child component VolunteerList', () => {
//   //   expect(wrapper.findComponent(VolunteerList).exists()).toBe(true);
//   // });

//   // test('renders child component CreateEventForm', () => {
//   //   expect(wrapper.findComponent(CreateEventForm).exists()).toBe(true);
//   // });

// });  