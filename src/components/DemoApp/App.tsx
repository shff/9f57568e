import { useState } from "react";

import Header from "./Header";
import CardList from "./CardList";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import Comments from "../Comments/Comments";
import Footer from "./Footer";

import Projects from "../../assets/projects.json";
import { Project } from "./types";

const App = () => {
  const [project, setProject] = useState(null as number | null);

  return (
    <>
      <Header links={[{ label: "Project", href: "/" }]} />

      <CardList items={Projects} title="Welcome to Your Projects">
        {(item: Project, idx: number) => <ProjectCard key={item.id} item={item} onClick={() => setProject(idx)} />}
      </CardList>

      {project !== null && (
        <Modal title={`Comments for ${Projects[project].name}`} close={() => setProject(null)}>
          <Comments projectId={Projects[project].id} />
        </Modal>
      )}

      <Footer />
    </>
  );
};

export default App;
