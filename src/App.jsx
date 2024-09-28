import './reset.css'
import './App.css'
import Header from './components/Header/Header'

export default function App() {
	if (localStorage.getItem('ip') == null) {
		localStorage.setItem('ip', '212.193.27.248')
	}
	if (localStorage.getItem('port') == null) {
		localStorage.setItem('port', '443')
	}
	
	return (
		<>
			<Header></Header>
		</>
	)
}
