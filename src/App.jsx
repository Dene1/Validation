import "./App.css";
import {useState} from "react";

const sendFormData = (formData) => {
    console.log(formData);
};


export default function App() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [examPassword, setExamPassword] = useState("")
    const [error, setError] = useState(null)

    const onSubmit = (event) => {
        event.preventDefault();
        if (email && password && examPassword) {
            sendFormData({email, password, examPassword});
        } else {
            setError("Пожалуйста, убедитесь, что заполнены все поля")
        }
    };


    const validationMail = ({target}) => {
        setEmail(target.value)

        let mailError = null

        if (target.value.length < 1) {
            mailError = "Введите почту"
        }
        setError(mailError)
    }

    const validationPassword = ({target}) => {
        setPassword(target.value)

        let passwordError = null

        if (target.value.length < 3) {
            passwordError = "Неверный пароль. Должно быть не меньше 3 символов";
        } else if (target.value.length <= 1) {
            passwordError = "Введите пароль";
        }
        setError(passwordError)
    }

    const validationExamPassword = ({target}) => {
        setExamPassword(target.value)

        let passwordError = null

        if (target.value !== password) {
            passwordError = "Пароли не совпадают";
        }
        setError(passwordError)
    }

    console.log(error)


    return (
        <div className="App">
            <header className="App-header">
                <form className="form-style" onSubmit={onSubmit}>
                    {error && <p className="input">{error}</p>}
                    <input className="input" name="email" type="email"
                           placeholder="Почта"
                           onChange={validationMail}/>
                    <input className="input" name="password" type="password"
                           placeholder="Пароль"
                           onChange={validationPassword}/>
                    <input className="input" name="password" type="password"
                           placeholder="Повтор пароля"
                           onChange={validationExamPassword}/>
                    <button className="btn" type="submit"
                            disabled={!!error}>Зарегистрироваться
                    </button>
                </form>
            </header>
        </div>
    );
}
