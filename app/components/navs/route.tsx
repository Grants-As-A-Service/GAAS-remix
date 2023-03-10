export default function Route() {
    const paths = typeof window !== "undefined" ? window.location.pathname.split("/") : "";
    const path = typeof window !== "undefined" ? paths[paths.length - 1] : "";

    return (
        <div className="flex-1">
            <div className="absolute">
                <button className="btn btn-ghost normal-case text-2xl" onClick={() => (window.location.href = "/home")}>
                    {path}
                </button>
            </div>
        </div>
    );
}
