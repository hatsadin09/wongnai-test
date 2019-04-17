
class Store {

	

	constructor(reducer, initialState) {
		this.reducer = reducer
		this.state = initialState
		this.subcriber = []
		this.counter = 0
	}

	getState() {
		if(this.counter===1) throw "cant call getState"
		return this.state
	}

	dispatch(action) {
		if(this.counter===1) throw "cant call dispatch"

		if(action === undefined) throw " action fail"
		this.counter=1
		this.state = this.reducer(this.state,action)
		this.counter=0

		var temp = this.subcriber.slice(0)
		temp.forEach(listener => {
			listener(this.state)
		});
		
		this.counter=0
		return this.state
	}

	subscribe(listener) {
		
		if(this.counter===1) throw "cant call subscribe"

		if(!(typeof(listener) === 'function')){
			throw 'reducer is not a function'
		}else{
			if(!this.subcriber.includes(listener)){
				this.subcriber.push(listener)
			}
		}
	
		return () => {
			if(this.counter===1) throw "cant call unsubscribe"
			var index = this.subcriber.indexOf(listener)
			if(index!=-1){
				this.subcriber.splice(index,1)
			}
		}
	}

	replaceReducer(nextReducer) {
		if(this.counter===1) throw "cant call replaceReducer"

		if(!(typeof(nextReducer) === 'function')){
			throw 'reducer is not a function'
		}else{
			this.reducer = nextReducer
		}
		return this.reducer()
	}
}

function createStore(reducer, initialState) {
	if(!(typeof(reducer) === 'function')){
		throw 'reducer is not a function'
	}
	return new Store(reducer, initialState)
}

exports.createStore = createStore
