import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { ModalDelete } from './components/ModalDelete';

import { AuthContextProvider } from './contexts/AuthContext';
import { ModalContextProvider } from './contexts/ModalContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

function App() {

  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <ModalContextProvider>
          <AuthContextProvider>
            <Switch> { /*Impede que duas rotas ou mais sejam renderizadas ao mesmo tempo*/}
              <Route path="/" exact component={Home} /> {/* exact indica que a rota deve ser exatamente esta: "/"*/}
              <Route path="/rooms/new" exact component={NewRoom} />
              <Route path="/rooms/:id" component={Room} />
              <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
          </AuthContextProvider>
          <ModalDelete />
        </ModalContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
