import { createRoot } from 'react-dom/client'
import App from './components/ToDoApp/App'

const root = createRoot(document.querySelector('.todoapp'))
root.render(<App />)
