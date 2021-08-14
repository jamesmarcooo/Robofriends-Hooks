
import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';

function App(){
    // constructor(){
    //     super()
    //     this.state = {
    //         robots: [],
    //         searchfield: ''
    //     }
    // }
    const [robots, setRobots] = useState([]) //[state, function that changes the state] = useState(initial state)
    const [searchfield, setSearchfield] = useState('')

    // componentDidMount(){
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(users => this.setState({robots: users}));
    // }
    
    // similar to componentDidMount()
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {setRobots (users)});
    },[])

    const onSearchChange = (event) => {
        // this.setState({ searchfield: event.target.value })
        setSearchfield(event.target.value)
    }

    
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return robots.length === 0 ? //if there's no robot
        <h1 className='tc'>Loading...</h1> :
        (
        <div className='tc'>
            <h1>Robot Profiles</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundary>

                    <CardList robots={filteredRobots} />
                </ErrorBoundary>
            </Scroll>
        </div>
        );
    
    
}

export default App;