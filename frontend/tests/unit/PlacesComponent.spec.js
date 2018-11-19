import Vuetify from 'vuetify';
import { shallowMount, config, createLocalVue } from '@vue/test-utils';
import PlacesComponent from '@/components/PlacesComponent.vue';


const localVue = createLocalVue();
const expect = require('chai').expect;
const should = require('chai').should();

localVue.use(Vuetify);

config.mocks.$store = {
  state: {
    Authenticated: 'test token value',
  },
  getters: {
    getToken: state => state.Authenticated,
  },
};

describe('PlacesComponent', () => {
  const wrapper = shallowMount(PlacesComponent, { localVue });

  it('has container for create place button and filter', () => {
    expect(wrapper.contains('[name="menu-container"]')).to.be.equal(true);
  });

  it('has button for adding place', () => {
    expect(wrapper.contains('[name="create-place-button"]')).to.be.equal(true);
  });

  it('has container for place components', () => {
    expect(wrapper.contains('[name="place-container"]'))
      .to.be.equal(true);
  });
});
