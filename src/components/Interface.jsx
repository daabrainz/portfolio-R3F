import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom } from "./Projects";
import { projects } from "./Projects";
import { useForm, ValidationError } from '@formspree/react';


const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
        h-screen w-screen p-8 max-w-screen mx-auto flex flex-col items-start justify-center ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
    `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;

  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillSection />
      <ProjectsSection>
        <h1>Projekt</h1>
      </ProjectsSection>
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;

  return (
    <Section mobileTop>
      <h1 className=" text-white text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
        Hi, i am
        <br />
        <span className="bg-white text-black px-2 italic">Samuel Feindt</span>
      </h1>
      <motion.p
        className="text-lg text-gray-100 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        aspiring UI/UX-Designer,  Game-Developer <br/>& 3D-Enthusiast.
      </motion.p>

      <motion.button
        onClick={() => setSection(3)}
        className={`bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-4 md:mt-16 hover:scale-110 transition-transform`}
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 1.8,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "HTML, CSS",
    level: 70,
  },
  {
    title: "React",
    level: 30,
  },
  {
    title: "ThreeJS / React Three Fiber",
    level: 20,
  },
  {
    title: "3D Modelling",
    level: 50,
  },
  {
    title: "Javascript",
    level: 30,
  },
  {
    title: "Java",
    level: 35,
  },
];

const languages = [
  {
    title: "🇩🇪 German",
    level: 100,
  },
  {
    title: "🇺🇸 English",
    level: 70,
  },
];

const SkillSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"} className="w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skills, index) => (
            <div className="w-full md:w-64" key={index}>
              <motion.h3
                className=" text-lg md:text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skills.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${skills.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">Languages</h2>
          <div className="mt-8 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-300 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {

  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  }

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  } 

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-end justify-center mb-10">
        <button
          className="text-white hover:scale-120 mb-1 transition-transform text-4xl font-bold transition-color"
          onClick={previousProject}
        >
          ⬅️
        </button>
        
        <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
        <button
          className="text-white hover:scale-120 mb-1 transition-transform font-bold text-4xl transition-color"
          onClick={nextProject}
        >
          ➡️
        </button>
      </div>
    </Section>
  );
};

const ContactSection = () => {

  const [state, handleSubmit] = useForm("xyzedgre");
  
  return (
    <Section>

      <h2 className="text-white text-3xl md:text-5xl font-bold">Contact me</h2>

      <div id="contact-form" className="bg-white/50 mt-8 p-8 rounded-md w-96 max-w-full">
          {state.succeeded ? (
            <p className="text-center text-lg font-bold">
              Thanks for your message! I will get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
            <label for="name" className="font-medium  text-gray-900 block border-none">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-100  block w-full rounded-md text gray-900 p-2"
            />
            <label
              for="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-100 block w-full rounded-md border-0 text-gray-900 p-2"
            />
            <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
        />
            <label
              for="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="bg-gray-100 h-32 block w-full rounded-md border-none text-gray-900 p-2 resize-none"
            />
            <ValidationError
            className="mt-10 text-red-400" 
          
          errors={state.errors}
        />
            <button disabled={state.submitting} className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-8 hover:scale-110 transition-transform">
              Submit
            </button>
          </form>   
          )}
</div>
    </Section>
  );
};
