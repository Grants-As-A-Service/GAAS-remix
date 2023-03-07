import Login from "../../components/forms/LoginForm";

export default () => (
    <Login
        done={() => {
            window.location.href = "/home";
        }}
    />
);
