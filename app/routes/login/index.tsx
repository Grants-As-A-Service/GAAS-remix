import Login from "../../components/LoginForum";

export default () => (
    <Login
        done={() => {
            window.location.href = "/home";
        }}
    />
);
