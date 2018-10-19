import Cookies from 'js-cookie';
import { shallowMount } from '@vue/test-utils';
import ProfileComponent from '../../src/components/ProfileComponent.vue';

const expect = require('chai').expect;
const should = require('chai').should();

Cookies.set('token', 'value_');
Cookies.set('user_id', 'value_');

describe('ProfileComponent data()', () => {
  it('has userFirstName', () => {
    expect(ProfileComponent.data()).to.have.property('userFirstName');
  });

  it('has default userLastName', () => {
    expect(ProfileComponent.data()).to.have.property('userLastName');
  });

  it('has default userAge', () => {
    expect(ProfileComponent.data()).to.have.property('userAge');
  });

  it('has default userGender', () => {
    expect(ProfileComponent.data()).to.have.property('userGender');
  });

  it('has default userImage', () => {
    expect(ProfileComponent.data()).to.have.property('userImage');
  });
});

describe('ProfileComponent for empty profile', () => {
  const wrapper = shallowMount(ProfileComponent, {
    mocks: {
      $cookies: Cookies,
    },
  });
  wrapper.setData({
    userFirstName: '',
    userLastName: '',
    userAge: 0,
    userGender: 'M',
    userImage: '',
  });

  it('has default userImage', () => {
    expect(wrapper.find('img').exists()).to.be.equal(true);
  });
});

describe('ProfileComponent for profile with data', () => {
  const wrapper = shallowMount(ProfileComponent, {
    mocks: {
      $cookies: Cookies,
    },
  });
  const testUserData = {
    userFirstName: 'User',
    userLastName: 'Name',
    userAge: 18,
    userGender: 'W',
    userImage: 'userAvatar.png',
  };
  wrapper.setData(testUserData);

  it('has userImage', () => {
    expect(wrapper.find('img').attributes('src')).to.be.equal(testUserData.userImage);
  });

  it('has userAge', () => {
    expect(wrapper.find('v-label').text()).to.be.equal('Age');
    expect(wrapper.find('#userAge').text()).to.be.equal(testUserData.userAge.toString());
  });

  it('has fullName', () => {
    expect(wrapper.find('h3').text()).to.be.equal(`${testUserData.userFirstName} ${testUserData.userLastName}`);
  });

  it('has userGender', () => {
    expect(wrapper.find('#userGender').text()).to.be.equal(testUserData.userGender);
  });

  it('has edit button', () => {
    expect(wrapper.contains('v-btn')).to.be.equal(true);
  });
});
