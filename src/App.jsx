import "./App.css";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export default function App() {

    const fieldScheme = yup.object()
        .shape({
            email: yup.string()
                .required("Введите данные"),
            password: yup.string()
                .required("Введите данные")
                .min(3, "Неверный пароль. Должно быть не меньше 3 символов"),
            examPassword: yup.string()
                .required("Повторите пароль")
                .oneOf([yup.ref("password")], "Пароли не совпадают")
        })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            examPassword: ""
        },
        resolver: yupResolver(fieldScheme)
    })

    const onSubmit = (formData) => console.log(formData)

    return (
        <div className="App">
            <header className="App-header">
                <form className="form-style" onSubmit={handleSubmit(onSubmit)}>

                    {errors.email && <p>{errors.email.message}</p>}
                    {errors.password && <p>{errors.password.message}</p>}
                    {errors.examPassword && <p>{errors.examPassword.message}</p>}

                    <input className="input" name="email" type="email"
                           placeholder="Почта"
                           {...register("email")}/>
                    <input className="input" name="password" type="password"
                           placeholder="Пароль"
                           {...register("password")}/>
                    <input className="input" name="password" type="password"
                           placeholder="Повтор пароля"
                           {...register("examPassword")}/>
                    <button className="btn" type="submit"
                            disabled={!!errors.email && !!errors.password &&
                                !!errors.examPassword}>Зарегистрироваться
                    </button>
                </form>
            </header>
        </div>
    );
}
