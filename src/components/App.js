import React from "react"
import Clock from "./Clock"

// App component is created
// make an api call to retrieve location, since this asynchronous
// code continues and the html element is returned, at this point the position value is null 

// const App = () => {
// 	let position = null
// 	//api calls are asynchronous
// 	window.navigator.geolocation.getCurrentPosition(
// 		position => console.log(position),
// 		error => console.error(error)
// 	)
// 	return (
// 		<div>
// 			<h1>{position}</h1>
// 			<Clock date={new Date()} />
// 		</div>
// 	)
// }


class App extends React.Component {
	constructor(props) {
		super(props)
		//define a state
		this.state = {latitude:null, errorMessage: '', date: new Date()}

		console.log( "1. CONSTRUCTOR runs first")
	}
	
	isItWarm() {
		const {latitude} = this.state
		const month = new Date().getMonth()

		if (((month > 4 && month <= 9) && latitude > 0) || ((month <=4 && month >9) && latitude <0) || latitude ===0) {
			return true
		}
		return false
	}
	
	getClockIcon() {
		if (this.isItWarm()) {
			return "summer.png"
		} 
		return "winter.png"
	}

	tick(){
		this.setState({date: new Date()})
	}
	
	componentDidMount() {
		console.log("3. component DID MOUNT runs after first render")
		window.navigator.geolocation.getCurrentPosition(
			position => this.setState({latitude: position.coords.latitude}),
			error => this.setState({errorMessage: error.message})
		)
	}
	componentDidUpdate(prevState) {
		console.log( "4. component DID UPDATE runs after subsequent render, not the first render ")
		if(prevState.date !== this.state.date) {
			this.timerId = setInterval(() => this.tick(),1000)
		}
	}
	
	componentWillUnmount(){
		console.log("5. component WILL UNMOUNT runs after first render")
		//When moving to another page, we don't want this to run in the background=>clear
		clearInterval(this.timerId)
	}

	render() {
		console.log("2. RENDER runs second")
		const {latitude, errorMessage, date} = this.state
		return(
			<div>
				<h1>{latitude}</h1>	
				{(errorMessage) || 
					<Clock 
						date={date} 
						icon={latitude ? this.getClockIcon() : null}
					/>
				}
			</div>
		)
	}
}


export default App
