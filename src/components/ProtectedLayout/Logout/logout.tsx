import { useHistory } from "react-router-dom";
import { setUserLocalStorage } from "../../../context/AuthProvider/util";

export function logoutUser() {
  const history = useHistory();

  return () => {
    setUserLocalStorage(null);
    localStorage.removeItem('u');
    history.push('/login');
    window.location.reload();
  }
}