import Login from "../LoginForum";

export default () => (
    <Login
        done={() => {
            window.location.href = "/home";
        }}
    />
);
