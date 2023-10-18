import { Link as LinkRouter, Outlet, useLoaderData } from "react-router-dom";
import { Link } from '@mui/material'
export default function Root() {
  const contacts = useLoaderData();
  console.log(contacts)
  return (
    
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link component={LinkRouter} to="/users">GO TO USER PAGE</Link>
            </li>
            <li>
              <Link component={LinkRouter} to="/login">Log out</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
          <Outlet/>
      </div>
    </>
  );
}
export async function loader() {
  let check = 0
  setTimeout(() => {
    check = 1
  }, 2000)
  if (check === 1) {
    return 1;
  }
}