import * as React from 'react';
import {Image} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Transactions from './screens/transactions'
import Search from './screens/search'

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const tabNavigator= createBottomTabNavigator({
  TransactionScreen:{screen:Transactions},
  SearchScreen:{screen:Search}
},
{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:()=>{
      const  routeName=navigation.state.routeName;
      if(routeName==='TransactionScreen'){
        return(<Image
          source={require('./assets/book.png')}
          style={{width:35,height:35}}/>)
        
      }
      else if(routeName==='SearchScreen'){
        return(<Image
        source={require('./assets/searchingbook.png')}
        style={{width:35,height:35}}/>)
      }
    }
  })
})
const AppContainer=createAppContainer(tabNavigator)