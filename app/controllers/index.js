import Controller from '@ember/controller';
import { isNone } from '@ember/utils';
import { computed, action } from '@ember/object';
import { task, timeout } from "ember-concurrency";


export default class IndexController extends Controller {
  queryParams = [
    'paramOne',
    'paramTwo'
  ]


  selectedParamOne = null;
  selectedParamTwo = null;


  paramOneOptions = [
    {id: '1', text: 'One'},
    {id: '2', text: 'Two'},
    {id: '3', text: 'Three'},
  ]
  paramTwoOptions = [
    {id: '8', text: 'Eight'},
    {id: '9', text: 'Nine'},
    {id: '10', text: 'Ten'},
  ]


  /***** Getters ******/

  @computed('selectedParamOne')
  get paramOne() {
    if (isNone(this.selectedParamOne)) {
      console.log('paramOne getter null');
      return null;
    }
    console.log(`paramOne getter ${this.get('selectedParamOne.id')}`);
    return this.get('selectedParamOne.id');
  }

  set paramOne(value) {
    console.log(`paramOne setter: ${value}`);
    this.setOneFromParamTask.perform(value);
  }

  @computed('selectedParamTwo')
  get paramTwo() {
    if (isNone(this.selectedParamTwo)) {
      console.log('paramTwo getter null')
      return null;
    }
    console.log(`paramTwo getter ${this.get('selectedParamTwo.id')}`);
    return this.get('selectedParamTwo.id');
  }

  set paramTwo(value) {
    console.log(`paramTwo setter: ${value}`);
    this.setTwoFromParamTask.perform(value);
  }


  /***** Tasks ******/


  @task(function * (value) {
    // Simulate spending time fetching some data from an API
    yield timeout(300);
    let obj = isNone(value) ? null : this.paramOneOptions.findBy('id', value);
    this.set('selectedParamOne', obj);
  }).restartable() setOneFromParamTask;


  @task(function * (value) {
    // Simulate spending time fetching some data from an API
    yield timeout(300);
    let obj = isNone(value) ? null : this.paramTwoOptions.findBy('id', value);
    this.set('selectedParamTwo', obj);
  }).restartable() setTwoFromParamTask;


  /***** Actions ******/

  @action
  selectParamOne(value) {
    this.set('selectedParamOne', this.paramOneOptions.findBy('id', value));
  }

  @action
  selectParamTwo(value) {
    this.set('selectedParamTwo', this.paramTwoOptions.findBy('id', value));
  }
}
