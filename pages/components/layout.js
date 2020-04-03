import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
//https://github.com/FortAwesome/react-fontawesome/commit/0a17caafbf716608f8c8975a5d3caf390d8f04aa
const toggleNavShow = () => {
  document.body.classList.toggle("show-nav");
};

const Layout = props => (
  <React.Fragment>
    <Head>
      <title>Painel de Monitoramento do COVID-19</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <nav>
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/2019-nCoV-CDC-23312.png/1200px-2019-nCoV-CDC-23312.png"
          alt="user"
        />
      </div>
      <ul>
        <li>
          <a href="#">Visão Geral do Brasil</a>
        </li>
        <li>
          <a
            href="https://twitter.com/intent/tweet?text=Saca%20o%20painel%20do%20%23coronavirus%20%23covid-19%20publicado%20por%20%40mathcunha"
            rel="noopener noreferrer"
            target="_blank"
          >
            Contato
          </a>
        </li>
      </ul>
    </nav>

    <header>
      <button id="toggle" className="toggle" onClick={toggleNavShow}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <h1>Painel de Monitoramento do COVID-19 no Brasil</h1>

      <p>
        A fonte de dados para este painel é o{" "}
        <a
          href="https://brasil.io/dataset/covid19/caso"
          rel="noopener noreferrer"
          target="_blank"
        >
          Brasil.IO
        </a>
      </p>
    </header>

    <div className="container">{props.children}</div>

    <footer>
      Hello Next.js <FontAwesomeIcon icon={faThumbsUp} /> Colabore{" "}
      <a
        href="https://github.com/mathcunha"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        href="https://twitter.com/intent/tweet?text=Saca%20o%20painel%20do%20%23coronavirus%20%23covid-19%20publicado%20por%20%40mathcunha"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </footer>
  </React.Fragment>
);
//http://sharelinkgenerator.com/
export default Layout;
