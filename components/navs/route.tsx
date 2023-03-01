
export default function Route() {
    const path = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "";

    return (
        <div className="flex-1">
            <div className="absolute">
                <a className="btn btn-ghost normal-case text-2xl">{path}</a>
            </div>
        </div>
    );
}
