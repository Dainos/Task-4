import React from 'react';
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { store } from './store/Store'
import DataChart from './components/DataChart'


configure({
  adapter: new Adapter()
})

describe('Table tasks grouping', () => {

  let dataChart, div, button, barChart

    beforeEach(() => {

    dataChart = mount(<DataChart store={store} />)    

    div = dataChart.find('div')

    button = div.find('button')

    barChart = dataChart.find('BarChart')    

  })

  it ('grouping test', () => {
    button.simulate('click')
    barChart = dataChart.find('BarChart')
    expect(barChart.props().data.length).toEqual(24)
    for (let i = 0; i<24; i++) console.log(barChart.props().data[i])    
  })
})