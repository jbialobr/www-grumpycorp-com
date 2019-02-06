import { graphql, StaticQuery } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import Footer from "./footer";
import Header from "./header";

// CSS
import "tachyons";
import "./layout.scss";

const Layout: React.FunctionComponent<{}> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    // tslint:disable-next-line jsx-no-lambda
    render={data => (
      <>
        <Helmet
          bodyAttributes={{
            class: `flex flex-column items-stretch tc bg-white`,
          }}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <main style={{ flexGrow: 1 }}>{children}</main>
        <Footer />
      </>
    )}
  />
);

export default Layout;
