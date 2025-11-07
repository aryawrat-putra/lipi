import { Link, Outlet } from "react-router";

export default function DashboardLayout() {
    return (
        <section>
            DashboardLayout 
            <br />
            <br />
            <Link to=''>dashboard</Link> <br />
            <Link to='activity'>activity</Link> <br />
            <Link to='favorites'>favorites</Link> <br />
            <Link to='notifications'>notifications</Link> <br />
            <Link to='settings'>settings</Link> <br />
            <Link to='trash'>trash</Link> <br />
            <br />
            <br />

            <Outlet />
        </section>
    )
}