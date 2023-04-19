import { createNativeStackNavigator } from '@react-navigation/native-stack'
const { Navigator, Screen } = createNativeStackNavigator()
import { NavigationContainer } from '@react-navigation/native'

import Home from './screen/Home'
import Add from './screen/Add'

const Routes = () => {
    return(
        <Navigator>
            <Screen name='Home' component={Home}/>
            <Screen 
                name='Add' 
                component={Add}
                options={{
                    presentation: 'modal'
                }}    
            />
        </Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <Routes/>
        </NavigationContainer>
    )
} 